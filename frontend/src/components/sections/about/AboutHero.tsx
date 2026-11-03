"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutHero } from "@/content/about";
import { StudioBanner } from "@/components/visuals/StudioBanner";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";


export function AboutHero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.set("[data-intro-hide]", { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from("[data-a]", { y: 28, opacity: 0, stagger: 0.08, duration: 1 })
          .from("[data-a-visual]", { y: 40, opacity: 0, duration: 1.2 }, 0.15);
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
            <p data-a className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[14px] font-semibold text-fg/80 shadow-sm ring-1 ring-line backdrop-blur">
              <span className="flex -space-x-1.5" aria-hidden>
                {siteConfig.founders.map((f) => (
                  <span key={f.name} className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-[#041f73] to-[#2b7cff] text-[11px] font-bold text-white ring-2 ring-white">{f.initials}</span>
                ))}
              </span>
              Founded by {siteConfig.founders.map((f) => f.name).join(" & ")} · Since 2019
            </p>
            <h1 data-a className="display h1-display mt-6">
              We Help Businesses <span className="text-outline-red">Grow</span> <span className="text-accent">Online.</span>
            </h1>
            <p data-a className="mt-6 max-w-xl text-[18px] leading-relaxed text-mute">
              {siteConfig.legalName} is a full-service digital agency from {siteConfig.location.split("·")[0]?.trim()}. We design and build
              fast websites, then grow them with marketing, social media, graphic design and video — all handled by one team that
              treats your business like our own.
            </p>


            <div data-a className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg" arrow>Work With Us</ButtonLink>
              <ButtonLink href="/services" variant="ghost" size="lg">Our Services</ButtonLink>
            </div>
          </div>

          <div data-a-visual className="relative pb-10">
            <StudioBanner />
            <dl className="absolute bottom-0 left-1/2 z-10 grid w-[88%] -translate-x-1/2 grid-cols-4 divide-x divide-line rounded-2xl border border-line bg-page py-4 shadow-xl">
              {aboutHero.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse items-center px-2 text-center">
                  <dt className="text-[11px] text-mute">{s.label}</dt>
                  <dd className="text-xl font-bold text-accent md:text-2xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
