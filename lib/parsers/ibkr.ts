import { ParseError, type Parser } from "./types";

/**
 * Interactive Brokers parser.
 *
 * Phase 1 input: CSV Activity Statement (Flex Query).
 * Phase 2 fallback: PDF text via pdf-parse.
 *
 * Sections of interest in the Flex CSV:
 *   - Trades  → CAPITAL_GAIN / CAPITAL_LOSS rows
 *   - Dividends → DIVIDEND rows
 *   - Withholding Tax → attached to the parent dividend
 *   - Interest → INTEREST rows
 */
export const parseIbkr: Parser = async (_input) => {
  throw new ParseError("NOT_IMPLEMENTED", "IBKR parser scaffold — implement Flex CSV parsing first");
};
