import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Interactive Brokers Austria Tax: Complete Guide — KestKlar",
  description:
    "Step-by-step: how to file taxes for your Interactive Brokers account in Austria. Read the Activity Statement, calculate KeSt, fill in the E1kv. With official BMF sources.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/interactive-brokers-austria-tax",
    languages: { de: "https://kestklar.at/ratgeber/interactive-brokers-steuer-oesterreich" },
  },
};

export default function IBTaxEnPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Interactive Brokers Austria Tax: Complete Guide"
        description="How to correctly file taxes for your Interactive Brokers account in Austria — Activity Statement, KeSt calculation, E1kv fields."
        url="https://kestklar.at/en/ratgeber/interactive-brokers-austria-tax"
        datePublished="2026-05-04"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "Interactive Brokers Austria Tax", url: "https://kestklar.at/en/ratgeber/interactive-brokers-austria-tax" },
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
            Interactive Brokers · KeSt · E1kv · Austria · 8 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Interactive Brokers Austria Tax: Complete Guide
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Interactive Brokers (IBKR) is an Irish entity and is not tax-simple in Austria. You have to calculate your capital income yourself and report it via the E1kv supplementary form. This guide walks through the full process — from the Activity Statement to the finished tax return.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Why IBKR users must self-declare">
            <p>
              Interactive Brokers is a foreign broker headquartered in Ireland. There is no Austrian custodian withholding KeSt automatically. Under{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}
              your capital income is taxed at the special rate of <strong className="text-foreground">27.5%</strong>, but in the absence of a domestic withholding agent it must be declared in the income tax return.
            </p>
            <p>
              Source:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/information-zu-einkuenften-aus-kapitalvermoegen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF &mdash; Income from Capital
              </a>: capital income for which there is no domestic depositary or paying agent must be reported in the tax return.
            </p>
          </Section>

          <Section title="Step 1: Download the Activity Statement">
            <p>
              The Activity Statement is your master document. It contains all transactions, dividends, interest, withholding taxes and FX conversions of the year.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Log into the <strong className="text-foreground">IBKR Client Portal</strong> (portal.interactivebrokers.com).</li>
              <li>Navigate to <em>Performance &amp; Reports &rarr; Statements</em>.</li>
              <li>Select <strong className="text-foreground">Activity Statement</strong>, period <strong className="text-foreground">Annual</strong>, and the relevant tax year.</li>
              <li>Format: PDF or CSV (CSV is machine-readable and easier to process).</li>
            </ol>
            <p>
              Source:{" "}
              <a href="https://www.interactivebrokers.com/en/support/tax-management-and-reporting.php" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                IBKR Tax Management &amp; Reporting
              </a>
            </p>
          </Section>

          <Section title="Step 2: What you need from the statement">
            <div className="mt-4 border border-border divide-y divide-border">
              {[
                { section: "Dividends", desc: "All dividends received (gross). Note: IBKR often shows the net amount after foreign withholding tax — you need the gross figure." },
                { section: "Withholding Tax", desc: "Foreign withholding tax retained (typically US 15% with W-8BEN). Creditable against your KeSt under the Austria-USA double tax treaty." },
                { section: "Trades (Realized P&L)", desc: "Realised gains and losses. IBKR computes FIFO — Austria requires the moving average price (§27a Abs 4 Z 3 EStG)." },
                { section: "Interest", desc: "Credit interest received and margin interest paid. Credit interest is taxable, margin interest is not deductible for private investors." },
                { section: "Corporate Actions", desc: "Stock splits, spin-offs, mergers. Can change the cost basis of your positions." },
              ].map((row) => (
                <div key={row.section} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.section}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Step 3: Cost basis (moving average price)">
            <p>
              This is where most mistakes happen. IBKR computes gains under <strong className="text-foreground">FIFO</strong> (First In, First Out). Austria requires the <strong className="text-foreground">moving average price</strong> &mdash; the weighted mean of all prior purchases of the same position.
            </p>
            <p>
              Legal basis:{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a Abs 4 Z 3 EStG 1988
              </a>: <em>&ldquo;For assets [...] with the same security identification number, when acquired in chronological succession, the moving average price in euros applies.&rdquo;</em>
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Example:</p>
              <p className="text-xs text-muted-foreground">
                Buy 1: 10 shares @ 100 EUR = 1,000 EUR<br/>
                Buy 2: 10 shares @ 120 EUR = 1,200 EUR<br/>
                Average price: (1,000 + 1,200) / 20 = <strong className="text-foreground">110 EUR per share</strong><br/>
                <br/>
                Sell: 5 shares @ 130 EUR = 650 EUR<br/>
                Gain: 650 &minus; (5 &times; 110) = <strong className="text-foreground">100 EUR taxable</strong>
              </p>
            </div>
            <p className="mt-3">
              Important: incidental acquisition costs (order commissions) are <em>not</em> deductible when capital income is taxed at the special rate (§27a Abs 4 Z 2 EStG). The Realized P&amp;L numbers shown by IBKR therefore cannot be taken 1:1.
            </p>
          </Section>

          <Section title="Step 4: Convert foreign currencies">
            <p>
              If you trade in USD, GBP or other currencies, all amounts must be converted to EUR at the <strong className="text-foreground">exchange rate on the day of inflow/outflow</strong>:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Dividends &rarr; rate on payment day</li>
              <li>Sale proceeds &rarr; rate on trade day</li>
              <li>Acquisition costs &rarr; rate on purchase day (feeds into the moving average)</li>
            </ul>
            <p>
              ECB reference rates are at{" "}
              <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                ecb.europa.eu
              </a>. The Finanzamt also accepts the IBKR rates if used consistently.
            </p>
          </Section>

          <Section title="Step 5: Deemed distributions (ETFs)">
            <p>
              If you hold accumulating ETFs at IBKR, you must tax the annual deemed distributions (ausschüttungsgleiche Erträge / AgE) separately &mdash; even though IBKR does <em>not</em> show them in the statement (no cash flow).
            </p>
            <p>
              You find the data on{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                my.oekb.at
              </a>{" "}
              &mdash; search by ISIN, take the amount per unit for the tax year and multiply by your holding on the reporting date.
            </p>
            <p>
              Legal basis:{" "}
              <a href="https://findok.bmf.gv.at/findok?fassungsNr=3&stammNr=19973" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                InvFR 2018 (BMF Investment Fund Guidelines)
              </a>. Only reporting funds (listed on OeKB) qualify for regular treatment &mdash; non-reporting funds are subject to flat-rate replacement taxation.
            </p>
          </Section>

          <Section title="Step 6: Enter the amounts in the E1kv">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { kz: "KZ 985", label: "Foreign dividends and interest", desc: "Gross dividends and credit interest from the IBKR statement, in EUR." },
                { kz: "KZ 937", label: "Deemed distributions (foreign account)", desc: "Sum of AgE for your ETFs (from OeKB), since your account is held with a foreign broker." },
                { kz: "KZ 994", label: "Realised capital gains", desc: "Total gains from sales, calculated with the moving average price in EUR." },
                { kz: "KZ 996", label: "Realised capital losses", desc: "Total losses. Offset against gains and ongoing income within the same year." },
                { kz: "KZ 998", label: "Creditable foreign withholding tax", desc: "E.g. US withholding tax (15% with valid W-8BEN). Reduces your KeSt liability." },
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
              Source:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                BMF Form E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="Loss netting">
            <p>
              Realised losses (KZ 996) are offset against gains and ongoing income within the same calendar year. If you have multiple brokers (e.g. IBKR + Scalable), you can net losses across brokers &mdash; that is exactly what the E1kv is for.
            </p>
            <p>
              <strong className="text-foreground">Important:</strong> A loss carry-forward to future years is <em>not</em> allowed for capital income (§27 Abs 8 Z 3 EStG). Unused losses simply expire on 31 December.
            </p>
          </Section>

          <Section title="US withholding tax and the double tax treaty">
            <p>
              If you receive dividends from US companies, your broker withholds 15% US tax (with a valid <strong className="text-foreground">W-8BEN form</strong>). Those 15% are credited against your Austrian KeSt.
            </p>
            <p>
              Your effective tax burden: 15% (USA) + 12.5% (Austria) = 27.5% total. Without W-8BEN: 30% USA + 0% creditable in Austria = you overpay. Check in IBKR under <em>Settings &rarr; Tax Information</em> whether your W-8BEN is active.
            </p>
            <p>
              Legal basis:{" "}
              <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Austria-USA Double Tax Treaty (BGBl. Nr. 232/1997)
              </a>
            </p>
          </Section>

          <Section title="Common mistakes by IBKR users">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">FIFO instead of moving average:</strong> The Realized P&amp;L in the IBKR statement is FIFO-based. Austria requires moving average. Numbers can differ significantly.</li>
              <li><strong className="text-foreground">Net dividends instead of gross:</strong> Some take the net figure from the statement. The E1kv requires the gross amount before foreign withholding tax.</li>
              <li><strong className="text-foreground">Forgetting deemed distributions:</strong> They are not in the IBKR statement. You have to fetch them separately from OeKB.</li>
              <li><strong className="text-foreground">Ignoring exchange rates:</strong> All amounts must be in EUR &mdash; not at year average, but at the daily rate.</li>
              <li><strong className="text-foreground">Deducting order fees:</strong> For private investors with §27a special-rate income, incidental acquisition costs are not deductible.</li>
            </ol>
          </Section>

          <Section title="Filing deadline">
            <p>
              The income tax return (incl. E1kv) is due by <strong className="text-foreground">30 June</strong> of the following year electronically via FinanzOnline (30 April for paper). With a tax advisor an extended quota deadline usually applies.
            </p>
            <p>
              Source:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF &mdash; Deadlines
              </a>
            </p>
          </Section>

          <Section title="Official sources">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/information-zu-einkuenften-aus-kapitalvermoegen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: Income from Capital</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: E1kv 2024 form (PDF)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG 1988</a></li>
              <li><a href="https://findok.bmf.gv.at/findok?fassungsNr=3&stammNr=19973" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">InvFR 2018</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB: Fund Info / Reporting Funds</a></li>
              <li><a href="https://www.interactivebrokers.com/en/support/tax-management-and-reporting.php" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">IBKR: Tax Management &amp; Reporting</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">This is a lot of work. KestKlar automates it.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar reads your IBKR Activity Statement (PDF or CSV), computes the moving average price, fetches OeKB data for your ETFs, converts every currency to EUR, and delivers the ready-to-use E1kv field values &mdash; including withholding-tax credit and loss netting.
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
          <Link href="/en/ratgeber/degiro-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">DEGIRO Austria Tax &rarr;</Link>
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
