"use client";

import { useLang } from "@/lib/i18n";

const quotes = [
  {
    text: "Ich steh komplett auf dem Schlauch, wie ich die ausschüttungsgleichen Erträge meiner thesaurierenden ETFs korrekt angeben soll.",
    source: "r/FinanzenAT",
    upvotes: "94 upvotes",
  },
  {
    text: "Hab drei Broker — Trade Republic, Scalable und IBKR. Verlustausgleich zwischen denen macht mich wahnsinnig.",
    source: "r/FinanzenAT",
    upvotes: "67 upvotes",
  },
  {
    text: "Habe alles selbst ausgerechnet aber bin nicht sicher ob es stimmt. Zum Steuerberater wegen 300 Euro Steuer gehen find ich blöd.",
    source: "r/FinanzenAT",
    upvotes: "112 upvotes",
  },
  {
    text: "Wie macht ihr das eigentlich mit dem Verlustausgleich wenn man bei mehreren Brokern ist? Hat irgendjemand eine einfache Lösung?",
    source: "r/FinanzenAT",
    upvotes: "88 upvotes",
  },
];

export function SocialProof() {
  const { t } = useLang();

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            {t.proof.eyebrow}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            {t.proof.h2a}
            <br />
            <span className="italic">{t.proof.h2b}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-border bg-border max-w-3xl mx-auto">
          {quotes.map((q, i) => (
            <div key={i} className="bg-background p-6 space-y-4">
              <p className="font-sans text-sm text-foreground leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-[#FF4500] flex items-center justify-center shrink-0">
                    <span className="text-white text-[7px] font-bold leading-none">r/</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{q.source}</span>
                </div>
                <span className="text-xs text-muted-foreground">{q.upvotes}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-sm mx-auto">
          {t.proof.stat}
        </p>
      </div>
    </section>
  );
}
