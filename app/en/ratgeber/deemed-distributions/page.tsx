import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Deemed Distributions from ETFs: Austrian Tax Explained – KestKlar",
  description:
    "What are deemed distributions (ausschüttungsgleiche Erträge) from ETFs? How to calculate them for the Austrian tax return. ÖEKB, reporting funds, and E1kv field KZ 937 explained.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/deemed-distributions",
    languages: { de: "https://kestklar.at/ratgeber/ausschuettungsgleiche-ertraege" },
  },
};

export default function DeemedDistributionsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Deemed Distributions from ETFs: Austrian Tax Explained"
        description="What are deemed distributions from ETFs? How to calculate them for the Austrian tax return."
        url="https://kestklar.at/en/ratgeber/deemed-distributions"
        datePublished="2025-05-01"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "Deemed Distributions", url: "https://kestklar.at/en/ratgeber/deemed-distributions" },
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
            ETF · ÖEKB · Accumulating · 7 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Deemed Distributions: What They Are and How to Report Them
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Accumulating ETFs pay no dividends — but in Austria you still owe tax on their internal income every single year. What is behind this rule, how are the amounts determined, and what does the ÖEKB have to do with it?
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="The basic principle">
            <p>
              An accumulating ETF automatically reinvests its income — dividends from the underlying equities, interest from bonds — back into the fund. You receive no cash payout, but the value of your units increases.
            </p>
            <p>
              Under Austrian law, these internally reinvested earnings are nevertheless taxable in the year they arise within the fund. They are called <strong className="text-foreground">ausschüttungsgleiche Erträge</strong> (deemed distributions). The tax rate is 27.5% KeSt — the same as on actual distributions.
            </p>
            <p>
              In practice: you pay tax every year on income you have never seen in your account.
            </p>
          </Section>

          <Section title="What is a reporting fund (Meldefonds)?">
            <p>
              Not all ETFs provide the necessary tax data. A <strong className="text-foreground">reporting fund</strong> (Meldefonds) is a fund that reports its taxable income annually to the <strong className="text-foreground">ÖEKB</strong> (Österreichische Kontrollbank). This data is published on the portal <strong className="text-foreground">my.oekb.at</strong> for every registered fund.
            </p>
            <p>
              The vast majority of large ETFs — MSCI World (IWDA), FTSE All-World (VWCE), S&P 500 (CSPX) — are reporting funds. You can verify any fund by searching its ISIN on my.oekb.at.
            </p>
            <p>
              If a fund is <strong className="text-foreground">not</strong> a reporting fund, the taxable income defaults to 90% of the price appreciation — typically much less favourable. Austrian investors should avoid non-reporting funds.
            </p>
          </Section>

          <Section title="How the taxable amount is calculated">
            <p>
              The ÖEKB publishes a per-unit amount in euros (or fund currency) for each reporting fund. To calculate your own tax you need:
            </p>
            <ol className="list-decimal pl-4 space-y-2 mt-3">
              <li>The ÖEKB per-unit amount for the relevant tax year (search by ISIN on my.oekb.at)</li>
              <li>The number of units you held on the <strong className="text-foreground">ÖEKB reference date</strong> (not at year-end — each fund has its own date)</li>
              <li>The ECB exchange rate on that reference date, if the fund is denominated in USD or GBP</li>
            </ol>
            <p className="mt-3">
              Formula: <strong className="text-foreground">Deemed distribution = ÖEKB amount per unit × number of units × exchange rate</strong>
            </p>
            <p>
              The result goes into <strong className="text-foreground">field KZ 937</strong> (foreign custody account) or <strong className="text-foreground">KZ 936</strong> (Austrian custody account) of the E1kv. 27.5% KeSt is applied to this amount. Source: <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024</a>.
            </p>
          </Section>

          <Section title="Concrete examples">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                {
                  name: "Vanguard FTSE All-World (VWCE)",
                  isin: "IE00BK5BQT80",
                  note: "Accumulating. Reporting fund. ÖEKB publishes annual deemed distributions per unit.",
                },
                {
                  name: "iShares Core MSCI World (IWDA)",
                  isin: "IE00B4L5Y983",
                  note: "Accumulating. Reporting fund. One of the most widely held ETFs among Austrian investors.",
                },
                {
                  name: "Xtrackers MSCI World Swap (XMEX)",
                  isin: "LU0274208692",
                  note: "Accumulating, swap-based. Swap ETFs can also be reporting funds — verify by ISIN on my.oekb.at.",
                },
              ].map((fund) => (
                <div key={fund.isin} className="p-4">
                  <p className="text-xs font-medium text-foreground">{fund.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{fund.isin}</p>
                  <p className="text-xs text-muted-foreground mt-1">{fund.note}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Why this is tedious">
            <p>
              Each fund has a different reference date. For each ETF you need the correct ECB exchange rate on a different day. The ÖEKB data must be downloaded and processed manually. Investors who hold multiple ETFs across several accounts can easily spend a few hours on this alone.
            </p>
            <p>
              Tax-simple brokers (e.g. Austrian banks) handle this automatically. With foreign accounts such as Interactive Brokers, Scalable Capital, or DEGIRO Germany, the responsibility falls on you.
            </p>
          </Section>

          <Section title="What about distributing ETFs?">
            <p>
              Distributing ETFs pay income directly to investors. Those payouts are immediately taxable; for a foreign custody account, actual fund distributions are typically reported in KZ 898. Deemed distributions can still arise alongside distributions — a portion of the fund's income is reported annually through the ÖEKB even when some income is paid out.
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">ÖEKB data fetched automatically</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar retrieves the ÖEKB fund data for all your ETFs automatically — correct reference date, correct exchange rate, correct calculation. You just enter the result in field KZ 937.
            </p>
            <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
              Join the waitlist for free →
            </Link>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">More guides</p>
        <div className="space-y-2">
          <Link href="/en/ratgeber/e1kv-guide" className="block text-sm text-foreground hover:underline underline-offset-2">
            How to Fill in the E1kv: Step-by-Step Guide →
          </Link>
          <Link href="/en/ratgeber/how-to-calculate-kest" className="block text-sm text-foreground hover:underline underline-offset-2">
            How to Calculate KeSt with Non-Tax-Simple Brokers →
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
