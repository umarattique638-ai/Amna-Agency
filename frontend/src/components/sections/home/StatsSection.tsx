import { stats } from "@/content/home";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

export function StatsSection() {
  return (
    <section aria-label="Results" className="bg-page py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Our results" title={<>Our Clients Get <Accent>Digital Results.</Accent></>} />
        <Reveal as="dl" stagger className="mt-14 grid grid-cols-2 divide-line rounded-3xl border border-line bg-white lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center p-8 text-center">
              <dt className="mt-2 text-[14.5px] font-semibold text-mute">{s.label}</dt>
              <dd className="text-[clamp(2.6rem,5vw,4rem)] leading-none font-bold text-fg">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
