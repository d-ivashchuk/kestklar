"use client";

import Link from "next/link";
import { brokers } from "@/lib/brokers";
import { useLang } from "@/lib/i18n";

// All brokers shown in the marquee — supported ones link to their page
const allMarqueeBrokers = [
  { name: "Trade Republic",      slug: "trade-republic",       supported: true },
  { name: "Interactive Brokers", slug: "interactive-brokers",  supported: true },
  { name: "Scalable Capital",    slug: "scalable-capital",     supported: true },
  { name: "DEGIRO",              slug: null,                   supported: false },
  { name: "Bitpanda",            slug: null,                   supported: false },
  { name: "eToro",               slug: null,                   supported: false },
  { name: "XTB",                 slug: null,                   supported: false },
  { name: "Revolut",             slug: null,                   supported: false },
  { name: "Swissquote",          slug: null,                   supported: false },
  { name: "Lightyear",           slug: null,                   supported: false },
  { name: "Smartbroker+",        slug: null,                   supported: false },
  { name: "ING (DE)",            slug: null,                   supported: false },
  { name: "Comdirect",           slug: null,                   supported: false },
  { name: "BUX",                 slug: null,                   supported: false },
  { name: "Consorsbank",         slug: null,                   supported: false },
];

const row1 = allMarqueeBrokers.slice(0, 8);
const row2 = allMarqueeBrokers.slice(7);  // slight overlap so both rows feel full

function Pill({ name, slug, supported }: { name: string; slug: string | null; supported: boolean }) {
  const inner = (
    <span className="flex items-center gap-2 px-4 py-2 border border-border bg-background whitespace-nowrap hover:border-foreground/30 transition-colors select-none">
      <span className={`w-2 h-2 rounded-full shrink-0 ${supported ? "bg-green-500" : "bg-border"}`} />
      <span className="font-sans text-sm text-foreground">{name}</span>
      {supported && <span className="text-[9px] font-mono text-green-600 uppercase tracking-wide">live</span>}
    </span>
  );

  if (supported && slug) {
    return <Link href={`/broker/${slug}`}>{inner}</Link>;
  }
  return <div>{inner}</div>;
}

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof row1;
  direction: "left" | "right";
}) {
  const anim = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={`flex ${anim} group-hover/strip:[animation-play-state:paused] will-change-transform`}>
      {/* Original set */}
      <div className="flex gap-3 shrink-0 pr-3">
        {items.map((b) => (
          <Pill key={b.name} name={b.name} slug={b.slug} supported={b.supported} />
        ))}
      </div>
      {/* Exact clone — creates seamless loop */}
      <div className="flex gap-3 shrink-0 pr-3" aria-hidden="true">
        {items.map((b) => (
          <Pill key={`clone-${b.name}`} name={b.name} slug={b.slug} supported={b.supported} />
        ))}
      </div>
    </div>
  );
}

export function BrokerStrip() {
  const { t } = useLang();

  return (
    <section className="bg-secondary py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
          {t.brokers.h2}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {t.brokers.sub}
        </p>
      </div>

      {/* Scrolling marquee — two rows, opposite directions */}
      <div className="relative overflow-hidden group/strip space-y-3">
        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--muted)) 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--muted)) 0%, transparent 100%)" }}
        />

        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>

      {/* Supported broker detail cards */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-border bg-border max-w-3xl mx-auto">
          {brokers.filter((b) => b.status === "supported").map((b) => (
            <Link
              key={b.slug}
              href={`/broker/${b.slug}`}
              className="bg-background p-6 flex flex-col gap-3 hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-medium text-foreground">{b.name}</span>
                <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5">
                  Supported
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{b.pdfName.de}</p>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                {t.brokers.learnMore}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
