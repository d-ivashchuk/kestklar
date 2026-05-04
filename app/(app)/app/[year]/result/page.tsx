"use client";

import { use } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

export default function ResultPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = use(params);
  const taxYear = parseInt(yearStr, 10);
  const result = trpc.calculations.getResult.useQuery({ taxYear });
  const calculate = trpc.calculations.calculate.useMutation({
    onSuccess: () => result.refetch(),
  });

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <Link href={`/app/${taxYear}`} className="text-xs text-muted-foreground hover:underline">
            ← Steuerjahr {taxYear}
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ergebnis {taxYear}</h1>
        </div>
        <button
          onClick={() => calculate.mutate({ taxYear })}
          disabled={calculate.isPending}
          className="rounded-md border border-border/60 px-3 py-1.5 text-sm hover:border-foreground/30"
        >
          {calculate.isPending ? "Rechne …" : "Neu berechnen"}
        </button>
      </header>

      {result.isLoading && <p className="text-sm text-muted-foreground">Lade …</p>}

      {result.data && (
        <div className="space-y-6">
          <KennzahlenTable result={result.data} />

          <div className="rounded-lg border border-border/60 p-4">
            <div className="text-xs text-muted-foreground">KeSt-Schuld (netto)</div>
            <div className="mt-1 text-2xl font-semibold">{eur(result.data.netKest)}</div>
          </div>

          {Array.isArray(result.data.warnings) && result.data.warnings.length > 0 && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 text-sm">
              <div className="font-medium text-amber-700">Hinweise</div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-amber-700/90">
                {(result.data.warnings as Array<{ code: string; message: string }>).map((w, i) => (
                  <li key={i}>
                    <span className="font-mono text-xs">{w.code}</span> · {w.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result.error && result.error.data?.code === "NOT_FOUND" && (
        <div className="rounded-lg border border-border/60 p-6 text-center">
          <p className="text-sm">Noch keine Berechnung vorhanden.</p>
          <button
            onClick={() => calculate.mutate({ taxYear })}
            disabled={calculate.isPending}
            className="mt-3 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background"
          >
            Jetzt berechnen
          </button>
        </div>
      )}
    </div>
  );
}

function eur(v: unknown) {
  return new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" }).format(Number(v ?? 0));
}

function KennzahlenTable({ result }: { result: Record<string, unknown> }) {
  const rows = [
    ["KZ 937", "Ausschüttungsgleiche Erträge — ausländisches Depot", "kz937"],
    ["KZ 936", "Ausschüttungsgleiche Erträge — inländisches Depot", "kz936"],
    ["KZ 985", "Ausländische Dividenden", "kz985"],
    ["KZ 994", "Realisierte Kursgewinne", "kz994"],
    ["KZ 996", "Realisierte Verluste", "kz996"],
    ["KZ 998", "Anrechenbare Quellensteuer", "kz998"],
    ["—", "Brutto-KeSt (27,5 %)", "grossKest"],
  ] as const;
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-border/40">
        {rows.map(([code, label, key]) => (
          <tr key={key}>
            <td className="py-2 font-mono text-xs">{code}</td>
            <td className="py-2 text-muted-foreground">{label}</td>
            <td className="py-2 text-right font-medium">{eur(result[key])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
