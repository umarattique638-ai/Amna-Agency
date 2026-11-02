"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts up once when it scrolls into view. Server-rendered with the final value for SEO / no-JS. */
export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = value % 1 === 0 ? 0 : 1;

  useGSAP(() => {
    const el = ref.current!;
    const o = { v: 0 };
    gsap.to(o, {
      v: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onStart: () => void (el.textContent = `${prefix}0${suffix}`),
      onUpdate: () => void (el.textContent = `${prefix}${o.v.toFixed(decimals)}${suffix}`),
    });
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
