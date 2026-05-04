import type { MessageBatch, ScheduledController, ExecutionContext } from "@cloudflare/workers-types";
import type { Env, ParseQueueMessage, FetchOekbMessage } from "./env";

export { ParseBrokerUploadWorkflow } from "./parse-broker-upload";
export { FetchOekbDataWorkflow } from "./fetch-oekb-data";

/**
 * Worker entrypoint. Two consumers (parse-uploads, fetch-oekb) plus a
 * cron handler that pre-warms ÖEKB cache during filing season.
 */
export default {
  async queue(batch: MessageBatch<ParseQueueMessage | FetchOekbMessage>, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      try {
        if (batch.queue === "parse-uploads") {
          const body = msg.body as ParseQueueMessage;
          await env.PARSE_BROKER_UPLOAD.create({
            params: { uploadId: body.uploadId, objectKey: body.objectKey },
          });
        } else if (batch.queue === "fetch-oekb") {
          const body = msg.body as FetchOekbMessage;
          await env.FETCH_OEKB_DATA.create({
            params: { isin: body.isin, taxYear: body.taxYear },
          });
        }
        msg.ack();
      } catch (err) {
        console.error("queue handler failed", { queue: batch.queue, err });
        msg.retry();
      }
    }
  },

  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    // §15.3 — pre-warm ÖEKB cache during filing season for known golden ISINs.
    // Daily cron at 03:00 UTC during March–June (configured in wrangler.toml).
    ctx.waitUntil(
      (async () => {
        // For each entry in lib/oekb/golden.ts, enqueue a fetch-oekb job for the
        // current and prior tax year. Cache hits are no-ops.
      })(),
    );
  },
};
