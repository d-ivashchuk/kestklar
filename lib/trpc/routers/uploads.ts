import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../init";

/**
 * Upload metadata routes. The actual upload + parse happens at
 * `/api/upload` (Route Handler) — see app/api/upload/route.ts. tRPC over
 * JSON isn't a great fit for multipart file uploads, so the create flow
 * lives outside tRPC.
 */
export const uploadsRouter = router({
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
