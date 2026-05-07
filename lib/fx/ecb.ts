import { Decimal } from "decimal.js";

/**
 * ECB/Frankfurter FX resolver.
 *
 * Frankfurter (https://api.frankfurter.app) is a free, no-auth proxy over
 * the European Central Bank's daily reference rates. Austrian tax law
 * accepts ECB rates for foreign-currency conversion, so this is the
 * canonical source.
 *
 * Frankfurter only publishes weekday rates. For weekend/holiday dates the
 * API returns the most recent prior weekday automatically.
 */

const CACHE = new Map<string, FxRate>(); // key: `${currency}|${YYYY-MM-DD}`

export interface FxRate {
  rate: Decimal; // 1 unit foreign currency = `rate` EUR
  rateDate: Date;
}

export async function getEurRate(args: {
  fromCurrency: string;
  date: Date;
  fetchImpl?: typeof fetch;
}): Promise<FxRate> {
  const cur = args.fromCurrency.toUpperCase();
  if (cur === "EUR") {
    return { rate: new Decimal(1), rateDate: args.date };
  }

  const dateStr = args.date.toISOString().slice(0, 10);
  const cacheKey = `${cur}|${dateStr}`;
  const cached = CACHE.get(cacheKey);
  if (cached) return cached;

  const url = `https://api.frankfurter.app/${dateStr}?from=${cur}&to=EUR`;
  const res = await (args.fetchImpl ?? fetch)(url);
  if (!res.ok) {
    throw new Error(`FX fetch failed: HTTP ${res.status} for ${cur} on ${dateStr}`);
  }
  const body = (await res.json()) as { date: string; rates: { EUR: number } };
  const eurRate = body.rates?.EUR;
  if (typeof eurRate !== "number" || eurRate <= 0) {
    throw new Error(`Frankfurter returned no EUR rate for ${cur} on ${dateStr}`);
  }
  const result: FxRate = { rate: new Decimal(eurRate), rateDate: new Date(body.date) };
  CACHE.set(cacheKey, result);
  return result;
}

/** Bulk resolve — coalesces same-date requests so a CSV with 100 USD rows = ≤1 fetch per date. */
export async function getEurRatesForDates(args: {
  pairs: Array<{ currency: string; date: Date }>;
  fetchImpl?: typeof fetch;
}): Promise<Map<string, FxRate>> {
  const out = new Map<string, FxRate>();
  const seen = new Set<string>();
  for (const { currency, date } of args.pairs) {
    const key = `${currency.toUpperCase()}|${date.toISOString().slice(0, 10)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.set(key, await getEurRate({ fromCurrency: currency, date, fetchImpl: args.fetchImpl }));
  }
  return out;
}

export function fxKey(currency: string, date: Date): string {
  return `${currency.toUpperCase()}|${date.toISOString().slice(0, 10)}`;
}
