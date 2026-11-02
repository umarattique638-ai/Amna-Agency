import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow, Red } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { ServiceItem } from "@/types";

/** Services from the API: 2-col card grid left, sticky "From Concept to Completion" copy right. */
export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section aria-labelledby="services-title" className="bg-surface py-24 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal as="ul" stagger className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1">
          {services.map((s) => (
            <li key={s.id}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_25px_50px_-30px_rgba(43,124,255,0.55)]">
                <span className="grid size-14 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <ServiceIcon slug={s.slug} className="size-7" />
                </span>
                <h3 className="mt-6 flex items-start justify-between gap-3 text-[19px] leading-snug font-extrabold">
                  <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0">{s.title}</Link>
                  <span aria-hidden className="text-xl text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-mute">{s.summary}</p>
              </article>
            </li>
          ))}
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal stagger className="lg:sticky lg:top-32">
            <Eyebrow>Our services</Eyebrow>
            <h2 id="services-title" className="display mt-4 text-[clamp(2.3rem,4.4vw,3.7rem)]">
              From <Red>Concept</Red><br />to <Accent>Completion.</Accent>
            </h2>
            <div className="mt-6 grid gap-5 text-[15.5px] leading-relaxed text-mute sm:grid-cols-2">
              <p>Development is our core. We design and build websites, e-commerce stores and custom MERN web apps with React, Next.js, Node.js, Express and Tailwind CSS.</p>
              <p>And because a website needs visitors, the same team handles SEO, Google &amp; Meta ads, social media, graphic design and video editing.</p>
            </div>
            <div className="mt-9"><ButtonLink href="/services" arrow>View All Services</ButtonLink></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
