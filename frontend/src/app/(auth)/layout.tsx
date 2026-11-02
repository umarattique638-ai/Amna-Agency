import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { StoreProvider } from "@/components/providers/StoreProvider";

const points = [
  "Publish blog posts in minutes",
  "Manage the services shown on your website",
  "Track every enquiry from the contact form",
  "Secure JWT sessions — log out any device",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-accent p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="absolute -top-32 -right-32 size-[30rem] rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-[#9cc3ff]/40 blur-3xl" />
        <Link href="/" className="relative"><Logo tone="inverted" /></Link>
        <div className="relative">
          <p className="text-4xl leading-tight font-bold tracking-tight">Your agency&apos;s<br />control room.</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/85">
                <span className="grid size-6 place-items-center rounded-full bg-white/15 text-xs">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-white/60">© {new Date().getFullYear()} Axiom Digital Studio</p>
      </aside>
      <main className="flex items-center justify-center bg-page px-5 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-block lg:hidden"><Logo /></Link>
          <StoreProvider>{children}</StoreProvider>
        </div>
      </main>
    </div>
  );
}
