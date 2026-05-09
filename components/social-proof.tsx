"use client";

import { useLang } from "@/lib/i18n";

const quotes = [
  {
    tag: "Brokersteuer",
    text: "Bei Broker-Umstellungen können falsche Steuerbuchungen schnell vierstellig werden, und Nutzer müssen selbst nachprüfen.",
    url: "https://www.reddit.com/r/FinanzenAT/comments/1ota7n0/trade_republic_systematischer_steuer_betrug_in/",
    source: "r/FinanzenAT",
    signal: "118 upvotes",
  },
  {
    tag: "Verlustausgleich",
    text: "Gewinne, Verluste, Krypto und steuereinfache Depots greifen anders ineinander, als viele erwarten.",
    url: "https://www.reddit.com/r/FinanzenAT/comments/1rli88r/warum_ich_auf_aktienverluste_steuern_zahlen_darf/",
    source: "r/FinanzenAT",
    signal: "58 upvotes",
  },
  {
    tag: "AgE",
    text: "Ausschüttungsgleiche Erträge lösen regelmäßig Diskussionen aus, weil die Steuer anfällt, obwohl kein Geld aufs Konto kommt.",
    url: "https://www.reddit.com/r/FinanzenAT/comments/1t5dbko/wie_sich_der_staat_mit_aussch%C3%BCttungsgleichen/",
    source: "r/FinanzenAT",
    signal: "45 upvotes",
  },
  {
    tag: "Thesaurierer",
    text: "Viele Anleger verstehen nicht, ob thesaurierende ETFs in Österreich überhaupt noch steuerlich vorteilhaft sind.",
    url: "https://www.reddit.com/r/FinanzenAT/comments/1ialm5e/sind_in_%C3%B6sterreich_thesaurierer_%C3%BCberhaupt/",
    source: "r/FinanzenAT",
    signal: "37 upvotes",
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
            <a
              key={i}
              href={q.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background p-6 min-h-[220px] flex flex-col transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {q.tag}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>

              <p className="mt-5 font-sans text-sm text-foreground leading-relaxed">
                {q.text}
              </p>

              <div className="mt-auto pt-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4 h-4 bg-[#FF4500] flex items-center justify-center shrink-0">
                      <span className="text-white text-[7px] font-bold leading-none">r/</span>
                    </div>
                    <span className="text-xs text-muted-foreground truncate">{q.source}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {q.signal}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-sm mx-auto">
          {t.proof.stat}
        </p>
      </div>
    </section>
  );
}
