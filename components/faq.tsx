"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { IllustrationQuestion } from "./illustrations";

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-secondary py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <IllustrationQuestion className="w-12 h-12 text-foreground/80 mx-auto mb-5" />
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            {t.faq.heading}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t.faq.sub}
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-px border border-border bg-border">
          {t.faq.items.map((faq: { q: string; a: string }, i: number) => (
            <div key={i} className="bg-background">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-sans text-sm text-foreground pr-8">{faq.q}</span>
                <span
                  className={`text-muted-foreground text-lg leading-none flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-5 pb-4">
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
