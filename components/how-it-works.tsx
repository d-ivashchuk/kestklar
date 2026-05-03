"use client";

import { useLang } from "@/lib/i18n";
import {
  IllustrationUpload,
  IllustrationCalculate,
  IllustrationForm,
} from "./illustrations";

export function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { title: t.howItWorks.s1t, body: t.howItWorks.s1b, Illustration: IllustrationUpload },
    { title: t.howItWorks.s2t, body: t.howItWorks.s2b, Illustration: IllustrationCalculate },
    { title: t.howItWorks.s3t, body: t.howItWorks.s3b, Illustration: IllustrationForm },
  ];

  return (
    <section id="how-it-works" className="bg-secondary py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            {t.howItWorks.h2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-background p-8 relative flex flex-col">
              <span className="font-mono text-xs text-muted-foreground/40 absolute top-6 right-6">
                0{i + 1}
              </span>
              {/* Illustration */}
              <step.Illustration className="w-14 h-14 text-foreground mb-6 opacity-80" />
              <div className="space-y-3">
                <h3 className="font-sans text-sm font-medium text-foreground">{step.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          {t.howItWorks.avg}{" "}
          <strong className="text-foreground">{t.howItWorks.avgVal}</strong>{" "}
          {t.howItWorks.avgSub}
        </p>
      </div>
    </section>
  );
}
