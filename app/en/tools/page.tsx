import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Tax Calculators for Austrian Investors – KestKlar",
  description:
    "Free online calculators for KESt, Meldefonds comparison, and loss netting. Calculate your Austrian capital gains tax in seconds.",
  alternates: { canonical: "https://kestklar.at/en/tools" },
};

const tools = [
  {
    slug: "kest-calculator",
    title: "KESt Calculator Austria",
    description:
      "Calculate your capital gains tax on dividends, realised gains, and deemed distributions (AgE) — including loss netting and foreign withholding tax credit.",
    keyword: "KESt · 27.5% · Loss Netting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <rect x="4" y="3" width="16" height="18" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="12" y2="11" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    ),
  },
  {
    slug: "meldefonds-comparison",
    title: "Meldefonds vs. Non-Meldefonds Comparison",
    description:
      "Compare the tax impact of reporting funds (Meldefonds) and non-reporting funds (Schwarzfonds) over your investment horizon — with a growth chart.",
    keyword: "Meldefonds · §186 InvFG · Flat-Rate Taxation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <polyline points="4,18 9,12 13,14 20,6" />
        <line x1="4" y1="20" x2="20" y2="20" />
        <line x1="4" y1="4" x2="4" y2="20" />
      </svg>
    ),
  },
];

export default function EnToolsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Tools</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Free Tax Calculators for Austrian Investors
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Interactive calculators for Austrian capital gains tax — free, no sign-up required, runs entirely in your browser.
        </p>
      </div>

      <div className="space-y-px border border-border">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/en/tools/${tool.slug}`}
            className="block bg-background hover:bg-secondary transition-colors p-6 border-b border-border last:border-b-0 group"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 text-foreground mt-0.5">{tool.icon}</div>
              <div className="space-y-2 min-w-0 flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {tool.keyword}
                </p>
                <h2 className="font-serif text-lg text-foreground group-hover:opacity-70 transition-opacity leading-snug">
                  {tool.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <span className="text-muted-foreground shrink-0 mt-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
