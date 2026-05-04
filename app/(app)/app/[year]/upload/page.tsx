"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";

const BROKERS = [
  { value: "IBKR", label: "Interactive Brokers" },
  { value: "SCALABLE", label: "Scalable Capital" },
  { value: "DEGIRO", label: "DEGIRO" },
  { value: "TRADE_REPUBLIC", label: "Trade Republic" },
  { value: "MANUAL", label: "Andere (CSV)" },
] as const;

type Broker = (typeof BROKERS)[number]["value"];

export default function UploadPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = use(params);
  const taxYear = parseInt(yearStr, 10);
  const router = useRouter();

  const [broker, setBroker] = useState<Broker>("IBKR");
  const [submitting, setSubmitting] = useState(false);

  const createUpload = trpc.uploads.create.useMutation();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: { "application/pdf": [".pdf"], "text/csv": [".csv"] },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
  });

  const file = acceptedFiles[0];

  async function onSubmit() {
    if (!file) return;
    setSubmitting(true);
    try {
      const { uploadUrl } = await createUpload.mutateAsync({
        broker,
        taxYear,
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        sizeBytes: file.size,
      });
      const put = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });
      if (!put.ok) throw new Error(`Upload fehlgeschlagen (${put.status})`);
      toast.success("Datei hochgeladen — Verarbeitung läuft");
      router.push(`/app/${taxYear}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload fehlgeschlagen");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <Link href={`/app/${taxYear}`} className="text-xs text-muted-foreground hover:underline">
          ← Steuerjahr {taxYear}
        </Link>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Datei hochladen</h1>
      </header>

      <div className="space-y-2">
        <label className="text-sm font-medium">Broker</label>
        <select
          value={broker}
          onChange={(e) => setBroker(e.target.value as Broker)}
          className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
        >
          {BROKERS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div
        {...getRootProps()}
        className={`flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-sm transition ${
          isDragActive ? "border-foreground/60 bg-muted/40" : "border-border/60"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <span>{file.name}</span>
        ) : (
          <span className="text-muted-foreground">PDF oder CSV hier ablegen, oder klicken zum Auswählen</span>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={!file || submitting}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {submitting ? "Lädt …" : "Hochladen & verarbeiten"}
      </button>
    </div>
  );
}
