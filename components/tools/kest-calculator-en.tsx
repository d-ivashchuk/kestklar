"use client";

import { useState } from "react";

export function KestCalculator() {
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
        <h2 className="font-serif text-xl text-foreground mb-4">Inputs</h2>

        <InputField
          label="Dividends received"
          value={dividends}
          onChange={setDividends}
          placeholder="e.g. 1200"
          info="Gross dividends received during the calendar year, before any withholding tax deduction. You can find this in your broker's annual report under 'Dividends' or 'Income'."
        />
        <InputField
          label="Realised capital gains"
          value={gains}
          onChange={setGains}
          placeholder="e.g. 3000"
          info="Gains from selling securities (stocks, ETFs, bonds). Calculated as sale price minus acquisition cost (moving average price). Only realised gains count — unrealised paper gains are not taxable."
        />
        <InputField
          label="Realised capital losses"
          value={losses}
          onChange={setLosses}
          placeholder="e.g. 500"
          info="Losses from selling securities in the same calendar year. These are automatically netted against gains, dividends, and AgE (loss netting per §27 Abs 8 EStG). No carry-forward to future years is possible."
        />
        <InputField
          label="Deemed distributions (AgE)"
          value={age}
          onChange={setAge}
          placeholder="e.g. 200"
          info="Annual deemed distributions reported by the OeKB for accumulating (Meldefonds) ETFs. These are not paid out but are still taxable. You can find the amounts on my.oekb.at under your ISIN. Only applies to ETFs registered as Meldefonds."
        />
        <InputField
          label="Foreign withholding tax paid"
          value={foreignTax}
          onChange={setForeignTax}
          placeholder="e.g. 180"
          info="Withholding tax deducted abroad on dividends (e.g. 15% US withholding tax with W-8BEN). Can be credited against Austrian KESt up to the treaty cap (usually 15%). Found in your broker report under 'Withholding Tax'."
        />
      </div>

      {/* Results */}
      <div className="bg-foreground text-background p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl mb-6">Result</h2>

        <ResultRow
          label="Taxable base"
          value={`€ ${fmt(taxableBase)}`}
          info="Your taxable capital income after loss netting. Calculated as: (Dividends + Capital Gains + AgE) minus Capital Losses."
        />
        <ResultRow
          label="KESt gross (27.5%)"
          value={`€ ${fmt(kestGross)}`}
          info="The Austrian capital gains tax: a flat 27.5% on all income from capital assets (§27a EStG)."
        />
        <ResultRow
          label="Foreign tax credit"
          value={`− € ${fmt(foreignCredit)}`}
          info="Creditable foreign withholding tax, capped at the treaty rate (15% of gross dividends) and the Austrian tax attributable to those dividends."
        />
        <div className="border-t border-background/20 pt-4 mt-4">
          <ResultRow label="Net KESt due" value={`€ ${fmt(netKest)}`} highlight />
        </div>
        <ResultRow
          label="Effective tax rate"
          value={`${fmt(effectiveRate)} %`}
          info="Actual tax burden relative to your total gross capital income (before losses). Can be below 27.5% due to loss netting or foreign tax credit."
        />

        <div className="mt-6 pt-4 border-t border-background/20 text-xs opacity-70 space-y-1">
          <p>Loss netting per §27 Abs 8 EStG applied.</p>
          <p>Foreign tax credit capped at treaty rate (15%).</p>
          <p>Simplified calculation — not tax advice.</p>
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
