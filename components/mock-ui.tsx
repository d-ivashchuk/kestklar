"use client";

import { useInView } from "@/lib/use-in-view";
import { CountUp } from "./count-up";

export function MockUI() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const brokers = [
    { name: "Trade Republic", rows: 42 },
    { name: "Scalable Capital", rows: 18 },
    { name: "IBKR", rows: 7 },
  ];

  return (
    <div
      ref={ref}
      className="w-full max-w-4xl mx-auto border border-border bg-background shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
    >
      {/* Window chrome */}
      <div className="border-b border-border px-4 py-3 flex items-center gap-2 bg-secondary">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
        </div>
        <span className="text-xs text-muted-foreground mx-auto font-sans">
          KestKlar · Steuerberechnung 2025
        </span>
      </div>

      <div className="flex divide-x divide-border">
        {/* Left sidebar — hidden on mobile, shown md+ */}
        <div className="hidden md:block w-56 shrink-0 p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Meine Broker
          </p>
          {brokers.map((broker, i) => (
            <div
              key={broker.name}
              className="flex items-center justify-between py-2 px-3 border border-border"
            >
              <div>
                <p className="text-xs font-medium text-foreground">{broker.name}</p>
                <p className="text-[10px] text-muted-foreground">{broker.rows} Transaktionen</p>
              </div>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`shrink-0 check-draw ${inView ? "in-view" : ""}`}
                style={{ animationDelay: `${i * 280}ms` }}
              >
                <path
                  d="M1.5 5L4 7.5L8.5 2.5"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: `${i * 280}ms` }}
                />
              </svg>
            </div>
          ))}
          <div className="pt-3 border-t border-border mt-3">
            <button className="w-full text-xs text-muted-foreground border border-dashed border-border py-2 px-3 hover:border-foreground/30 transition-colors">
              + Broker hinzufügen
            </button>
          </div>
          <div className="pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              ETF Datenabruf
            </p>
            {[
              { isin: "IE00B4L5Y983", name: "IWDA" },
              { isin: "IE00BK5BQT80", name: "VWCE" },
              { isin: "LU0360534375", name: "XMEX" },
            ].map((fund, i) => (
              <div
                key={fund.isin}
                className={`py-1.5 reveal ${inView ? "in-view" : ""}`}
                style={{ animationDelay: `${800 + i * 160}ms` }}
              >
                <p className="text-[10px] font-medium text-foreground">{fund.name}</p>
                <p className="text-[9px] text-muted-foreground font-mono">{fund.isin}</p>
                <p className="text-[9px] text-green-600">Meldefonds ✓</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 min-w-0">
          {/* Summary header */}
          <div className="flex items-start sm:items-center justify-between border-b border-border pb-4 gap-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Steuerjahr 2025</h3>
              <p className="text-xs text-muted-foreground">67 Transaktionen · 3 Broker · 3 ETFs</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 shrink-0 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-soft" aria-hidden="true" />
              Abgeschlossen
            </span>
          </div>

          {/* Tax breakdown */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Steuerberechnung
            </p>
            {[
              { label: "Dividenden", amount: "€ 1.240,00", sub: "§27 Abs. 2", negative: false },
              { label: "Kursgewinne", amount: "€ 3.180,00", sub: "§27 Abs. 3", negative: false },
              { label: "Aussch. ETF-Erträge", amount: "€ 420,00", sub: "ÖEKB", negative: false },
              { label: "Verlustausgleich", amount: "− € 640,00", sub: "Cross-broker", negative: true },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-2 px-3 border border-border gap-2 reveal ${inView ? "in-view" : ""}`}
                style={{ animationDelay: `${300 + i * 120}ms` }}
              >
                <div className="min-w-0">
                  <p className="text-xs text-foreground truncate">{row.label}</p>
                  <p className="text-[10px] text-muted-foreground">{row.sub}</p>
                </div>
                <span className={`text-xs font-mono font-medium shrink-0 ${row.negative ? "text-red-500" : "text-foreground"}`}>
                  {row.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 px-3 bg-secondary border border-border">
              <p className="text-xs font-medium text-foreground">Steuerbemessungsgrundlage</p>
              <span className="text-xs font-mono font-medium text-foreground">€ 4.200,00</span>
            </div>
          </div>

          {/* KeSt result — animated count-up */}
          <div className="border border-foreground/20 p-4 bg-foreground text-background">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium opacity-60">KeSt gesamt (27,5%)</p>
                <p className="text-2xl font-medium font-sans mt-1">
                  €{" "}
                  <CountUp
                    value={1155}
                    duration={1500}
                    decimals={2}
                  />
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs opacity-60">Quellsteuer angerechnet</p>
                <p className="text-sm font-mono opacity-80 mt-1">− € 118,00</p>
                <p className="text-[10px] opacity-50 mt-0.5">US-Quellensteuer (15%)</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <p className="text-xs font-medium opacity-70">Noch zu zahlen</p>
              <p className="text-lg font-medium font-sans">
                €{" "}
                <CountUp value={1037} duration={1700} decimals={2} />
              </p>
            </div>
          </div>

          {/* E1kv lines */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              E1kv Formularzeilen
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { line: "984", label: "Inl. Dividenden", value: "€ 320,00" },
                { line: "985", label: "Ausl. Dividenden", value: "€ 920,00" },
                { line: "994", label: "Kursgewinne", value: "€ 3.180,00" },
                { line: "892", label: "Aussch. Erträge", value: "€ 420,00" },
              ].map((item, i) => (
                <div
                  key={item.line}
                  className={`border border-border p-2 flex items-center justify-between gap-1 reveal ${inView ? "in-view" : ""}`}
                  style={{ animationDelay: `${900 + i * 100}ms` }}
                >
                  <div className="min-w-0">
                    <span className="text-[9px] text-muted-foreground font-mono block">Zeile {item.line}</span>
                    <span className="text-[10px] text-foreground truncate block">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-foreground shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border px-4 py-2.5 flex items-center justify-between bg-secondary gap-4">
        <p className="text-[10px] text-muted-foreground hidden sm:block">
          Daten bleiben in der EU · DSGVO-konform · Keine Steuerberatung
        </p>
        <p className="text-[10px] text-muted-foreground sm:hidden">DSGVO · EU-Hosting</p>
        <button className="text-xs font-medium bg-foreground text-background px-3 py-1.5 hover:opacity-80 transition-opacity shrink-0">
          PDF exportieren
        </button>
      </div>
    </div>
  );
}
