import { z } from "zod";
import { Decimal } from "decimal.js";
import { router, protectedProcedure } from "../init";

const ISIN_RE = /^[A-Z]{2}[A-Z0-9]{9}\d$/;

export const oekbRouter = router({
  /** What the user holds and which ISINs are still missing ÖEKB data for the year. */
  getStatus: protectedProcedure
    .input(z.object({ taxYear: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const yearStart = new Date(`${input.taxYear}-01-01`);
      const yearEnd = new Date(`${input.taxYear + 1}-01-01`);

      // Walk all transactions touching this user; positions held going INTO
      // the tax year matter for KZ 937 even if there were no trades during it.
      const txs = await ctx.db.transaction.findMany({
        where: { userId: ctx.userId, type: { in: ["BUY", "SELL"] }, date: { lt: yearEnd } },
        select: { isin: true, type: true, quantity: true, date: true },
      });

      const heldByIsin = new Map<string, Decimal>();
      for (const t of txs) {
        if (!t.isin || !t.quantity) continue;
        const cur = heldByIsin.get(t.isin) ?? new Decimal(0);
        const qty = new Decimal(t.quantity.toString());
        heldByIsin.set(t.isin, t.type === "BUY" ? cur.plus(qty) : cur.minus(qty));
      }
      // Also include any ISIN with a sell DURING the year, even if fully unwound by year end.
      for (const t of txs) {
        if (t.isin && t.date >= yearStart && t.date < yearEnd && !heldByIsin.has(t.isin)) {
          heldByIsin.set(t.isin, new Decimal(0));
        }
      }

      const isinsHeld = Array.from(heldByIsin.entries())
        .filter(([, q]) => q.gt(0))
        .map(([isin]) => isin);

      const cached = await ctx.db.oekbFundData.findMany({
        where: { isin: { in: isinsHeld }, taxYear: input.taxYear },
        select: { isin: true, source: true, deemedDistributionPerUnit: true },
        distinct: ["isin"],
      });
      const cachedByIsin = new Map(cached.map((c) => [c.isin, c]));

      return isinsHeld.map((isin) => {
        const c = cachedByIsin.get(isin);
        return {
          isin,
          quantity: heldByIsin.get(isin)?.toString() ?? "0",
          status: c ? (c.source.startsWith("manual:") ? ("manual" as const) : ("cached" as const)) : ("missing" as const),
          perUnit: c?.deemedDistributionPerUnit.toString() ?? null,
        };
      });
    }),

  /**
   * Manual ÖEKB data entry — the beta path before the auto-fetcher lands.
   * User pastes the per-unit deemed-distribution value from my.oekb.at.
   * Stored with source="manual:<userId>" so the calculator flags it in warnings.
   */
  upsertManual: protectedProcedure
    .input(
      z.object({
        isin: z.string().regex(ISIN_RE),
        taxYear: z.number().int().min(2018).max(new Date().getFullYear()),
        deemedDistributionPerUnit: z.string().refine((s) => /^-?\d+(\.\d+)?$/.test(s), "must be a decimal number"),
        currency: z.string().length(3).default("EUR"),
        reportingDate: z.coerce.date(),
        fxRateOnReportingDate: z.string().default("1"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.oekbFundData.create({
        data: {
          isin: input.isin,
          taxYear: input.taxYear,
          reportingDate: input.reportingDate,
          deemedDistributionPerUnit: input.deemedDistributionPerUnit,
          currency: input.currency,
          fxRateOnReportingDate: input.fxRateOnReportingDate,
          source: `manual:${ctx.userId}`,
          rawJson: { enteredBy: ctx.userId, enteredAt: new Date().toISOString() },
        },
      });
    }),

  lookupFund: protectedProcedure
    .input(z.object({ isin: z.string().length(12), taxYear: z.number().int() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.oekbFundData.findFirst({
        where: { isin: input.isin, taxYear: input.taxYear },
        orderBy: { fetchedAt: "desc" },
      });
    }),
});
