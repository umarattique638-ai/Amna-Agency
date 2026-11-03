"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutHero } from "@/content/about";
import { StudioBanner } from "@/components/visuals/StudioBanner";
import { LineIcon } from "@/components/ui/LineIcon";
import { siteConfig } from "@/config/site";

const capabilities = [
  { icon: "code", label: "Web Development", sub: "React · Next.js" },
  { icon: "stack", label: "MERN Web Apps", sub: "Node · MongoDB" },
  { icon: "search", label: "SEO & Ads", sub: "Google · Meta" },
  { icon: "layers", label: "Social Media", sub: "IG · TikTok · LinkedIn" },
  { icon: "pen", label: "Graphic Design", sub: "Logos · Creatives" },
  { icon: "play", label: "Video Editing", sub: "Reels · YouTube" },
];

export function AboutHero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.set("[data-intro-hide]", { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from("[data-a]", { y: 28, opacity: 0, stagger: 0.08, duration: 1 })
          .from("[data-a-visual]", { y: 40, opacity: 0, duration: 1.2 }, 0.15)
          .from("[data-cap]", { y: 14, opacity: 0, scale: 0.94, stagger: 0.06, duration: 0.5, ease: "back.out(1.8)" }, 0.45);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-wash relative overflow-hidden pt-28 pb-20 md:pb-24">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_30%_30%,#000,transparent)]" />
      <div data-intro-hide className="container-x relative">
        <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 data-a className="display text-[clamp(2.5rem,5vw,4.2rem)]">
              <span className="text-outline-red">Small</span> Team.<br />Serious <span className="text-accent">Results.</span>
            </h1>
            <p data-a className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">
              A full-service digital agency where developers, designers, video editors and marketers work as one team —
              so your website, content and ads are planned together and push in the same direction.
            </p>

            <ul data-a className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              {capabilities.map((c) => (
                <li
                  key={c.label}
                  data-cap
                  className="group relative overflow-hidden rounded-2xl border border-line bg-white px-3 py-3 shadow-[0_12px_30px_-24px_rgba(4,31,115,0.5)] hover:border-accent/50"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#1b6fff] to-[#9cc3ff] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="flex items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-white shadow-[0_8px_18px_-8px_rgba(43,124,255,0.9)]">
                      <LineIcon name={c.icon} className="size-[18px]" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[13px] font-extrabold text-fg">{c.label}</span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-mute">{c.sub}</span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div data-a className="mt-6 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-line bg-white/90 p-4 shadow-[0_18px_40px_-30px_rgba(4,31,115,0.55)] backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex -space-x-3" aria-hidden>
                  {siteConfig.founders.map((f) => (
                    <span key={f.name} className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#041f73] to-[#2b7cff] font-extrabold text-white ring-[3px] ring-white">{f.initials}</span>
                  ))}
                </span>
                <p className="text-[13.5px] leading-snug">
                  <span className="block font-extrabold text-fg">{siteConfig.founders.map((f) => f.name).join(" & ")}</span>
                  <span className="block text-mute">Founders &amp; owners</span>
                </p>
              </div>
              
              <ul className="flex flex-col gap-1.5 text-[12.5px] font-semibold sm:ml-auto">
                <li className="flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-accent"><LineIcon name="pin" className="size-3.5" /> {siteConfig.location}</li>
                <li className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700"><LineIcon name="clock" className="size-3.5" /> Reply within 24h</li>
              </ul>
            </div>
          </div>

          <div data-a-visual className="relative pb-10">
            <StudioBanner />
            <dl className="absolute bottom-0 left-1/2 z-10 grid w-[88%] -translate-x-1/2 grid-cols-4 divide-x divide-line rounded-2xl border border-line bg-page py-4 shadow-xl">
              {aboutHero.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse items-center px-2 text-center">
                  <dt className="text-[11px] text-mute">{s.label}</dt>
                  <dd className="text-xl font-extrabold text-accent md:text-2xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
