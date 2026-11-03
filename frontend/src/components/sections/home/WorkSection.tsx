import Link from "next/link";
import { featuredWork } from "@/content/home";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Red, SectionHeading } from "@/components/ui/SectionHeading";

export function WorkSection() {
  return (
    <section aria-label="Our work" className="bg-page py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our portfolio"
          title={<>Our <Red>Work</Red> Speaks <Accent>for Itself.</Accent></>}
          description="A look at the kind of projects we deliver across development, marketing, design and video."
        />
        <Reveal as="ul" stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredWork.map((p) => (
            <li key={p.id}>
              <article className="group relative aspect-[16/11] overflow-hidden rounded-[1.75rem]">
                <Photo photo={p.photo} sizes="(max-width: 768px) 100vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-white">
                  <div>
                    <p className="text-[13px] font-bold tracking-wide text-[#9cc3ff] uppercase">{p.result}</p>
                    <h3 className="mt-1.5 text-[22px] leading-tight font-bold">
                      <Link href="/contact" className="after:absolute after:inset-0">{p.title}</Link>
                    </h3>
                    <p className="mt-1 text-[14px] text-white/70">{p.client}</p>
                  </div>
                  <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-xl font-bold text-navy transition-all group-hover:bg-accent group-hover:text-white">↗</span>
                </div>
              </article>
            </li>
          ))}
        </Reveal>
        <div className="mt-12 text-center"><ButtonLink href="/contact" arrow>Start Your Project</ButtonLink></div>
      </div>
    </section>
  );
}
