import { contactMethods, nextSteps } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

export function ContactSection({ defaultEmail }: { defaultEmail?: string }) {
  return (
    <section aria-label="Contact form and details" className="bg-page py-16 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <Reveal className="rounded-[28px] border border-line bg-page p-6 shadow-[0_30px_60px_-40px_rgba(28,31,48,0.4)] md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Tell us about your project</h2>
          <p className="mt-2 mb-8 text-mute">Fill in the form — it takes about a minute.</p>
          <ContactForm defaultEmail={defaultEmail} />
        </Reveal>

        <div className="space-y-6">
          <Reveal as="ul" stagger className="space-y-4">
            {contactMethods.map((m) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-xl text-accent">{m.icon}</span>
                  <span>
                    <span className="block font-bold">{m.title}</span>
                    <span className="block text-sm text-mute">{m.text}</span>
                    <span className="mt-1 block text-sm font-semibold text-accent">{m.value}</span>
                  </span>
                </>
              );
              return (
                <li key={m.title}>
                  {m.href ? (
                    <a href={m.href} className="flex gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-accent">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex gap-4 rounded-2xl border border-line p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </Reveal>

          <Reveal className="rounded-[28px] bg-fg p-7 text-white">
            <p className="font-bold">What happens next?</p>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-sm text-white/65">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25d366] px-6 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Prefer WhatsApp? Chat with us now
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
