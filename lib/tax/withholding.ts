import { Decimal } from "decimal.js";
import { KEST_RATE } from "./types";

/**
 * Sums creditable foreign withholding tax for the tax year, capped at
 * 27.5% of the gross dividend basis from that source — the legal ceiling
 * for the credit (no overcredit possible by construction).
 *
 * §15.2 invariant: kz998 ≤ 27.5% × foreign dividend gross.
 */
export interface WithholdingInput {
  /** Total foreign dividend gross (before any tax) — drives the credit cap. */
  foreignDividendGrossEur: Decimal;
  /** Total foreign withholding tax actually deducted, in EUR. */
  withholdingPaidEur: Decimal;
}

export function calcCreditableWithholding(input: WithholdingInput): Decimal {
  const cap = input.foreignDividendGrossEur.mul(KEST_RATE);
  const credit = Decimal.min(input.withholdingPaidEur, cap);
  return credit.isNegative() ? new Decimal(0) : credit;
}
