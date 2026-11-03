"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { story } from "@/content/about";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

/** Milestone timeline: the line draws itself, each year pops in and counts up as it is reached. */
export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: "[data-tl]", start: "top 80%", once: true };
        gsap.from("[data-tl-line]", { scaleX: 0, transformOrigin: "left center", duration: 1.8, ease: "power2.inOut", scrollTrigger: st });
        gsap.from("[data-tl-line-v]", { scaleY: 0, transformOrigin: "top center", duration: 1.8, ease: "power2.inOut", scrollTrigger: st });
        gsap.utils.toArray<HTMLElement>("[data-ms]").forEach((el, i) => {
          const at = 0.2 + i * 0.42;
          const yearEl = el.querySelector<HTMLElement>("[data-year]")!;
          const end = Number(yearEl.dataset.year);
          gsap.from(el.querySelector("[data-node]"), { scale: 0, duration: 0.55, ease: "back.out(2.6)", delay: at, scrollTrigger: st });
          gsap.from(el.querySelector("[data-tl-card]"), { y: 26, autoAlpha: 0, duration: 0.7, ease: "power3.out", delay: at + 0.1, scrollTrigger: st, clearProps: "transform" });
          gsap.from(yearEl, {
            textContent: end - 6,
            duration: 0.8,
            ease: "power2.out",
            delay: at + 0.1,
            snap: { textContent: 1 },
            scrollTrigger: st,
          });
        });
        gsap.to("[data-node-pulse]", { scale: 2, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.45, delay: 2.2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Our journey" className="bg-page py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Our journey" title={<>From Two Freelancers to a <Accent>Full-Service Team.</Accent></>} description={story.paragraphs[1]} />

        <ol data-tl className="relative mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-4 md:gap-5">
          {/* connector: horizontal on desktop, vertical on mobile */}
          <span aria-hidden className="absolute top-[22px] right-[12.5%] left-[12.5%] hidden h-[3px] overflow-hidden rounded-full bg-accent/10 md:block">
            <span data-tl-line className="block h-full w-full bg-gradient-to-r from-[#1b6fff] to-[#3b89ff]" />
          </span>
          <span aria-hidden className="absolute top-2 bottom-2 left-[21px] w-[3px] overflow-hidden rounded-full bg-accent/10 md:hidden">
            <span data-tl-line-v className="block h-full w-full bg-gradient-to-b from-[#1b6fff] to-[#3b89ff]" />
          </span>

          {story.milestones.map((m, i) => (
            <li key={m.year} data-ms className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
              <span data-node className="relative grid size-11 shrink-0 place-items-center">
                <span data-node-pulse aria-hidden className="absolute inset-0 rounded-full bg-accent/30" />
                <span className="relative grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-[13px] font-bold text-white ring-[5px] ring-page blue-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <div data-tl-card className="group flex-1 rounded-2xl border border-line bg-white p-5 transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-[0_22px_45px_-30px_rgba(43,124,255,0.6)] md:mt-6 md:w-full">
                <p data-year={m.year} className="text-[30px] leading-none font-bold tracking-tight text-accent tabular-nums">{m.year}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mute">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
