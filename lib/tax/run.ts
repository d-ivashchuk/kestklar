import { Decimal } from "decimal.js";
import type { PrismaClient } from "@prisma/client";
import type { CalculationWarning, OekbInput, PositionState } from "./types";
import { applyTrade, emptyPosition } from "./position";
import { calcDeemedDistribution } from "./deemed-distribution";
import { netLosses } from "./loss-netter";
import { calcCreditableWithholding } from "./withholding";
import { assembleE1kv } from "./e1kv";

/**
 * Top-level orchestrator. Loads transactions and ÖEKB cache from the DB,
 * runs the pure modules, persists a TaxCalculationResult.
 *
 * Append-only: every call inserts a fresh result row (ARCHITECTURE.md §15.5).
 */
export async function runTaxCalculation(args: { db: PrismaClient; userId: string; taxYear: number }) {
  const { db, userId, taxYear } = args;
  const warnings: CalculationWarning[] = [];

  // Walk every transaction we have for this user — including BUYs from prior
  // years — to build accurate avgCost going into `taxYear`. Realised gains
  // only count if the SELL falls inside `taxYear`.
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  const yearStart = new Date(`${taxYear}-01-01`);
  const yearEnd = new Date(`${taxYear + 1}-01-01`);
  const positions = new Map<string, PositionState>();
  const realisedThisYear: Decimal[] = [];

  for (const tx of transactions) {
    if (tx.type !== "BUY" && tx.type !== "SELL") continue;
    if (!tx.isin || !tx.quantity || !tx.priceEur) continue;

    const cur = positions.get(tx.isin) ?? emptyPosition(tx.isin, taxYear);
    try {
      const r = applyTrade(cur, {
        kind: tx.type,
        quantity: new Decimal(tx.quantity.toString()),
        priceEur: new Decimal(tx.priceEur.toString()),
      });
      positions.set(tx.isin, r.state);
      const inThisYear = tx.date >= yearStart && tx.date < yearEnd;
      if (inThisYear && tx.type === "SELL" && !r.realisedGainEur.isZero()) {
        realisedThisYear.push(r.realisedGainEur);
      }
    } catch (err) {
      warnings.push({
        code: "NEGATIVE_POSITION",
        isin: tx.isin,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Dividends in this tax year → KZ 985 (gross). Withholding is summed across
  // dividends and capped against the 27.5% credit ceiling.
  let kz985 = new Decimal(0);
  let totalWithholdingPaid = new Decimal(0);
  for (const tx of transactions) {
    if (tx.type !== "DIVIDEND") continue;
    if (tx.date < yearStart || tx.date >= yearEnd) continue;
    kz985 = kz985.plus(new Decimal(tx.grossAmountEur.toString()));
    totalWithholdingPaid = totalWithholdingPaid.plus(new Decimal(tx.withholdingTaxEur.toString()));
  }
  const kz998 = calcCreditableWithholding({
    foreignDividendGrossEur: kz985,
    withholdingPaidEur: totalWithholdingPaid,
  });

  // Deemed distributions (KZ 937 / KZ 936). One ÖEKB row per held ISIN per year.
  const heldIsins = Array.from(positions.entries())
    .filter(([, p]) => p.quantityHeld.gt(0))
    .map(([isin]) => isin);

  const oekbRows =
    heldIsins.length === 0
      ? []
      : await db.oekbFundData.findMany({
          where: { isin: { in: heldIsins }, taxYear },
          orderBy: { fetchedAt: "desc" },
        });

  // Take the freshest row per ISIN (rows are append-only).
  const oekbByIsin = new Map<string, (typeof oekbRows)[number]>();
  for (const row of oekbRows) if (!oekbByIsin.has(row.isin)) oekbByIsin.set(row.isin, row);

  let kz937 = new Decimal(0);
  const kz936 = new Decimal(0);
  const oekbSourceRefs: Array<{ isin: string; taxYear: number; fetchedAt: Date; source: string }> = [];

  for (const isin of heldIsins) {
    const pos = positions.get(isin);
    const row = oekbByIsin.get(isin);
    if (!pos) continue;
    if (!row) {
      warnings.push({
        code: "MISSING_OEKB",
        isin,
        message: `Keine ÖEKB-Daten für ${isin} in ${taxYear} — KZ 937 unvollständig`,
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
    if (row.source.startsWith("manual:")) {
      warnings.push({
        code: "MANUAL_OEKB",
        isin,
        message: `ÖEKB-Wert für ${isin} manuell eingegeben — bitte gegen ÖEKB-Original prüfen`,
      });
    }
  }

  const { kz994, kz996 } = netLosses({ realisedAmounts: realisedThisYear });

  const result = assembleE1kv({ taxYear, kz937, kz936, kz985, kz994, kz996, kz998, warnings });

  return db.taxCalculationResult.create({
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
}
