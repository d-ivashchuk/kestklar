import { Decimal } from "decimal.js";

/**
 * Aggregates realised gains and losses for a tax year.
 *
 * Austrian rules:
 *  - Equities, ETFs and bonds offset each other (single pool).
 *  - Dividends and deemed distributions are NOT offset against capital losses.
 *  - No carryforward to future tax years — pool resets 1 January.
 *
 * §15.2 invariant: result is split into (kz994 ≥ 0, kz996 ≥ 0).
 */
export interface NetLossesInput {
  realisedAmounts: Decimal[]; // signed: positive gain, negative loss
}

export interface NetLossesResult {
  totalGains: Decimal;
  totalLosses: Decimal;
  kz994: Decimal; // net gains, floor 0
  kz996: Decimal; // net losses, absolute, floor 0
}

export function netLosses(input: NetLossesInput): NetLossesResult {
  let gains = new Decimal(0);
  let losses = new Decimal(0);
  for (const x of input.realisedAmounts) {
    if (x.isPositive()) gains = gains.plus(x);
    else if (x.isNegative()) losses = losses.plus(x.abs());
  }

  const net = gains.minus(losses);
  if (net.isPositive()) {
    return { totalGains: gains, totalLosses: losses, kz994: net, kz996: new Decimal(0) };
  }
  if (net.isNegative()) {
    return { totalGains: gains, totalLosses: losses, kz994: new Decimal(0), kz996: net.abs() };
  }
  return { totalGains: gains, totalLosses: losses, kz994: new Decimal(0), kz996: new Decimal(0) };
}
