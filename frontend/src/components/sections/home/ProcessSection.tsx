import { processSteps } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection() {
  return (
    <section aria-label="How we work" className="bg-surface py-24">
      <div className="container-x">
        <SectionHeading eyebrow="How we work" title={<>A Simple, <Accent>Proven Process.</Accent></>} />
        <Reveal as="ol" stagger className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden h-0.5 border-t-2 border-dashed border-accent/30 lg:block" />
          {processSteps.map((s) => (
            <li key={s.n} className="relative text-center">
              <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-xl font-black text-white blue-glow">{s.n}</span>
              <h3 className="mt-6 text-[19px] font-extrabold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-[14.5px] leading-relaxed text-mute">{s.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
