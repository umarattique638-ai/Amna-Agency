import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";

const ICONS = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M6.6 3h3l1.5 4.2-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Dark footer: brand + tagline, link columns with blue underline headings, contact boxes, quote CTA. */
export function Footer() {
  const year = new Date().getFullYear();
  const contacts = [
    { icon: ICONS.mail, label: "Email us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: ICONS.phone, label: "Call / WhatsApp", value: siteConfig.phone, href: siteConfig.whatsapp },
    { icon: ICONS.pin, label: "Location", value: siteConfig.location },
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container-x grid gap-12 pt-20 pb-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_1.25fr]">
        <div className="space-y-6">
          <Logo tone="inverted" />
          <p className="max-w-xs text-[14.5px] leading-relaxed text-white/65">
            Full-stack web development and growth marketing under one roof — we build it, design it, film it and market it.
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/20 text-[11px] font-bold transition-all hover:border-accent hover:bg-accent hover:shadow-[0_0_18px_rgba(59,137,255,0.6)]"
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterCol title="Company" links={mainNav} />
        <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services#${s.id}` }))} />

        <div className="space-y-6">
          <ColTitle>Get in Touch</ColTitle>
          <ul className="space-y-4">
            {contacts.map((c) => (
              <li key={c.label} className="flex items-start gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/70 text-[#9cc3ff]"><Icon d={c.icon} /></span>
                <span className="text-[14px]">
                  <span className="block text-white/50">{c.label}</span>
                  {c.href ? <a href={c.href} className="font-semibold hover:text-[#9cc3ff]">{c.value}</a> : <span className="font-semibold">{c.value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x">
        <div className="grid items-center gap-8 rounded-3xl border border-accent/60 bg-white/[0.03] p-7 md:grid-cols-[auto_1fr_auto] md:p-9">
          <span aria-hidden className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-3xl blue-glow">🚀</span>
          <div>
            <p className="text-[clamp(1.3rem,2.2vw,1.75rem)] leading-tight font-black">Ready to launch your next project?</p>
            <p className="mt-1.5 text-[14.5px] text-white/65">Get a free plan and fixed quote within 24 hours.</p>
          </div>
          <div className="space-y-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] px-7 py-3.5 text-[15px] font-bold blue-glow transition-transform hover:-translate-y-0.5"
            >
              Get Quote <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-md"><NewsletterForm /></div>
      </div>

      <div className="mt-12 border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 text-[13px] text-white/50">
          <p>© {year} {siteConfig.legalName}. All rights reserved. Founded by {siteConfig.founders.map((f) => f.name).join(" & ")}.</p>
          <p>React · Next.js · Node.js · Express · MongoDB · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative pb-3 text-[18px] font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:rounded after:bg-accent">
      {children}
    </p>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="space-y-6">
      <ColTitle>{title}</ColTitle>
      <ul className="space-y-3 text-[14.5px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5">›</span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
