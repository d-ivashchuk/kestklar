import { WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from "cloudflare:workers";
import type { Env, ParseBrokerUploadParams } from "./env";

/**
 * Workflow: parseBrokerUpload
 *
 * Steps (matches ARCHITECTURE.md §8):
 *   1. Read file from R2
 *   2. Select parser by broker
 *   3. Parse
 *   4. Validate with Zod
 *   5. Write Transactions via Hyperdrive
 *   6. Delete R2 object
 *   7. Update BrokerUpload.status
 *   8. Enqueue fetchOekbData for new ISINs
 *
 * Each step is wrapped in `step.do()` to get durable retry + observability.
 */
export class ParseBrokerUploadWorkflow extends WorkflowEntrypoint<Env, ParseBrokerUploadParams> {
  async run(event: WorkflowEvent<ParseBrokerUploadParams>, step: WorkflowStep) {
    const { uploadId, objectKey } = event.payload;

    const buffer = await step.do("read-r2", async () => {
      const obj = await this.env.UPLOADS.get(objectKey);
      if (!obj) throw new Error(`R2 object not found: ${objectKey}`);
      return await obj.arrayBuffer();
    });

    // TODO: load BrokerUpload row to know which parser to dispatch.
    const broker = await step.do("load-upload-meta", async () => {
      // Query Hyperdrive → Postgres for the BrokerUpload row.
      // Return broker enum + taxYear.
      // Placeholder — implement once postgres.js or pg is wired in.
      return { broker: "IBKR" as const, taxYear: new Date().getFullYear() - 1 };
    });

    const parsed = await step.do("parse", async () => {
      // Parsers live in @/lib/parsers — imported here once bundling is set up.
      // Throw a typed error to land in the workflow's failure handler.
      throw new Error(`Parser for ${broker.broker} not implemented yet`);
    });

    await step.do("write-transactions", async () => {
      // Insert parsed.transactions into Postgres via Hyperdrive.
    });

    await step.do("delete-r2", async () => {
      await this.env.UPLOADS.delete(objectKey);
    });

    await step.do("mark-done", async () => {
      // UPDATE "BrokerUpload" SET status='DONE', "parsedAt"=now() WHERE id=$1
    });

    await step.do("enqueue-oekb-fetches", async () => {
      // For each unique ISIN not in cache, enqueue { isin, taxYear } onto FETCH_OEKB_QUEUE.
    });

    return { uploadId, ok: true };
  }
}
