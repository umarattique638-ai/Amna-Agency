"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { processSteps } from "@/content/home";
import { LineIcon } from "@/components/ui/LineIcon";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

/** 4-step process: the connecting line draws itself and each step lights up as it is reached. */
export function ProcessSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true },
        });
        tl.from("[data-line]", { scaleX: 0, transformOrigin: "left center", duration: 1.6, ease: "power2.inOut" }, 0);
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
          const at = 0.15 + i * 0.4;
          tl.from(step.querySelector("[data-dot]"), { scale: 0, rotate: -120, duration: 0.6, ease: "back.out(2.4)" }, at)
            .from(step.querySelectorAll("[data-text]"), { y: 18, opacity: 0, duration: 0.6, stagger: 0.06 }, at + 0.15)
            .fromTo(step.querySelector("[data-ring]"), { scale: 0.8, opacity: 0.8 }, { scale: 1.8, opacity: 0, duration: 1 }, at + 0.1);
        });
        // continuous soft pulse travelling 1 → 4
        gsap.fromTo("[data-pulse]", { scale: 1, opacity: 0.45 }, { scale: 1.7, opacity: 0, duration: 1.6, ease: "power1.out", repeat: -1, stagger: { each: 0.4, repeat: -1 }, delay: 2.4 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="How we work" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading eyebrow="How we work" title={<>A Simple, <Accent>Proven Process.</Accent></>} />
        <ol data-steps className="relative mt-16 grid gap-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {/* connector (desktop) */}
          <span aria-hidden className="absolute top-9 right-[12.5%] left-[12.5%] hidden h-[3px] overflow-hidden rounded-full bg-accent/10 lg:block">
            <span data-line className="block h-full w-full bg-gradient-to-r from-[#1b6fff] via-[#3b89ff] to-[#1b6fff]" />
          </span>
          {processSteps.map((s) => (
            <li key={s.n} data-step className="group relative text-center">
              <div data-dot className="relative mx-auto size-[72px]">
                <span data-ring aria-hidden className="absolute inset-0 rounded-full border-2 border-accent/50" />
                <span data-pulse aria-hidden className="absolute inset-0 rounded-full bg-accent/25" />
                <span className="relative grid size-full place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-white ring-[6px] ring-surface blue-glow transition-transform duration-300 group-hover:scale-110">
                  <LineIcon name={s.icon} className="size-7" />
                </span>
                <span className="absolute -top-1 -right-2 grid size-7 place-items-center rounded-full bg-white text-[11px] font-bold text-accent shadow-md ring-1 ring-line">{s.n}</span>
              </div>
              <h3 data-text className="mt-6 text-[19px] font-bold">{s.title}</h3>
              <p data-text className="mx-auto mt-2 max-w-[16rem] text-[14.5px] leading-relaxed text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
