import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
}

const inputBase =
  "peer w-full border-b border-line bg-transparent py-3 text-lg text-fg placeholder:text-fg/30 transition-colors outline-none focus:border-fg";

export function TextField({
  label,
  error,
  className,
  id,
  ...rest
}: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <label htmlFor={id} className={cn("block", className)}>
      <span className="label text-mute">{label}</span>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={inputBase} {...rest} />
      {error && (
        <span id={`${id}-err`} className="mt-2 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  id,
  ...rest
}: FieldProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <label htmlFor={id} className={cn("block", className)}>
      <span className="label text-mute">{label}</span>
      <textarea
        id={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(inputBase, "resize-none")}
        {...rest}
      />
      {error && (
        <span id={`${id}-err`} className="mt-2 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

/** Pill-style checkbox / radio group. */
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
      <legend className="label mb-4 text-mute">{legend}</legend>
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
                onChange={() =>
                  onChange(multiple ? (checked ? value.filter((v) => v !== opt) : [...value, opt]) : [opt])
                }
                className="peer sr-only"
              />
              <span className="block rounded-full border border-line px-4 py-2 text-sm text-fg/70 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-accent hover:border-fg/60">
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </fieldset>
  );
}
