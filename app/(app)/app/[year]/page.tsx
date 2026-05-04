"use client";

import Link from "next/link";
import { use } from "react";
import { trpc } from "@/lib/trpc/client";

export default function YearDashboard({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = use(params);
  const taxYear = parseInt(yearStr, 10);

  const uploads = trpc.uploads.list.useQuery({ taxYear });
  const oekbStatus = trpc.oekb.getStatus.useQuery({ taxYear });

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <Link href="/app" className="text-xs text-muted-foreground hover:underline">
            ← Steuerjahre
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Steuerjahr {taxYear}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/app/${taxYear}/upload`}
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background"
          >
            Datei hochladen
          </Link>
          <Link
            href={`/app/${taxYear}/result`}
            className="rounded-md border border-border/60 px-3 py-1.5 text-sm font-medium hover:border-foreground/30"
          >
            Ergebnis
          </Link>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Uploads</h2>
        {uploads.isLoading && <p className="text-sm text-muted-foreground">Lade …</p>}
        {uploads.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Noch keine Datei hochgeladen. Beginne mit deinem Broker-Jahresreport.
          </p>
        )}
        <ul className="divide-y divide-border/40 rounded-lg border border-border/60">
          {uploads.data?.map((u) => (
            <li key={u.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <div className="font-medium">{u.filename}</div>
                <div className="text-xs text-muted-foreground">
                  {u.broker} · {new Date(u.createdAt).toLocaleDateString("de-AT")}
                </div>
              </div>
              <StatusBadge status={u.status} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">ÖEKB</h2>
        {oekbStatus.data && (
          <div className="rounded-lg border border-border/60 p-4 text-sm">
            <p>
              <span className="font-medium">{oekbStatus.data.held.length}</span> ISIN(s) im Bestand
              {oekbStatus.data.missing.length > 0 ? (
                <>
                  , davon <span className="font-medium text-amber-600">{oekbStatus.data.missing.length}</span>{" "}
                  ohne ÖEKB-Daten
                </>
              ) : (
                ", alle ÖEKB-Daten vorhanden"
              )}
              .
            </p>
            {oekbStatus.data.missing.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                {oekbStatus.data.missing.map((isin) => (
                  <li key={isin}>{isin}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "DONE"
      ? "bg-emerald-500/10 text-emerald-600"
      : status === "FAILED"
        ? "bg-red-500/10 text-red-600"
        : "bg-amber-500/10 text-amber-600";
  return <span className={`rounded-full px-2 py-0.5 text-xs ${tone}`}>{status}</span>;
}
