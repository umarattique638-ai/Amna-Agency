import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Shared backdrop for every visual: soft lavender studio gradient with an
 * indigo key-light — matches product-style marketing screenshots.
 */
export function Frame({
  children,
  className,
  glow = "60% 30%",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={cn("grain relative isolate h-full w-full overflow-hidden bg-surface-2", className)}
      style={{
        backgroundImage: `radial-gradient(55% 55% at ${glow}, rgb(43 124 255 / 0.22), transparent 70%), radial-gradient(70% 70% at 15% 100%, rgb(255 255 255 / 0.9), transparent 60%), linear-gradient(160deg, #fff7f3 0%, #ffece3 60%, #fde2d5 100%)`,
      }}
    >
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_10px_rgba(43,124,255,0.08)]" />
    </div>
  );
}

/** App window chrome. `tone="dark"` for code editors and terminals. */
export function Window({
  title,
  children,
  className,
  tone = "light",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_40px_80px_-30px_rgba(6,13,31,0.45)]",
        dark ? "border-white/10 bg-dark text-white" : "border-white bg-white text-fg",
        className,
      )}
    >
      <div className={cn("flex items-center gap-1.5 border-b px-3 py-2", dark ? "border-white/5" : "border-line")}>
        <i className="size-2 rounded-full bg-[#ff5f57]" />
        <i className="size-2 rounded-full bg-[#febc2e]" />
        <i className="size-2 rounded-full bg-[#28c840]" />
        {title && (
          <span className={cn("ml-3 truncate font-mono text-[10px]", dark ? "text-white/40" : "text-mute")}>
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
