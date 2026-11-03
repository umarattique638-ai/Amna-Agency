import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CheckList } from "@/components/ui/SectionHeading";

interface CtaBannerProps {
  title?: React.ReactNode;
  text?: string;
}

/** Navy → blue gradient rounded call-to-action card with decorative rings. Used at the bottom of most pages. */
export function CtaBanner({
  title = <>Ready to Build Something <span className="text-[#9cc3ff]">Great Together?</span></>,
  text = "Tell us what you need — website, app, marketing, design or video. We'll reply within 24 hours with a free plan and a clear, fixed quote.",
}: CtaBannerProps) {
  return (
    <section aria-label="Get in touch" className="bg-page py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#020b2f_0%,#041f73_55%,#1b6fff_100%)] px-7 py-16 text-center text-white md:px-16 md:py-20">
          <span aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full border-[40px] border-white/5" />
          <span aria-hidden className="absolute -right-16 -bottom-28 size-80 rounded-full border-[50px] border-white/[0.06]" />
          <span aria-hidden className="absolute top-10 right-24 size-4 rounded-full bg-[#9cc3ff]/60" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="display h2-display">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] text-white/75">{text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" variant="white" size="lg" arrow>Free Strategy Call</ButtonLink>
              <ButtonLink href="/services" variant="outline-light" size="lg">Explore Services</ButtonLink>
            </div>
            <CheckList inverted className="mt-8 justify-center" items={["Free consultation", "No long contracts", "Reply within 24 hours"]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
