"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up from zero when scrolled into view. Writes to the DOM directly to avoid re-renders. */
export default function Counter({ value, decimals = 0, prefix = "", suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduceMotion = useReducedMotion();

  // Once hydrated, reset to zero (while still off-screen) so the count-up is visible.
  useEffect(() => {
    if (ref.current && !reduceMotion && !inView) ref.current.textContent = `${prefix}${format(0, decimals)}${suffix}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = `${prefix}${format(value, decimals)}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${format(latest, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
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
