import { ParseError, type Parser } from "./types";

/**
 * Generic CSV import — fallback for unsupported brokers. The frontend wizard
 * lets the user map their broker's columns onto KestKlar's Transaction fields,
 * and this parser consumes the resulting normalised CSV.
 */
export const parseManual: Parser = async (_input) => {
  throw new ParseError("NOT_IMPLEMENTED", "Manual CSV parser scaffold — needs column-mapping schema");
};
