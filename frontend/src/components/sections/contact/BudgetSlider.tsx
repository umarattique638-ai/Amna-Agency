"use client";

import { useId } from "react";
import { BUDGET_MAX, BUDGET_MIN, BUDGET_STEP, formatBudget } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

const MARKS = [100, 250, 500, 750, 1000];

/** $100 – $1,000+ budget slider with a live value bubble and quick-pick marks. */
export function BudgetSlider({ value, onChange, error }: { value: number; onChange: (v: number) => void; error?: string }) {
  const id = useId();
  const pct = ((value - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <fieldset>
      <div className="flex items-end justify-between gap-4">
        <legend className="text-[12.5px] font-bold text-fg/80">Budget (USD) *</legend>
        <output htmlFor={id} className="rounded-lg bg-white px-3 py-1.5 text-[19px] leading-none font-extrabold text-accent tabular-nums shadow-sm ring-1 ring-line">
          {formatBudget(value)}
        </output>
      </div>

      <div className="relative mt-5">
        <input
          id={id}
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuetext={formatBudget(value)}
          aria-invalid={!!error}
          className="budget-range w-full"
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
      </div>

      <div className="mt-3 flex justify-between gap-1">
        {MARKS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className={cn(
              "rounded-full px-2 py-1 text-[11.5px] font-bold transition-colors",
              value === m ? "bg-accent text-white" : "text-mute hover:bg-accent-soft hover:text-accent",
            )}
          >
            {formatBudget(m)}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </fieldset>
  );
}
