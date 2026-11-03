"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutHero } from "@/content/about";
import { StudioBanner } from "@/components/visuals/StudioBanner";
import { LineIcon } from "@/components/ui/LineIcon";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/SectionHeading";

const capabilities = [
  { icon: "code", label: "Web Development" },
  { icon: "stack", label: "MERN Web Apps" },
  { icon: "search", label: "SEO & Ads" },
  { icon: "layers", label: "Social Media" },
  { icon: "pen", label: "Graphic Design" },
  { icon: "play", label: "Video Editing" },
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
            <span data-a><Eyebrow>About Axiom</Eyebrow></span>
            <h1 data-a className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)]">
              <span className="text-outline-red">Small</span> Team.<br />Serious <span className="text-accent">Results.</span>
            </h1>
            <p data-a className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">
              A full-service digital agency where developers, designers, video editors and marketers work as one team —
              so your website, content and ads are planned together and push in the same direction.
            </p>

            <ul data-a className="mt-8 grid max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-3">
              {capabilities.map((c) => (
                <li key={c.label} data-cap className="group flex items-center gap-2.5 rounded-xl border border-line bg-white/80 px-3 py-2.5 backdrop-blur transition-colors hover:border-accent/50">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <LineIcon name={c.icon} className="size-4" />
                  </span>
                  <span className="text-[13px] leading-tight font-bold text-fg">{c.label}</span>
                </li>
              ))}
            </ul>

            <div data-a className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
              <span className="flex -space-x-3" aria-hidden>
                {siteConfig.founders.map((f) => (
                  <span key={f.name} className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] font-extrabold text-white ring-[3px] ring-white">{f.initials}</span>
                ))}
              </span>
              <p className="text-[14px] leading-snug">
                <span className="block text-mute">Founded &amp; led by</span>
                <span className="block font-extrabold text-fg">{siteConfig.founders.map((f) => f.name).join(" & ")}</span>
              </p>
              <span aria-hidden className="mx-1 hidden h-9 w-px bg-line sm:block" />
              <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-mute">
                <LineIcon name="pin" className="size-4 text-accent" /> {siteConfig.location}
              </p>
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
