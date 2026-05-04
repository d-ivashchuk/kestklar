import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Cloudflare R2 client (S3-compatible). EU jurisdiction is enforced at the
 * bucket level (`jurisdiction: eu` set in the Cloudflare dashboard / wrangler).
 *
 * Used by the Vercel API to mint presigned PUT URLs the browser uploads to
 * directly — server never sees the raw file bytes (ARCHITECTURE.md §11).
 */
function client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 environment variables missing");
  }
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT ?? `https://${accountId}.eu.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

const bucket = () => {
  const b = process.env.R2_BUCKET;
  if (!b) throw new Error("R2_BUCKET not set");
  return b;
};

export async function presignUploadUrl(args: {
  key: string;
  contentType: string;
  contentLength: number;
  expiresInSec?: number;
}) {
  const cmd = new PutObjectCommand({
    Bucket: bucket(),
    Key: args.key,
    ContentType: args.contentType,
    ContentLength: args.contentLength,
  });
  return getSignedUrl(client(), cmd, { expiresIn: args.expiresInSec ?? 600 });
}

export async function presignDownloadUrl(args: { key: string; expiresInSec?: number }) {
  const cmd = new GetObjectCommand({ Bucket: bucket(), Key: args.key });
  return getSignedUrl(client(), cmd, { expiresIn: args.expiresInSec ?? 60 });
}

export async function deleteObject(key: string) {
  await client().send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }));
}
