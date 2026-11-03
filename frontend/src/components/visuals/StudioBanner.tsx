"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LineIcon } from "@/components/ui/LineIcon";
import { LogoMark } from "@/components/ui/Logo";

/** About-hero banner: the four disciplines as live mini-panels (code, design, growth, video) on a navy board. */
export function StudioBanner() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from("[data-sb-board]", { y: 40, opacity: 0, scale: 0.97, duration: 1.1 })
          .from("[data-sb-tile]", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.3)
          .from("[data-sb-chip]", { y: 14, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.12 }, 0.8);
        // code lines "typing"
        gsap.fromTo("[data-sb-code]", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, stagger: 0.25, ease: "power2.out", repeat: -1, repeatDelay: 2.2 });
        // growth bars
        gsap.fromTo("[data-sb-bar]", { scaleY: 0.15 }, { scaleY: 1, transformOrigin: "bottom center", duration: 0.9, stagger: 0.12, ease: "back.out(1.6)", repeat: -1, yoyo: true, repeatDelay: 1.4 });
        // video playhead
        gsap.fromTo("[data-sb-head]", { left: "0%" }, { left: "100%", duration: 4, ease: "none", repeat: -1 });
        // swatches breathe
        gsap.to("[data-sb-swatch]", { y: -5, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.18 });
        gsap.to("[data-sb-float]", { y: -8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.7 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const tile = "rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur";

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[560px] py-6">
      <div aria-hidden className="absolute inset-6 rounded-[2rem] bg-accent/25 blur-3xl" />
      <div data-sb-board className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(145deg,#020b2f_0%,#041f73_60%,#0b3fb8_100%)] p-5 text-white shadow-[0_40px_80px_-35px_rgba(4,31,115,0.75)] sm:p-6">
        <span aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full border-[34px] border-white/[0.04]" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9" />
            <div className="leading-tight">
              <p className="text-[14.5px] font-bold">Axiom Studio</p>
              <p className="text-[11.5px] text-white/55">Build · Design · Grow · Film</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
            <i className="size-1.5 animate-pulse rounded-full bg-emerald-300" aria-hidden /> Live
          </span>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-3">
          {/* development */}
          <div data-sb-tile className={tile}>
            <p className="flex items-center gap-2 text-[12px] font-bold text-[#9cc3ff]"><LineIcon name="code" className="size-4" /> Development</p>
            <div className="mt-3 space-y-1.5 font-mono" aria-hidden>
              {["w-4/5 bg-[#c792ea]", "w-3/5 bg-[#9cc3ff]", "w-11/12 bg-[#82d9a5]", "w-2/5 bg-[#ffcb6b]"].map((c, i) => (
                <span key={i} className={`block h-1.5 rounded-full ${c}`} style={{ marginLeft: i % 2 ? 10 : 0 }} data-sb-code />
              ))}
            </div>
          </div>
          {/* design */}
          <div data-sb-tile className={tile}>
            <p className="flex items-center gap-2 text-[12px] font-bold text-[#9cc3ff]"><LineIcon name="pen" className="size-4" /> Design</p>
            <div className="mt-3 flex items-end gap-1.5" aria-hidden>
              {["#1b6fff", "#3b89ff", "#9cc3ff", "#ed1b24", "#ffffff"].map((c) => (
                <span key={c} data-sb-swatch className="h-7 flex-1 rounded-md ring-1 ring-white/20" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-2 text-[18px] leading-none font-bold" aria-hidden>Aa <span className="text-[11px] font-semibold text-white/50">Nunito Sans</span></p>
          </div>
          {/* marketing */}
          <div data-sb-tile className={tile}>
            <p className="flex items-center gap-2 text-[12px] font-bold text-[#9cc3ff]"><LineIcon name="bolt" className="size-4" /> Marketing</p>
            <div className="mt-3 flex h-12 items-end gap-1.5" aria-hidden>
              {[40, 55, 48, 70, 82, 100].map((h, i) => (
                <span key={i} data-sb-bar className="flex-1 rounded-t-md bg-gradient-to-t from-[#1b6fff] to-[#9cc3ff]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          {/* video */}
          <div data-sb-tile className={tile}>
            <p className="flex items-center gap-2 text-[12px] font-bold text-[#9cc3ff]"><LineIcon name="play" className="size-4" /> Video</p>
            <div className="relative mt-3 space-y-1.5" aria-hidden>
              <div className="flex gap-1">{[3, 5, 2, 4].map((w, i) => <span key={i} className="h-3.5 rounded bg-[#3b89ff]/70" style={{ flex: w }} />)}</div>
              <div className="flex gap-1">{[4, 2, 5, 3].map((w, i) => <span key={i} className="h-3.5 rounded bg-[#ed1b24]/60" style={{ flex: w }} />)}</div>
              <div className="flex gap-1">{[6, 3, 4].map((w, i) => <span key={i} className="h-2 rounded bg-white/25" style={{ flex: w }} />)}</div>
              <span data-sb-head className="absolute -top-1 -bottom-1 w-0.5 rounded bg-white shadow-[0_0_8px_#fff]" />
            </div>
          </div>
        </div>
      </div>

      <div data-sb-chip className="absolute -top-1 -left-2 sm:-left-8">
        <div data-sb-float className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(4,31,115,0.45)]">
          <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent"><LineIcon name="layers" className="size-4" /></span>
          <span className="text-[12.5px] leading-tight"><b className="block text-fg">One team</b><span className="text-mute">Every channel</span></span>
        </div>
      </div>
      <div data-sb-chip className="absolute top-[42%] -right-2 sm:-right-10">
        <div data-sb-float className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(4,31,115,0.45)]">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><LineIcon name="check" className="size-4" /></span>
          <span className="text-[12.5px] leading-tight"><b className="block text-fg">Planned together</b><span className="text-mute">Web · content · ads</span></span>
        </div>
      </div>
    </div>
  );
}
