import { ParseError, type Parser, type ParsedTransaction, type ParseWarning } from "./types";

/**
 * Interactive Brokers — Activity Statement / Flex Query CSV parser.
 *
 * Format reference:
 *   https://www.ibkrguides.com/reportingreference/reportguide/activitystatement.htm
 *
 * IBKR's CSV is a multi-section file. Every row starts with `<SectionName>,<Discriminator>`.
 * Discriminators we keep: "Header" (column names), "Data" (the row itself).
 * Discriminators we drop: "SubTotal", "Total", "Notes" (recap rows; would double-count).
 *
 * Sections we extract:
 *   - "Trades"          → BUY / SELL  (quantity sign encodes direction)
 *   - "Dividends"       → DIVIDEND
 *   - "Withholding Tax" → attached to the matching DIVIDEND row by date+symbol
 *   - "Interest"        → INTEREST
 *
 * ISIN handling: IBKR includes ISIN as a column when the user enables it in
 * the Flex Query (recommended). When missing, we extract it from dividend
 * descriptions (which always contain `XXX(US0378331005) Cash Dividend …`)
 * and back-fill into Trades using a Symbol→ISIN map.
 */

const ISIN_RE = /\b([A-Z]{2}[A-Z0-9]{9}\d)\b/;

interface Section {
  headers: string[];
  rows: string[][];
}

export const parseIbkr: Parser = async (input) => {
  const text = new TextDecoder("utf-8").decode(input.buffer);
  const sections = splitSections(text);
  const warnings: ParseWarning[] = [];

  const trades = sections.get("Trades");
  const dividends = sections.get("Dividends");
  const withholding = sections.get("Withholding Tax");
  const interest = sections.get("Interest");

  if (!trades && !dividends) {
    throw new ParseError("MISSING_SECTION", "No Trades or Dividends section found — is this an IBKR Activity Statement CSV?");
  }

  const symbolToIsin = new Map<string, string>();
  const dividendsParsed = dividends ? parseDividends(dividends, warnings) : [];
  for (const d of dividendsParsed) if (d.symbol && d.isin) symbolToIsin.set(d.symbol, d.isin);

  const tradesParsed = trades ? parseTrades(trades, symbolToIsin, warnings) : [];

  // Attach withholding tax to dividends by (symbol, date) match.
  const withholdingParsed = withholding ? parseWithholding(withholding, warnings) : [];
  for (const w of withholdingParsed) {
    const match = dividendsParsed.find(
      (d) =>
        d.symbol &&
        w.symbol &&
        d.symbol === w.symbol &&
        sameDay(d.date, w.date) &&
        d.currency === w.currency,
    );
    if (match) {
      match.withholdingTax = addStringDecimals(match.withholdingTax, w.absAmount);
    } else {
      warnings.push({
        code: "ORPHAN_WITHHOLDING",
        message: `Quellensteuer ohne passende Dividende: ${w.symbol ?? "?"} ${w.date.toISOString().slice(0, 10)} ${w.absAmount} ${w.currency}`,
      });
    }
  }

  const interestParsed = interest ? parseInterest(interest, warnings) : [];

  // Filter to taxYear ± a buffer? No — the orchestrator filters by date when
  // computing Kennzahlen, but BUYs from prior years are still useful for
  // building avgCost into `taxYear`. So we emit everything we found.
  const transactions: ParsedTransaction[] = [
    ...tradesParsed,
    ...dividendsParsed.map((d) => stripPrivate(d)),
    ...interestParsed,
  ];

  return { transactions, warnings };
};

// ── CSV / section splitting ────────────────────────────────────────────────

function splitSections(text: string): Map<string, Section> {
  const out = new Map<string, Section>();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const cols = parseCsvLine(line);
    if (cols.length < 2) continue;
    const sectionName = cols[0];
    const discriminator = cols[1];
    if (discriminator === "Header") {
      out.set(sectionName, { headers: cols.slice(2), rows: [] });
    } else if (discriminator === "Data") {
      const sec = out.get(sectionName);
      if (sec) sec.rows.push(cols.slice(2));
    }
  }
  return out;
}

/** Quote-aware CSV row tokenizer. Handles "" → " escapes. */
function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
          continue;
        }
        inQuotes = false;
        continue;
      }
      cur += ch;
    } else {
      if (ch === '"') {
        inQuotes = true;
        continue;
      }
      if (ch === ",") {
        out.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function colIndex(headers: string[], name: string): number {
  return headers.findIndex((h) => h === name);
}

// ── Trades ─────────────────────────────────────────────────────────────────

interface TradeIntermediate extends ParsedTransaction {
  symbol: string | null;
}

function parseTrades(
  section: Section,
  symbolToIsin: Map<string, string>,
  warnings: ParseWarning[],
): ParsedTransaction[] {
  const h = section.headers;
  const iAsset = colIndex(h, "Asset Category");
  const iCurrency = colIndex(h, "Currency");
  const iSymbol = colIndex(h, "Symbol");
  const iIsin = colIndex(h, "ISIN");
  const iDateTime = colIndex(h, "Date/Time");
  const iQuantity = colIndex(h, "Quantity");
  const iPrice = colIndex(h, "T. Price");
  const iProceeds = colIndex(h, "Proceeds");

  if (iCurrency < 0 || iSymbol < 0 || iDateTime < 0 || iQuantity < 0 || iPrice < 0) {
    throw new ParseError("MISSING_SECTION", "Trades section is missing required columns");
  }

  const out: ParsedTransaction[] = [];
  for (const row of section.rows) {
    const assetCategory = iAsset >= 0 ? row[iAsset] : "";
    if (assetCategory && !isEquityAsset(assetCategory)) {
      // Skip forex, options, futures for v0 — Austrian KeSt rules differ.
      continue;
    }
    const currency = row[iCurrency];
    const symbol = row[iSymbol] || null;
    const isinFromCol = iIsin >= 0 ? row[iIsin] : "";
    const isin = isValidIsin(isinFromCol) ? isinFromCol : symbol ? symbolToIsin.get(symbol) ?? null : null;

    const date = parseIbkrDate(row[iDateTime]);
    const qtyNum = parseIbkrNumber(row[iQuantity]);
    const price = parseIbkrNumber(row[iPrice]);
    if (qtyNum === null || price === null || qtyNum === 0) continue;

    const isBuy = qtyNum > 0;
    const absQuantity = Math.abs(qtyNum).toString();
    const grossAmount = (Math.abs(qtyNum) * price).toFixed(10);

    if (!isin) {
      warnings.push({
        code: "MISSING_ISIN",
        message: `Trade ohne ISIN: ${symbol ?? "?"} ${row[iDateTime]} — füge die ISIN-Spalte in deinem IBKR Flex Query hinzu`,
      });
    }

    out.push({
      type: isBuy ? "BUY" : "SELL",
      isin,
      symbol,
      date,
      quantity: absQuantity,
      pricePerUnit: price.toString(),
      grossAmount,
      withholdingTax: "0",
      currency,
      description: iProceeds >= 0 ? `proceeds=${row[iProceeds]}` : undefined,
    });
  }
  return out;
}

function isEquityAsset(category: string): boolean {
  const c = category.toLowerCase();
  return c.includes("stock") || c.includes("equity") || c === "stk" || c.includes("etf");
}

// ── Dividends ──────────────────────────────────────────────────────────────

interface DividendIntermediate {
  type: "DIVIDEND";
  isin: string | null;
  symbol: string | null;
  date: Date;
  quantity: null;
  pricePerUnit: null;
  grossAmount: string;
  withholdingTax: string;
  currency: string;
  description?: string;
}

function parseDividends(section: Section, warnings: ParseWarning[]): DividendIntermediate[] {
  const h = section.headers;
  const iCurrency = colIndex(h, "Currency");
  const iDate = colIndex(h, "Date");
  const iDesc = colIndex(h, "Description");
  const iAmount = colIndex(h, "Amount");

  if (iCurrency < 0 || iDate < 0 || iDesc < 0 || iAmount < 0) {
    throw new ParseError("MISSING_SECTION", "Dividends section is missing required columns");
  }

  const out: DividendIntermediate[] = [];
  for (const row of section.rows) {
    const currency = row[iCurrency];
    if (!currency || currency.length !== 3) continue; // skip the "Total in EUR" pseudo-rows
    const date = parseIbkrDate(row[iDate]);
    const desc = row[iDesc];
    const amount = parseIbkrNumber(row[iAmount]);
    if (amount === null || amount <= 0) continue;

    const isinMatch = desc.match(ISIN_RE);
    const isin = isinMatch ? isinMatch[1] : null;
    const symbol = extractSymbol(desc);

    if (!isin) {
      warnings.push({
        code: "MISSING_ISIN",
        message: `Dividende ohne erkennbare ISIN: "${desc}"`,
      });
    }

    out.push({
      type: "DIVIDEND",
      isin,
      symbol,
      date,
      quantity: null,
      pricePerUnit: null,
      grossAmount: amount.toString(),
      withholdingTax: "0",
      currency,
      description: desc,
    });
  }
  return out;
}

// ── Withholding Tax ────────────────────────────────────────────────────────

interface WithholdingRow {
  symbol: string | null;
  date: Date;
  absAmount: string;
  currency: string;
}

function parseWithholding(section: Section, _warnings: ParseWarning[]): WithholdingRow[] {
  const h = section.headers;
  const iCurrency = colIndex(h, "Currency");
  const iDate = colIndex(h, "Date");
  const iDesc = colIndex(h, "Description");
  const iAmount = colIndex(h, "Amount");

  if (iCurrency < 0 || iDate < 0 || iDesc < 0 || iAmount < 0) return [];

  const out: WithholdingRow[] = [];
  for (const row of section.rows) {
    const currency = row[iCurrency];
    if (!currency || currency.length !== 3) continue;
    const amount = parseIbkrNumber(row[iAmount]);
    if (amount === null || amount === 0) continue;
    out.push({
      symbol: extractSymbol(row[iDesc]),
      date: parseIbkrDate(row[iDate]),
      absAmount: Math.abs(amount).toString(),
      currency,
    });
  }
  return out;
}

// ── Interest ───────────────────────────────────────────────────────────────

function parseInterest(section: Section, _warnings: ParseWarning[]): ParsedTransaction[] {
  const h = section.headers;
  const iCurrency = colIndex(h, "Currency");
  const iDate = colIndex(h, "Date");
  const iAmount = colIndex(h, "Amount");
  const iDesc = colIndex(h, "Description");
  if (iCurrency < 0 || iDate < 0 || iAmount < 0) return [];

  const out: ParsedTransaction[] = [];
  for (const row of section.rows) {
    const currency = row[iCurrency];
    if (!currency || currency.length !== 3) continue;
    const amount = parseIbkrNumber(row[iAmount]);
    if (amount === null || amount <= 0) continue;
    out.push({
      type: "INTEREST",
      isin: null,
      symbol: null,
      date: parseIbkrDate(row[iDate]),
      quantity: null,
      pricePerUnit: null,
      grossAmount: amount.toString(),
      withholdingTax: "0",
      currency,
      description: iDesc >= 0 ? row[iDesc] : undefined,
    });
  }
  return out;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function parseIbkrDate(raw: string): Date {
  // IBKR uses either "2024-01-15" or "2024-01-15, 10:30:00".
  const cleaned = raw.replace(",", "T").replace(/\s+/g, "");
  const d = new Date(cleaned);
  if (Number.isNaN(d.getTime())) {
    // Try yyyy-MM-dd fallback.
    const fallback = new Date(raw.split(",")[0].trim());
    if (Number.isNaN(fallback.getTime())) {
      throw new ParseError("AMBIGUOUS_DATA", `Unable to parse IBKR date: "${raw}"`);
    }
    return fallback;
  }
  return d;
}

function parseIbkrNumber(raw: string | undefined): number | null {
  if (raw === undefined || raw === null || raw === "") return null;
  // IBKR uses US format: 1,234.56 — strip thousand separators.
  const cleaned = raw.replace(/,/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

function extractSymbol(description: string): string | null {
  // IBKR dividend descriptions: "AAPL(US0378331005) Cash Dividend USD 0.24 per Share"
  const m = description.match(/^([A-Z0-9.]+)\s*\(/);
  return m ? m[1] : null;
}

function isValidIsin(s: string): boolean {
  return typeof s === "string" && /^[A-Z]{2}[A-Z0-9]{9}\d$/.test(s);
}

function sameDay(a: Date, b: Date): boolean {
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

function addStringDecimals(a: string, b: string): string {
  return (parseFloat(a) + parseFloat(b)).toString();
}

function stripPrivate(d: DividendIntermediate): ParsedTransaction {
  return {
    type: d.type,
    isin: d.isin,
    symbol: d.symbol,
    date: d.date,
    quantity: d.quantity,
    pricePerUnit: d.pricePerUnit,
    grossAmount: d.grossAmount,
    withholdingTax: d.withholdingTax,
    currency: d.currency,
    description: d.description,
  };
}
