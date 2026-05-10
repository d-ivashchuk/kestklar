import type { Metadata } from "next";
import { KestCalculator } from "@/components/tools/kest-calculator-en";
import { JsonLdSoftwareApplication } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "KESt Calculator Austria – Calculate Capital Gains Tax – KestKlar",
  description:
    "Free KESt calculator: compute the 27.5% Austrian capital gains tax on dividends, realised gains, and deemed distributions. With loss netting and foreign withholding tax credit per §27 EStG.",
  alternates: { canonical: "https://kestklar.at/en/tools/kest-calculator" },
};

export default function KestCalculatorPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdSoftwareApplication
        name="KESt Calculator Austria"
        url="https://kestklar.at/en/tools/kest-calculator"
        description="Free online calculator for Austrian capital gains tax (27.5%) with loss netting per §27 Abs 8 EStG and foreign withholding tax credit."
      />

      <div className="mb-10">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Free Calculator
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          KESt Calculator Austria
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Calculate your Austrian capital gains tax (27.5%) on dividends, realised gains, and
          deemed distributions (AgE) — including automatic loss netting per §27 Abs 8 EStG
          and foreign withholding tax credit.
        </p>
      </div>

      <KestCalculator />

      {/* CTA */}
      <div className="mt-16 border border-border p-6 sm:p-8 text-center">
        <p className="font-serif text-lg text-foreground mb-2">
          KestKlar calculates this automatically from your broker PDF
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Upload your annual statement — KestKlar reads all transactions and computes KESt, loss netting, and E1kv field values in minutes.
        </p>
        <a
          href="/#waitlist"
          className="inline-block text-sm font-medium bg-foreground text-background px-6 py-2.5 hover:opacity-80 transition-opacity"
        >
          Join the waitlist for free
        </a>
      </div>
    </main>
  );
}
