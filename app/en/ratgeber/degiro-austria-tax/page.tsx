import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DEGIRO Austria Tax: 2025 Guide — KestKlar",
  description:
    "DEGIRO Austria no longer exists. Anyone using DEGIRO today uses DEGIRO Germany — and is not tax-simple in Austria. Step-by-step guide to filing the E1kv with official BMF sources.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/degiro-austria-tax",
    languages: { de: "https://kestklar.at/ratgeber/degiro-steuer-oesterreich" },
  },
};

export default function DegiroEnPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="DEGIRO Austria Tax: 2025 Guide"
        description="DEGIRO is not a tax-simple broker for Austria. How to correctly file your tax return via the E1kv."
        url="https://kestklar.at/en/ratgeber/degiro-austria-tax"
        datePublished="2026-05-03"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "DEGIRO Austria Tax", url: "https://kestklar.at/en/ratgeber/degiro-austria-tax" },
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
            DEGIRO · KeSt · E1kv · Austria · 9 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            DEGIRO Austria Tax: 2025 Guide
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            DEGIRO Austria has not existed since 31 January 2024 &mdash; all Austrian accounts were migrated to flatex Austria. Anyone using DEGIRO from Austria today has an account at <strong className="text-foreground">DEGIRO Germany</strong>, which makes it a <strong className="text-foreground">non-tax-simple broker</strong>. This guide explains what to enter in the E1kv and where the typical pitfalls are.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="First: DEGIRO Austria no longer exists">
            <p>
              flatexDEGIRO Bank AG terminated all Austrian DEGIRO accounts effective <strong className="text-foreground">31 January 2024</strong>. Existing customers were migrated to <strong className="text-foreground">flatex Austria</strong> &mdash; which <em>is</em> tax-simple. New DEGIRO accounts for Austrian residents have not been possible since.
            </p>
            <p>
              Anyone still trading via DEGIRO uses DEGIRO Germany (HQ Amsterdam, NL). DEGIRO Germany is <strong className="text-foreground">not a domestic depositary</strong> within the meaning of §93 EStG. So there is no automatic KeSt withholding, and you must declare all income yourself in the E1kv.
            </p>
            <p className="text-xs">
              Sources:{" "}
              <a href="https://www.broker-test.at/news/flatexdegiro-degiro-kuendigt-nun-endgueltig-alle-accounts-in-oesterreich/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">broker-test.at on the DEGIRO termination</a>{" · "}
              <a href="https://www.degiro.at/degiro-flatex" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO &times; flatex migration</a>
            </p>
          </Section>

          <Section title="Why DEGIRO requires self-declaration">
            <p>
              Under{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}
              your capital income is taxed at the special rate of <strong className="text-foreground">27.5%</strong>. Since DEGIRO is not a domestic depositary (§93 Abs 2 Z 2 EStG), no KeSt is withheld &mdash; the income must be declared via assessment.
            </p>
            <p>
              Because of the tightened{" "}
              <a href="https://www.broker-test.at/news/knaller-aufzeichnungspflicht-fuer-nicht-endbesteuertes-kapitalvermoegen-ab-2023/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                record-keeping obligation for non-final-taxed capital
              </a>{" "}
              (§126 BAO in conjunction with the AbgÄG 2022) effective from 2023, you must keep complete records of all transactions, cost bases and withholding taxes.
            </p>
          </Section>

          <Section title="Step 1: Download the annual statement">
            <p>
              DEGIRO provides an <strong className="text-foreground">Annual Statement (Jahresübersicht)</strong> for each tax year, available from late February / early March of the following year.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Open the WebTrader &rarr; <em>Inbox &rarr; Documents</em></li>
              <li>Select the tax year &rarr; download the <em>Annual Statement</em> as PDF</li>
              <li>Also useful: account statement (CSV) and transaction overview for your own calculations</li>
            </ol>
            <p className="text-xs">
              DEGIRO itself notes that the Annual Statement is <em>&ldquo;not a tax certificate&rdquo;</em> and does not constitute an Austrian Jahressteuerbescheinigung. Source:{" "}
              <a href="https://www.degiro.de/helpdesk/steuer/kann-degiro-eine-steuerbescheinigung-ausstellen" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                DEGIRO Helpdesk
              </a>
            </p>
          </Section>

          <Section title="Step 2: Compute cost basis correctly">
            <p>
              Austria requires the <strong className="text-foreground">moving average price</strong> per{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a Abs 4 Z 3 EStG
              </a>: when buying multiple lots of the same ISIN, you compute a weighted average per share, in <strong className="text-foreground">euros</strong>.
            </p>
            <p>
              Important: <strong className="text-foreground">incidental acquisition costs</strong> (order commissions, exchange fees) are <em>not</em> deductible for private investors &mdash; §27a Abs 4 Z 2 EStG with §20 Abs 2 EStG (deduction prohibition; confirmed by the Constitutional Court G&nbsp;168/2017). The P&amp;L numbers shown by DEGIRO therefore cannot be taken 1:1.
            </p>
          </Section>

          <Section title="Step 3: Convert foreign currencies">
            <p>
              Convert all amounts to EUR at the daily rate on the inflow/outflow date, not the annual average. Use the{" "}
              <a href="https://www.oenb.at/Statistik/Standardisierte-Tabellen/zinssaetze-und-wechselkurse/Wechselkurse/T-gliche-Referenzkurse-der-EZB.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                ECB reference rates (OeNB)
              </a>.
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Dividends &rarr; rate on payment day</li>
              <li>Sale proceeds &rarr; rate on trade day</li>
              <li>Acquisition costs &rarr; rate on purchase day (feeds into the moving average)</li>
            </ul>
          </Section>

          <Section title="Step 4: ETFs &mdash; reporting funds and deemed distributions">
            <p>
              For accumulating ETFs you must annually tax the <strong className="text-foreground">deemed distributions</strong> (ausschüttungsgleiche Erträge / AgE) even though no cash is paid. DEGIRO does not report them. Look them up on{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                my.oekb.at
              </a>{" "}
              by ISIN and multiply the per-unit amount by your holding count on the relevant date.
            </p>
            <p>
              <strong className="text-foreground">Watch out for non-reporting funds:</strong> If your ETF is <em>not</em> a reporting fund, the flat-rate taxation per{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 Abs 2 Z 3 InvFG 2011
              </a>{" "}
              applies: 90% of the difference between the first and last redemption price in the calendar year, but at least 10% of the year-end redemption price. Apply 27.5% &rarr; effectively at least 2.75% p.a. of fund value.
            </p>
            <p>
              See:{" "}
              <Link href="/en/ratgeber/etf-reporting-funds-check" className="text-foreground underline underline-offset-2">Reporting Funds Check</Link>{" and "}
              <Link href="/en/ratgeber/deemed-distributions" className="text-foreground underline underline-offset-2">Deemed Distributions</Link>.
            </p>
          </Section>

          <Section title="Step 5: DEGIRO-specific fees, treated correctly">
            <div className="mt-4 border border-border divide-y divide-border">
              {[
                { fee: "Order commission", desc: "On each buy/sell. Treated as acquisition/sale incidental cost. Not deductible for private investors (§27a Abs 4 Z 2 EStG)." },
                { fee: "Exchange Connectivity Fee", desc: "EUR 2.50 p.a. per non-home exchange. No link to a specific transaction &mdash; not deductible (§20 Abs 2 EStG)." },
                { fee: "Custody dividend fee", desc: "In the Custody profile a percentage fee on dividend payouts. You must declare the GROSS dividend &mdash; the fee is not deductible." },
                { fee: "Auto-FX fee", desc: "0.25% per FX conversion at settlement. Only affects the effective EUR proceeds; no separate tax deduction." },
              ].map((row) => (
                <div key={row.fee} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.fee}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Step 6: E1kv field numbers">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { kz: "KZ 863", label: "Foreign interest (27.5%)", desc: "Interest from foreign bonds, cash interest. Gross, in EUR." },
                { kz: "KZ 898", label: "Foreign distributions from investment funds", desc: "Cash dividends from distributing ETFs/funds. Gross before withholding tax." },
                { kz: "KZ 937", label: "Deemed distributions (foreign account)", desc: "AgE from accumulating reporting funds per OeKB data. Per unit &times; holding on report date." },
                { kz: "KZ 994", label: "Realised capital gains (foreign, 27.5%)", desc: "Equity/ETF sale gains computed with the moving average price." },
                { kz: "KZ 892", label: "Realised capital losses (foreign)", desc: "Sale losses. Offset against gains within the same year." },
                { kz: "KZ 409", label: "Foreign dividends on equities (27.5%)", desc: "Cash dividends on individual equities. Gross before withholding tax." },
                { kz: "KZ 998", label: "Creditable foreign withholding tax", desc: "E.g. 15% US withholding (with W-8BEN). Reduces the KeSt liability directly." },
                { kz: "KZ 937", label: "Flat-rate deemed income for non-reporting funds", desc: "For a foreign account this is still reported in the fund-income block; 90/10 rule per §186 Abs 2 Z 3 InvFG." },
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
              Field numbers may shift between yearly form versions &mdash; always verify against the official PDF:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="US dividend withholding tax">
            <p>
              With a valid <strong className="text-foreground">W-8BEN</strong>, DEGIRO withholds 15% on US dividends (otherwise 30%). Per the{" "}
              <a href="https://www.wko.at/steuern/doppelbesteuerungsabkommen-usa" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Austria-USA double tax treaty
              </a>{" "}
              the 15% is fully creditable against the Austrian KeSt (KZ 998). Effective tax burden: 15% USA + 12.5% Austria = 27.5%. Without W-8BEN: 30% USA + 0% creditable &rarr; you overpay. Verify in DEGIRO settings that the form is active.
            </p>
          </Section>

          <Section title="Loss netting">
            <p>
              DEGIRO losses can be offset against gains and ongoing income within the 27.5% bucket in the same calendar year &mdash; including across brokers (e.g. Erste Bank gains with DEGIRO losses). A <strong className="text-foreground">loss carry-forward to future years is not allowed</strong> (§27 Abs 8 Z 4 EStG).
            </p>
            <p>
              Details:{" "}
              <Link href="/en/ratgeber/austrian-loss-netting" className="text-foreground underline underline-offset-2">
                Loss Netting in Austria &rarr;
              </Link>
            </p>
          </Section>

          <Section title="Common mistakes">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Forgetting FX conversion:</strong> DEGIRO shows USD/GBP/CHF &mdash; you must convert at the ECB daily rate.</li>
              <li><strong className="text-foreground">Forgetting AgE:</strong> Accumulating ETFs require annual AgE from OeKB. DEGIRO does not report them.</li>
              <li><strong className="text-foreground">No cost-basis correction at sale:</strong> Already-taxed AgE increase the cost basis &mdash; otherwise you pay tax twice.</li>
              <li><strong className="text-foreground">Overlooking non-reporting funds:</strong> Apply the 90/10 flat-rate per §186 InvFG.</li>
              <li><strong className="text-foreground">Treating connectivity or custody fees as deductible:</strong> Not deductible.</li>
              <li><strong className="text-foreground">Forgetting withholding-tax credit:</strong> Skipping KZ 998 means 15% extra tax.</li>
              <li><strong className="text-foreground">Taking DEGIRO FIFO numbers 1:1:</strong> Austria requires the moving average price in EUR.</li>
            </ol>
          </Section>

          <Section title="Filing deadline">
            <p>
              Income tax return with E1kv: <strong className="text-foreground">30 June</strong> of the following year via FinanzOnline (30 April for paper). With a tax advisor an extended quota deadline applies. For non-final-taxed capital income there is a <strong className="text-foreground">mandatory filing requirement</strong>.
            </p>
            <p className="text-xs">
              Sources:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF deadlines</a>{" · "}
              <a href="https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/einkommensteuer/einkommensteuererklaerungspflicht.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">filing obligation</a>
            </p>
          </Section>

          <Section title="Official sources">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG 1988</a> &mdash; special rate, moving average</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG</a> &mdash; KeSt withholding only by domestic depositaries</li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011</a> &mdash; AgE and non-reporting fund flat rate</li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: capital income taxation</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Fund Info / Reporting Funds</a></li>
              <li><a href="https://www.degiro.de/helpdesk/steuer" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO Helpdesk: Tax</a></li>
              <li><a href="https://www.degiro.at/degiro-flatex" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO &times; flatex migration Austria</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Manual is hard. KestKlar automates it.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar reads your DEGIRO Annual Statement, converts every currency to EUR at the ECB rate, computes the moving average, fetches OeKB data for your ETFs, detects non-reporting funds, and delivers ready-to-use E1kv field values with withholding-tax credit.
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
          <Link href="/en/ratgeber/scalable-capital-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">Scalable Capital Austria Tax &rarr;</Link>
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
