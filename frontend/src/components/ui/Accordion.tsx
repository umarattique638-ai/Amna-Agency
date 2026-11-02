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
    <ul className={cn("space-y-4", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <li key={item.title} className={cn("rounded-2xl border bg-white transition-colors", isOpen ? "border-accent/50 shadow-[0_20px_45px_-30px_rgba(43,124,255,0.5)]" : "border-line")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 px-6 py-5 text-left md:px-7"
              >
                {numbered && <span className={cn("text-[22px] font-black tabular-nums", isOpen ? "text-accent" : "text-fg/25")}>{String(i + 1).padStart(2, "0")}</span>}
                <span className={cn("flex-1 text-[17px] font-extrabold transition-colors md:text-[19px]", isOpen ? "text-accent" : "group-hover:text-accent")}>{item.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
                    isOpen ? "rotate-[135deg] border-accent bg-accent text-white" : "border-line text-fg",
                  )}
                >
                  <span className="relative size-3">
                    <i className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current" />
                    <i className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded bg-current" />
                  </span>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <p className="overflow-hidden text-[15.5px] leading-relaxed text-mute">
                <span className={cn("block px-6 pb-6 md:px-7", numbered && "md:pl-[5.1rem]")}>{item.body}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
