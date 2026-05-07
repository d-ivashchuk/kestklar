"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const BROKERS = [
  { value: "IBKR", label: "Interactive Brokers", supported: true },
  { value: "SCALABLE", label: "Scalable Capital (bald)", supported: false },
  { value: "DEGIRO", label: "DEGIRO (bald)", supported: false },
  { value: "TRADE_REPUBLIC", label: "Trade Republic (bald)", supported: false },
] as const;

type Broker = (typeof BROKERS)[number]["value"];

export default function UploadPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = use(params);
  const taxYear = parseInt(yearStr, 10);
  const router = useRouter();

  const [broker, setBroker] = useState<Broker>("IBKR");
  const [submitting, setSubmitting] = useState(false);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".csv"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const file = acceptedFiles[0];

  async function onSubmit() {
    if (!file) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("broker", broker);
      fd.append("taxYear", String(taxYear));

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const body = await res.json();

      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);

      toast.success(`Datei verarbeitet — ${body.transactionCount} Transaktionen importiert`);
      if (Array.isArray(body.warnings) && body.warnings.length > 0) {
        toast.warning(`${body.warnings.length} Warnung(en) — siehe Ergebnisseite`);
      }
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
            <option key={b.value} value={b.value} disabled={!b.supported}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      {broker === "IBKR" && (
        <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm">
          <p className="font-medium">So exportierst du deinen IBKR-Report:</p>
          <ol className="mt-2 list-inside list-decimal space-y-1 text-muted-foreground">
            <li>
              In Client Portal: <span className="font-mono text-xs">Performance & Reports → Flex Queries</span>
            </li>
            <li>
              Erstelle einen <span className="font-mono text-xs">Activity Flex Query</span> für {taxYear}
              {" "}mit den Sektionen Trades, Dividends, Withholding Tax, Interest
            </li>
            <li>
              Wichtig: Aktiviere die Spalte <span className="font-mono text-xs">ISIN</span> in der
              Trades-Sektion (sonst können Käufe nicht zugeordnet werden)
            </li>
            <li>
              Format: <span className="font-mono text-xs">CSV</span> · hier hochladen
            </li>
          </ol>
        </div>
      )}

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
          <span className="text-muted-foreground">CSV hier ablegen, oder klicken zum Auswählen</span>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={!file || submitting}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {submitting ? "Verarbeite …" : "Hochladen & verarbeiten"}
      </button>
    </div>
  );
}
