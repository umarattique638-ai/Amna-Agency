import { FaWhatsapp } from "react-icons/fa";
import { contactMethods, nextSteps } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { LineIcon } from "@/components/ui/LineIcon";
import { ContactForm } from "./ContactForm";

export function ContactSection({ defaultEmail }: { defaultEmail?: string }) {
  return (
    <section id="enquiry" aria-label="Contact form and details" className="scroll-mt-24 bg-surface pt-6 pb-16 md:pt-8 md:pb-20">
      <div className="container-x grid gap-8 lg:grid-cols-[1.75fr_1fr] lg:items-stretch lg:gap-8">
        {/* form card — stretches to the sidebar's height */}
        <Reveal className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(4,31,115,0.45)] md:p-8">
          <ContactForm defaultEmail={defaultEmail} />
        </Reveal>

        {/* sidebar */}
        <div className="flex flex-col gap-5">
          <Reveal as="ul" stagger className="space-y-3.5">
            {contactMethods.map((m) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <LineIcon name={m.icon} className="size-[22px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{m.title}</span>
                    <span className="block text-[13px] text-mute">{m.text}</span>
                    <span className="mt-1 block truncate text-[14px] font-bold text-accent">{m.value}</span>
                  </span>
                  {m.href && <span aria-hidden className="text-lg text-accent transition-transform group-hover:translate-x-1">→</span>}
                </>
              );
              return (
                <li key={m.title}>
                  {m.href ? (
                    <a href={m.href} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_20px_40px_-28px_rgba(43,124,255,0.6)]">
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </Reveal>

          <Reveal className="relative flex-1 overflow-hidden rounded-[24px] bg-[linear-gradient(140deg,#020b2f_0%,#041f73_60%,#1b6fff_130%)] p-7 text-white">
            <span aria-hidden className="absolute -right-14 -bottom-16 size-48 rounded-full border-[30px] border-white/5" />
            <p className="relative text-lg font-bold">What happens next?</p>
            <ol className="relative mt-6 space-y-0">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < nextSteps.length - 1 && <span aria-hidden className="absolute top-9 bottom-1 left-[15px] w-px bg-white/20" />}
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-sm font-bold blue-glow">{i + 1}</span>
                  <span>
                    <span className="block font-bold">{s.title}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-white/65">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative mt-7 flex items-center justify-center gap-2.5 rounded-xl bg-[#25d366] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-14px_rgba(37,211,102,0.9)] transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="size-5" aria-hidden />
              Prefer WhatsApp? Chat now
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <p className="relative mt-3 flex items-center justify-center gap-1.5 text-[12px] text-white/55">
              <LineIcon name="shield" className="size-3.5" /> Your details stay private — never shared or sold.
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
