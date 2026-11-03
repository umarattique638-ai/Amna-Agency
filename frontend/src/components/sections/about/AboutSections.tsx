import { aboutPage, teams } from "@/content/about";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LineIcon } from "@/components/ui/LineIcon";
import { LogoMark } from "@/components/ui/Logo";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";



export function WhatWeDo() {
  return (
    <section aria-label="What we do" className="bg-page py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={<>We build, design, film and market.<br /><Accent>So you can run your business.</Accent></>}
          description="Four disciplines under one roof — planned together, so your website, content and ads all push in the same direction."
        />
        <Reveal stagger className="relative mt-12 grid gap-5 overflow-hidden rounded-[28px] bg-[#dce9ff] p-5 sm:grid-cols-2 md:p-8 lg:grid-cols-4">
          {aboutPage.whatWeDo.map((c, i) => (
            <article key={c.title} className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-accent/60 bg-white/70 px-6 pt-10 pb-8 text-center backdrop-blur transition-[background-color,box-shadow,border-color] duration-300 hover:border-accent hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(43,124,255,0.7)]">
              {i === aboutPage.whatWeDo.length - 1 && (
                <span aria-hidden className="pointer-events-none absolute -right-10 -bottom-10 opacity-[0.07]"><LogoMark className="size-44" /></span>
              )}
              <span className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                <LineIcon name={c.icon} className="size-9" />
              </span>
              <h3 className="mt-6 text-[20px] font-bold text-fg">{c.title}</h3>
              <p className="mt-2.5 flex-1 text-[15.5px] leading-relaxed text-mute">{c.text}</p>
              <Link href={c.link.href} className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-accent">
                {c.link.label} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}



export function TeamsSection() {
  return (
    <section aria-label="Our teams" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Our teams" title={<>Specialist teams, <Accent>one goal</Accent>.</>} description="Specialists who work side by side on every project, so nothing gets lost between agencies." />
        <Reveal as="ul" stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {teams.map((t) => (
            <li key={t.name} className="flex flex-col rounded-2xl border border-line bg-page p-7 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(28,31,48,0.45)]">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-white">{t.icon}</span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">{t.count}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{t.name}</h3>
              <p className="mt-2 text-sm text-mute">{t.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {t.skills.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1 text-xs font-medium">{s}</li>)}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}


