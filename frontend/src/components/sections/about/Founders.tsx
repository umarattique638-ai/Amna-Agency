"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { aboutPage } from "@/content/about";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";

const names = siteConfig.founders.map((f) => f.name).join(" & ");

/** Owners section: intro + founders' note on the left, profile cards on the right. */
export function Founders() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 75%", once: true };
        gsap.from("[data-f-intro] > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: st });
        gsap.from("[data-f-card]", { y: 50, opacity: 0, rotate: (i) => (i ? 2 : -2), duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: st, clearProps: "transform" });
        gsap.from("[data-f-avatar]", { scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "back.out(2)", scrollTrigger: st });
        gsap.to("[data-f-orbit]", { scale: 1.08, opacity: 0.35, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Meet the founders" className="relative overflow-hidden bg-surface py-24 lg:py-28">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(50%_60%_at_80%_40%,#000,transparent)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* intro + note */}
        <div data-f-intro>
          <Eyebrow>Meet the founders</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2.2rem,4.2vw,3.5rem)]">
            The People <Accent>Behind Axiom.</Accent>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-mute">
            {siteConfig.legalName} is owned and run by <b className="text-fg">{names}</b>. You work with them directly — not with an account manager who passes messages along.
          </p>

          <figure className="relative mt-9 rounded-3xl bg-[linear-gradient(140deg,#020b2f_0%,#041f73_65%,#1b6fff_140%)] p-7 text-white shadow-[0_30px_60px_-35px_rgba(4,31,115,0.8)] md:p-8">
            <span aria-hidden className="absolute -top-5 left-7 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] font-serif text-3xl leading-none blue-glow">“</span>
            <blockquote className="text-[16.5px] leading-relaxed font-medium text-white/90">{aboutPage.founderQuote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex -space-x-2.5" aria-hidden>
                {siteConfig.founders.map((f) => (
                  <span key={f.name} className="grid size-9 place-items-center rounded-full bg-white text-sm font-extrabold text-navy ring-2 ring-[#041f73]">{f.initials}</span>
                ))}
              </span>
              <span className="text-[14px] leading-tight">
                <span className="block font-bold">{names}</span>
                <span className="block text-white/60">Founders, {siteConfig.legalName}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* profile cards */}
        <ul className="grid gap-6 sm:grid-cols-2">
          {siteConfig.founders.map((f, i) => (
            <li key={f.name} data-f-card className={i === 1 ? "sm:mt-12" : undefined}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_60px_-45px_rgba(4,31,115,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_35px_70px_-40px_rgba(43,124,255,0.7)]">
                <div className="navy-gradient relative h-28 overflow-hidden">
                  <span aria-hidden className="absolute -right-8 -bottom-12 size-36 rounded-full border-[22px] border-white/5" />
                  <span aria-hidden className="absolute top-4 left-5 text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">Founder 0{i + 1}</span>
                </div>
                <div className="relative px-6 pb-7">
                  <div data-f-avatar className="relative -mt-12 size-24">
                    <span data-f-orbit aria-hidden className="absolute -inset-1.5 rounded-[1.6rem] border-2 border-dashed border-accent/40" />
                    <span className="relative grid size-24 place-items-center rounded-[1.4rem] bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-4xl font-extrabold text-white ring-4 ring-white blue-glow">
                      {f.initials}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[24px] font-extrabold tracking-tight">{f.name}</h3>
                  <p className="mt-1 inline-flex rounded-full bg-accent-soft px-3 py-1 text-[12px] font-bold text-accent">{f.role}</p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-mute">{f.bio}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {f.focus.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-[12px] font-semibold text-fg/70">{t}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold text-accent">
                    Talk to {f.name} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
