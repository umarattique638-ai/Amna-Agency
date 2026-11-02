import { stackTiles } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Red, SectionHeading } from "@/components/ui/SectionHeading";

/** The development stack as tiles — makes the "web development agency" message unmistakable. */
export function StackSection() {
  return (
    <section aria-label="Technology stack" className="bg-page py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our tech stack"
          title={<>Built With a <Red>Modern</Red> <Accent>Stack.</Accent></>}
          description="Every website and web app is written in TypeScript on the same proven, full-JavaScript stack used by start-ups and global brands."
        />
        <Reveal as="ul" stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stackTiles.map((t) => (
            <li key={t.name} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_40px_-28px_rgba(43,124,255,0.6)]">
              <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-xl text-[20px] font-black text-white" style={{ background: t.color }}>{t.mark}</span>
              <span className="leading-tight">
                <span className="block text-[17px] font-extrabold">{t.name}</span>
                <span className="block text-[13px] text-mute">{t.role}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
