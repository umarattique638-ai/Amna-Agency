import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  inverted?: boolean;
  as?: "h1" | "h2";
}

/** ✱ EYEBROW → heavy headline mixing solid, outlined-red and blue words → intro. */
export function SectionHeading({ eyebrow, title, subtitle, description, align = "center", className, inverted, as = "h2" }: SectionHeadingProps) {
  const H = as;
  return (
    <Reveal stagger className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow inverted={inverted} className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>
      <H className={cn("display mt-4 h2-display", inverted ? "text-white" : "text-fg")}>{title}</H>
      {subtitle && <p className={cn("mt-3 text-lg font-bold", inverted ? "text-white" : "text-fg")}>{subtitle}</p>}
      {description && (
        <p className={cn("mt-5 max-w-2xl text-[17px] leading-relaxed", inverted ? "text-white/75" : "text-mute", align === "center" && "mx-auto")}>{description}</p>
      )}
    </Reveal>
  );
}

/** ✱ LABEL — small uppercase blue label with an asterisk glyph. */
export function Eyebrow({ children, inverted, className }: { children: React.ReactNode; inverted?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-[15px] font-bold tracking-[0.04em] uppercase", inverted ? "text-white" : "text-accent", className)}>
      <span aria-hidden className="text-[18px] leading-none">✱</span>
      {children}
    </p>
  );
}

/** Solid blue word(s). */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

/** Hollow word(s) with a red stroke. */
export function Red({ children }: { children: React.ReactNode }) {
  return <span className="text-outline-red">{children}</span>;
}

/** Hollow word(s) with a dark stroke. */
export function Hollow({ children }: { children: React.ReactNode }) {
  return <span className="text-outline">{children}</span>;
}

/** Small row of ✓ items. */
export function CheckList({ items, className, inverted }: { items: string[]; className?: string; inverted?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]", inverted ? "text-white/75" : "text-mute", className)}>
      {items.map((i) => (
        <li key={i} className="flex items-center gap-2">
          <span aria-hidden className="grid size-5 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">✓</span>
          {i}
        </li>
      ))}
    </ul>
  );
}
