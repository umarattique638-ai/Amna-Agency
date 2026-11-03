import { techLogos } from "@/content/home";

/** Thin navy strip under the hero listing the stack and tools — CSS marquee, pauses on hover. */
export function TechStrip() {
  const row = [...techLogos, ...techLogos];
  return (
    <section aria-label="Technologies and tools we use" className="navy-gradient overflow-hidden py-5">
      <div className="group flex w-max animate-[marquee_40s_linear_infinite] gap-14 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= techLogos.length} className="flex items-center text-[15px] font-bold whitespace-nowrap text-white/85">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
