"use client";

import { useLang } from "@/lib/i18n";
import {
  IllustrationUpload,
  IllustrationCalculate,
  IllustrationForm,
} from "./illustrations";
import { useInView } from "@/lib/use-in-view";

export function HowItWorks() {
  const { t } = useLang();
  const { ref, inView } = useInView<HTMLDivElement>();

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

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Animated dashed connector — desktop only, sits behind the cards */}
          <svg
            className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 800 60"
            preserveAspectRatio="none"
            width="100%"
            height="60"
            aria-hidden="true"
          >
            <path
              d="M 80 30 Q 200 10, 400 30 T 720 30"
              stroke="hsl(152 69% 45%)"
              strokeWidth="1.25"
              fill="none"
              className={`draw-stroke dash-flow ${inView ? "in-view" : ""}`}
              opacity="0.55"
            />
            {/* Tiny dot riding the path on each step center */}
            <circle cx="80" cy="30" r="3" fill="hsl(152 69% 45%)" className={inView ? "" : "opacity-0"} />
            <circle cx="400" cy="30" r="3" fill="hsl(152 69% 45%)" className={inView ? "" : "opacity-0"} style={{ transition: "opacity 0.4s 0.6s" }} />
            <circle cx="720" cy="30" r="3" fill="hsl(152 69% 45%)" className={inView ? "" : "opacity-0"} style={{ transition: "opacity 0.4s 1.1s" }} />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border relative">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal bg-background p-8 relative flex flex-col ${inView ? "in-view" : ""}`}
                style={{ animationDelay: `${i * 180}ms` }}
              >
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
