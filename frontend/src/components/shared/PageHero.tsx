"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoType } from "@/types";

interface PageHeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  photo?: PhotoType;
  children?: React.ReactNode;
}

/** Inner-page header:, bold title with orange highlight, intro, optional photo. */
export function PageHero({ title, description, photo, children }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.set("[data-intro-hide]", { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from("[data-ph]", { y: 26, opacity: 0, stagger: 0.07, duration: 1 })
          .from("[data-ph-photo]", { y: 40, opacity: 0, duration: 1.2 }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-wash relative overflow-hidden pt-28 pb-10 md:pb-12">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_30%_30%,#000,transparent)]" />
      <div data-intro-hide className="container-x relative">
        <div className={photo ? "mt-6 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]" : "mx-auto mt-8 max-w-3xl text-center"}>
          <div>
            <h1 data-ph className="display h1-display">{title}</h1>
            <p data-ph className={`mt-5 text-[17px] leading-relaxed text-mute ${photo ? "max-w-xl" : "mx-auto max-w-2xl"}`}>{description}</p>
            {children && <div data-ph className="mt-8">{children}</div>}
          </div>
          {photo && (
            <div data-ph-photo className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(28,31,48,0.5)]">
              <Photo photo={photo} priority sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
