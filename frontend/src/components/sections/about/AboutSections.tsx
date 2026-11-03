import { aboutPage, teams } from "@/content/about";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";


export function Mission() {
  const { mission } = aboutPage;
  return (
    <section aria-label="Our mission" className="bg-surface pt-28 pb-24">
      <div className="container-x">
        <Reveal stagger className="mx-auto max-w-3xl text-center">
          <Eyebrow>Our mission</Eyebrow>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">
            {mission.title[0]}
            <br />
            <Accent>{mission.title[1]}</Accent>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-mute">{mission.text}</p>
          <div className="mt-8"><ButtonLink href="/contact" arrow>Start a project</ButtonLink></div>
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-line bg-page shadow-[0_40px_80px_-45px_rgba(28,31,48,0.5)]">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-4 rounded-md bg-surface px-3 py-1 text-[11px] text-mute">axiom.studio/our-team</span>
          </div>
          <div className="relative aspect-[16/7]"><Photo photo={mission.photo} sizes="(max-width: 1200px) 100vw, 1000px" /></div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  return (
    <section aria-label="What we do" className="bg-page py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={<>We build, design, film and market.<br /><Accent>So you can run your business.</Accent></>}
          description="Three disciplines under one roof — planned together, so your website, content and ads all push in the same direction."
        />
        <Reveal stagger className="mx-auto mt-12 grid max-w-5xl gap-5 rounded-[28px] bg-surface-2 p-5 md:grid-cols-3 md:p-7">
          {aboutPage.whatWeDo.map((c) => (
            <article key={c.title} className="rounded-2xl border border-accent/40 bg-page/70 p-7 text-center transition-all hover:-translate-y-1 hover:border-accent hover:bg-page">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent-soft text-lg font-bold text-accent">{c.icon}</span>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{c.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Different() {
  return (
    <section aria-label="What makes us different" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading eyebrow="What makes us different" title={<>Honest. Fast. <Accent>Measurable.</Accent></>} />
        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {aboutPage.different.map((d, i) => (
              <article key={d.title} className="rounded-2xl border border-line bg-page p-6">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 font-bold">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{d.text}</p>
              </article>
            ))}
            <article className="rounded-2xl border-2 border-accent bg-gradient-to-br from-surface-2 to-page p-6">
              <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent">★</span>
              <h3 className="mt-4 font-bold">Why “Axiom”?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">{aboutPage.nameStory}</p>
            </article>
          </Reveal>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(28,31,48,0.5)]">
            <Photo photo={aboutPage.differentPhoto} sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <span className="grid size-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">✓</span>
              <span className="text-sm"><b className="block">Brand kit delivered</b><span className="text-mute">Logo, colours, 30 social templates</span></span>
            </div>
          </Reveal>
        </div>
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


