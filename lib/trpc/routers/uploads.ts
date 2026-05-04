import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../init";
import { presignUploadUrl } from "@/lib/r2";
import { enqueueParseJob } from "@/lib/cloudflare/queue";
import { checkRateLimit } from "@/lib/rate-limit";

const BrokerEnum = z.enum(["IBKR", "SCALABLE", "DEGIRO", "TRADE_REPUBLIC", "MANUAL"]);

export const uploadsRouter = router({
  // Step 1 of upload: client asks for a presigned URL, then PUTs directly to R2.
  // Server never handles raw file bytes (see ARCHITECTURE.md §11).
  create: protectedProcedure
    .input(
      z.object({
        broker: BrokerEnum,
        taxYear: z.number().int().min(2018).max(new Date().getFullYear()),
        filename: z.string().min(1).max(255),
        contentType: z.string().min(1).max(100),
        sizeBytes: z.number().int().positive().max(20 * 1024 * 1024), // 20 MB cap
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const allowed = await checkRateLimit({ key: `upload:${ctx.userId}`, limit: 10, windowSec: 3600 });
      if (!allowed) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const upload = await ctx.db.brokerUpload.create({
        data: {
          userId: ctx.userId,
          broker: input.broker,
          taxYear: input.taxYear,
          filename: input.filename,
          status: "PENDING",
        },
      });

      const objectKey = `uploads/${ctx.userId}/${upload.id}/${input.filename}`;
      const uploadUrl = await presignUploadUrl({
        key: objectKey,
        contentType: input.contentType,
        contentLength: input.sizeBytes,
        expiresInSec: 600,
      });

      await enqueueParseJob({ uploadId: upload.id, objectKey });

      return { uploadId: upload.id, uploadUrl, objectKey };
    }),

  list: protectedProcedure
    .input(z.object({ taxYear: z.number().int() }))
    .query(({ ctx, input }) =>
      ctx.db.brokerUpload.findMany({
        where: { userId: ctx.userId, taxYear: input.taxYear },
        orderBy: { createdAt: "desc" },
      }),
    ),

  getStatus: protectedProcedure.input(z.object({ uploadId: z.string() })).query(async ({ ctx, input }) => {
    const upload = await ctx.db.brokerUpload.findFirst({
      where: { id: input.uploadId, userId: ctx.userId },
      select: { id: true, status: true, errorMessage: true, parsedAt: true },
    });
    if (!upload) throw new TRPCError({ code: "NOT_FOUND" });
    return upload;
  }),

  delete: protectedProcedure.input(z.object({ uploadId: z.string() })).mutation(async ({ ctx, input }) => {
    const result = await ctx.db.brokerUpload.deleteMany({
      where: { id: input.uploadId, userId: ctx.userId },
    });
    if (result.count === 0) throw new TRPCError({ code: "NOT_FOUND" });
    return { ok: true };
  }),
});
