import { z } from "zod";
import { router, protectedProcedure } from "../init";

export const oekbRouter = router({
  // Read-only — actual fetching happens in a Cloudflare Workflow.
  // This procedure surfaces what's currently cached for the UI.
  lookupFund: protectedProcedure
    .input(z.object({ isin: z.string().length(12), taxYear: z.number().int() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.oekbFundData.findFirst({
        where: { isin: input.isin, taxYear: input.taxYear },
        orderBy: { fetchedAt: "desc" },
      });
    }),

  // Returns ISINs the user holds in a tax year that don't yet have ÖEKB data.
  // Drives the "Phase 1 manual entry" UI before auto-fetch lands.
  getStatus: protectedProcedure
    .input(z.object({ taxYear: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const heldIsins = await ctx.db.transaction.findMany({
        where: {
          userId: ctx.userId,
          isin: { not: null },
          date: {
            gte: new Date(`${input.taxYear}-01-01`),
            lt: new Date(`${input.taxYear + 1}-01-01`),
          },
        },
        select: { isin: true },
        distinct: ["isin"],
      });

      const isins = heldIsins.map((t) => t.isin).filter((x): x is string => Boolean(x));
      const cached = await ctx.db.oekbFundData.findMany({
        where: { isin: { in: isins }, taxYear: input.taxYear },
        select: { isin: true },
        distinct: ["isin"],
      });
      const cachedSet = new Set(cached.map((c) => c.isin));
      const missing = isins.filter((i) => !cachedSet.has(i));

      return { held: isins, missing };
    }),
});
