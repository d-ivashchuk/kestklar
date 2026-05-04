import type { R2Bucket, KVNamespace, Queue, Hyperdrive, WorkflowEntrypoint } from "@cloudflare/workers-types";

export interface Env {
  UPLOADS: R2Bucket;
  RATE_LIMIT: KVNamespace;
  FETCH_OEKB_QUEUE: Queue<FetchOekbMessage>;
  DB: Hyperdrive;
  PARSE_BROKER_UPLOAD: WorkflowEntrypoint<Env, ParseBrokerUploadParams>;
  FETCH_OEKB_DATA: WorkflowEntrypoint<Env, FetchOekbParams>;
  OEKB_USER_AGENT: string;
}

export interface ParseBrokerUploadParams {
  uploadId: string;
  objectKey: string;
}

export interface FetchOekbParams {
  isin: string;
  taxYear: number;
}

export interface FetchOekbMessage extends FetchOekbParams {}

export type ParseQueueMessage = {
  type: "parse-broker-upload";
  uploadId: string;
  objectKey: string;
};
