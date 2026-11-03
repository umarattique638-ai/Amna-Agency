"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { SiExpress, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
import { gsap, useGSAP } from "@/lib/gsap";
import { stackTiles } from "@/content/home";
import { Accent, Red, SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<(typeof stackTiles)[number]["icon"], IconType> = {
  react: SiReact,
  next: SiNextdotjs,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  redux: SiRedux,
};

/** The development stack as animated tiles — makes the "web development agency" message unmistakable. */
export function StackSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-tile]", {
          y: 40,
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "back.out(1.6)",
          stagger: { each: 0.07, from: "start" },
          clearProps: "transform", // hand transforms back to the CSS hover styles
          scrollTrigger: { trigger: "[data-grid]", start: "top 85%", once: true },
        });
        gsap.from("[data-icon]", {
          rotate: -90,
          scale: 0,
          duration: 0.7,
          ease: "back.out(2.2)",
          stagger: 0.07,
          delay: 0.25,
          scrollTrigger: { trigger: "[data-grid]", start: "top 85%", once: true },
        });
        // idle "breathing" of the icons, offset per tile
        gsap.to("[data-icon]", { y: -4, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.25, from: "random" }, delay: 1.2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Technology stack" className="bg-page py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our tech stack"
          title={<>Built With a <Red>Modern</Red> <Accent>Stack.</Accent></>}
          description="Every website and web app is written in TypeScript on the same proven, full-JavaScript stack used by start-ups and global brands."
        />
        <ul data-grid className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stackTiles.map((t) => {
            const Icon = ICONS[t.icon];
            return (
              <li
                key={t.name}
                data-tile
                style={{ "--brand": t.color } as React.CSSProperties}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand)_45%,white)] hover:shadow-[0_24px_45px_-28px_var(--brand)]"
              >
                {/* brand-tinted glow that appears on hover */}
                <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-[var(--brand)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
                <div className="relative flex items-center gap-4">
                  <span data-icon className="shrink-0">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,white)] text-[var(--brand)] ring-1 ring-[color-mix(in_srgb,var(--brand)_22%,white)] transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
                  >
                    <Icon className="size-7" aria-hidden />
                  </span>
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[17px] font-bold text-fg">{t.name}</span>
                    <span className="block text-[13px] text-mute">{t.role}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
