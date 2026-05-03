import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Austrian Investor Tax Guides – KestKlar",
  description:
    "Practical guides for Austrian investors on E1kv, KeSt calculation, deemed distributions from ETFs, and how to handle non-tax-simple brokers like Interactive Brokers.",
};

const articles = [
  {
    slug: "e1kv-guide",
    title: "How to Fill in the E1kv: Step-by-Step Guide for Investors",
    tags: ["E1kv", "FinanzOnline", "Capital Income"],
    readTime: "6 min read",
    summary:
      "What goes in which field? Field numbers for dividends, capital gains, ETF deemed distributions, and losses — with official BMF sources.",
  },
  {
    slug: "deemed-distributions",
    title: "Deemed Distributions: What They Are and How to Report Them",
    tags: ["ETF", "ÖEKB", "Accumulating"],
    readTime: "7 min read",
    summary:
      "Accumulating ETFs pay no dividends but are still taxable in Austria each year. How to find the amounts on my.oekb.at and which E1kv field to use.",
  },
  {
    slug: "how-to-calculate-kest",
    title: "How to Calculate KeSt with Non-Tax-Simple Brokers",
    tags: ["KeSt", "Loss Netting", "E1kv"],
    readTime: "8 min read",
    summary:
      "Interactive Brokers, Scalable Capital, DEGIRO: calculate 27.5% KeSt yourself, net losses across all accounts, and credit foreign withholding tax.",
  },
];

export default function EnRatgeberPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-2 flex items-center justify-between">
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← KestKlar
        </Link>
        <Link href="/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Auf Deutsch →
        </Link>
      </div>

      <header className="mt-6 mb-12">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Guides · Austrian Investor Tax
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
          Austrian Tax Guides for Investors
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Practical, factually verified articles on Austrian capital gains tax. Written for investors using Interactive Brokers, Scalable Capital, DEGIRO, or any other non-tax-simple broker.
        </p>
      </header>

      <div className="space-y-px border border-border">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/en/ratgeber/${article.slug}`}
            className="block p-6 hover:bg-secondary transition-colors group border-b border-border last:border-b-0"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                  {tag}
                </span>
              ))}
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground ml-auto">
                {article.readTime}
              </span>
            </div>
            <h2 className="font-serif text-lg text-foreground group-hover:underline underline-offset-2 mb-2">
              {article.title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 border border-border p-6 bg-secondary">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Skip the manual work</p>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          KestKlar automates everything described in these guides — broker PDF import, ÖEKB data, loss netting, withholding tax credit — and delivers the exact E1kv field values in under 10 minutes.
        </p>
        <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
          Join the waitlist for free →
        </Link>
      </div>
    </main>
  );
}
