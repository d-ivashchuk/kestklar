import { z } from "zod";

/**
 * Shared contract for all broker parsers.
 *
 * A parser is a stateless function:  Buffer → ParseResult.
 * It must not depend on environment, network, or DB. Side-effect-free pure TS
 * so it runs equally well in a Cloudflare Worker, a Vercel function, or Vitest.
 */

export const ParsedTransactionSchema = z.object({
  type: z.enum([
    "DIVIDEND",
    "CAPITAL_GAIN",
    "CAPITAL_LOSS",
    "INTEREST",
    "DEEMED_DISTRIBUTION",
    "WITHHOLDING_TAX",
  ]),
  isin: z.string().nullable(),
  date: z.coerce.date(),
  quantity: z.string().nullable(), // string to preserve Decimal precision
  priceEur: z.string().nullable(),
  grossAmountEur: z.string(),
  withholdingTaxEur: z.string().default("0"),
  currency: z.string().length(3),
  fxRate: z.string(),
  fxDate: z.coerce.date(),
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

export interface ParseResult {
  transactions: ParsedTransaction[];
  warnings: Array<{ code: string; message: string }>;
}

export type Parser = (input: ParseInput) => Promise<ParseResult>;
