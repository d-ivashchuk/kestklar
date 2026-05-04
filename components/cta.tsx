"use client";

import { useLang } from "@/lib/i18n";
import { WaitlistForm } from "./waitlist-form";
import { IllustrationPaperPlane } from "./illustrations";

export function CTA() {
  const { t } = useLang();
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-lg mx-auto space-y-6">
          <IllustrationPaperPlane className="w-14 h-14 text-foreground/80 mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            {t.cta.h2}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.cta.sub}
          </p>
          <div className="flex flex-col items-center gap-3">
            <WaitlistForm size="large" />
            <p className="text-xs text-muted-foreground">
              {t.footer.legal}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
