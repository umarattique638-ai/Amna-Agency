"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutHero } from "@/content/about";
import { StudioBanner } from "@/components/visuals/StudioBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

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
        <nav data-a aria-label="Breadcrumb" className="text-[13px] text-mute">
          <Link href="/" className="hover:text-accent">Home</Link> <span aria-hidden>›</span> <span aria-current="page" className="text-fg">About</span>
        </nav>
        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span data-a><Eyebrow>About Axiom</Eyebrow></span>
            <h1 data-a className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)]">
              <span className="text-outline-red">Small</span> Team.<br />Serious <span className="text-accent">Results.</span>
            </h1>
            <p data-a className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">
              Axiom is a full-service digital agency in Lahore. Our developers, designers and marketers help
              businesses look great online and grow — with <b className="text-fg">React/Next.js &amp; MERN websites</b>,{" "}
              <b className="text-fg">social media</b>, <b className="text-fg">branding</b>, <b className="text-fg">video editing</b> and <b className="text-fg">performance ads</b>.
            </p>
            <div data-a className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="ghost">See services</ButtonLink>
              <ButtonLink href="/contact" arrow>Work with us</ButtonLink>
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
