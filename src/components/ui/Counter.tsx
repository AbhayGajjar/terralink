"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up from zero when scrolled into view. Writes to the DOM directly to avoid re-renders. No animation library. */
export default function Counter({ value, decimals = 0, prefix = "", suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    // Ease-out count-up with requestAnimationFrame.
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      node.textContent = `${prefix}${format(value * eased, decimals)}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value, decimals, prefix, suffix, duration]);

  // Server/initial render shows the final value so it's correct without JS and for crawlers.
  return (
    <span ref={ref} aria-label={`${prefix}${format(value, decimals)}${suffix}`}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
