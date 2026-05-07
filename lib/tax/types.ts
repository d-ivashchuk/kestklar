import { Decimal } from "decimal.js";

export const KEST_RATE = new Decimal("0.275"); // 27.5% Austrian KeSt on capital income

/**
 * Source-of-record event types. Realised gains/losses are derived from BUY/SELL
 * events at calculation time using `lib/tax/position.ts` — they're not stored.
 */
export type TxType = "BUY" | "SELL" | "DIVIDEND" | "INTEREST";

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
    | "NEGATIVE_POSITION"
    | "MANUAL_OEKB";
  isin?: string;
  message: string;
}

export interface E1kvResult {
  taxYear: number;
  kz937: Decimal;
  kz936: Decimal;
  kz985: Decimal;
  kz994: Decimal;
  kz996: Decimal;
  kz998: Decimal;
  grossKest: Decimal;
  netKest: Decimal;
  warnings: CalculationWarning[];
}
