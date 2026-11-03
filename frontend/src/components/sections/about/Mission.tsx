"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutPage } from "@/content/about";
import { ButtonLink } from "@/components/ui/Button";
import { LineIcon } from "@/components/ui/LineIcon";
import { LogoMark } from "@/components/ui/Logo";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";

/** The two usual options vs. the Axiom way — the comparison the mission text describes. */
const options = [
  {
    name: "Cheap freelancers",
    icon: "user",
    cons: ["Disappear after launch", "One skill, no strategy", "No reporting or support"],
  },
  {
    name: "Big agencies",
    icon: "building",
    cons: ["Huge retainers & long contracts", "Junior staff on your project", "Slow, layered communication"],
  },
];
const ours = ["Senior team, fair & clear pricing", "Website, content & ads planned together", "Monthly numbers, no lock-in"];

export function Mission() {
  const root = useRef<HTMLElement>(null);
  const { mission } = aboutPage;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: "[data-ms-grid]", start: "top 78%", once: true };
        gsap.from("[data-ms-intro] > *", { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
        gsap.from("[data-ms-opt]", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: st });
        gsap.from("[data-ms-ours]", { y: 60, opacity: 0, scale: 0.95, duration: 1, delay: 0.35, ease: "back.out(1.4)", scrollTrigger: st });
        gsap.from("[data-ms-x]", { scale: 0, duration: 0.4, stagger: 0.08, delay: 0.5, ease: "back.out(3)", scrollTrigger: st });
        gsap.from("[data-ms-check]", { scale: 0, rotate: -90, duration: 0.5, stagger: 0.12, delay: 0.9, ease: "back.out(3)", scrollTrigger: st });
        gsap.from("[data-ms-vs]", { scale: 0, duration: 0.5, delay: 0.6, ease: "back.out(2.5)", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Our mission" className="bg-surface py-24">
      <div className="container-x">
        <div data-ms-intro className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Our mission</Eyebrow>
          <h2 className="display mt-4 h2-display">
            {mission.title[0]} <Accent>{mission.title[1]}</Accent>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-mute">{mission.text}</p>
        </div>

        <div data-ms-grid className="relative mx-auto mt-14 grid max-w-6xl items-stretch gap-5 lg:grid-cols-[1fr_1fr_1.25fr]">
          {options.map((o) => (
            <div key={o.name} data-ms-opt className="rounded-3xl border border-line bg-white/70 p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-mute"><LineIcon name={o.icon} /></span>
                <div>
                  <p className="text-[12px] font-bold tracking-wider text-mute uppercase">Option</p>
                  <p className="text-[18px] font-bold text-fg/80">{o.name}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3.5">
                {o.cons.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[14.5px] text-mute">
                    <span data-ms-x className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-50 text-[11px] font-bold text-red-500">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-ms-ours className="relative overflow-hidden rounded-3xl bg-[linear-gradient(140deg,#020b2f_0%,#041f73_60%,#1b6fff_130%)] p-7 text-white shadow-[0_40px_80px_-40px_rgba(4,31,115,0.8)] lg:-my-4 lg:p-8">
            <span aria-hidden className="absolute -right-14 -bottom-16 size-52 rounded-full border-[32px] border-white/5" />
            <span data-ms-vs className="absolute top-5 right-5 rounded-full bg-[#2b7cff] px-3 py-1 text-[11px] font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(59,137,255,0.6)]">The third option</span>
            <div className="relative flex items-center gap-3">
              <LogoMark className="size-11" />
              <div>
                <p className="text-[12px] font-bold tracking-wider text-[#9cc3ff] uppercase">Our way</p>
                <p className="text-[20px] font-bold">Axiom Digital Studio</p>
              </div>
            </div>
            <ul className="relative mt-6 space-y-3.5">
              {ours.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] font-semibold">
                  <span data-ms-check className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#041f73]">
                    <LineIcon name="check" className="size-3.5" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="relative mt-8">
              <ButtonLink href="/contact" variant="white" arrow>Start a project</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
