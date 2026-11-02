import { about } from "@/content/home";
import { siteConfig } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow, Red } from "@/components/ui/SectionHeading";

/** Short about teaser with a 2×2 value list (full story lives on /about). */
export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="bg-surface py-24 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem]">
            <Photo photo={about.photo} sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
          <div className="navy-gradient absolute -right-3 -bottom-6 rounded-2xl px-6 py-5 text-white shadow-xl sm:right-8">
            <p className="text-3xl font-black">6-in-1</p>
            <p className="text-[13px] text-white/70">Dev · Marketing · Social · Design · Video · SEO</p>
          </div>
        </Reveal>
        <Reveal stagger>
          <Eyebrow>About us</Eyebrow>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.2rem,4.2vw,3.5rem)]">
            Transforming <Red>Ideas</Red> Into <Accent>Scalable Solutions.</Accent>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mute">
            We&apos;re a team of developers, designers, video editors and marketers. We plan, build and grow digital products for businesses that want a website that actually works for them.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {about.values.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft font-mono text-[15px] font-bold text-accent">{v.icon}</span>
                <span>
                  <span className="block text-[16px] font-extrabold">{v.title}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-mute">{v.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <ButtonLink href="/about" arrow>More About Us</ButtonLink>
            <div className="flex items-center gap-3">
              <span className="flex -space-x-3" aria-hidden>
                {siteConfig.founders.map((f) => (
                  <span key={f.name} className="grid size-11 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] font-black text-white">{f.initials}</span>
                ))}
              </span>
              <span className="text-[14px] leading-tight">
                <span className="block text-mute">Founded &amp; led by</span>
                <span className="block font-extrabold">{siteConfig.founders.map((f) => f.name).join(" & ")}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
