import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  /** small icon shown inside the input on the left */
  icon?: ReactNode;
}

const boxBase =
  "w-full rounded-xl border border-line bg-surface/70 text-[15px] text-fg placeholder:text-fg/35 outline-none transition-[border-color,box-shadow,background-color] hover:border-fg/20 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100";

function Label({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-[12.5px] font-bold text-fg/80">{children}</span>;
}

function Err({ id, children }: { id: string; children?: string }) {
  return children ? (
    <span id={id} role="alert" className="mt-1.5 block text-xs font-medium text-red-600">
      {children}
    </span>
  ) : null;
}

export function TextField({ label, error, className, id, icon, ...rest }: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <label htmlFor={id} className={cn("block", className)}>
      <Label>{label}</Label>
      <span className="relative block">
        {icon && <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg/35">{icon}</span>}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn(boxBase, "h-11 pr-4", icon ? "pl-10" : "pl-4")}
          {...rest}
        />
      </span>
      <Err id={`${id}-err`}>{error}</Err>
    </label>
  );
}

export function TextAreaField({ label, error, className, id, ...rest }: FieldProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <label htmlFor={id} className={cn("block", className)}>
      <Label>{label}</Label>
      <textarea
        id={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(boxBase, "block resize-none px-4 py-3 leading-relaxed")}
        {...rest}
      />
      <Err id={`${id}-err`}>{error}</Err>
    </label>
  );
}

/** Pill-style checkbox / radio group with a check mark on selected pills. */
export function PillGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  multiple,
  error,
}: {
  legend: string;
  name: string;
  options: readonly T[];
  value: T[];
  onChange: (next: T[]) => void;
  multiple?: boolean;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-[12.5px] font-bold text-fg/80">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt);
          return (
            <label key={opt} className="cursor-pointer">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(multiple ? (checked ? value.filter((v) => v !== opt) : [...value, opt]) : [opt])}
                className="peer sr-only"
              />
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-fg/70 transition-all peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-checked:shadow-[0_8px_18px_-8px_rgba(43,124,255,0.8)] peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20 hover:border-accent/50 hover:text-accent">
                {checked && (
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                )}
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {error && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </fieldset>
  );
}
