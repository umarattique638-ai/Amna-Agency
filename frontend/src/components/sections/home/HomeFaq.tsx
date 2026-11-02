import { homeFaqs } from "@/content/home";
import { Accordion } from "@/components/ui/Accordion";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

export function HomeFaq() {
  return (
    <section aria-label="Frequently asked questions" className="bg-page py-24">
      <div className="container-x max-w-4xl">
        <SectionHeading eyebrow="FAQ" title={<>Frequently Asked <Accent>Questions.</Accent></>} />
        <Accordion items={homeFaqs} numbered className="mt-12" />
      </div>
    </section>
  );
}
