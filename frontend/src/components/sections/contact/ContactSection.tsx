import { FaWhatsapp } from "react-icons/fa";
import { contactMethods, nextSteps } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { LineIcon } from "@/components/ui/LineIcon";
import { ContactForm } from "./ContactForm";

export function ContactSection({ defaultEmail }: { defaultEmail?: string }) {
  return (
    <section id="enquiry" aria-label="Contact form and details" className="scroll-mt-24 bg-surface py-12 md:py-16">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[1.75fr_1fr] lg:gap-8">
        {/* form card */}
        <Reveal className="relative overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-50px_rgba(4,31,115,0.45)]">
          <div className="navy-gradient relative overflow-hidden px-6 py-4 text-white md:px-7">
            <span aria-hidden className="absolute -top-16 -right-10 size-48 rounded-full border-[28px] border-white/5" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-[20px] font-extrabold tracking-tight">Tell us about your project</h2>
                <p className="mt-0.5 text-[14px] text-white/70">Takes about a minute · fields with * are required</p>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-bold ring-1 ring-white/20">
                <LineIcon name="clock" className="size-4" /> Reply within 24h
              </span>
            </div>
          </div>
          <div className="p-5 md:px-7 md:py-6">
            <ContactForm defaultEmail={defaultEmail} />
          </div>
        </Reveal>

        {/* sidebar */}
        <div className="space-y-5">
          <Reveal as="ul" stagger className="space-y-3.5">
            {contactMethods.map((m) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <LineIcon name={m.icon} className="size-[22px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-extrabold">{m.title}</span>
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

          <Reveal className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(140deg,#020b2f_0%,#041f73_60%,#1b6fff_130%)] p-7 text-white">
            <span aria-hidden className="absolute -right-14 -bottom-16 size-48 rounded-full border-[30px] border-white/5" />
            <p className="relative text-lg font-extrabold">What happens next?</p>
            <ol className="relative mt-6 space-y-0">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < nextSteps.length - 1 && <span aria-hidden className="absolute top-9 bottom-1 left-[15px] w-px bg-white/20" />}
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-sm font-extrabold blue-glow">{i + 1}</span>
                  <span>
                    <span className="block font-bold">{s.title}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-white/65">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-[13px] text-mute">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><LineIcon name="shield" /></span>
            Your details stay private — we never share or sell them.
          </Reveal>

          <Reveal>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-[#25d366] px-6 py-4 font-bold text-white shadow-[0_18px_35px_-18px_rgba(37,211,102,0.9)] transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="size-6" aria-hidden />
              Prefer WhatsApp? Chat with us now
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
