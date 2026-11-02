"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, serviceMenu } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

/** Navy-gradient fixed header with a Services mega menu and an outlined glowing "Get Quote" pill. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMega(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const showMega = () => { clearTimeout(megaTimer.current); setMega(true); };
  const hideMega = () => { megaTimer.current = setTimeout(() => setMega(false), 120); };

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <header className={cn("navy-gradient fixed inset-x-0 top-0 z-50 transition-shadow", scrolled && "shadow-[0_10px_30px_-12px_rgba(2,11,47,0.7)]")}>
      <div className="container-x flex h-[80px] items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.legalName} — home`} onClick={() => setOpen(false)}>
          <Logo tone="inverted" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const linkCls = cn(
                "relative flex items-center gap-1 px-4 py-2 text-[15.5px] font-semibold text-white transition-colors hover:text-[#9cc3ff]",
                active && "text-[#9cc3ff] after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-accent",
              );
              if (item.href !== "/services")
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={linkCls}>{item.label}</Link>
                  </li>
                );
              return (
                <li key={item.href} className="relative" onMouseEnter={showMega} onMouseLeave={hideMega}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    onFocus={showMega}
                    className={linkCls}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform", mega && "rotate-180")} aria-hidden>
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </Link>
                  <div
                    className={cn(
                      "absolute top-full left-1/2 w-[880px] -translate-x-1/2 pt-5 transition-all duration-200",
                      mega ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
                    )}
                    onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMega(false)}
                  >
                    <div className="grid grid-cols-[1fr_1fr_1fr_0.95fr] gap-2 rounded-2xl bg-white p-3 shadow-[0_30px_60px_-20px_rgba(2,11,47,0.55)]">
                      {serviceMenu.map((g) => (
                        <div key={g.group} className="p-3">
                          <p className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-accent uppercase">
                            <span aria-hidden className="grid size-7 place-items-center rounded-lg bg-accent-soft font-mono text-[11px]">{g.icon}</span>
                            {g.group}
                          </p>
                          <ul className="mt-3 space-y-1">
                            {g.items.map((s) => (
                              <li key={s.href}>
                                <Link href={s.href} onClick={() => setMega(false)} className="block rounded-xl px-2 py-2 transition-colors hover:bg-surface-2">
                                  <span className="block text-[14.5px] font-bold text-fg">{s.label}</span>
                                  <span className="block text-[12.5px] text-mute">{s.text}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="navy-gradient flex flex-col justify-between rounded-xl p-5 text-white">
                        <div>
                          <p className="text-[17px] leading-snug font-black">Not sure what you need?</p>
                          <p className="mt-2 text-[13px] text-white/70">Book a free 20-minute strategy call.</p>
                        </div>
                        <Link href="/contact" onClick={() => setMega(false)} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#9cc3ff] hover:text-white">
                          Free Strategy Call <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full border-2 border-accent px-6 py-2.5 text-[15px] font-bold text-white shadow-[0_0_18px_rgba(59,137,255,0.45)] transition-all hover:bg-accent sm:inline-flex"
          >
            Get Quote <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/25 lg:hidden"
          >
            <span className="relative flex h-3 w-[18px] flex-col justify-between" aria-hidden>
              <i className={cn("h-0.5 w-full rounded bg-white transition-transform duration-300", open && "translate-y-[5px] rotate-45")} />
              <i className={cn("h-0.5 w-full rounded bg-white transition-opacity", open && "opacity-0")} />
              <i className={cn("h-0.5 w-full rounded bg-white transition-transform duration-300", open && "-translate-y-[5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="h-[calc(100svh-80px)] overflow-y-auto bg-page lg:hidden">
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={close}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-bold",
                    isActive(pathname, item.href) ? "bg-accent-soft text-accent" : "hover:bg-surface",
                  )}
                >
                  {item.label}
                  <span aria-hidden>→</span>
                </Link>
                {item.href === "/services" && (
                  <ul className="grid grid-cols-2 gap-1 px-2 pb-2">
                    {serviceMenu.flatMap((g) => g.items).map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-[14px] font-semibold text-mute hover:bg-surface-2 hover:text-accent">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/contact" scroll={false} onClick={close} arrow>Get Quote</ButtonLink>
            <a href={siteConfig.whatsapp} className="text-center text-sm font-semibold text-mute">WhatsApp: {siteConfig.phone}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
