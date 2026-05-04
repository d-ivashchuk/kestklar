import { Decimal } from "decimal.js";
import type { PrismaClient } from "@prisma/client";
import type { CalculationWarning, OekbInput } from "./types";
import { applyTrade, emptyPosition } from "./position";
import { calcDeemedDistribution } from "./deemed-distribution";
import { netLosses } from "./loss-netter";
import { calcCreditableWithholding } from "./withholding";
import { assembleE1kv } from "./e1kv";

/**
 * Top-level orchestrator. Loads transactions and ÖEKB cache from the DB,
 * runs the pure modules, and persists a TaxCalculationResult.
 *
 * Append-only: every call inserts a fresh result row (ARCHITECTURE.md §15.5).
 */
export async function runTaxCalculation(args: { db: PrismaClient; userId: string; taxYear: number }) {
  const { db, userId, taxYear } = args;
  const warnings: CalculationWarning[] = [];

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: { gte: new Date(`${taxYear}-01-01`), lt: new Date(`${taxYear + 1}-01-01`) },
    },
    orderBy: { date: "asc" },
  });

  // Walk trades chronologically, build positions, accumulate realised gains/losses.
  const positions = new Map<string, ReturnType<typeof emptyPosition>>();
  const realised: Decimal[] = [];

  for (const tx of transactions) {
    if (!tx.isin || !tx.quantity || !tx.priceEur) continue;
    if (tx.type !== "CAPITAL_GAIN" && tx.type !== "CAPITAL_LOSS") continue;

    const cur = positions.get(tx.isin) ?? emptyPosition(tx.isin, taxYear);
    const isBuy = tx.quantity.toString().startsWith("-") ? false : tx.type === "CAPITAL_GAIN" ? false : true;
    // The parser is responsible for emitting normalised CAPITAL_GAIN/LOSS rows
    // with positive quantity and the trade direction inferred — keep this simple
    // for the scaffold; real trade-direction handling lives in the parsers.
    const r = applyTrade(cur, {
      kind: isBuy ? "BUY" : "SELL",
      quantity: new Decimal(tx.quantity.toString()),
      priceEur: new Decimal(tx.priceEur.toString()),
    });
    positions.set(tx.isin, r.state);
    if (!r.realisedGainEur.isZero()) realised.push(r.realisedGainEur);
  }

  // Dividends → KZ 985
  const kz985 = transactions
    .filter((t) => t.type === "DIVIDEND")
    .reduce((acc, t) => acc.plus(new Decimal(t.grossAmountEur.toString())), new Decimal(0));

  // Withholding tax → KZ 998 (capped)
  const totalWithholdingPaid = transactions.reduce(
    (acc, t) => acc.plus(new Decimal(t.withholdingTaxEur.toString())),
    new Decimal(0),
  );
  const kz998 = calcCreditableWithholding({ foreignDividendGrossEur: kz985, withholdingPaidEur: totalWithholdingPaid });

  // Deemed distributions → KZ 936 / KZ 937
  const heldIsins = Array.from(positions.keys());
  const oekbRows = await db.oekbFundData.findMany({
    where: { isin: { in: heldIsins }, taxYear },
    orderBy: { fetchedAt: "desc" },
  });
  // Take the freshest row per ISIN.
  const oekbByIsin = new Map<string, (typeof oekbRows)[number]>();
  for (const row of oekbRows) if (!oekbByIsin.has(row.isin)) oekbByIsin.set(row.isin, row);

  let kz937 = new Decimal(0);
  const kz936 = new Decimal(0); // Austrian-depot deemed dist (rare for our users; future)
  const oekbSourceRefs: Array<{ isin: string; taxYear: number; fetchedAt: Date; source: string }> = [];

  for (const isin of heldIsins) {
    const row = oekbByIsin.get(isin);
    const pos = positions.get(isin);
    if (!pos || pos.quantityHeld.isZero()) continue;
    if (!row) {
      warnings.push({
        code: "MISSING_OEKB",
        isin,
        message: `No ÖEKB record for ${isin} in ${taxYear} — KZ 937 may be incomplete`,
      });
      continue;
    }
    const oekb: OekbInput = {
      isin: row.isin,
      taxYear: row.taxYear,
      reportingDate: row.reportingDate,
      deemedDistributionPerUnit: new Decimal(row.deemedDistributionPerUnit.toString()),
      fxRateOnReportingDate: new Decimal(row.fxRateOnReportingDate.toString()),
      source: row.source,
    };
    const amount = calcDeemedDistribution({ oekb, quantityOnReportingDate: pos.quantityHeld });
    kz937 = kz937.plus(amount);
    oekbSourceRefs.push({ isin: row.isin, taxYear: row.taxYear, fetchedAt: row.fetchedAt, source: row.source });
  }

  // Realised gains/losses → KZ 994 / KZ 996
  const { kz994, kz996 } = netLosses({ realisedAmounts: realised });

  const result = assembleE1kv({ taxYear, kz937, kz936, kz985, kz994, kz996, kz998, warnings });

  // Persist (append-only — never overwrite).
  const saved = await db.taxCalculationResult.create({
    data: {
      userId,
      taxYear,
      kz937: result.kz937.toString(),
      kz936: result.kz936.toString(),
      kz985: result.kz985.toString(),
      kz994: result.kz994.toString(),
      kz996: result.kz996.toString(),
      kz998: result.kz998.toString(),
      grossKest: result.grossKest.toString(),
      netKest: result.netKest.toString(),
      warnings: result.warnings as unknown as object,
      oekbSourceRefs: oekbSourceRefs as unknown as object,
    },
  });

  return saved;
}
