import { Decimal } from "decimal.js";

export const KEST_RATE = new Decimal("0.275"); // 27.5% Austrian KeSt on capital income

export type TxType =
  | "DIVIDEND"
  | "CAPITAL_GAIN"
  | "CAPITAL_LOSS"
  | "INTEREST"
  | "DEEMED_DISTRIBUTION"
  | "WITHHOLDING_TAX";

export interface TransactionInput {
  id: string;
  type: TxType;
  isin: string | null;
  date: Date;
  quantity: Decimal | null;
  priceEur: Decimal | null;
  grossAmountEur: Decimal;
  withholdingTaxEur: Decimal;
  /** Austrian custody = inländisches Depot. Default false (most KestKlar users hold abroad). */
  austrianDepot?: boolean;
}

export interface PositionState {
  isin: string;
  taxYear: number;
  quantityHeld: Decimal;
  avgCostBasisEur: Decimal;
}

export interface OekbInput {
  isin: string;
  taxYear: number;
  reportingDate: Date;
  deemedDistributionPerUnit: Decimal;
  fxRateOnReportingDate: Decimal;
  /** ÖEKB record URL — recorded for audit (§15.5). */
  source: string;
}

export interface CalculationWarning {
  code:
    | "MISSING_OEKB"
    | "NON_MELDEFONDS"
    | "ALTBESTAND_DETECTED"
    | "AMBIGUOUS_QUANTITY"
    | "FX_GAP"
    | "NEGATIVE_POSITION";
  isin?: string;
  message: string;
}

export interface E1kvResult {
  taxYear: number;
  kz937: Decimal; // foreign-depot deemed distributions
  kz936: Decimal; // Austrian-depot deemed distributions
  kz985: Decimal; // foreign dividends
  kz994: Decimal; // realised gains (post-netting)
  kz996: Decimal; // realised losses (absolute, post-netting)
  kz998: Decimal; // creditable foreign withholding tax
  grossKest: Decimal;
  netKest: Decimal;
  warnings: CalculationWarning[];
}
