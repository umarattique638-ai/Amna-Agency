"use client";

import { toast } from "@/lib/toast";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { useLogoutMutation } from "@/store/api";
import { useAppDispatch, useCurrentUser } from "@/store/hooks";
import { loggedOut } from "@/store/authSlice";
import { cn } from "@/lib/utils";
import { FeedbackProvider } from "./feedback";
import { PageSkeleton } from "./PageSkeleton";

const nav = [
  { href: "/dashboard", label: "Overview", icon: "◧" },
  { href: "/dashboard/posts", label: "Blog posts", icon: "✎" },
  { href: "/dashboard/services", label: "Services", icon: "◈" },
  { href: "/dashboard/leads", label: "Leads", icon: "✉" },
  { href: "/dashboard/account", label: "Account & security", icon: "⚿" },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const user = useCurrentUser()!;
  const dispatch = useAppDispatch();
  const [logoutRequest] = useLogoutMutation();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const logout = async () => {
    setLeaving(true);
    try {
      await logoutRequest().unwrap();
    } finally {
      dispatch(loggedOut());
      toast.success("Signed out", "Your session has been closed securely.");
      router.replace("/login");
      router.refresh();
    }
  };

  // Highlight the clicked tab immediately (before the route finishes loading).
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const navigating = !!pending && pending.from === pathname;
  const current = navigating ? pending.href : pathname;
  const active = (href: string) => (href === "/dashboard" ? current === href : current.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/" className="px-6 py-6"><Logo /></Link>
      <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            prefetch
            onClick={() => {
              setOpen(false);
              if (!active(n.href)) setPending({ href: n.href, from: pathname });
            }}
            aria-current={active(n.href) ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active(n.href) ? "bg-accent text-white shadow-[0_8px_20px_-8px_rgba(43,124,255,0.7)]" : "text-fg/70 hover:bg-surface hover:text-fg",
            )}
          >
            <span aria-hidden className="w-5 text-center">{n.icon}</span>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="m-3 rounded-2xl bg-surface p-4">
        <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs text-mute">{user.email}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent capitalize">{user.role}</span>
          <button onClick={logout} disabled={leaving} className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50">
            {leaving ? "Signing out…" : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <FeedbackProvider>
      <div className="min-h-svh bg-surface">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-page lg:block">{sidebar}</aside>

        {/* mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-page/90 px-4 py-3 backdrop-blur lg:hidden">
          <Logo />
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-10 place-items-center rounded-xl border border-line">☰</button>
        </header>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button aria-label="Close menu" className="absolute inset-0 bg-fg/40" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 bg-page shadow-2xl">{sidebar}</aside>
          </div>
        )}

        <main className="px-4 py-8 md:px-8 lg:ml-64 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">{navigating ? <PageSkeleton /> : children}</div>
        </main>
      </div>
    </FeedbackProvider>
  );
}
