import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Scalable Capital Austria Tax: 2025 Status — KestKlar",
  description:
    "Full banking license, depot migration away from Baader, KPMG tax report: Scalable Capital is (still) not tax-simple in Austria. Complete guide to E1kv 2024 and 2025 with all legal sources.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/scalable-capital-austria-tax",
    languages: { de: "https://kestklar.at/ratgeber/scalable-capital-steuer-oesterreich" },
  },
};

export default function ScalableEnPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Scalable Capital Austria Tax: 2025 Status"
        description="Status, tax report, depot migration, and E1kv guide for Austrian Scalable Capital users."
        url="https://kestklar.at/en/ratgeber/scalable-capital-austria-tax"
        datePublished="2026-05-03"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "Scalable Capital Austria Tax", url: "https://kestklar.at/en/ratgeber/scalable-capital-austria-tax" },
        ]}
      />
      <div className="mb-2">
        <Link href="/en/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          &larr; Guides
        </Link>
      </div>

      <article>
        <header className="mt-6 mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Scalable · KeSt · E1kv · Austria · 10 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Scalable Capital Austria Tax: 2025 Status
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Scalable Capital is <strong className="text-foreground">still not tax-simple</strong> in Austria &mdash; even after the full banking license in September&nbsp;2025 and the depot migration away from Baader Bank in December&nbsp;2025. You still have to declare via E1kv. This guide shows what to do, what changed, and what to watch out for during the depot migration.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Current status (May 2026)">
            <p>
              Scalable Capital does <strong className="text-foreground">not automatically remit Austrian KeSt</strong> for Austrian customers. It remains a non-tax-simple broker. This applies to all products: Free Broker, Prime+ Broker, Crypto ETPs and the wealth-management offering.
            </p>
            <p>
              Scalable themselves write: &ldquo;We are working on a tax-simple solution for Austria.&rdquo; No firm date exists. Source:{" "}
              <a href="https://help.scalable.capital/de-AT/steuern-de12f868/gibt-es-konkrete-pl%C3%A4ne-in-%C3%B6sterreich-ein-steuereinfache-38bb85e2" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable Help Center &mdash; Plans for Austria
              </a>
            </p>
          </Section>

          <Section title="What changed in 2025 (timeline)">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { date: "10 Sep 2025", event: "ECB grants Scalable Capital the full banking license (supervised by BaFin / Bundesbank)." },
                { date: "Q4 2025", event: "Depot migration begins: custody moves from Baader Bank AG to Scalable Capital Bank GmbH." },
                { date: "6&ndash;7 Dec 2025", event: "Actual migration weekend. All holdings transfer to the new depositary." },
                { date: "9 Dec 2025", event: "Final deadline to file the depot transfer notification via FinanzOnline (§94 Z 7 EStG, one-month rule). Otherwise: deemed disposal." },
                { date: "Mid Jan 2026", event: "Scalable Capital Bank GmbH Austrian branch registered (Wieden, 1040 Vienna)." },
                { date: "As of May 2026", event: "Despite the Austrian branch, KeSt withholding has not been activated. Self-declaration remains mandatory." },
              ].map((row) => (
                <div key={row.date} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.date}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.event}</p>
                </div>
              ))}
            </div>
            <p className="text-xs">
              Sources:{" "}
              <a href="https://de.scalable.capital/en/newsroom/scalable-is-now-a-bank" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Newsroom: full banking license</a>{" · "}
              <a href="https://help.scalable.capital/das-neue-scalable-umstellung-0bb0b7ff/muss-ich-etwas-beim-finanzamt-einreichen-ad9fcea0" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable: filings with the tax authority</a>
            </p>
          </Section>

          <Section title="Important: depot transfer and §94 Z 7 EStG">
            <p>
              The transfer from Baader Bank to Scalable Capital Bank on 6/7 December 2025 is a depot transfer between different depositaries. To prevent the tax authority from treating it as a <strong className="text-foreground">deemed disposal</strong> at 27.5%, a{" "}
              <strong className="text-foreground">depot transfer notification</strong> must be filed via FinanzOnline within one month.
            </p>
            <p>
              FinanzOnline path: <em>Sonstige Anbringen &rarr; Mitteilung zum Depotübertrag (§27 Abs 6 Z 2 EStG)</em>. Specific deadline: <strong className="text-foreground">9 January 2026</strong>. Anyone who missed it must report the market value of the holdings on the transfer day as proceeds in the 2025 E1kv (KZ&nbsp;994).
            </p>
            <p>
              Legal basis:{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27 Abs 6 Z 2 EStG
              </a>{" and "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/94" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §94 Z 7 EStG
              </a>
            </p>
          </Section>

          <Section title="The KPMG Steuerreport: what it is and isn't">
            <p>
              Since May 2022 Scalable provides a free <strong className="text-foreground">Steuerreport Österreich</strong> prepared by KPMG. It typically appears between late March and late April of the following year.
            </p>
            <p>
              <strong className="text-foreground">What it does:</strong> Figures are prepared per Austrian rules with the moving average price (§27a Abs 4 Z 3 EStG), converted to EUR, AgE-adjusted cost basis included, mapped to E1kv field numbers.
            </p>
            <p>
              <strong className="text-foreground">What it isn't:</strong> Not a Jahressteuerbescheinigung within the meaning of §96 EStG (no KeSt is withheld). It is a voluntary service without warranty. Subsequent OeKB corrections may need to be tracked manually. Source:{" "}
              <a href="https://help.scalable.capital/de-AT/steuern-de12f868/bietet-scalable-capital-einen-steuerbericht-an-e0993ae8" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable Help &mdash; Steuerbericht
              </a>
            </p>
            <p>
              <strong className="text-foreground">Caution:</strong> The German <em>Erträgnisaufstellung</em> from your account is NOT suitable for the Austrian return (FIFO instead of moving average; the Vorabpauschale concept does not exist in Austria).
            </p>
          </Section>

          <Section title="Capital income: what is taxed when">
            <p>
              Per{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}
              all capital income is taxed at the special rate of <strong className="text-foreground">27.5%</strong>. Since Scalable has no domestic withholding obligation (§93 Abs 2 Z 2 EStG), gains, dividends, interest and deemed distributions must be reported in the assessment.
            </p>
          </Section>

          <Section title="Crypto ETPs &ne; cryptocurrencies — a critical distinction">
            <p>
              Scalable offers crypto in the form of <strong className="text-foreground">ETPs</strong> (e.g. ETC Group, 21Shares, VanEck) &mdash; these are <em>securities</em>, not direct cryptocurrencies. They therefore fall under §27 Abs 3 / §27a EStG (the equity/security bucket), <strong className="text-foreground">not</strong> §27b EStG (direct crypto).
            </p>
            <p>
              In practice: gains on crypto ETPs go into the same fields as equities (KZ 994 / 892), not into the crypto field. Sources:{" "}
              <a href="https://help.scalable.capital/handeln-1541d52f/crypto-d0f5ddb9/wie-werden-crypto-etps-steuerlich-behandelt-90138dc4" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable: Crypto ETP taxation
              </a>{" · "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/steuerliche-behandlung-von-kryptowaehrungen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF: Cryptocurrencies
              </a>
            </p>
          </Section>

          <Section title="ETF savings plans: moving average across many purchases">
            <p>
              Scalable's killer feature is the free ETF savings plan. Tax-wise this means: every plan execution adds a new lot to the weighted-average price. The KPMG report computes this correctly &mdash; doing it manually with monthly executions over multiple years is practically unreasonable.
            </p>
            <p>
              For accumulating ETFs you must additionally apply{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 InvFG 2011
              </a>{" "}
              to the annual deemed distributions per the{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB data
              </a>{" "}
              and adjust the cost basis accordingly.
            </p>
          </Section>

          <Section title="E1kv 2024 and 2025: the most important field numbers">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { kz: "KZ 863", label: "Foreign dividends, interest and recurring income", desc: "Recurring capital income taxed at the 27.5% special rate, gross and converted to EUR. Fund distributions are separate in KZ 898." },
                { kz: "KZ 898", label: "Foreign distributions from investment funds", desc: "Cash distributions from funds/ETFs. Gross before withholding tax." },
                { kz: "KZ 994", label: "Realised capital gains (foreign account)", desc: "Equity, ETF, ETP sale gains computed with the moving average price." },
                { kz: "KZ 892", label: "Realised losses (foreign account)", desc: "Realised losses &mdash; offset against gains within the same year." },
                { kz: "KZ 998", label: "Creditable foreign withholding tax", desc: "E.g. 15% US withholding on dividends with W-8BEN." },
                { kz: "KZ 937", label: "Deemed distributions (foreign account)", desc: "Accumulating reporting funds per OeKB." },
                { kz: "Cost basis", label: "Investment-fund cost-basis adjustment", desc: "Not a normal income field: already-taxed AgE increase your tax cost basis and must be reflected when later calculating KZ 994." },
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
            <p className="text-xs mt-2">
              Always verify against the current year's form:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="Tax year 2025: the &ldquo;split year&rdquo; case">
            <p>
              For 2025 Scalable is non-tax-simple throughout. <em>Plus</em> the depot transfer in December 2025 makes things tricky.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">With timely FinanzOnline notification (by 9 Jan 2026):</strong> cost basis carries over to the new depot, no taxable event.</li>
              <li><strong className="text-foreground">Without timely notification:</strong> market value on the transfer day counts as proceeds &rarr; KZ 994 with a deemed gain (market value minus cost basis), 27.5% income tax due.</li>
              <li><strong className="text-foreground">If Scalable activates KeSt withholding in 2026:</strong> you'll have a year with two regimes (self-declaration for Q1, automatic for Q2&ndash;Q4). Same model as Trade Republic Austria after activation in April 2025.</li>
            </ul>
          </Section>

          <Section title="Loss netting at Scalable">
            <p>
              Without a domestic depositary, Scalable <strong className="text-foreground">cannot perform automatic loss netting</strong> per §93 Abs 6 EStG. You do it yourself via E1kv. Losses within the 27.5% bucket are netting-eligible across brokers &mdash; e.g. IBKR gains with Scalable losses.
            </p>
            <p>
              Details:{" "}
              <Link href="/en/ratgeber/austrian-loss-netting" className="text-foreground underline underline-offset-2">
                Loss Netting in Austria &rarr;
              </Link>
            </p>
          </Section>

          <Section title="Common mistakes by Scalable users">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Using the German Erträgnisaufstellung:</strong> FIFO-based with Vorabpauschale logic &mdash; not applicable in Austria. Use only the KPMG Steuerreport Austria.</li>
              <li><strong className="text-foreground">Missing the depot transfer notification:</strong> One-month deadline after the migration. Otherwise deemed disposal at 27.5%.</li>
              <li><strong className="text-foreground">Declaring crypto ETPs as crypto:</strong> They go into §27 Abs 3 (equity bucket), not §27b.</li>
              <li><strong className="text-foreground">Reporting Vorabpauschale:</strong> Does not exist in Austria. Don't carry over the German concept.</li>
              <li><strong className="text-foreground">Forgetting AgE on accumulating savings-plan ETFs:</strong> The KPMG report includes them, but anyone bypassing the report typically misses them.</li>
              <li><strong className="text-foreground">Not adjusting cost basis at sale:</strong> Risk of double taxation.</li>
            </ol>
          </Section>

          <Section title="Filing deadline">
            <p>
              Income tax return 2025: by <strong className="text-foreground">30 June 2026</strong> via FinanzOnline (30 April 2026 for paper). Quota deadline applies with a tax advisor.
            </p>
            <p className="text-xs">
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF deadlines</a>
            </p>
          </Section>

          <Section title="Official sources">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27 EStG</a> &mdash; capital income, depot transfer</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG</a> &mdash; special rate, moving average</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27b EStG</a> &mdash; cryptocurrencies (relevant for direct crypto, not ETPs)</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG</a> &mdash; KeSt withholding obligations</li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011</a> &mdash; AgE and flat-rate taxation</li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: capital income taxation</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Fund Info / Reporting Funds</a></li>
              <li><a href="https://help.scalable.capital/steuern-de12f868" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Help Center &mdash; Tax</a></li>
              <li><a href="https://at.scalable.capital/steuerleicht" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Steuerleicht landing page Austria</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar reads your Scalable report.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Even with KPMG doing the heavy lifting, you still have to combine multiple brokers, do loss netting, AgE corrections and withholding-tax credit yourself. KestKlar reads the KPMG report, combines it with other brokers and delivers ready-to-use E1kv values.
            </p>
            <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
              Join the waitlist for free &rarr;
            </Link>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">More guides</p>
        <div className="space-y-2">
          <Link href="/en/ratgeber/interactive-brokers-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">Interactive Brokers Austria Tax &rarr;</Link>
          <Link href="/en/ratgeber/degiro-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">DEGIRO Austria Tax &rarr;</Link>
          <Link href="/en/ratgeber/austrian-loss-netting" className="block text-sm text-foreground hover:underline underline-offset-2">Loss Netting in Austria &rarr;</Link>
          <Link href="/en/ratgeber/etf-reporting-funds-check" className="block text-sm text-foreground hover:underline underline-offset-2">ETF Reporting Funds Check &rarr;</Link>
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
