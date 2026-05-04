/**
 * §15.3 — Golden fund canary set.
 *
 * Widely held ISINs whose ÖEKB values we have manually verified for recent
 * tax years. The nightly canary re-fetches these and compares against the
 * locked values; any disagreement halts new cache writes and pages on-call.
 *
 * NOTE: Values left empty here intentionally. Lock them in once an operator
 * has cross-referenced ÖEKB + a second source (community spreadsheet or PDF
 * Steuermeldung). Don't ship guesses.
 */

export interface GoldenExpectation {
  isin: string;
  name: string;
  taxYear: number;
  /** Per-unit deemed distribution in fund currency, as published by ÖEKB. */
  deemedDistributionPerUnit: string; // string to avoid float drift
  currency: string;
  reportingDate: string; // ISO yyyy-mm-dd
}

export const GOLDEN_FUNDS: GoldenExpectation[] = [
  // { isin: "IE00B4L5Y983", name: "iShares Core MSCI World UCITS ETF (Acc)", taxYear: 2024, deemedDistributionPerUnit: "TODO", currency: "USD", reportingDate: "2024-12-..." },
  // { isin: "IE00BKM4GZ66", name: "iShares Core MSCI EM IMI UCITS ETF (Acc)", taxYear: 2024, deemedDistributionPerUnit: "TODO", currency: "USD", reportingDate: "2024-..." },
  // { isin: "IE00B5BMR087", name: "iShares Core S&P 500 UCITS ETF (Acc)", taxYear: 2024, deemedDistributionPerUnit: "TODO", currency: "USD", reportingDate: "2024-..." },
  // { isin: "IE00BFNM3J75", name: "iShares Core EUR Govt Bond UCITS ETF", taxYear: 2024, deemedDistributionPerUnit: "TODO", currency: "EUR", reportingDate: "2024-..." },
  // … target ~20–30 ISINs spanning equity / bond / global / regional.
];

export const GOLDEN_FUNDS_TODO_NOTE =
  "Populate GOLDEN_FUNDS with manually verified values before enabling the §15.3 nightly canary in CI.";
