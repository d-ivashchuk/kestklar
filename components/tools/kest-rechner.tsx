"use client";

import { useState } from "react";

export function KestRechner() {
  const [dividends, setDividends] = useState("");
  const [gains, setGains] = useState("");
  const [losses, setLosses] = useState("");
  const [age, setAge] = useState("");
  const [foreignTax, setForeignTax] = useState("");

  const dividendsNum = parseFloat(dividends) || 0;
  const gainsNum = parseFloat(gains) || 0;
  const lossesNum = parseFloat(losses) || 0;
  const ageNum = parseFloat(age) || 0;
  const foreignTaxNum = parseFloat(foreignTax) || 0;

  // Loss netting per §27 Abs 8 EStG:
  // Realised losses can offset: realised gains, dividends, and AgE (all in same bucket "Einkünfte aus Kapitalvermögen")
  // Losses cannot create a negative result (no carry-forward for private investors)
  const grossIncome = gainsNum + dividendsNum + ageNum;
  const taxableBase = Math.max(0, grossIncome - lossesNum);

  // KESt at 27.5%
  const kestGross = taxableBase * 0.275;

  // Foreign tax credit: capped at the lower of (a) actual foreign tax paid,
  // (b) 15% of the gross dividends (standard DBA treaty rate), and (c) the Austrian KESt on those dividends
  const treatyCap = dividendsNum * 0.15;
  const austrianTaxOnDividends = Math.min(dividendsNum, taxableBase) * 0.275;
  const foreignCredit = Math.min(foreignTaxNum, treatyCap, austrianTaxOnDividends, kestGross);

  // Net KESt due
  const netKest = Math.max(0, kestGross - foreignCredit);

  // Effective rate on gross income (before losses)
  const effectiveRate = grossIncome > 0 ? (netKest / grossIncome) * 100 : 0;

  const fmt = (n: number) =>
    n.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <h2 className="font-serif text-xl text-foreground mb-4">Eingaben</h2>

        <InputField
          label="Dividenden erhalten"
          value={dividends}
          onChange={setDividends}
          placeholder="z.B. 1200"
          info="Brutto-Dividenden die du im Kalenderjahr erhalten hast, vor Abzug von Quellensteuer. Findest du im Jahresbericht deines Brokers unter 'Dividends' oder 'Erträge'."
        />
        <InputField
          label="Realisierte Kursgewinne"
          value={gains}
          onChange={setGains}
          placeholder="z.B. 3000"
          info="Gewinne aus dem Verkauf von Wertpapieren (Aktien, ETFs, Anleihen). Berechnet als Verkaufspreis minus Anschaffungskosten (gleitender Durchschnittspreis). Nur realisierte Gewinne zählen — unrealisierte Buchgewinne sind nicht steuerpflichtig."
        />
        <InputField
          label="Realisierte Kursverluste"
          value={losses}
          onChange={setLosses}
          placeholder="z.B. 500"
          info="Verluste aus dem Verkauf von Wertpapieren im selben Kalenderjahr. Diese werden automatisch mit Gewinnen, Dividenden und AgE verrechnet (Verlustausgleich nach §27 Abs 8 EStG). Kein Verlustvortrag in Folgejahre möglich."
        />
        <InputField
          label="Ausschüttungsgleiche Erträge (AgE)"
          value={age}
          onChange={setAge}
          placeholder="z.B. 200"
          info="Jährlich von der OeKB gemeldete Erträge thesaurierender (Meldefonds-)ETFs, die nicht ausgeschüttet werden aber trotzdem steuerpflichtig sind. Du findest die Beträge auf my.oekb.at unter deiner ISIN. Betrifft nur ETFs die als Meldefonds registriert sind."
        />
        <InputField
          label="Ausländische Quellensteuer bezahlt"
          value={foreignTax}
          onChange={setForeignTax}
          placeholder="z.B. 180"
          info="Im Ausland einbehaltene Quellensteuer auf Dividenden (z.B. 15% US-Quellensteuer bei W-8BEN). Kann bis zum DBA-Höchstsatz (meist 15%) auf die österreichische KESt angerechnet werden. Findest du im Broker-Report unter 'Withholding Tax'."
        />
      </div>

      {/* Results */}
      <div className="bg-foreground text-background p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl mb-6">Ergebnis</h2>

        <ResultRow
          label="Steuerbemessungsgrundlage"
          value={`€ ${fmt(taxableBase)}`}
          info="Deine steuerpflichtigen Kapitalerträge nach Verlustausgleich. Berechnet als: (Dividenden + Kursgewinne + AgE) minus Kursverluste."
        />
        <ResultRow
          label="KESt brutto (27,5%)"
          value={`€ ${fmt(kestGross)}`}
          info="Die österreichische Kapitalertragsteuer: pauschal 27,5% auf alle Einkünfte aus Kapitalvermögen (§27a EStG)."
        />
        <ResultRow
          label="Quellensteuer-Anrechnung"
          value={`− € ${fmt(foreignCredit)}`}
          info="Anrechenbare ausländische Quellensteuer, gedeckelt mit dem DBA-Höchstsatz (15% der Brutto-Dividenden) und der österreichischen Steuer auf diese Dividenden."
        />
        <div className="border-t border-background/20 pt-4 mt-4">
          <ResultRow label="KESt netto fällig" value={`€ ${fmt(netKest)}`} highlight />
        </div>
        <ResultRow
          label="Effektiver Steuersatz"
          value={`${fmt(effectiveRate)} %`}
          info="Tatsächliche Steuerbelastung bezogen auf deine gesamten Brutto-Kapitalerträge (vor Verlusten). Kann unter 27,5% liegen durch Verlustausgleich oder Quellensteuer-Anrechnung."
        />

        <div className="mt-6 pt-4 border-t border-background/20 text-xs opacity-70 space-y-1">
          <p>Verlustausgleich nach §27 Abs 8 EStG angewandt.</p>
          <p>Quellensteuer-Anrechnung gedeckelt mit DBA-Höchstsatz (15%).</p>
          <p>Vereinfachte Berechnung — keine Steuerberatung.</p>
        </div>
      </div>
    </div>
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
  placeholder,
  info,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  info?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
        {info && <InfoTooltip text={info} />}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-2.5 border border-border bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-foreground placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
  info,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  info?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className={`text-sm ${highlight ? "font-medium" : "opacity-80"}`}>
        {label}
        {info && <InfoTooltip text={info} />}
      </span>
      <span className={`font-mono text-sm ${highlight ? "text-lg font-medium" : ""}`}>{value}</span>
    </div>
  );
}
