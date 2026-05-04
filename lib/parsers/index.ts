import type { Parser } from "./types";
import { parseIbkr } from "./ibkr";
import { parseScalable } from "./scalable";
import { parseDegiro } from "./degiro";
import { parseTradeRepublic } from "./trade-republic";
import { parseManual } from "./manual";

export const PARSERS: Record<string, Parser> = {
  IBKR: parseIbkr,
  SCALABLE: parseScalable,
  DEGIRO: parseDegiro,
  TRADE_REPUBLIC: parseTradeRepublic,
  MANUAL: parseManual,
};

export { ParseError } from "./types";
export type { ParsedTransaction, ParseInput, ParseResult } from "./types";
