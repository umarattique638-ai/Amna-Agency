"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack, stackHotspots } from "@/content/services";
import { DashboardVisual } from "@/components/visuals/DashboardVisual";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading, Accent, Red } from "@/components/ui/SectionHeading";

const reasons = [
  "One language (JavaScript) from database to browser",
  "Fast development — launch sooner, spend less",
  "Scales from a small business site to millions of users",
  "Huge ecosystem: payments, maps, chat, AI and more",
];

/** M-E-R-N explainer with an annotated dashboard. Short timeline that starts as soon as it is visible. */
export function MernStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          })
          .from("[data-dot]", { scale: 0, stagger: 0.06, duration: 0.35, ease: "back.out(3)" }, 0.1)
          .from("[data-leader-h]", { scaleX: 0, stagger: 0.06, duration: 0.3, ease: "power2.inOut" }, 0.2)
          .from("[data-leader-v]", { scaleY: 0, stagger: 0.06, duration: 0.25, ease: "power2.out" }, 0.4)
          .from("[data-callout]", { opacity: 0, y: 10, stagger: 0.06, duration: 0.4 }, 0.5);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="mern-stack" aria-labelledby="mern-title" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Our tech stack"
          title={<>Websites &amp; Apps Built on the <Red>MERN</Red> <Accent>Stack.</Accent></>}
          description="MongoDB, Express.js, React and Node.js — the modern JavaScript stack behind fast, secure and scalable products."
        />

        <Reveal as="ul" stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((item) => (
            <li key={item.letter} className="group relative overflow-hidden rounded-3xl border border-line bg-page p-7 transition-colors hover:border-accent/40">
              <span aria-hidden className="pointer-events-none absolute -top-6 -right-2 text-[9rem] leading-none font-bold tracking-tighter text-accent/10 transition-colors group-hover:text-accent/20">
                {item.letter}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-xl font-bold text-white">{item.letter}</span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight">{item.name}</h3>
              <p className="mt-1 text-xs font-semibold tracking-wide text-accent uppercase">{item.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-mute">{item.description}</p>
            </li>
          ))}
        </Reveal>

        <div ref={root} className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
            <div className="absolute inset-0">
              <DashboardVisual />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
              {stackHotspots.map((h) => {
                const bendX = h.card.x + 2;
                const anchorY = h.card.y + 6;
                return (
                  <div key={h.label}>
                    <span
                      data-leader-h
                      className="absolute h-px bg-fg/40"
                      style={{ left: `${Math.min(h.dot.x, bendX)}%`, width: `${Math.abs(bendX - h.dot.x)}%`, top: `${h.dot.y}%`, transformOrigin: bendX > h.dot.x ? "left" : "right" }}
                    />
                    <span
                      data-leader-v
                      className="absolute w-px bg-fg/40"
                      style={{ left: `${bendX}%`, top: `${Math.min(h.dot.y, anchorY)}%`, height: `${Math.abs(anchorY - h.dot.y)}%`, transformOrigin: anchorY > h.dot.y ? "top" : "bottom" }}
                    />
                  </div>
                );
              })}
            </div>
            {stackHotspots.map((h) => (
              <div key={h.label} className="hidden md:block">
                <span aria-hidden className="absolute -mt-1.5 -ml-1.5 size-3" style={{ left: `${h.dot.x}%`, top: `${h.dot.y}%` }}>
                  <span data-dot className="absolute inset-0 rounded-full bg-accent shadow-[0_0_0_6px_rgba(43,124,255,0.2)]" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
                </span>
                <div
                  data-callout
                  className="absolute flex items-center gap-4 rounded-xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_12px_30px_-12px_rgba(15,16,32,0.25)] backdrop-blur-md"
                  style={{ left: `${h.card.x}%`, top: `${h.card.y}%` }}
                >
                  <div>
                    <p className="text-sm font-semibold">{h.label}</p>
                    <p className="text-xs text-mute">{h.meta}</p>
                  </div>
                  <span className="grid size-6 place-items-center rounded-md bg-accent text-xs text-white">+</span>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="flex flex-col justify-between gap-8 rounded-[28px] bg-fg p-8 text-white">
            <div>
              <p className="label text-white/50">Why MERN?</p>
              <ul className="mt-6 space-y-4">
                {reasons.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px]">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href="/contact" variant="solid" className="self-start">
              Build my MERN app ↗
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
