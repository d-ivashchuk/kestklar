import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../init";
import { runTaxCalculation } from "@/lib/tax/run";

export const calculationsRouter = router({
  calculate: protectedProcedure
    .input(z.object({ taxYear: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      return runTaxCalculation({ db: ctx.db, userId: ctx.userId, taxYear: input.taxYear });
    }),

  getResult: protectedProcedure
    .input(z.object({ taxYear: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.taxCalculationResult.findFirst({
        where: { userId: ctx.userId, taxYear: input.taxYear },
        orderBy: { calculatedAt: "desc" },
      });
      if (!result) throw new TRPCError({ code: "NOT_FOUND" });
      return result;
    }),

  listYears: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.brokerUpload.findMany({
      where: { userId: ctx.userId },
      select: { taxYear: true },
      distinct: ["taxYear"],
      orderBy: { taxYear: "desc" },
    });
    return rows.map((r) => r.taxYear);
  }),
});
