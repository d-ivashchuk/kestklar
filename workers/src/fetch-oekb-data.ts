import { WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from "cloudflare:workers";
import type { Env, FetchOekbParams } from "./env";

/**
 * Workflow: fetchOekbData
 *
 * Steps:
 *   1. Check OekbFundData cache — exit early on hit
 *   2. Fetch ÖEKB record via lib/oekb/fetch.ts (Phase 1: HTTP, Phase 2: Browser Rendering)
 *   3. Sanity-check (§15.1) — bounds, fingerprint, in-window date
 *   4. Fetch ECB rate for reportingDate (Frankfurter API)
 *   5. INSERT into OekbFundData (append-only, never UPDATE)
 *   6. Trigger recalculation for users holding this ISIN in this taxYear
 */
export class FetchOekbDataWorkflow extends WorkflowEntrypoint<Env, FetchOekbParams> {
  async run(event: WorkflowEvent<FetchOekbParams>, step: WorkflowStep) {
    const { isin, taxYear } = event.payload;

    const cached = await step.do("check-cache", async () => {
      // SELECT id FROM "OekbFundData" WHERE isin=$1 AND "taxYear"=$2 ORDER BY "fetchedAt" DESC LIMIT 1
      return null as null | { id: string };
    });
    if (cached) return { isin, taxYear, cacheHit: true };

    const fetched = await step.do("fetch-oekb", async () => {
      // Implementation lives in lib/oekb/fetch.ts. Currently throws NOT_IMPLEMENTED
      // — wire bundling so the lib is reachable from the Worker.
      throw new Error("ÖEKB fetcher not yet implemented");
    });

    await step.do("sanity-check", async () => {
      // recordIsAcceptable + structuralFingerprint (§15.1)
    });

    await step.do("fetch-ecb-rate", async () => {
      // GET https://api.frankfurter.app/{reportingDate}?from=EUR&to={currency}
    });

    await step.do("write-cache", async () => {
      // INSERT INTO "OekbFundData" (...) VALUES (...) — append-only.
    });

    await step.do("retrigger-calculations", async () => {
      // For each user who has transactions touching this ISIN in this taxYear,
      // enqueue a recalculation.
    });

    return { isin, taxYear, cacheHit: false };
  }
}
