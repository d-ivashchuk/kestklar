"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/use-in-view";

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
  className?: string;
  start?: number;
};

export function CountUp({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  locale = "de-AT",
  className = "",
  start = 0,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState<number>(start);

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const begin = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      const v = start + (value - start) * ease(t);
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, start]);

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
