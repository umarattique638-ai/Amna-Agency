"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  body: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
  /** show 01, 02… before each question (reference FAQ style) */
  numbered?: boolean;
}

/** Accessible single-open accordion; height animates via the grid-rows trick (no JS measuring). */
export function Accordion({ items, className, numbered }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={cn("space-y-3.5", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <li key={item.title} className={cn("rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300", isOpen ? "border-accent/40 shadow-[0_18px_40px_-30px_rgba(43,124,255,0.55)]" : "border-line hover:border-fg/15")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-6 py-5 text-left"
              >
                {numbered && <span className={cn("w-7 shrink-0 text-[15px] font-bold tabular-nums", isOpen ? "text-accent" : "text-fg/30")}>{String(i + 1).padStart(2, "0")}</span>}
                <span className="flex-1 text-[17px] leading-snug font-bold text-fg">{item.title}</span>
                <span
                  aria-hidden
                  className={cn("relative size-3.5 shrink-0 text-accent transition-transform duration-300 ease-[var(--ease-out-expo)]", isOpen && "rotate-45")}
                >
                  <i className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current" />
                  <i className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <p className="overflow-hidden text-[16px] leading-[1.7] text-mute">
                <span className={cn("block px-6 pb-5", numbered && "pl-[4.25rem]")}>{item.body}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
