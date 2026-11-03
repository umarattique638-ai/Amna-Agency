"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LineIcon } from "@/components/ui/LineIcon";
import { LogoMark } from "@/components/ui/Logo";

const swatches = [
  { hex: "#041F73", name: "Navy" },
  { hex: "#2B7CFF", name: "Blue" },
  { hex: "#9CC3FF", name: "Sky" },
  { hex: "#ED1B24", name: "Accent" },
];

/** "What makes us different" banner: a brand-kit board (logo, palette, type, social templates) with a delivered badge. */
export function BrandKitBanner() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", once: true }, defaults: { ease: "power3.out" } });
        tl.from("[data-bk-board]", { y: 50, opacity: 0, rotate: 2, duration: 1 })
          .from("[data-bk-logo]", { scale: 0, rotate: -90, duration: 0.8, ease: "back.out(2)" }, 0.35)
          .from("[data-bk-swatch]", { y: 30, opacity: 0, stagger: 0.09, duration: 0.6, ease: "back.out(1.8)" }, 0.5)
          .from("[data-bk-post]", { scale: 0.6, opacity: 0, stagger: 0.08, duration: 0.55, ease: "back.out(2)" }, 0.8)
          .from("[data-bk-badge]", { y: 20, opacity: 0, duration: 0.7 }, 1.2);
        gsap.to("[data-bk-post]", { y: -4, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.2, from: "random" }, delay: 2 });
        gsap.to("[data-bk-logo]", { rotate: 6, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative py-4">
      <div aria-hidden className="absolute inset-8 rounded-[2rem] bg-accent/20 blur-3xl" />
      <div data-bk-board className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_40px_80px_-45px_rgba(4,31,115,0.6)]">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-extrabold tracking-wide text-fg uppercase">Brand kit</p>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">v1.0</span>
        </div>

        {/* logo block */}
        <div className="navy-gradient mt-4 flex items-center gap-4 rounded-2xl p-5 text-white">
          <span data-bk-logo className="inline-block"><LogoMark className="size-14" /></span>
          <div>
            <p className="text-[20px] leading-none font-extrabold">Your Brand</p>
            <p className="mt-1.5 text-[12px] text-white/60">Primary logo · icon · dark &amp; light</p>
          </div>
        </div>

        {/* palette */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {swatches.map((s) => (
            <div key={s.hex} data-bk-swatch className="overflow-hidden rounded-xl ring-1 ring-line">
              <span className="block h-12" style={{ background: s.hex }} />
              <span className="block bg-white px-2 py-1.5 text-[10.5px] leading-tight">
                <b className="block text-fg">{s.name}</b>
                <span className="font-mono text-mute">{s.hex}</span>
              </span>
            </div>
          ))}
        </div>

        {/* type + templates */}
        <div className="mt-4 grid grid-cols-[1fr_1.3fr] gap-3">
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-[40px] leading-none font-extrabold text-fg">Aa</p>
            <p className="mt-2 text-[11.5px] font-bold text-fg">Nunito Sans</p>
            <p className="text-[10.5px] text-mute">Headings · Body</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              "bg-[linear-gradient(140deg,#041f73,#2b7cff)]",
              "bg-accent-soft",
              "bg-[linear-gradient(140deg,#2b7cff,#9cc3ff)]",
              "bg-surface-2",
              "bg-[linear-gradient(140deg,#ed1b24,#ff7a7f)]",
              "bg-[linear-gradient(140deg,#020b2f,#041f73)]",
            ].map((c, i) => (
              <span key={i} data-bk-post className={`grid aspect-square place-items-center rounded-lg ${c}`}>
                <LineIcon name={["play", "pen", "bolt", "layers", "rocket", "check"][i] ?? "check"} className={`size-4 ${i === 1 || i === 3 ? "text-accent" : "text-white"}`} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-bk-badge className="absolute -bottom-2 left-6 right-6 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-[0_20px_40px_-20px_rgba(4,31,115,0.45)] backdrop-blur sm:left-auto sm:right-[-12px]">
        <span className="grid size-9 place-items-center rounded-full bg-emerald-50 text-emerald-600"><LineIcon name="check" className="size-4" /></span>
        <span className="text-[13px] leading-tight"><b className="block text-fg">Brand kit delivered</b><span className="text-mute">Logo, colours, social templates</span></span>
      </div>
    </div>
  );
}
