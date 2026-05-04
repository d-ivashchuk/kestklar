import { Decimal } from "decimal.js";
import type { OekbScrapedRecord } from "./schema";

/**
 * §15.1 contextual sanity checks. Run after Zod validation but before cache write.
 *
 * Distinct from `schema.ts` — these checks need additional context (NAV, claimed
 * tax year) that isn't part of the record itself.
 */

export type SanityResult = { ok: true } | { ok: false; reason: string };

export function checkPerUnitVsNav(args: { perUnit: Decimal; navOnReportingDate: Decimal }): SanityResult {
  const ratio = args.perUnit.div(args.navOnReportingDate);
  if (ratio.isNegative() || ratio.gt(new Decimal("0.5"))) {
    return {
      ok: false,
      reason: `perUnit/NAV ratio ${ratio.toFixed(4)} outside [0, 0.5] — likely parser error`,
    };
  }
  return { ok: true };
}

export function checkReportingDateInWindow(args: {
  reportingDate: Date;
  claimedTaxYear: number;
  toleranceDays?: number;
}): SanityResult {
  const tol = args.toleranceDays ?? 60;
  const start = new Date(`${args.claimedTaxYear}-01-01`);
  start.setDate(start.getDate() - tol);
  const end = new Date(`${args.claimedTaxYear + 1}-01-01`);
  end.setDate(end.getDate() + tol);
  if (args.reportingDate < start || args.reportingDate >= end) {
    return {
      ok: false,
      reason: `reportingDate ${args.reportingDate.toISOString()} not within ±${tol}d of tax year ${args.claimedTaxYear}`,
    };
  }
  return { ok: true };
}

/**
 * Stable structural fingerprint of the source page payload. If the next fetch
 * sees a different shape, alarm and refuse to write (§15.1).
 */
export function structuralFingerprint(rawJson: unknown): string {
  const shape = describeShape(rawJson);
  // Tiny FNV-1a so we don't pull in a hash dependency for a fingerprint.
  let h = 0x811c9dc5;
  for (let i = 0; i < shape.length; i++) {
    h ^= shape.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

function describeShape(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return `[${v.length === 0 ? "" : describeShape(v[0])}]`;
  if (typeof v === "object") {
    const keys = Object.keys(v as object).sort();
    return `{${keys.map((k) => `${k}:${describeShape((v as Record<string, unknown>)[k])}`).join(",")}}`;
  }
  return typeof v;
}

export function recordIsAcceptable(rec: OekbScrapedRecord): SanityResult {
  if (rec.deemedDistributionPerUnit < 0) return { ok: false, reason: "negative per-unit" };
  if (rec.fxRateOnReportingDate <= 0) return { ok: false, reason: "non-positive fx rate" };
  return checkReportingDateInWindow({ reportingDate: rec.reportingDate, claimedTaxYear: rec.taxYear });
}
