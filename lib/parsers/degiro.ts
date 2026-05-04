import { ParseError, type Parser } from "./types";

/**
 * DEGIRO parser — Annual Report PDF.
 *
 * Tabular layout requires positional extraction; use pdfjs-dist (with
 * `nodejs_compat` flag in Workers) to reconstruct rows from absolute
 * coordinates.
 */
export const parseDegiro: Parser = async (_input) => {
  throw new ParseError("NOT_IMPLEMENTED", "DEGIRO parser scaffold — needs positional pdfjs-dist extraction");
};
