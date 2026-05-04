import { ParseError, type Parser } from "./types";

/**
 * Scalable Capital parser — Jahressteuerbescheinigung PDF.
 *
 * Approach: pdf-parse text extraction + regex on labelled sections.
 * Cross-check totals; surface AMBIGUOUS_DATA if reconstructed sum drifts.
 */
export const parseScalable: Parser = async (_input) => {
  throw new ParseError("NOT_IMPLEMENTED", "Scalable Capital parser scaffold");
};
