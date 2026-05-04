"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

const CURRENT_YEAR = new Date().getFullYear();
// Tax year for filing is usually the previous calendar year.
const DEFAULT_YEAR = CURRENT_YEAR - 1;
const YEARS = [DEFAULT_YEAR, DEFAULT_YEAR - 1, DEFAULT_YEAR - 2, DEFAULT_YEAR - 3];

export default function AppHome() {
  const years = trpc.calculations.listYears.useQuery();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Steuerjahre</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Wähle das Jahr, für das du die KeSt berechnen möchtest.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {YEARS.map((y) => {
          const hasData = years.data?.includes(y);
          return (
            <Link
              key={y}
              href={`/app/${y}`}
              className="rounded-lg border border-border/60 p-4 transition hover:border-foreground/30"
            >
              <div className="text-lg font-medium">{y}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {hasData ? "Daten vorhanden" : "Neu beginnen"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
