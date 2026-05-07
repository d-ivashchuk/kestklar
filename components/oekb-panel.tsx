"use client";

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";

/**
 * Beta UX: until the ÖEKB scraper lands, users paste the deemed-distribution
 * per-unit value from my.oekb.at themselves. Each row in the panel is a held
 * fund position; missing entries get an inline form, cached entries show
 * the value and a "replace" affordance.
 */
export function OekbPanel({ taxYear }: { taxYear: number }) {
  const status = trpc.oekb.getStatus.useQuery({ taxYear });
  const upsert = trpc.oekb.upsertManual.useMutation({
    onSuccess: () => {
      toast.success("ÖEKB-Wert gespeichert");
      status.refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  if (status.isLoading) return <p className="text-sm text-muted-foreground">Lade ÖEKB-Status …</p>;
  if (!status.data || status.data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Keine ETF-/Fondspositionen erkannt — KZ 937 ist für dieses Jahr 0.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {status.data.map((row) => (
        <OekbRow
          key={row.isin}
          row={row}
          taxYear={taxYear}
          onSubmit={(values) => upsert.mutate(values)}
          submitting={upsert.isPending}
        />
      ))}
    </div>
  );
}

function OekbRow({
  row,
  taxYear,
  onSubmit,
  submitting,
}: {
  row: { isin: string; quantity: string; status: "missing" | "manual" | "cached"; perUnit: string | null };
  taxYear: number;
  onSubmit: (values: {
    isin: string;
    taxYear: number;
    deemedDistributionPerUnit: string;
    currency: string;
    reportingDate: Date;
    fxRateOnReportingDate: string;
  }) => void;
  submitting: boolean;
}) {
  const [open, setOpen] = useState(row.status === "missing");
  const [perUnit, setPerUnit] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [reportingDate, setReportingDate] = useState(`${taxYear}-12-31`);
  const [fxRate, setFxRate] = useState("1");

  const tone =
    row.status === "cached"
      ? "border-emerald-500/40 bg-emerald-500/5"
      : row.status === "manual"
        ? "border-amber-500/40 bg-amber-500/5"
        : "border-border/60";

  return (
    <div className={`rounded-lg border p-3 text-sm ${tone}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-xs">{row.isin}</div>
          <div className="text-xs text-muted-foreground">
            {Number(row.quantity).toFixed(4)} Stück gehalten
            {row.perUnit && ` · perUnit ${row.perUnit}`}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {row.status === "cached" && <span className="text-emerald-700">ÖEKB ✓</span>}
          {row.status === "manual" && <span className="text-amber-700">manuell</span>}
          {row.status === "missing" && <span className="text-red-600">fehlt</span>}
          <button onClick={() => setOpen((o) => !o)} className="rounded border border-border/60 px-2 py-0.5">
            {open ? "schließen" : row.status === "missing" ? "eingeben" : "ersetzen"}
          </button>
        </div>
      </div>

      {open && (
        <form
          className="mt-3 grid grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              isin: row.isin,
              taxYear,
              deemedDistributionPerUnit: perUnit,
              currency,
              reportingDate: new Date(reportingDate),
              fxRateOnReportingDate: fxRate,
            });
          }}
        >
          <div>
            <label className="text-xs text-muted-foreground">Ausschüttungsgleicher Ertrag (perUnit)</label>
            <input
              required
              value={perUnit}
              onChange={(e) => setPerUnit(e.target.value)}
              placeholder="z.B. 0.4567"
              className="mt-1 w-full rounded border border-border/60 bg-background px-2 py-1"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Währung</label>
            <input
              required
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              maxLength={3}
              className="mt-1 w-full rounded border border-border/60 bg-background px-2 py-1"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Stichtag</label>
            <input
              required
              type="date"
              value={reportingDate}
              onChange={(e) => setReportingDate(e.target.value)}
              className="mt-1 w-full rounded border border-border/60 bg-background px-2 py-1"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">FX-Kurs am Stichtag (1 wenn EUR)</label>
            <input
              required
              value={fxRate}
              onChange={(e) => setFxRate(e.target.value)}
              className="mt-1 w-full rounded border border-border/60 bg-background px-2 py-1"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-foreground px-3 py-1 text-xs font-medium text-background disabled:opacity-50"
            >
              {submitting ? "Speichere …" : "Speichern"}
            </button>
          </div>
          <p className="col-span-2 text-xs text-muted-foreground">
            Die Werte findest du auf{" "}
            <a
              href={`https://my.oekb.at/fond-info/eContent/public/searches/oeStock.do?keyword=${row.isin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              my.oekb.at
            </a>{" "}
            unter „Steuerliche Daten" → ausschüttungsgleicher Ertrag pro Anteil für {taxYear}.
          </p>
        </form>
      )}
    </div>
  );
}
