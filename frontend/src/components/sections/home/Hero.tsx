"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList, Hollow, Red } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/ui/Logo";
import { LineIcon } from "@/components/ui/LineIcon";

/** Home hero — light blue wash, heavy three-line headline (outline · red outline · solid · blue), photo right. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-intro-hide]", { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-h]", { y: 34, opacity: 0, stagger: 0.08, duration: 1 })
          .from("[data-card]", { opacity: 0, duration: 0.9, ease: "power2.out" }, 0.1)
          // card contents load top → bottom
          .from("[data-card-top] > *", { y: -18, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }, 0.3)
          .from("[data-step]", { y: -16, opacity: 0, stagger: 0.14, duration: 0.6, ease: "power3.out" }, 0.6)
          .from("[data-tick]", { scale: 0, stagger: 0.14, duration: 0.45, ease: "back.out(3)" }, 0.85)
          .from("[data-chip]", { y: 16, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.7);
        gsap.to("[data-orbit]", { rotate: 360, duration: 60, ease: "none", repeat: -1 });
        // radar pulse around the rocket
        gsap.fromTo("[data-pulse]", { scale: 1, opacity: 0.7 }, { scale: 1.7, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.9 });
        gsap.to("[data-float]", { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Introduction" className="hero-wash relative overflow-hidden pt-[128px] pb-20 lg:pt-[150px] lg:pb-28">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-50 [mask-image:radial-gradient(60%_60%_at_70%_40%,#000,transparent)]" />
      <div data-intro-hide className="container-x relative grid items-center gap-14 lg:grid-cols-[1.08fr_1fr]">
        <div>
          <h1 className="display h1-display text-fg">
            <span data-h className="block"><Hollow>Full</Hollow> <Red>Stack,</Red></span>
            <span data-h className="block">Web &amp; Marketing</span>
            <span data-h className="block text-accent">Agency.</span>
          </h1>
          <p data-h className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">{hero.description}</p>
          <div data-h className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" size="lg" arrow>Free Strategy Call</ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">Our Services</ButtonLink>
          </div>
          <div data-h><CheckList className="mt-8" items={hero.checklist} /></div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

/** Chip floating around the hero card. */
function Chip({ icon, title, text, className }: { icon: string; title: string; text: string; className: string }) {
  return (
    <div data-chip className={`absolute z-20 hidden sm:block ${className}`}>
      <div data-float className="flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[0_20px_45px_-22px_rgba(4,31,115,0.45)] backdrop-blur">
        <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent"><LineIcon name={icon} /></span>
        <span className="leading-tight">
          <span className="block text-[14px] font-bold text-fg">{title}</span>
          <span className="block text-[12px] text-mute">{text}</span>
        </span>
      </div>
    </div>
  );
}

/** Product-style roadmap card (replaces the stock photo) — all in the brand blues. */
function HeroCard() {
  const c = hero.card;
  const cardRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  /** On hover the (otherwise still) card plays a top → bottom "progress" sweep through its steps. */
  const play = () => {
    if (busy.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cardRef.current) return;
    busy.current = true;
    const q = gsap.utils.selector(cardRef.current);
    gsap
      .timeline({ onComplete: () => void (busy.current = false) })
      .to(q("[data-rocket]"), { y: -6, rotate: -12, duration: 0.35, ease: "power2.out" }, 0)
      .to(q("[data-rocket]"), { y: 0, rotate: 0, duration: 0.5, ease: "back.out(2.5)" }, 0.35)
      .to(q("[data-step]"), { backgroundColor: "#eff4ff", borderColor: "rgba(43,124,255,0.5)", duration: 0.25, stagger: 0.12, ease: "power1.out" }, 0.1)
      .fromTo(q("[data-tick]"), { scale: 0.4 }, { scale: 1, duration: 0.45, stagger: 0.12, ease: "back.out(3)" }, 0.15)
      .to(q("[data-step]"), { backgroundColor: "#ffffff", borderColor: "#e7e7e7", duration: 0.5, stagger: 0.12, ease: "power1.inOut" }, 0.55)
      .set(q("[data-step]"), { clearProps: "backgroundColor,borderColor" });
  };
  return (
    <div className="relative mx-auto w-full max-w-[540px] py-10 sm:px-6">
      {/* decorative orbit + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <div data-orbit className="size-[118%] rounded-full border border-dashed border-accent/25" />
        <div className="absolute size-[80%] rounded-full bg-[radial-gradient(circle,rgb(43_124_255/0.18),transparent_70%)]" />
      </div>

      <div
        ref={cardRef}
        data-card
        onMouseEnter={play}
        className="relative z-10 rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_40px_80px_-40px_rgba(4,31,115,0.55)] ring-1 ring-line backdrop-blur transition-shadow duration-500 hover:shadow-[0_50px_90px_-40px_rgba(43,124,255,0.6)] sm:p-6"
      >
        <div data-card-top>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <div className="leading-tight">
              <p className="text-[15.5px] font-bold text-fg">{c.title}</p>
              <p className="text-[12.5px] text-mute">{c.sub}</p>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[12px] font-bold text-accent">
            <i className="size-1.5 rounded-full bg-accent" aria-hidden /> {c.badge}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-5 rounded-2xl border border-accent/15 bg-gradient-to-br from-surface-2 to-white p-5">
          <span className="relative grid size-[72px] shrink-0 place-items-center rounded-full border-2 border-dashed border-accent/40">
            <span data-pulse aria-hidden className="absolute inset-1 rounded-full border-2 border-accent/50" />
            <span data-pulse aria-hidden className="absolute inset-1 rounded-full border-2 border-accent/50" />
            <span data-rocket className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-white blue-glow">
              <LineIcon name="rocket" className="size-6" />
            </span>
          </span>
          <div>
            <p className="text-[18px] leading-tight font-bold text-fg">{c.highlight.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-mute">{c.highlight.text}</p>
          </div>
        </div>
        </div>

        <ol className="mt-4 space-y-2.5">
          {c.steps.map((s) => (
            <li data-step key={s.title} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5 transition-colors hover:border-accent/40">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><LineIcon name={s.icon} className="size-[18px]" /></span>
              <span className="flex-1 text-[14px] font-semibold text-fg">{s.title}</span>
              <span className="hidden text-[12px] text-mute sm:inline">{s.tag}</span>
              <span data-tick className="grid size-5 place-items-center rounded-full bg-accent text-white"><LineIcon name="check" className="size-3" /></span>
            </li>
          ))}
        </ol>
      </div>

      <Chip {...c.chips.top} className="-top-1 left-0 sm:-left-4" />
      <Chip {...c.chips.left} className="-bottom-2 left-0 sm:-left-6" />
      <Chip {...c.chips.right} className="right-0 -bottom-2 sm:-right-6" />
    </div>
  );
}
