import { Decimal } from "decimal.js";
import type { OekbInput } from "./types";

/**
 * Deemed distribution (ausschüttungsgleiche Erträge) for a position
 * snapshotted at the ÖEKB Stichtag.
 *
 *   amount = perUnit × quantityOnReportingDate × fxRateOnReportingDate
 *
 * §15.2 invariant: per-unit must be non-negative and within bounds enforced
 * upstream by §15.1 sanity checks before this function is called.
 */
export function calcDeemedDistribution(args: {
  oekb: OekbInput;
  quantityOnReportingDate: Decimal;
}): Decimal {
  const { oekb, quantityOnReportingDate } = args;
  if (quantityOnReportingDate.isNegative()) {
    throw new Error(`Quantity on reportingDate must be non-negative for ${oekb.isin}`);
  }
  if (oekb.deemedDistributionPerUnit.isNegative()) {
    throw new Error(`Per-unit deemed distribution must be non-negative for ${oekb.isin}`);
  }
  return oekb.deemedDistributionPerUnit
    .mul(quantityOnReportingDate)
    .mul(oekb.fxRateOnReportingDate);
}
