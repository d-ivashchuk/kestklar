import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Loss Netting in Austria: What Actually Offsets What — KestKlar",
  description:
    "Which capital losses offset which gains? Complete overview of §27 Abs 8 EStG with buckets, examples, crypto rules, and the new 2025 Tax Reporting Regulation.",
  alternates: {
    canonical: "https://kestklar.at/en/ratgeber/austrian-loss-netting",
    languages: { de: "https://kestklar.at/ratgeber/verlustausgleich-oesterreich" },
  },
};

export default function LossNettingPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Loss Netting in Austria: What Actually Offsets What"
        description="Comprehensive guide to loss netting on capital income under §27 Abs 8 EStG."
        url="https://kestklar.at/en/ratgeber/austrian-loss-netting"
        datePublished="2026-05-03"
        inLanguage="en"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Guides", url: "https://kestklar.at/en/ratgeber" },
          { name: "Loss Netting in Austria", url: "https://kestklar.at/en/ratgeber/austrian-loss-netting" },
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
            Loss Netting · §27 EStG · KeSt · 9 min read
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Loss Netting in Austria: What Actually Offsets What
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Loss netting on capital income is exhaustively regulated in §27 Abs 8 EStG &mdash; and tighter than many people think. Savings-account interest cannot be netted against equity losses, no carry-forward to future years exists, and from 2025 a new Tax Reporting Regulation applies.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="The basic rule: same year only, within the buckets">
            <p>
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27 Abs 8 EStG 1988
              </a>{" "}
              opens with: &ldquo;Loss netting is only permitted in accordance with the following provisions.&rdquo; This implies four hard limits:
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Only within the <strong className="text-foreground">27.5% bucket</strong> &mdash; not against savings-account interest or foundation distributions.</li>
              <li>Silent partnerships are a separate pot (waiting-list loss).</li>
              <li>No netting between the 27.5% bucket and tariff-rate capital income.</li>
              <li><strong className="text-foreground">No loss carry-forward</strong> to future years. Anything not used by 31 December expires.</li>
            </ol>
          </Section>

          <Section title="Three tax buckets — strictly separated">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                {
                  bucket: "Bucket A — 27.5%",
                  legal: "§27a Abs 1 Z 2 EStG",
                  what: "Realised capital gains/losses on equities, ETFs, bonds · Dividends · Interest from publicly offered bonds · Income from securitised derivatives · Crypto value gains (§27b)",
                },
                {
                  bucket: "Bucket B — 25%",
                  legal: "§27a Abs 1 Z 1 EStG",
                  what: "Savings-account interest · Demand deposits · Fixed deposits · Private foundation distributions (§27 Abs 5 Z 7)",
                },
                {
                  bucket: "Bucket C — Tariff rate",
                  legal: "§27a Abs 2 EStG",
                  what: "Private loans · Non-publicly offered bonds · Crypto lending and staking-pool yields",
                },
              ].map((row) => (
                <div key={row.bucket} className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-mono font-medium text-foreground">{row.bucket}</p>
                    <p className="text-[10px] text-muted-foreground">{row.legal}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{row.what}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Losses from Bucket A can be netted <strong className="text-foreground">only</strong> against gains in Bucket A &mdash; never against B or C.
            </p>
          </Section>

          <Section title="What works and what doesn't">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { l: "Equity loss ↔ equity gain", ok: true, comment: "Both Bucket A." },
                { l: "Equity loss ↔ foreign-equity dividend", ok: true, comment: "Both Bucket A, both 27.5%." },
                { l: "Equity loss ↔ bond interest (publicly offered)", ok: true, comment: "Bucket A." },
                { l: "Equity loss ↔ direct-crypto gain", ok: true, comment: "§27b is part of Bucket A." },
                { l: "Equity loss ↔ savings-account interest", ok: false, comment: "Bucket B — explicitly excluded, §27 Abs 8 Z 1." },
                { l: "Equity loss ↔ foundation distribution (§27 Abs 5 Z 7)", ok: false, comment: "Bucket B." },
                { l: "Equity loss ↔ private-loan interest", ok: false, comment: "Bucket C — tariff rate." },
                { l: "Crypto loss ↔ equity gain", ok: true, comment: "Both 27.5% bucket." },
                { l: "Crypto loss ↔ crypto-lending income", ok: false, comment: "Lending is tariff (Bucket C)." },
                { l: "Equity loss ↔ §30 real-estate gain", ok: false, comment: "§30 is its own pool, strictly separate." },
                { l: "Silent-partnership loss ↔ equity gain", ok: false, comment: "Waiting-list loss, §27 Abs 8 Z 2." },
              ].map((row) => (
                <div key={row.l} className="p-4 grid grid-cols-12 gap-3 items-start">
                  <p className={`col-span-1 text-xs font-mono font-medium ${row.ok ? "text-foreground" : "text-muted-foreground"}`}>
                    {row.ok ? "OK" : "✗"}
                  </p>
                  <p className="col-span-5 text-xs font-medium text-foreground">{row.l}</p>
                  <p className="col-span-6 text-xs text-muted-foreground">{row.comment}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Automatic vs manual loss netting">
            <p>
              <strong className="text-foreground">Automatic:</strong> only by <em>domestic</em> depositaries (e.g. Erste, BAWAG, easybank, dadat, flatex Austria, Hello Bank, Bank Direkt, Wiener Privatbank). Per calendar year, per taxpayer, all depots <em>at the same bank</em>.
            </p>
            <p>
              <strong className="text-foreground">Manual via E1kv:</strong>
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Multiple Austrian banks (cross-bank)</li>
              <li>Domestic + foreign (e.g. Erste + IBKR, BAWAG + Scalable)</li>
              <li>Foreign-only brokers (IBKR, DEGIRO Germany, Scalable Capital, Lightyear)</li>
              <li>Crypto + securities (even if both at the same domestic bank)</li>
              <li>Joint and trustee accounts</li>
            </ul>
            <p>
              Legal basis for automatic netting: §93 in conjunction with §97 Abs 2 EStG.
            </p>
          </Section>

          <Section title="New from 1 January 2025: Tax Reporting Regulation">
            <p>
              The old <strong className="text-foreground">Verlustausgleichsbescheinigung</strong> per §96 Abs 4 Z 2 EStG is replaced by a uniform <strong className="text-foreground">Steuerreporting</strong> per §96 Abs 5 EStG (new) and the{" "}
              <a href="https://www.ris.bka.gv.at/eli/bgbl/ii/2024/213/20240731" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Steuerreportingverordnung BGBl II 213/2024
              </a>.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>First applicable for tax year <strong className="text-foreground">2025</strong>.</li>
              <li>Loss netting now happens at the <strong className="text-foreground">gross-income level</strong>, not on KeSt amounts.</li>
              <li>Mandatory for all KeSt withholding agents (banks, crypto service providers).</li>
              <li>Contents: all capital income, including items not subject to netting (savings-account interest).</li>
              <li>Available by 31 March of the following year (on request).</li>
            </ul>
            <p>
              For tax years up to and including 2024 the old Verlustausgleichsbescheinigung still applies.
            </p>
          </Section>

          <Section title="Crypto: what works, what doesn't">
            <p>
              Since 1 March 2022 cryptocurrencies are governed by{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27b EStG
              </a>. <em>New crypto holdings</em> (acquired from 1 March 2021) are subject to the 27.5% special rate.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Crypto losses &harr; equity gains:</strong> Permitted (Bucket A).</li>
              <li><strong className="text-foreground">Crypto lending / staking pools:</strong> Tariff rate (Bucket C) &mdash; NOT netting-eligible against equities.</li>
              <li><strong className="text-foreground">Crypto legacy holdings</strong> (before 1 March 2021): one-year speculation period &mdash; if sold after one year, possibly tax-free.</li>
              <li><strong className="text-foreground">Automatic crypto-to-securities netting:</strong> Not possible even from 2025 &mdash; only via E1kv.</li>
            </ul>
            <p className="text-xs">
              Source:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/steuerliche-behandlung-von-kryptowaehrungen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF: Cryptocurrencies
              </a>
            </p>
          </Section>

          <Section title="§30 real estate — strictly separated">
            <p>
              Per{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/30" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §30 Abs 7 EStG
              </a>{" "}
              losses from private real-estate disposals are netted internally. Any remainder is reduced to 60% and offset against rental income (§28) over 15 years &mdash; never against §27 capital income.
            </p>
          </Section>

          <Section title="Three worked examples">
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Example 1 — Domestic, single broker, automatic</p>
              <p>Equity gain +5,000 EUR · ETF loss &minus;2,000 EUR · Dividend +1,000 EUR &rarr; 4,000 EUR &times; 27.5% = <strong className="text-foreground">1,100 EUR income tax</strong>. Savings-account interest of 50 EUR is taxed separately at 25% (12.50 EUR), not netted with the equity loss.</p>
            </div>
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Example 2 — Erste Bank + IBKR (manual via E1kv)</p>
              <p>Erste: &minus;3,000 EUR equity loss (the KeSt certificate shows an unused loss). IBKR: +5,000 EUR US equity gain, +500 EUR US dividend with 75 EUR US withholding tax.</p>
              <p>E1kv: KZ 994 +5,500, KZ 891/892 &minus;3,000 &rarr; balance 2,500 &times; 27.5% = 687.50 EUR. Credit 75 EUR (KZ 998) &rarr; <strong className="text-foreground">final tax 612.50 EUR</strong>.</p>
            </div>
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Example 3 — Loss expiry</p>
              <p>Equity loss &minus;1,000 EUR · equity gain on another position +200 EUR · savings-account interest +800 EUR.</p>
              <p>Netted: &minus;1,000 + 200 = &minus;800 residual loss. Savings-account interest taxed in full at 25% (200 EUR). Residual loss expires on 31 December. <strong className="text-foreground">No carry-forward</strong> to 2026 possible. Tip: realise pending gains before year-end to &ldquo;use up&rdquo; the loss.</p>
            </div>
          </Section>

          <Section title="Important special rules">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">No wash-sale rule:</strong> Austria does not prohibit selling-and-rebuying for loss realisation. Tax-loss selling is permitted (except in extreme cases under §22 BAO abuse rules).</li>
              <li><strong className="text-foreground">Incidental acquisition costs not deductible:</strong> Order fees do not increase the cost basis for private investors (§27a Abs 4 Z 2 EStG; Constitutional Court G 168/2017).</li>
              <li><strong className="text-foreground">Per-country withholding-tax cap:</strong> DTA credit calculated separately per source country (USA 15%, Switzerland 15%, France 12.8%).</li>
              <li><strong className="text-foreground">Joint accounts:</strong> No automatic netting &mdash; each co-holder declares separately.</li>
            </ul>
          </Section>

          <Section title="Common mistakes">
            <ol className="list-decimal pl-4 space-y-2">
              <li>Trying to net savings-account interest against equity losses (§27 Abs 8 Z 1 forbids it).</li>
              <li>Hoping for loss carry-forward to future years &mdash; it doesn't exist for §27.</li>
              <li>Trusting automatic netting across multiple brokers (only intra-bank).</li>
              <li>Ignoring loss netting at foreign brokers &mdash; must be done manually via E1kv.</li>
              <li>Expecting automatic crypto + equity netting at the same bank (not even in 2025).</li>
              <li>Trying to deduct order fees (excluded in private investment).</li>
              <li>Reporting Bucket-C income (private loans, crypto lending) in the 27.5% bucket.</li>
            </ol>
          </Section>

          <Section title="Official sources">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27 EStG (Abs 8 loss netting)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG (special rates, buckets)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27b EStG (crypto)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG (KeSt withholding)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/96" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§96 EStG (certificate / tax reporting)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/97" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§97 EStG (loss netting on application)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/30" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§30 EStG (real-estate pool)</a></li>
              <li><a href="https://www.ris.bka.gv.at/eli/bgbl/ii/2024/213/20240731" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Steuerreportingverordnung BGBl II 213/2024</a></li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/verluste-aus-veraeusserung-von-kapitalvermoegen-und-derivaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: losses on capital disposals</a></li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: capital income taxation</a></li>
              <li><a href="https://www.usp.gv.at/themen/steuern-finanzen/einkommensteuer-ueberblick/weitere-informationen-est/bescheinigung-kapitalertraege.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">USP: capital income certificate</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
            </ul>
            <p className="text-xs mt-2 italic">
              As of: May 2026. Tax statements are not legal advice &mdash; for material amounts, consult a tax advisor or request a binding ruling under §90 BAO.
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar nets losses across all your brokers automatically.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Upload statements from IBKR, Scalable, DEGIRO &amp; co. KestKlar identifies the right buckets, nets losses against gains within the 27.5% pot, applies withholding-tax credit, and outputs ready-to-use E1kv field values.
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
          <Link href="/en/ratgeber/how-to-calculate-kest" className="block text-sm text-foreground hover:underline underline-offset-2">How to Calculate KeSt with Non-Tax-Simple Brokers &rarr;</Link>
          <Link href="/en/ratgeber/e1kv-guide" className="block text-sm text-foreground hover:underline underline-offset-2">E1kv Step-by-Step Guide &rarr;</Link>
          <Link href="/en/ratgeber/interactive-brokers-austria-tax" className="block text-sm text-foreground hover:underline underline-offset-2">Interactive Brokers Austria Tax &rarr;</Link>
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
