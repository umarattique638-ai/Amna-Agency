"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { whyChoose } from "@/content/home";
import { Accent, Eyebrow, Red } from "@/components/ui/SectionHeading";
import { LineIcon } from "@/components/ui/LineIcon";

/** Why choose us — features slide in from the left, the numbered cards drop in top → bottom along a drawing rail. */
export function WhyChoose() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 72%", once: true };
        gsap.from("[data-wc-intro] > *", { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: st });
        gsap.from("[data-wc-feat]", { x: -30, opacity: 0, duration: 0.7, stagger: 0.14, delay: 0.35, ease: "power3.out", scrollTrigger: st });

        const tl = gsap.timeline({ scrollTrigger: st, delay: 0.2 });
        tl.from("[data-wc-rail]", { scaleY: 0, transformOrigin: "top center", duration: 1.6, ease: "power2.inOut" }, 0);
        gsap.utils.toArray<HTMLElement>("[data-wc-card]").forEach((card, i) => {
          const at = 0.15 + i * 0.45;
          const num = card.querySelector<HTMLElement>("[data-wc-num]")!;
          tl.from(card.querySelector("[data-wc-node]"), { scale: 0, duration: 0.45, ease: "back.out(3)" }, at)
            .from(card, { y: -40, opacity: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" }, at)
            .from(num, { textContent: 0, duration: 0.6, ease: "power1.out", snap: { textContent: 1 }, onUpdate: () => void (num.textContent = num.textContent!.padStart(2, "0")) }, at + 0.1)
            .fromTo(card.querySelector("[data-wc-glow]"), { opacity: 0.9 }, { opacity: 0, duration: 1.1, ease: "power2.out" }, at + 0.3);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="bg-surface py-24 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <div data-wc-intro>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 id="why-title" className="display mt-4 text-[clamp(2.2rem,4.2vw,3.5rem)]">
              Why Businesses <Red>Trust</Red> <Accent>Our Team.</Accent>
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-mute">
              No juggling three agencies. One accountable team builds your product and markets it — with clean code, honest reporting and quick replies.
            </p>
          </div>
          <ul className="mt-9 space-y-6">
            {whyChoose.features.map((f) => (
              <li key={f.title} data-wc-feat className="group flex gap-4">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-lg font-bold text-white blue-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"><LineIcon name={f.icon} className="size-[22px]" /></span>
                <span>
                  <span className="block text-[17px] font-extrabold">{f.title}</span>
                  <span className="mt-1 block text-[14.5px] text-mute">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="relative space-y-5 pl-8">
          {/* rail that draws top → bottom */}
          <span aria-hidden className="absolute top-6 bottom-6 left-[11px] w-[3px] overflow-hidden rounded-full bg-accent/10">
            <span data-wc-rail className="block h-full w-full bg-gradient-to-b from-[#1b6fff] via-[#3b89ff] to-[#9cc3ff]" />
          </span>
          {whyChoose.cards.map((c) => (
            <li key={c.n} data-wc-card className="group relative">
              <span data-wc-node aria-hidden className="absolute top-1/2 -left-8 grid size-[25px] -translate-y-1/2 place-items-center rounded-full bg-white ring-4 ring-surface">
                <span className="size-3 rounded-full bg-accent" />
              </span>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent/40 group-hover:shadow-[0_25px_50px_-30px_rgba(43,124,255,0.55)]">
                <span data-wc-glow aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-soft to-transparent opacity-0" />
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                <div className="relative flex items-start gap-6">
                  <span data-wc-num className="text-[44px] leading-none font-extrabold text-accent tabular-nums">{c.n}</span>
                  <span>
                    <span className="block text-[19px] font-extrabold">{c.title}</span>
                    <span className="mt-2 block text-[14.5px] leading-relaxed text-mute">{c.text}</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
