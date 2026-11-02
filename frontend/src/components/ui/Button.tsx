import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "line" | "white" | "outline-light";
type Size = "md" | "sm" | "lg";

const variants: Record<Variant, string> = {
  solid: "rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-white blue-glow hover:brightness-110",
  ghost: "rounded-full bg-white text-fg ring-1 ring-line hover:ring-accent hover:text-accent",
  white: "rounded-full bg-white text-navy hover:bg-white/90",
  "outline-light": "rounded-full text-white ring-1 ring-white/60 hover:bg-white/10",
  line: "text-accent hover:text-accent-deep",
};
const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13.5px]",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-8 py-4 text-[15px]",
};

const base =
  "group relative inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}

const Arrow = () => <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>;

export function ButtonLink({ href, variant = "solid", size = "md", arrow, children, className, ...rest }: BaseProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={cn(base, variants[variant], variant !== "line" && sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ variant = "solid", size = "md", arrow, children, className, ...rest }: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], variant !== "line" && sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
