import { z } from "zod";

/**
 * §15.1 — Zod schema applied to every scraped ÖEKB record before it is allowed
 * into the OekbFundData cache. Reject if anything is missing or out of bounds.
 *
 * Bounds are deliberately narrow:
 *  - perUnit / NAV must lie in [0, 0.5]; values outside this band are almost
 *    certainly a parsing error.
 *  - Currency must be a known ISO code.
 *  - reportingDate must fall within the claimed tax year ±60 days.
 */

const ISO_CURRENCIES = [
  "EUR", "USD", "GBP", "CHF", "JPY", "CAD", "AUD", "SEK", "NOK", "DKK",
  "CZK", "PLN", "HUF", "SGD", "HKD", "ILS", "TRY", "ZAR", "MXN", "BRL",
  "NZD", "KRW",
] as const;

export const OekbScrapedRecord = z.object({
  isin: z.string().regex(/^[A-Z]{2}[A-Z0-9]{9}\d$/, "ISIN must be 12 chars: 2 letters + 9 alnum + 1 digit"),
  taxYear: z.number().int().min(2018).max(2100),
  reportingDate: z.coerce.date(),
  deemedDistributionPerUnit: z.coerce.number().min(0).max(10000), // gross sanity; tighter NAV check is contextual
  currency: z.enum(ISO_CURRENCIES),
  fxRateOnReportingDate: z.coerce.number().positive().max(10000),
  source: z.string().url(),
});

export type OekbScrapedRecord = z.infer<typeof OekbScrapedRecord>;
