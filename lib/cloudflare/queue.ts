/**
 * Enqueue a message onto a Cloudflare Queue from a Vercel function via the
 * Cloudflare REST API. Used by the upload flow to hand off PDF parsing to
 * the Workers-side `parseBrokerUpload` Workflow.
 *
 * Auth: a Cloudflare API token with `Queues:Write` scope on the target queue.
 * Fail-closed: if the API call fails, the upload row is left in PENDING and a
 * retry job will pick it up — no silent loss.
 */

interface CloudflareQueueMessage {
  body: unknown;
  contentType?: "json" | "text";
}

async function sendToQueue(queueId: string, messages: CloudflareQueueMessage[]) {
  const accountId = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  if (!accountId || !token) throw new Error("Cloudflare API credentials missing");

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/queues/${queueId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudflare queue enqueue failed (${res.status}): ${text}`);
  }
}

export async function enqueueParseJob(args: { uploadId: string; objectKey: string }) {
  const queueId = process.env.CF_QUEUE_PARSE_UPLOADS_ID;
  if (!queueId) throw new Error("CF_QUEUE_PARSE_UPLOADS_ID not set");
  await sendToQueue(queueId, [
    { contentType: "json", body: { type: "parse-broker-upload", ...args } },
  ]);
}
