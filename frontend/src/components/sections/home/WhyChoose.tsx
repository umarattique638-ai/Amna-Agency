import { whyChoose } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow, Red } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-surface py-24 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal stagger>
          <Eyebrow>Why choose us</Eyebrow>
          <h2 id="why-title" className="display mt-4 text-[clamp(2.2rem,4.2vw,3.5rem)]">
            Why Businesses <Red>Trust</Red> <Accent>Our Team.</Accent>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-mute">
            No juggling three agencies. One accountable team builds your product and markets it — with clean code, honest reporting and quick replies.
          </p>
          <ul className="mt-9 space-y-6">
            {whyChoose.features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-lg font-bold text-white blue-glow">{f.icon}</span>
                <span>
                  <span className="block text-[17px] font-extrabold">{f.title}</span>
                  <span className="mt-1 block text-[14.5px] text-mute">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="ol" stagger className="space-y-5">
          {whyChoose.cards.map((c, i) => (
            <li key={c.n} className={cn("rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-[0_25px_50px_-30px_rgba(43,124,255,0.5)]", i === 0 && "border-l-4 border-l-accent")}>
              <div className="flex items-start gap-6">
                <span className="text-[44px] leading-none font-black text-accent">{c.n}</span>
                <span>
                  <span className="block text-[19px] font-extrabold">{c.title}</span>
                  <span className="mt-2 block text-[14.5px] leading-relaxed text-mute">{c.text}</span>
                </span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
