import { packages } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section aria-label="Ways to work with us" className="bg-page py-24">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Ways to work with us"
          title={<>Choose what <Accent>fits you</Accent></>}
          description="Every business is different, so every quote is custom. Pick the model that suits you and we'll tailor the rest."
          className="mb-14"
        />
        <Reveal as="ul" stagger className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <li
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                p.popular ? "border-accent bg-accent text-white shadow-[0_30px_60px_-30px_rgba(43,124,255,0.8)]" : "border-line bg-page",
              )}
            >
              {p.popular && (
                <span className="absolute top-6 right-6 rounded-full bg-white px-3 py-1 text-xs font-bold text-accent">Most popular</span>
              )}
              <h3 className="text-2xl font-bold tracking-tight">{p.name}</h3>
              <p className={cn("mt-2 text-sm", p.popular ? "text-white/75" : "text-mute")}>{p.bestFor}</p>
              <p className="mt-6 text-3xl font-bold tracking-tight">Custom quote</p>
              <ul className="mt-6 mb-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className={cn("grid size-5 place-items-center rounded-full text-[10px] font-bold", p.popular ? "bg-white text-accent" : "bg-accent-soft text-accent")}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                variant={p.popular ? "ghost" : "solid"}
                className={cn("mt-auto justify-center", p.popular && "border-white bg-white text-accent")}
              >
                Request a quote
              </ButtonLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
