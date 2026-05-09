import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Fill in the E1kv: Step-by-Step Guide for Investors – KestKlar",
  description:
    "Step-by-step guide to the E1kv supplementary form for capital income in Austria. Field numbers for dividends, capital gains, ETF income, and losses in FinanzOnline.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/e1kv-guide",
    languages: { de: "https://kestklar.at/ratgeber/e1kv-ausfuellen" },
  },
};

export default function E1kvGuidePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="How to Fill in the E1kv: Step-by-Step Guide for Investors"
        description="Step-by-step guide to the E1kv supplementary form for capital income in Austria."
        url="https://kestklar.at/en/ratgeber/e1kv-guide"
        datePublished="2025-05-01"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "E1kv Guide", url: "https://kestklar.at/en/ratgeber/e1kv-guide" },
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
            E1kv · Capital Income · FinanzOnline · 6 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            How to Fill in the E1kv: Step-by-Step Guide for Investors
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            The E1kv is the Austrian supplementary tax form for capital income that was not automatically taxed at source. If you invest through a non-tax-simple broker such as Interactive Brokers or Scalable Capital, you must file it every year. This guide explains what goes where.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="What is the E1kv and who needs it?">
            <p>
              The <strong className="text-foreground">E1kv</strong> (Beilage zur Einkommensteuererklärung für Einkünfte aus Kapitalvermögen) is a supplementary schedule to the Austrian income tax return. You need it whenever you have capital income from sources for which no Austrian capital gains tax (KeSt) was automatically withheld.
            </p>
            <p>
              This affects investors who use foreign brokers such as <strong className="text-foreground">Interactive Brokers</strong>, <strong className="text-foreground">Scalable Capital</strong>, or <strong className="text-foreground">DEGIRO Germany</strong>. What matters is not the brand name but whether Austrian KeSt is actually withheld for your account.
            </p>
            <p>
              Note: <strong className="text-foreground">Trade Republic</strong> became tax-simple (steuereinfach) in Austria on 24 April 2025. For the tax year 2024 and the period before April 2025, you still need to file an E1kv.
            </p>
          </Section>

          <Section title="Where to find the E1kv in FinanzOnline">
            <p>
              Log in to <strong className="text-foreground">FinanzOnline</strong> (finanzonline.bmf.gv.at). Navigate to <em>Eingaben → Erklärungen → Einkommensteuererklärung E1</em>. Within the form, find the section <em>"außerbetriebliche Einkunftsarten"</em> and look for <em>"Einkünfte aus Kapitalvermögen — Beilage E1kv"</em>.
            </p>
            <p>
              The current official form can be found directly at the BMF:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                E1kv 2024 (BMF PDF)
              </a>. Field numbers can change from year to year — always verify against the current version.
            </p>
          </Section>

          <Section title="The most important field numbers (Kennzahlen) for 2024">
            <p>
              The fields are grouped by type of income. Below are the most relevant ones for private investors with a foreign brokerage account. Since numbers can change annually, we link to the official BMF form as the authoritative reference.
            </p>

            <div className="mt-4 border border-border divide-y divide-border">
              {[
                {
                  kz: "KZ 937",
                  label: "Deemed distributions — foreign custody account",
                  desc: "Annually taxable income from accumulating ETFs (reporting funds) held in a foreign account. Data comes from the ÖEKB (Österreichische Kontrollbank).",
                },
                {
                  kz: "KZ 936",
                  label: "Deemed distributions — domestic custody account",
                  desc: "Same as 937, but for ETF units held with an Austrian depository bank.",
                },
                {
                  kz: "KZ 863",
                  label: "Foreign dividends / ongoing income",
                  desc: "Recurring capital income taxed at the 27.5% special rate. Fund distributions are reported separately in KZ 898.",
                },
                {
                  kz: "KZ 898",
                  label: "Foreign distributions from investment funds",
                  desc: "Actual distributions from funds/ETFs held in a foreign custody account.",
                },
                {
                  kz: "KZ 994",
                  label: "Realised capital gains",
                  desc: "Profits from selling equities, ETFs, or bonds. Cost basis is determined using the weighted average price method (gleitender Durchschnittspreis).",
                },
                {
                  kz: "KZ 892",
                  label: "Realised losses",
                  desc: "Foreign losses from securities sales. Offset against gains (loss netting). No carryforward to future tax years is possible.",
                },
                {
                  kz: "KZ 998",
                  label: "Creditable foreign withholding tax",
                  desc: "Withholding tax deducted abroad (e.g. US withholding tax of 15%) that is credited against the Austrian KeSt of 27.5%.",
                },
              ].map((row) => (
                <div key={row.kz} className="p-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs font-mono font-medium text-foreground">{row.kz}</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">{row.label}</p>
                  </div>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Source: <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">BMF Form E1kv 2024</a>
            </p>
          </Section>

          <Section title="Step by step: what to prepare before you start">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Download the annual statement or tax report</strong> from each of your brokers (PDF or CSV).</li>
              <li>For accumulating ETFs: search <strong className="text-foreground">my.oekb.at</strong> by ISIN and note the deemed distribution per unit for the tax year.</li>
              <li>Calculate capital gains using the <strong className="text-foreground">weighted average price method</strong> (gleitender Durchschnittspreis): Austria uses the weighted average of all purchase prices of the same position for securities acquired from 1 April 2012 onwards.</li>
              <li>Perform <strong className="text-foreground">loss netting</strong>: sum all gains and losses across all non-tax-simple brokers and deduct losses from gains. Carryforward to future years is not possible.</li>
              <li>Extract the creditable withholding tax from your broker report.</li>
              <li>Enter all amounts into the corresponding E1kv fields in FinanzOnline.</li>
            </ol>
          </Section>

          <Section title="The most common mistake: forgetting deemed distributions">
            <p>
              Many investors forget to report the annual deemed distributions from their accumulating ETFs. These do not appear in the broker report because no money is paid out — the ETF reinvests the income internally. Nevertheless, they are taxable in Austria every year.
            </p>
            <p>
              The data comes exclusively from the ÖEKB (my.oekb.at), not from your broker. Manually looking up each fund, applying the correct exchange rate on the reference date, and multiplying by your holding count makes this the most time-consuming part of the filing.
            </p>
          </Section>

          <Section title="Filing deadline">
            <p>
              The income tax return including the E1kv must be submitted by <strong className="text-foreground">30 April</strong> (paper) or <strong className="text-foreground">30 June</strong> (electronically via FinanzOnline) of the following year. Taxpayers who engage a tax advisor typically receive an extension until 31 March of the year after that.
            </p>
            <p>
              Source: <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — Filing Deadlines</a>
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar automates exactly this</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar reads your broker PDFs automatically, fetches the ÖEKB data for your ETFs, calculates loss netting, and delivers the ready-to-use E1kv field values — in under 10 minutes.
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
          <Link href="/en/ratgeber/deemed-distributions" className="block text-sm text-foreground hover:underline underline-offset-2">
            Deemed Distributions: What They Are and How to Report Them →
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
