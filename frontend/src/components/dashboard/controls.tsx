import { cn } from "@/lib/utils";
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";

const box =
  "w-full rounded-xl border border-line bg-page px-4 py-2.5 text-sm text-fg outline-none transition-[border-color,box-shadow] placeholder:text-fg/30 focus:border-accent focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-red-400";

interface FieldWrapProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function FieldWrap({ label, htmlFor, error, hint, className, children }: FieldWrapProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-fg">{label}</label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-mute">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(box, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(box, "min-h-28 leading-relaxed", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(box, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235f6475%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10", className)} {...rest}>
      {children}
    </select>
  );
}

type BtnVariant = "primary" | "secondary" | "danger" | "ghost";
const btn: Record<BtnVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep shadow-[0_8px_20px_-8px_rgba(43,124,255,0.7)]",
  secondary: "border border-line bg-page text-fg hover:border-fg/30",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-mute hover:bg-surface hover:text-fg",
};

export function Btn({
  variant = "primary",
  loading,
  className,
  children,
  disabled,
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: BtnVariant; loading?: boolean }) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        btn[variant],
        className,
      )}
      {...rest}
    >
      {loading && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-line bg-page p-6", className)}>{children}</div>;
}

const badgeTone: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  new: "bg-accent-soft text-accent ring-accent/20",
  contacted: "bg-sky-50 text-sky-700 ring-sky-600/20",
  won: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  lost: "bg-zinc-100 text-zinc-600 ring-zinc-500/20",
  hidden: "bg-zinc-100 text-zinc-600 ring-zinc-500/20",
  admin: "bg-accent-soft text-accent ring-accent/20",
  editor: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

export function Badge({ value }: { value: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset", badgeTone[value] ?? "bg-surface text-mute ring-line")}>
      {value}
    </span>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-mute">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-mute">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-surface-2", className)} />;
}
