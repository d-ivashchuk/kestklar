import { z } from "zod";

/**
 * Shared contract for all broker parsers.
 *
 * A parser is a stateless pure function:  ParseInput → ParseResult.
 *
 * It must NOT do FX conversion — it emits amounts in their original currency
 * along with the trade date, and a separate `applyFxRates` step (called by
 * the upload route handler) converts to EUR using ECB rates. This keeps
 * parsers offline-runnable (great for Vitest fixtures) and isolates network
 * calls to one place.
 */

export const TransactionTypeEnum = z.enum(["BUY", "SELL", "DIVIDEND", "INTEREST"]);
export type TransactionTypeOut = z.infer<typeof TransactionTypeEnum>;

export const ParsedTransactionSchema = z.object({
  type: TransactionTypeEnum,
  isin: z.string().nullable(),
  symbol: z.string().nullable(),
  date: z.coerce.date(),
  /** Number of units. Always positive — direction is encoded in `type`. Strings preserve Decimal precision. */
  quantity: z.string().nullable(),
  /** Per-unit price in `currency`. */
  pricePerUnit: z.string().nullable(),
  /** Gross monetary amount in `currency`. For BUY/SELL this is qty * price; for DIVIDEND it's the dividend amount. */
  grossAmount: z.string(),
  /** Withholding tax amount in `currency` (positive). Defaults to 0. */
  withholdingTax: z.string().default("0"),
  currency: z.string().length(3),
  description: z.string().optional(),
});

export type ParsedTransaction = z.infer<typeof ParsedTransactionSchema>;

export const ParseErrorCode = z.enum([
  "UNSUPPORTED_FORMAT",
  "MISSING_SECTION",
  "AMBIGUOUS_DATA",
  "WRONG_TAX_YEAR",
  "NOT_IMPLEMENTED",
]);

export type ParseErrorCode = z.infer<typeof ParseErrorCode>;

export class ParseError extends Error {
  constructor(
    public code: ParseErrorCode,
    message: string,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ParseError";
  }
}

export interface ParseInput {
  buffer: ArrayBuffer;
  filename: string;
  taxYear: number;
}

export interface ParseWarning {
  code: string;
  message: string;
}

export interface ParseResult {
  transactions: ParsedTransaction[];
  warnings: ParseWarning[];
}

export type Parser = (input: ParseInput) => Promise<ParseResult>;
