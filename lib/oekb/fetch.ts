import { OekbScrapedRecord } from "./schema";
import { recordIsAcceptable, structuralFingerprint } from "./sanity";

/**
 * Fetches ÖEKB deemed-distribution data for (ISIN, taxYear).
 *
 * Phase 1: structured HTTP. Replicate the JSON endpoint the my.oekb.at
 * frontend uses. Reverse-engineering is left to the implementer — keep it
 * narrow, fail closed.
 *
 * Phase 2 fallback (not in this scaffold): Cloudflare Browser Rendering
 * if the site requires JS execution or session tokens.
 */

export interface OekbFetchResult {
  record: OekbScrapedRecord;
  rawJson: unknown;
  fingerprint: string;
}

export class OekbFetchError extends Error {
  constructor(
    public code: "NOT_FOUND" | "STRUCTURE_DRIFT" | "BOUNDS" | "NETWORK",
    message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "OekbFetchError";
  }
}

export async function fetchOekbRecord(args: {
  isin: string;
  taxYear: number;
  /** Locked fingerprint for this endpoint shape — see §15.1. */
  expectedFingerprint?: string;
  fetchImpl?: typeof fetch;
  userAgent?: string;
}): Promise<OekbFetchResult> {
  // The actual endpoint URL and request shape live here once reverse-engineered.
  // Keeping this as an explicit NotImplemented to make the scraper landing point
  // obvious during code review.
  throw new OekbFetchError(
    "NOT_FOUND",
    "fetchOekbRecord scraper not implemented yet — see Phase 2 in ARCHITECTURE.md §13",
  );

  // Reference shape for when the scraper lands:
  //
  //   const res = await (args.fetchImpl ?? fetch)(buildUrl(args.isin, args.taxYear), {
  //     headers: { "User-Agent": args.userAgent ?? "kestklar-bot/0.1" },
  //   });
  //   if (!res.ok) throw new OekbFetchError("NETWORK", `HTTP ${res.status}`);
  //   const rawJson = await res.json();
  //   const fingerprint = structuralFingerprint(rawJson);
  //   if (args.expectedFingerprint && fingerprint !== args.expectedFingerprint) {
  //     throw new OekbFetchError("STRUCTURE_DRIFT", `Expected ${args.expectedFingerprint}, got ${fingerprint}`);
  //   }
  //   const parsed = OekbScrapedRecord.parse(rawJson);
  //   const sanity = recordIsAcceptable(parsed);
  //   if (!sanity.ok) throw new OekbFetchError("BOUNDS", sanity.reason);
  //   return { record: parsed, rawJson, fingerprint };
}
