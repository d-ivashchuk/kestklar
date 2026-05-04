import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "ETF Reporting Funds Check: OeKB Guide for Austria — KestKlar",
  description:
    "How to check whether your ETF is an Austrian reporting fund and where to find tax data on my.oekb.at. With the §186 InvFG flat-rate formula for non-reporting funds and all deadlines.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/etf-reporting-funds-check",
    languages: { de: "https://kestklar.at/ratgeber/etf-meldefonds-pruefen" },
  },
};

export default function ReportingFundsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="ETF Reporting Funds Check: OeKB Guide for Austria"
        description="Check reporting-fund status, flat-rate taxation of non-reporting funds, and walkthrough of the OeKB portal."
        url="https://kestklar.at/en/ratgeber/etf-reporting-funds-check"
        datePublished="2026-05-03"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "ETF Reporting Funds Check", url: "https://kestklar.at/en/ratgeber/etf-reporting-funds-check" },
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
            Reporting Funds · OeKB · §186 InvFG · 9 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            ETF Reporting Funds Check: OeKB Guide for Austria
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            If your ETF is a <strong className="text-foreground">reporting fund</strong>, the favourable regular taxation regime applies. If not, <strong className="text-foreground">flat-rate taxation</strong> kicks in &mdash; with an effective minimum tax of 2.75% p.a. of fund value. This guide shows how to check the status on my.oekb.at and which data you need for the E1kv.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="What is a reporting fund?">
            <p>
              A <strong className="text-foreground">reporting fund</strong> is an investment fund whose tax representative publishes the relevant tax data through the <strong className="text-foreground">Oesterreichische Kontrollbank (OeKB)</strong>, the statutory reporting body, within the legal deadline &mdash; legal basis{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 Abs 2 Z 2 InvFG 2011
              </a>{" "}
              in conjunction with the{" "}
              <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009222" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Fund Reporting Regulation 2015 (BGBl II 167/2015)
              </a>.
            </p>
            <p>
              If no reporting takes place, the fund is treated as a <strong className="text-foreground">non-reporting fund</strong> (colloquially &ldquo;black fund&rdquo;) and is subject to flat-rate taxation under §186 Abs 2 Z 3 InvFG.
            </p>
            <p>
              Authoritative administrative interpretation:{" "}
              <a href="https://findok.bmf.gv.at/findok/volltext(suche:Standardsuche)?dokumentId=b85f1a99-5c1f-488b-b94a-5ac662824f68" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Investment Fund Guidelines (InvFR) 2018, ref. BMF-010200/0019-IV/1/2018
              </a>.
            </p>
          </Section>

          <Section title="Reporting vs non-reporting fund — direct comparison">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { feature: "Data reporting", reporting: "Tax representative reports AgE, withholding taxes, cost-basis adjustment to OeKB", non: "No timely reporting" },
                { feature: "Tax basis", reporting: "Actual deemed distributions and distributions", non: "Flat rate: 90% of price difference / min. 10% of redemption price" },
                { feature: "Tax rate", reporting: "27.5% on actual amounts", non: "27.5% on flat-rate basis" },
                { feature: "Cost-basis adjustment", reporting: "Yes, annually after each report", non: "Only with self-evidence" },
                { feature: "Loss netting", reporting: "Losses netting-eligible (§27 Abs 8 EStG)", non: "Flat-rate basis cannot generate losses" },
              ].map((row) => (
                <div key={row.feature} className="p-4 grid grid-cols-12 gap-3">
                  <p className="col-span-3 text-xs font-mono font-medium text-foreground">{row.feature}</p>
                  <p className="col-span-5 text-xs text-muted-foreground">{row.reporting}</p>
                  <p className="col-span-4 text-xs text-muted-foreground">{row.non}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Non-reporting fund flat-rate taxation — exact formula">
            <p>
              §186 Abs 2 Z 3 InvFG 2011 (in substance): if no report is filed, deemed distributions are estimated at <strong className="text-foreground">90% of the difference</strong> between the first and last redemption price set in the calendar year, <strong className="text-foreground">but at least 10% of the redemption price set at year-end</strong>.
            </p>
            <p>
              Inflow date for the flat-rate values: <strong className="text-foreground">31 December</strong> of the calendar year.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Example:</p>
              <p className="text-xs text-muted-foreground">
                Redemption price 1 Jan: 100 EUR · Redemption price 31 Dec: 110 EUR<br/>
                Difference: 10 EUR · 90% thereof: 9 EUR<br/>
                Minimum basis: 10% &times; 110 = 11 EUR<br/>
                Tax basis = max(9 ; 11) = <strong className="text-foreground">11 EUR per unit</strong><br/>
                Income tax: 11 &times; 27.5% = <strong className="text-foreground">3.025 EUR per unit per year</strong>
              </p>
            </div>
            <p>
              <strong className="text-foreground">Self-evidence:</strong> Investors can prove the actual AgE amount with supporting documentation (§186 Abs 2 Z 3 last sentence InvFG). The Supreme Administrative Court (VwGH 16 Nov 2023, Ra 2021/15/0085) set strict requirements: the calculation, actual distributions and AgE derivation must be fully traceable. Source:{" "}
              <a href="https://lesen.lexisnexis.at/news/vwgh-anforderungen-an-einen-selbstnachweis-nach-186-abs-2-z-3-in/o_stz/aktuelles/2024/23/lnat_news_035511.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                LexisNexis on the VwGH ruling
              </a>
            </p>
          </Section>

          <Section title="Step by step: check reporting-fund status on my.oekb.at">
            <p>
              Since December 2020 OeKB operates the <strong className="text-foreground">my.oekb.at</strong> portal (the predecessor profitweb.at has been retired). Access is free for private investors and does not require registration.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Open:{" "}
                <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  my.oekb.at &mdash; Fund Info / Tax Data
                </a>
              </li>
              <li>Search by <strong className="text-foreground">ISIN</strong> or fund name.</li>
              <li>If your ETF is in the list &rarr; <strong className="text-foreground">reporting fund</strong>. If not in the list &rarr; <strong className="text-foreground">black fund</strong>, flat-rate taxation applies.</li>
              <li>Click the fund &rarr; open the <em>&ldquo;Tax Data&rdquo;</em> / &ldquo;KESt reports&rdquo; tab.</li>
              <li>Per business year you'll see, among others: distribution, deemed distribution, creditable withholding tax, cost-basis adjustment, report date.</li>
            </ol>
            <p className="text-xs">
              For the OeKB data fields in detail:{" "}
              <a href="https://www.oekb.at/dam/jcr:5a83a4b7-c695-45ab-ad87-2de5b811a580/Anhang_Feldliste_Steuerdaten_Fonds_(gesamt)_2023-02-13.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB tax-data field list (PDF)
              </a>
            </p>
          </Section>

          <Section title="Business year-end vs calendar year — the underrated distinction">
            <p>
              <strong className="text-foreground">For reporting funds (accumulating):</strong> the tax-relevant inflow date for AgE is the day on which the depositary remits the KeSt &mdash; at the latest <strong className="text-foreground">4 months after the fund's business year-end</strong>. That is not 31 December! Many ETFs have business year-ends mid-year: 30 Jun, 30 Sep (iShares), 31 Dec (Xtrackers / Lux), 28/29 Feb.
            </p>
            <p>
              <strong className="text-foreground">For non-reporting funds (flat-rate):</strong> the inflow date is <strong className="text-foreground">31 December</strong> of the calendar year &mdash; because the formula keys off calendar-year redemption prices.
            </p>
          </Section>

          <Section title="Reporting deadlines for tax representatives">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Domestic funds:</strong> deemed-distribution report within <strong className="text-foreground">5 months</strong> of business year-end.</li>
              <li><strong className="text-foreground">Foreign funds</strong> (typical retail ETFs from IE/LU): within <strong className="text-foreground">7 months</strong> of business year-end.</li>
              <li><strong className="text-foreground">(Interim) distributions and KeSt payments by domestic funds:</strong> at the latest 1 day before payment date.</li>
            </ul>
            <p className="text-xs">
              Source: §5 Fund Reporting Regulation 2015 in conjunction with §186 InvFG 2011.{" "}
              <a href="https://www.oekb.at/kapitalmarkt-services/meldungen-und-hinterlegungen-von-dokumenten/meldungen-zu-investmentfonds/meldungen-von-steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB &mdash; Tax Data Reports
              </a>
            </p>
          </Section>

          <Section title="Cost-basis adjustment: how double taxation is prevented">
            <p>
              For accumulating reporting funds you pay tax on AgE every year without receiving any cash. To avoid taxing the same income again on the eventual sale, the OeKB report <strong className="text-foreground">increases</strong> the tax cost basis per unit by the AgE.
            </p>
            <p>
              Subsequent KeSt payouts (of already-taxed AgE) <strong className="text-foreground">decrease</strong> the adjusted cost basis again. On sale, the proceeds minus adjusted cost basis are taxed &mdash; clean end result without double taxation.
            </p>
            <p>
              At tax-simple Austrian brokers this happens automatically. At foreign accounts you must compile the adjusted cost basis from OeKB data yourself.
            </p>
          </Section>

          <Section title="Correction reports and self-evidence reports">
            <p>
              OeKB distinguishes three report types:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Initial report</strong> &mdash; regular report within the 5/7-month deadline.</li>
              <li><strong className="text-foreground">Correction report</strong> &mdash; correction of an initial report before the correction window closes.</li>
              <li><strong className="text-foreground">Self-evidence report</strong> &mdash; after the deadline; published on the portal as self-evidence.</li>
            </ul>
            <p>
              At tax-simple banks a correction usually triggers an automatic re-calculation. At a foreign account you enter the corrected values in the next E1kv or apply for a reopening under §303 BAO.
            </p>
          </Section>

          <Section title="Four investor scenarios">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { case: "Reporting fund + tax-simple broker", action: "Bank withholds KeSt automatically; cost basis adjusted automatically. No mandatory E1kv entry." },
                { case: "Reporting fund + foreign account (IBKR, Scalable, DEGIRO)", action: "Manual entry: distributions KZ 898, AgE KZ 937, track cost-basis increase yourself for sale (KZ 994)." },
                { case: "Non-reporting fund + tax-simple broker", action: "Bank applies the 90/10 flat rate automatically on 31 Dec. Self-evidence is possible to switch to actual values." },
                { case: "Non-reporting fund + foreign account", action: "Compute flat rate yourself (90/10 rule) and report in KZ 937. Alternatively, self-evidence with full documentation." },
              ].map((row) => (
                <div key={row.case} className="p-4 grid grid-cols-2 gap-3">
                  <p className="text-xs font-medium text-foreground">{row.case}</p>
                  <p className="text-xs text-muted-foreground">{row.action}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Common mistakes">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Assuming &ldquo;Vanguard is always a reporting fund&rdquo;:</strong> Wrong &mdash; not every Vanguard tranche is reported in Austria. Always check by ISIN on my.oekb.at.</li>
              <li><strong className="text-foreground">Confusing business year with calendar year:</strong> For reporting funds, business year-end + 4 months is what counts, not 31 Dec.</li>
              <li><strong className="text-foreground">Forgetting cost-basis adjustment:</strong> Already-taxed AgE must increase the cost basis, otherwise you pay tax twice on sale.</li>
              <li><strong className="text-foreground">Still using profitweb.at:</strong> The portal was retired in December 2020. Use my.oekb.at.</li>
              <li><strong className="text-foreground">Underestimating the black-fund flat rate:</strong> 10% of redemption price &times; 27.5% = 2.75% minimum tax per year &mdash; even when the fund makes a loss.</li>
              <li><strong className="text-foreground">Ignoring creditable withholding tax in OeKB data:</strong> For reporting funds it is shown explicitly and belongs in KZ 998.</li>
            </ol>
          </Section>

          <Section title="Official sources">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007389&Paragraf=186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011 (RIS, current)</a></li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011 (JUSLINE)</a></li>
              <li><a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009222" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Fund Reporting Regulation 2015</a></li>
              <li><a href="https://findok.bmf.gv.at/findok/volltext(suche:Standardsuche)?dokumentId=b85f1a99-5c1f-488b-b94a-5ac662824f68" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">InvFR 2018 (BMF Findok)</a></li>
              <li><a href="https://www.oekb.at/kapitalmarkt-services/unser-datenangebot/fonds/steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB tax data &mdash; overview</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">my.oekb.at &mdash; Fund Info portal</a></li>
              <li><a href="https://www.oekb.at/kapitalmarkt-services/meldungen-und-hinterlegungen-von-dokumenten/meldungen-zu-investmentfonds/meldungen-von-steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB &mdash; tax data reporting (process)</a></li>
              <li><a href="https://www.oekb.at/dam/jcr:ce16295f-10e1-49a8-a66e-8477dd227a6f/OeKB-Steuerdaten-Meldeformat_2024-10-07.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB reporting format 2024-10-07 (PDF)</a></li>
              <li><a href="https://www.oekb.at/dam/jcr:0ac4175d-b596-4738-b7bb-3532607300cd/OeKB-Steuerdaten-Ertragsteuerliche-Behandlung-2016-12.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB income-tax treatment (PDF)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG (27.5% special rate)</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar checks all your ETFs automatically.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              From your broker statement KestKlar extracts every ISIN, checks it against the OeKB reporting-fund list, fetches AgE data per business year and adjusts the cost basis. Black funds are detected and the 90/10 rule is applied automatically.
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
          <Link href="/en/ratgeber/deemed-distributions" className="block text-sm text-foreground hover:underline underline-offset-2">Deemed Distributions: What They Are &rarr;</Link>
          <Link href="/en/ratgeber/e1kv-guide" className="block text-sm text-foreground hover:underline underline-offset-2">E1kv Step-by-Step Guide &rarr;</Link>
          <Link href="/en/ratgeber/interactive-brokers-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">Interactive Brokers Austria Tax &rarr;</Link>
          <Link href="/en/ratgeber/austrian-loss-netting" className="block text-sm text-foreground hover:underline underline-offset-2">Loss Netting in Austria &rarr;</Link>
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
