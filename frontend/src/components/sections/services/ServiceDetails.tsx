import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn, pad } from "@/lib/utils";
import type { ServiceItem } from "@/types";
import { VideoCard } from "@/components/ui/VideoCard";
import { promoVideo } from "@/content/videos";

/** One row per service (from the database), alternating photo side. */
export function ServiceDetails({ services }: { services: ServiceItem[] }) {
  return (
    <div className="bg-page">
      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.slug} aria-labelledby={`${s.slug}-title`} className={cn("scroll-mt-36 py-20 md:py-24", flip && "bg-surface")}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn("relative", flip && "lg:order-2")}>
                <div aria-hidden className={cn("absolute -inset-4 rounded-[36px] bg-gradient-to-br from-accent/20 to-[#9cc3ff]/10 blur-2xl", flip ? "-rotate-2" : "rotate-2")} />
                {s.slug === "video-editing" ? (
                  <VideoCard clip={promoVideo} caption={false} className="relative" />
                ) : (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(6,13,31,0.5)] transition-shadow duration-700 hover:shadow-[0_50px_90px_-40px_rgba(43,124,255,0.55)]">
                  <Photo
                    photo={{ src: s.image, alt: s.imageAlt || s.title }}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="scale-100 transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  {s.highlightValue && (
                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5">
                      <p className="text-3xl leading-none font-bold tracking-tight text-accent">{s.highlightValue}</p>
                      <p className="mt-1 text-xs text-mute">{s.highlightLabel}</p>
                    </div>
                  )}
                </div>
                )}
              </Reveal>

              <Reveal stagger>
                <p className="text-sm font-semibold text-accent">{pad(i + 1)} — Service</p>
                <h2 id={`${s.slug}-title`} className="display mt-3 h2-display">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-mute">{s.description}</p>
                {s.deliverables.length > 0 && (
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm font-medium">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[10px] font-bold text-accent">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-10">
                  <ButtonLink href="/contact" variant="solid">Get a quote</ButtonLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
