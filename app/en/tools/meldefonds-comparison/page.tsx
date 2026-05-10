import type { Metadata } from "next";
import Link from "next/link";
import { MeldefondsComparison } from "@/components/tools/meldefonds-comparison-en";
import { JsonLdSoftwareApplication } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Meldefonds vs. Non-Meldefonds Comparison – Tax Impact Calculator – KestKlar",
  description:
    "Compare reporting funds (Meldefonds) and non-reporting funds (Schwarzfonds) tax-wise: how much does flat-rate taxation per §186 InvFG cost over 10, 20, or 30 years? Free calculator.",
  alternates: { canonical: "https://kestklar.at/en/tools/meldefonds-comparison" },
};

export default function MeldefondsComparisonPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdSoftwareApplication
        name="Meldefonds vs. Non-Meldefonds Comparison"
        url="https://kestklar.at/en/tools/meldefonds-comparison"
        description="Free calculator: compare the tax impact of reporting funds (Meldefonds) and non-reporting funds (Schwarzfonds / flat-rate taxation per §186 InvFG) over your investment horizon."
      />

      <div className="mb-10">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Free Calculator
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Meldefonds vs. Non-Meldefonds Comparison
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Non-reporting funds (Schwarzfonds) are subject to flat-rate taxation: 27.5% on 90% of the
          annual NAV increase. This calculator shows how much that costs you over your investment
          horizon compared to a reporting fund (Meldefonds).
        </p>
      </div>

      <MeldefondsComparison />

      {/* CTA */}
      <div className="mt-16 border border-border p-6 sm:p-8 text-center">
        <p className="font-serif text-lg text-foreground mb-2">
          Check whether your ETF is a Meldefonds
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          In our guide we show you step by step how to check on my.oekb.at whether your
          ETF is registered as a reporting fund.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/en/ratgeber/etf-reporting-funds-check"
            className="inline-block text-sm font-medium border border-foreground text-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            Meldefonds Guide
          </Link>
          <a
            href="/#waitlist"
            className="inline-block text-sm font-medium bg-foreground text-background px-6 py-2.5 hover:opacity-80 transition-opacity"
          >
            Join the waitlist for free
          </a>
        </div>
      </div>
    </main>
  );
}
