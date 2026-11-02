import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  /** "inverted" = for the navy header / dark footer */
  tone?: "default" | "inverted";
}

/** Brand mark: an "A" whose right leg turns into a growth arrow — build + grow. Files in /public/brand. */
export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="axiom-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b9dff" />
          <stop offset="1" stopColor="#1b6fff" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="17" fill="url(#axiom-bg)" />
      <path d="M15 47 30 17l9 18" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 37h12" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 41 49 21M41 20h8.5v8.5" fill="none" stroke="#cfe0ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, withWordmark = true, tone = "default" }: LogoProps) {
  const inv = tone === "inverted";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-11" />
      {withWordmark && (
        <span className="leading-[0.95] font-black tracking-tight">
          <span className={cn("block text-[19px]", inv ? "text-white" : "text-fg")}>
            AXIOM<span className="text-accent">DIGITAL</span>
          </span>
          <span className={cn("mt-0.5 block text-[10.5px] font-extrabold tracking-[0.42em]", inv ? "text-[#9cc3ff]" : "text-accent")}>STUDIO</span>
        </span>
      )}
    </span>
  );
}
