"use client";

import { useEffect, useRef } from "react";

/** Thin bar under the header showing how far through the article the reader is. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);
  return (
    <div aria-hidden className="fixed inset-x-0 top-[76px] z-40 h-1 bg-transparent">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-[#9cc3ff]" />
    </div>
  );
}
