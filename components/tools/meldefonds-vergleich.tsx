"use client";

import { useState } from "react";

export function MeldefondsVergleich() {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("200");
  const [returnRate, setReturnRate] = useState("7");
  const [years, setYears] = useState("20");

  const initialNum = parseFloat(initial) || 0;
  const monthlyNum = parseFloat(monthly) || 0;
  const returnNum = (parseFloat(returnRate) || 0) / 100;
  const yearsNum = Math.min(parseInt(years) || 0, 50); // cap at 50 years

  // Calculate both scenarios
  const meldefonds = calculateMeldefonds(initialNum, monthlyNum, returnNum, yearsNum);
  const nonMeldefonds = calculateNonMeldefonds(initialNum, monthlyNum, returnNum, yearsNum);

  const difference = meldefonds.finalValue - nonMeldefonds.finalValue;

  const fmt = (n: number) =>
    n.toLocaleString("de-AT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Generate chart data points
  const chartPoints = generateChartData(initialNum, monthlyNum, returnNum, yearsNum);

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputField
          label="Anfangsinvestition"
          value={initial}
          onChange={setInitial}
          suffix="€"
          info="Dein einmaliges Startkapital zu Beginn des Anlagezeitraums."
        />
        <InputField
          label="Monatliche Sparrate"
          value={monthly}
          onChange={setMonthly}
          suffix="€"
          info="Betrag den du jeden Monat zusätzlich investierst (Sparplan)."
        />
        <InputField
          label="Erwartete Rendite p.a."
          value={returnRate}
          onChange={setReturnRate}
          suffix="%"
          info="Angenommene jährliche Brutto-Rendite vor Steuern. Historisch lag ein globaler Aktien-ETF bei ca. 7-8% p.a. (inkl. Dividenden, vor Inflation)."
        />
        <InputField
          label="Anlagezeitraum"
          value={years}
          onChange={setYears}
          suffix="Jahre"
          info="Wie lange du investiert bleibst. Je länger, desto größer der Unterschied zwischen Meldefonds und Nicht-Meldefonds durch den Zinseszins-Effekt."
        />
      </div>

      {/* Comparison columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        <div className="bg-background p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-foreground" />
            <h3 className="font-serif text-lg">Meldefonds</h3>
            <InfoTooltip text="Ein bei der OeKB gemeldeter Fonds. Die Fondsgesellschaft meldet jährlich die steuerrelevanten Erträge. Besteuerung: 27,5% KESt nur auf die tatsächlich gemeldeten ausschüttungsgleichen Erträge (AgE) — der Rest des Wertzuwachses bleibt bis zum Verkauf steuerfrei." />
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            27,5% KESt nur auf gemeldete AgE (ca. 30% der Rendite)
          </p>
          <div className="space-y-3">
            <ResultRow label="Endwert (netto)" value={`€ ${fmt(meldefonds.finalValue)}`} />
            <ResultRow label="Gesamt-Steuer bezahlt" value={`€ ${fmt(meldefonds.totalTax)}`} />
            <ResultRow label="Eingezahlt" value={`€ ${fmt(meldefonds.totalContributions)}`} />
          </div>
        </div>

        <div className="bg-background p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-muted-foreground/40" />
            <h3 className="font-serif text-lg">Nicht-Meldefonds</h3>
            <InfoTooltip text="Ein Fonds der NICHT bei der OeKB gemeldet ist (umgangssprachlich: 'Schwarzfonds'). Es werden keine Steuerdaten an die österreichische Finanzbehörde gemeldet. Folge: Pauschalbesteuerung nach §186 Abs 2 Z 3 InvFG — 27,5% auf 90% des jährlichen NAV-Anstiegs plus 100% aller Ausschüttungen. Deutlich teurer als ein Meldefonds." />
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            27,5% auf 90% des NAV-Anstiegs oder mind. 10% des Jahresendwerts (§186 InvFG)
          </p>
          <div className="space-y-3">
            <ResultRow label="Endwert (netto)" value={`€ ${fmt(nonMeldefonds.finalValue)}`} />
            <ResultRow label="Gesamt-Steuer bezahlt" value={`€ ${fmt(nonMeldefonds.totalTax)}`} />
            <ResultRow label="Eingezahlt" value={`€ ${fmt(nonMeldefonds.totalContributions)}`} />
          </div>
        </div>
      </div>

      {/* Difference highlight */}
      <div className="bg-foreground text-background p-6 text-center">
        <p className="text-sm opacity-80 mb-1">Vorteil Meldefonds nach {yearsNum} Jahren</p>
        <p className="font-mono text-2xl sm:text-3xl font-medium">+ € {fmt(Math.max(0, difference))}</p>
        <p className="text-xs opacity-60 mt-2">Vereinfachte Modellrechnung — tatsächliche Ergebnisse hängen von Fondserträgen, Marktentwicklung und individueller Situation ab.</p>
      </div>

      {/* SVG Chart */}
      {yearsNum > 0 && (
        <div className="border border-border p-4 sm:p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Wachstumsverlauf (netto nach Steuern)</p>
          <GrowthChart points={chartPoints} years={yearsNum} />
        </div>
      )}
    </div>
  );
}

// Meldefonds: tax only on reported AgE each year.
// AgE is typically a fraction of total return (dividends + small part of gains reported annually).
// We approximate AgE as ~30% of the annual portfolio return — conservative estimate based on
// typical thesaurierende ETFs where reported AgE is much less than total performance.
function calculateMeldefonds(initial: number, monthly: number, annualReturn: number, years: number) {
  const monthlyReturn = annualReturn / 12;
  const ageFraction = 0.3; // fraction of annual return reported as AgE
  let portfolio = initial;
  let totalTax = 0;
  const totalContributions = initial + monthly * 12 * years;

  for (let y = 0; y < years; y++) {
    const startValue = portfolio;
    for (let m = 0; m < 12; m++) {
      portfolio += monthly;
      portfolio *= 1 + monthlyReturn;
    }
    // AgE = reported fraction of the net gain this year
    const yearGain = portfolio - startValue - monthly * 12;
    if (yearGain > 0) {
      const ageAmount = yearGain * ageFraction;
      const tax = ageAmount * 0.275;
      portfolio -= tax;
      totalTax += tax;
    }
  }

  return { finalValue: portfolio, totalTax, totalContributions };
}

// Non-Meldefonds (Schwarzfonds): pauschal taxation per §186 Abs 2 Z 3 InvFG.
// Tax = 27.5% on 90% of the NAV increase per year (plus 100% of distributions, but
// thesaurierende Fonds have no distributions so we model NAV-only).
function calculateNonMeldefonds(initial: number, monthly: number, annualReturn: number, years: number) {
  const monthlyReturn = annualReturn / 12;
  let portfolio = initial;
  let totalTax = 0;
  const totalContributions = initial + monthly * 12 * years;

  for (let y = 0; y < years; y++) {
    const startValue = portfolio;
    for (let m = 0; m < 12; m++) {
      portfolio += monthly;
      portfolio *= 1 + monthlyReturn;
    }
    // Pauschal tax per §186 Abs 2 Z 3 InvFG: greater of
    // (a) 90% of NAV increase, or (b) 10% of year-end NAV (Mindestbemessungsgrundlage)
    const navIncrease = portfolio - startValue - monthly * 12;
    const base90 = Math.max(0, navIncrease * 0.9);
    const base10 = portfolio * 0.1;
    const taxableBase = Math.max(base90, base10);
    const tax = taxableBase * 0.275;
    portfolio -= tax;
    totalTax += tax;
  }

  return { finalValue: portfolio, totalTax, totalContributions };
}

function generateChartData(initial: number, monthly: number, annualReturn: number, years: number) {
  const monthlyReturn = annualReturn / 12;
  const ageFraction = 0.3;

  let melde = initial;
  let nonMelde = initial;
  const points: { year: number; meldefonds: number; nonMeldefonds: number }[] = [
    { year: 0, meldefonds: initial, nonMeldefonds: initial },
  ];

  for (let y = 0; y < years; y++) {
    // Meldefonds
    const mStart = melde;
    for (let m = 0; m < 12; m++) {
      melde += monthly;
      melde *= 1 + monthlyReturn;
    }
    const mGain = melde - mStart - monthly * 12;
    if (mGain > 0) melde -= mGain * ageFraction * 0.275;

    // Non-Meldefonds
    const nmStart = nonMelde;
    for (let m = 0; m < 12; m++) {
      nonMelde += monthly;
      nonMelde *= 1 + monthlyReturn;
    }
    const navIncrease = nonMelde - nmStart - monthly * 12;
    const chartBase90 = Math.max(0, navIncrease * 0.9);
    const chartBase10 = nonMelde * 0.1;
    nonMelde -= Math.max(chartBase90, chartBase10) * 0.275;

    points.push({ year: y + 1, meldefonds: melde, nonMeldefonds: nonMelde });
  }

  return points;
}

function GrowthChart({
  points,
  years,
}: {
  points: { year: number; meldefonds: number; nonMeldefonds: number }[];
  years: number;
}) {
  if (points.length < 2) return null;

  const width = 600;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const allValues = points.flatMap((p) => [p.meldefonds, p.nonMeldefonds]);
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues, 0);
  const range = maxVal - minVal || 1;

  const toX = (year: number) => padding.left + (year / years) * plotW;
  const toY = (val: number) => padding.top + plotH - ((val - minVal) / range) * plotH;

  const meldePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.year)} ${toY(p.meldefonds)}`).join(" ");
  const nonMeldePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.year)} ${toY(p.nonMeldefonds)}`).join(" ");

  const fmt = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return n.toFixed(0);
  };

  // Y-axis ticks
  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => minVal + (range / tickCount) * i);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-label="Wachstumsverlauf Meldefonds vs Nicht-Meldefonds">
      {/* Y-axis labels */}
      {yTicks.map((tick, i) => (
        <g key={i}>
          <line x1={padding.left} x2={width - padding.right} y1={toY(tick)} y2={toY(tick)} stroke="currentColor" strokeOpacity={0.1} />
          <text x={padding.left - 8} y={toY(tick) + 4} textAnchor="end" className="fill-current opacity-50" fontSize="10" fontFamily="monospace">
            €{fmt(tick)}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {[0, Math.round(years / 2), years].map((y) => (
        <text key={y} x={toX(y)} y={height - 5} textAnchor="middle" className="fill-current opacity-50" fontSize="10">
          {y}J
        </text>
      ))}

      {/* Lines */}
      <path d={nonMeldePath} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="4 3" />
      <path d={meldePath} fill="none" stroke="currentColor" strokeWidth={2.5} />

      {/* Legend */}
      <line x1={padding.left} x2={padding.left + 20} y1={12} y2={12} stroke="currentColor" strokeWidth={2.5} />
      <text x={padding.left + 25} y={16} className="fill-current" fontSize="10">Meldefonds</text>
      <line x1={padding.left + 120} x2={padding.left + 140} y1={12} y2={12} stroke="currentColor" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="4 3" />
      <text x={padding.left + 145} y={16} className="fill-current opacity-60" fontSize="10">Nicht-Meldefonds</text>
    </svg>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex ml-1.5 align-middle">
      <button
        type="button"
        aria-label="Info"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="w-4 h-4 rounded-full border border-current opacity-50 hover:opacity-100 transition-opacity inline-flex items-center justify-center text-[10px] leading-none font-medium"
      >
        i
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-foreground text-background text-xs leading-relaxed border border-border shadow-lg z-50">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
}

function InputField({
  label,
  value,
  onChange,
  suffix,
  info,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  info?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
        {info && <InfoTooltip text={info} />}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-3 pr-12 py-2.5 border border-border bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-medium">{value}</span>
    </div>
  );
}
