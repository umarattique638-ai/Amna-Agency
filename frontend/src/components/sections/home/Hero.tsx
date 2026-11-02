"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList, Eyebrow, Hollow, Red } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";

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
          .from("[data-photo]", { y: 40, opacity: 0, scale: 0.97, duration: 1.3 }, 0.1)
          .from("[data-chip]", { y: 16, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.6);
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
          <span data-h className="block"><Eyebrow>{hero.eyebrow}</Eyebrow></span>
          <h1 className="display mt-5 text-[clamp(2.7rem,6.2vw,5.4rem)] text-fg">
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

        <div className="relative">
          <div data-photo className="relative aspect-[5/4.4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(4,31,115,0.55)]">
            <Photo photo={hero.photo} priority sizes="(max-width: 1024px) 100vw, 46vw" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
          </div>

          {/* floating cards */}
          <div data-chip className="absolute left-2 top-10 sm:-left-10">
            <div data-float className="rounded-2xl bg-[#0b1530] p-4 font-mono text-[12px] leading-relaxed text-white shadow-[0_25px_50px_-20px_rgba(2,11,47,0.8)]">
              <p className="mb-2 flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></p>
              <p><span className="text-[#c792ea]">const</span> stack = [</p>
              <p className="pl-4 text-[#9cc3ff]">&quot;React&quot;, &quot;Next.js&quot;,</p>
              <p className="pl-4 text-[#9cc3ff]">&quot;Node&quot;, &quot;Express&quot;,</p>
              <p className="pl-4 text-[#9cc3ff]">&quot;MongoDB&quot;, &quot;Tailwind&quot;</p>
              <p>];</p>
            </div>
          </div>
          <div data-chip className="absolute right-2 bottom-24 sm:-right-8">
            <div data-float className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_45px_-20px_rgba(4,31,115,0.45)]">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-lg font-black text-accent">↗</span>
              <span className="leading-tight">
                <span className="block text-[14px] font-bold">SEO · Ads · Social</span>
                <span className="block text-[12px] text-mute">Growth after launch</span>
              </span>
            </div>
          </div>
          <div data-chip className="absolute bottom-6 left-6">
            <div className="flex flex-wrap gap-2">
              {["Design", "Video", "Branding"].map((t) => (
                <span key={t} className="rounded-full bg-white/95 px-3.5 py-1.5 text-[12.5px] font-bold text-navy shadow">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
