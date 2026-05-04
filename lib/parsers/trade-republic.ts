import { ParseError, type Parser } from "./types";

/**
 * Trade Republic parser — Steuerreport PDF.
 *
 * Only relevant for tax years before April 2025 and partial 2025 (since then
 * Trade Republic remits Austrian KeSt directly).
 */
export const parseTradeRepublic: Parser = async (_input) => {
  throw new ParseError("NOT_IMPLEMENTED", "Trade Republic parser scaffold");
};
