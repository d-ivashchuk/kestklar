import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Calculate KeSt with Interactive Brokers, Scalable Capital & Co – KestKlar",
  description:
    "Step-by-step: how to calculate Austrian capital gains tax (KeSt) with non-tax-simple brokers. Includes loss netting, foreign withholding tax credit, and E1kv field mapping.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/how-to-calculate-kest",
    languages: { de: "https://kestklar.at/ratgeber/kest-berechnen" },
  },
};

export default function HowToCalculateKestPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="How to Calculate KeSt with Interactive Brokers, Scalable Capital & Co"
        description="Step-by-step: how to calculate Austrian capital gains tax (KeSt) with non-tax-simple brokers."
        url="https://kestklar.at/en/ratgeber/how-to-calculate-kest"
        datePublished="2025-05-01"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "How to Calculate KeSt", url: "https://kestklar.at/en/ratgeber/how-to-calculate-kest" },
        ]}
      />
      <div className="mb-2">
        <Link href="/en/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Guides
        </Link>
      </div>

      <article>
        <header className="mt-6 mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            KeSt · Loss Netting · E1kv · 8 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            How to Calculate KeSt with Non-Tax-Simple Brokers
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Interactive Brokers, Scalable Capital, DEGIRO Germany — with non-withholding accounts like these, Austrian tax is not paid through the broker. You must calculate the 27.5% KeSt yourself, net your losses across all accounts, and report the result in the E1kv. Here is how it works.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Why do you have to do this yourself?">
            <p>
              Austrian banks and <strong className="text-foreground">tax-simple brokers</strong> (Erste, Raiffeisen, Flatex Austria, and Trade Republic from April 2025 onwards) generally withhold KeSt automatically and remit it directly to the tax authority. For these finally taxed amounts, an E1kv entry is usually not required.
            </p>
            <p>
              <strong className="text-foreground">Non-tax-simple brokers</strong> do not do this. What matters is whether your specific account is actually subject to Austrian KeSt withholding. If not, the broker usually only provides reports or transaction data; it is your responsibility to calculate what you owe and report it in the <strong className="text-foreground">E1kv supplementary schedule</strong> of your income tax return.
            </p>
          </Section>

          <Section title="What counts as taxable capital income?">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { type: "Dividends", detail: "All distributions from equities and distributing ETFs. Tax rate 27.5%." },
                { type: "Realised capital gains", detail: "Profit from selling securities — sale price minus cost basis (weighted average price). Tax rate 27.5%." },
                { type: "Interest income", detail: "Interest from bonds or cash balances. Tax rate 27.5% (25% for some savings deposits)." },
                { type: "Deemed distributions", detail: "Internally reinvested income of reporting funds/ETFs, reported annually via ÖEKB. Tax rate 27.5%." },
                { type: "Foreign currency gains", detail: "Exchange gains on securities denominated in foreign currencies. The transaction rate at the time of purchase is used." },
              ].map((row) => (
                <div key={row.type} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-medium text-foreground">{row.type}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Not taxable here: income you already hold in a tax-simple account — that has already been taxed at source.
            </p>
          </Section>

          <Section title="Loss netting: how it works">
            <p>
              Losses from selling securities can be offset against gains. Crucially, loss netting applies <strong className="text-foreground">across all non-tax-simple brokers</strong> — you add up all gains and losses from every account and report the net result in the E1kv.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Example</p>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span>Capital gain — Interactive Brokers</span><span className="text-foreground">+ €4,200</span></div>
                <div className="flex justify-between"><span>Capital loss — Scalable Capital</span><span className="text-red-500">− €1,100</span></div>
                <div className="flex justify-between border-t border-border pt-1 mt-1"><span className="font-medium text-foreground">Taxable base</span><span className="text-foreground">€3,100</span></div>
                <div className="flex justify-between"><span>KeSt (27.5%)</span><span className="text-foreground">€852.50</span></div>
              </div>
            </div>
            <p>
              Losses from equities can be offset against gains from ETFs and vice versa. Losses <strong className="text-foreground">cannot</strong> be carried forward to future tax years — the loss pool resets on 1 January.
            </p>
          </Section>

          <Section title="Crediting US withholding tax">
            <p>
              When you receive US dividends, the US deducts a <strong className="text-foreground">withholding tax of 15%</strong> at source (under the double taxation agreement between Austria and the US). You can credit this 15% against your Austrian KeSt of 27.5%, so you effectively pay only the difference: 27.5% − 15% = 12.5%.
            </p>
            <p>
              The creditable withholding tax goes in <strong className="text-foreground">field KZ 998</strong> of the E1kv. The exact amount is shown in your broker's annual report, usually labelled "Tax withheld" or "WHT".
            </p>
          </Section>

          <Section title="Cost basis: weighted average price method">
            <p>
              When you have bought the same equity or ETF multiple times, Austria uses the <strong className="text-foreground">weighted average price method</strong> (gleitender Durchschnittspreis): each new purchase updates the average cost of all units held in that position.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Example</p>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span>Purchase 1: 50 units VWCE at €90</span><span className="text-foreground">Avg. €90.00</span></div>
                <div className="flex justify-between"><span>Purchase 2: 50 units VWCE at €100</span><span className="text-foreground">Avg. €95.00</span></div>
                <div className="flex justify-between border-t border-border pt-1 mt-1"><span>Sell 30 units at €110</span><span className="text-foreground">Gain: 30 × (€110 − €95) = €450</span></div>
              </div>
            </div>
            <p>
              Source: <a href="https://www.bmf.gv.at/dam/jcr:6a499877-62fa-484b-ac72-3b7f1a0fdfe5/info_kest_kursgewinne.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — KeSt on Capital Gains (PDF)</a>
            </p>
          </Section>

          <Section title="Documents you need">
            <div className="mt-2 space-y-2">
              {[
                { broker: "Interactive Brokers", doc: "Annual Activity Statement (PDF or CSV, available in the Client Portal under Reports → Tax)" },
                { broker: "Scalable Capital", doc: "Austrian tax report / KPMG tax report, if available for your tax year" },
                { broker: "DEGIRO", doc: "Annual Report (PDF, under Inbox in the DEGIRO dashboard)" },
                { broker: "Trade Republic", doc: "Tax report (PDF, in the Trade Republic app under Account → Documents)" },
              ].map((row) => (
                <div key={row.broker} className="border border-border p-3">
                  <p className="text-xs font-medium text-foreground">{row.broker}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.doc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Filing deadline and consequences">
            <p>
              The income tax return including the E1kv must be submitted by <strong className="text-foreground">30 April</strong> (paper) or <strong className="text-foreground">30 June</strong> (electronically via FinanzOnline) of the following year. Taxpayers who engage a tax advisor typically receive an extension. Missing the deadline risks late-filing surcharges.
            </p>
            <p>
              The tax authority generally has no visibility into what you hold at foreign brokers. You are nonetheless legally required to report all taxable income — without being asked.
            </p>
            <p>
              Source: <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — Filing Deadlines</a>
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar handles all of this</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Upload your PDFs, let KestKlar fetch ÖEKB data automatically, calculate weighted average prices, net losses across brokers, and credit withholding tax — then get the ready-to-use E1kv fields in under 10 minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
                Join the waitlist →
              </Link>
              <Link href="/broker/interactive-brokers" className="inline-block text-xs font-medium border border-border text-foreground px-4 py-2 hover:bg-background transition-colors">
                Interactive Brokers →
              </Link>
              <Link href="/broker/scalable-capital" className="inline-block text-xs font-medium border border-border text-foreground px-4 py-2 hover:bg-background transition-colors">
                Scalable Capital →
              </Link>
            </div>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">More guides</p>
        <div className="space-y-2">
          <Link href="/en/ratgeber/e1kv-guide" className="block text-sm text-foreground hover:underline underline-offset-2">
            How to Fill in the E1kv: Step-by-Step Guide →
          </Link>
          <Link href="/en/ratgeber/deemed-distributions" className="block text-sm text-foreground hover:underline underline-offset-2">
            Deemed Distributions: What They Are and How to Report Them →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-foreground mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
