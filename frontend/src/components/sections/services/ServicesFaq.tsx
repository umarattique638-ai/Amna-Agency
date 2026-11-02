import { faqs } from "@/content/services";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";

export function ServicesFaq() {
  return (
    <section aria-label="Frequently asked questions" className="bg-surface py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={<>Questions, <Accent>answered</Accent></>}
          description="Still unsure? Send us a message — a real person replies within a day."
        />
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
