"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutPage } from "@/content/about";
import { LineIcon } from "@/components/ui/LineIcon";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { BrandKitBanner } from "@/components/visuals/BrandKitBanner";

const icons = ["shield", "layers", "search"];

/** "What makes us different": animated value cards + an animated brand-kit banner. */
export function Different() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-dc]", {
          y: 40,
          x: (i) => (i % 2 ? 24 : -24),
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: "[data-dc-grid]", start: "top 80%", once: true },
        });
        gsap.from("[data-dc-num]", {
          scale: 0,
          rotate: -180,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.25,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: "[data-dc-grid]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="What makes us different" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading eyebrow="What makes us different" title={<>Honest. Fast. <Accent>Measurable.</Accent></>} />
        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div data-dc-grid className="grid gap-4 sm:grid-cols-2">
            {aboutPage.different.map((d, i) => (
              <div key={d.title} data-dc>
              <article className="group h-full rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_45px_-30px_rgba(43,124,255,0.6)]">
                <div className="flex items-center justify-between">
                  <span data-dc-num className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white">
                    <LineIcon name={icons[i] ?? "check"} />
                  </span>
                  <span className="text-[28px] leading-none font-bold text-fg/10">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-[17px] font-bold">{d.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{d.text}</p>
              </article>
              </div>
            ))}
            <article data-dc className="relative overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#020b2f_0%,#041f73_65%,#1b6fff_140%)] p-6 text-white">
              <span aria-hidden className="absolute -right-10 -bottom-12 size-36 rounded-full border-[22px] border-white/5" />
              <span data-dc-num className="relative grid size-11 place-items-center rounded-xl bg-white/10 text-[#9cc3ff] ring-1 ring-white/20">
                <LineIcon name="bolt" />
              </span>
              <h3 className="relative mt-5 text-[17px] font-bold">Why “Axiom”?</h3>
              <p className="relative mt-1.5 text-[14px] leading-relaxed text-white/70">{aboutPage.nameStory}</p>
            </article>
          </div>
          <BrandKitBanner />
        </div>
      </div>
    </section>
  );
}
