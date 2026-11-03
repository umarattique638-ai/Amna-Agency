"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LineIcon } from "@/components/ui/LineIcon";
import { LogoMark } from "@/components/ui/Logo";

/** Mission banner: a browser window — the client's new website on the left, its growth dashboard on the right. */
export function GrowthBrowser() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 80%", once: true };
        const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });
        tl.from("[data-gb-win]", { y: 50, opacity: 0, duration: 1 })
          .from("[data-gb-site] > *", { y: 16, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.35)
          .fromTo("[data-gb-line]", { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.5)
          .from("[data-gb-area]", { opacity: 0, duration: 1 }, 1.4)
          .from("[data-gb-kpi]", { y: 16, opacity: 0, scale: 0.92, stagger: 0.12, duration: 0.6, ease: "back.out(1.8)" }, 0.9);
        gsap.to("[data-gb-dot]", { scale: 1.6, opacity: 0.4, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "center" });
        gsap.to("[data-gb-cursor]", { x: 120, y: 40, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto mt-14 max-w-5xl">
      <div aria-hidden className="absolute inset-x-10 -bottom-6 top-10 rounded-[2rem] bg-accent/20 blur-3xl" />
      <div data-gb-win className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-45px_rgba(4,31,115,0.6)]">
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-4 flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-mute ring-1 ring-line">
            <LineIcon name="shield" className="size-3 text-emerald-600" /> your-business.com
          </span>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* the website */}
          <div data-gb-site className="relative space-y-4 border-b border-line p-6 md:border-r md:border-b-0 md:p-8">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><LogoMark className="size-6" /><span className="h-2.5 w-16 rounded-full bg-fg/80" /></span>
              <span className="flex gap-2">{[10, 12, 9].map((w, i) => <span key={i} className="h-2 rounded-full bg-fg/15" style={{ width: w * 3 }} />)}</span>
            </div>
            <div className="space-y-2 pt-3">
              <span className="block h-4 w-4/5 rounded-full bg-fg/85" />
              <span className="block h-4 w-3/5 rounded-full bg-accent" />
              <span className="block h-2 w-11/12 rounded-full bg-fg/10" />
              <span className="block h-2 w-3/4 rounded-full bg-fg/10" />
            </div>
            <div className="flex gap-2 pt-1">
              <span className="rounded-full bg-accent px-4 py-2 text-[11px] font-bold text-white">Get a quote</span>
              <span className="rounded-full px-4 py-2 text-[11px] font-bold text-fg/60 ring-1 ring-line">Our work</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {["bg-accent-soft", "bg-surface-2", "bg-accent-soft"].map((c, i) => (
                <span key={i} className={`grid aspect-[4/3] place-items-center rounded-xl ${c}`}>
                  <LineIcon name={["code", "pen", "play"][i] ?? "code"} className="size-5 text-accent" />
                </span>
              ))}
            </div>
            <span data-gb-cursor aria-hidden className="absolute top-[58%] left-[18%] text-fg drop-shadow">
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor"><path d="M4 2l16 9-7 2-3 7z" /></svg>
            </span>
          </div>

          {/* the growth dashboard */}
          <div className="bg-surface/60 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-extrabold text-fg">Growth overview</p>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-mute ring-1 ring-line">Monthly report</span>
            </div>
            <svg viewBox="0 0 300 120" className="mt-4 h-32 w-full" aria-hidden>
              <defs>
                <linearGradient id="gb-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#2b7cff" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#2b7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e7e7e7" strokeDasharray="3 5" />)}
              <path data-gb-area d="M0 100 C40 95 60 80 90 78 S140 70 170 52 S230 40 260 22 L300 12 L300 120 L0 120Z" fill="url(#gb-area)" />
              <path data-gb-line d="M0 100 C40 95 60 80 90 78 S140 70 170 52 S230 40 260 22 L300 12" fill="none" stroke="#2b7cff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="600" />
              <circle data-gb-dot cx="300" cy="12" r="5" fill="#2b7cff" />
            </svg>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: "check", label: "Website live", tone: "text-emerald-600 bg-emerald-50" },
                { icon: "search", label: "SEO tracked", tone: "text-accent bg-accent-soft" },
                { icon: "play", label: "Content scheduled", tone: "text-[#ed1b24] bg-red-50" },
              ].map((k) => (
                <li key={k.label} data-gb-kpi className="rounded-xl bg-white p-3 ring-1 ring-line">
                  <span className={`grid size-7 place-items-center rounded-lg ${k.tone}`}><LineIcon name={k.icon} className="size-4" /></span>
                  <span className="mt-2 block text-[11.5px] leading-tight font-bold text-fg">{k.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
