"use client";

import { useLang } from "@/lib/i18n";
import { MockUI } from "./mock-ui";
import { WaitlistForm } from "./waitlist-form";
import { StatusBadge } from "./status-badge";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 dot-grid relative">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="max-w-site mx-auto relative">
        <div className="flex justify-center mb-6">
          <StatusBadge label={t.hero.badge} />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground text-center leading-tight max-w-3xl mx-auto">
          {t.hero.h1a}{" "}
          <span className="italic">{t.hero.h1b}</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto leading-relaxed">
          {t.hero.sub}
        </p>

        {/* Loss aversion callout */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-sm">
            {t.hero.lossLabel && (
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-center mb-4">
                {t.hero.lossLabel}
              </p>
            )}
            <div className="grid grid-cols-2 gap-px border border-border bg-border">
              {/* The loss — Steuerberater */}
              <div className="bg-background px-6 py-5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  {t.hero.lossAdvisor}
                </p>
                <p className="font-serif text-3xl text-muted-foreground">{t.hero.lossAdvisorPrice}</p>
                <p className="text-xs text-muted-foreground mt-2">{t.hero.lossAdvisorSub}</p>
              </div>
              {/* The win — KestKlar */}
              <div className="bg-foreground px-6 py-5">
                <p className="text-[10px] uppercase tracking-wider text-background/50 mb-3">
                  {t.hero.lossKestklar}
                </p>
                <p className="font-serif text-3xl text-background">{t.hero.lossKestklarPrice}</p>
                <p className="text-xs text-background/60 mt-2">{t.hero.lossKestklarSub}</p>
              </div>
            </div>
          </div>
        </div>

        <div id="waitlist" className="flex flex-col items-center mt-10 gap-3 scroll-mt-24">
          <WaitlistForm size="large" />
          <p className="text-xs text-muted-foreground">{t.hero.ctaSub}</p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-b from-transparent via-green-50/30 to-transparent pointer-events-none rounded-sm" />
          <MockUI />
        </div>
      </div>
    </section>
  );
}
