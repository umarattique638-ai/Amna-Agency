import type { ReactNode } from "react";
import { parseMarkdown, slugifyHeading } from "@/lib/markdown";

/** Inline: **bold**, *italic*, `code`, [text](https://…) — rendered as React nodes (no innerHTML → XSS-safe). */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={k++} className="font-semibold text-fg">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={k++} className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.9em]">{t.slice(1, -1)}</code>);
    else if (t.startsWith("[")) {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/) ?? [];
      const safe = href && /^(https?:\/\/|\/|mailto:)/.test(href) ? href : "#";
      out.push(
        <a key={k++} href={safe} className="font-medium text-accent underline underline-offset-4" {...(safe.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
          {label}
        </a>,
      );
    } else out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const nodes = parseMarkdown(source);
  return (
    <div className={className}>
      {nodes.map((n, i) => {
        switch (n.type) {
          case "h2":
            return <h2 key={i} id={slugifyHeading(n.text)} className="mt-12 mb-4 scroll-mt-28 text-[26px] leading-tight font-bold tracking-[-0.02em] text-fg md:text-[30px]">{inline(n.text)}</h2>;
          case "h3":
            return <h3 key={i} className="mt-8 mb-3 text-xl font-bold text-fg">{inline(n.text)}</h3>;
          case "quote":
            return <blockquote key={i} className="my-8 border-l-4 border-accent bg-accent-soft/50 py-4 pr-4 pl-6 text-xl font-medium text-fg italic">{inline(n.text)}</blockquote>;
          case "ul":
          case "ol": {
            const List = n.type === "ul" ? "ul" : "ol";
            return (
              <List key={i} className="my-6 space-y-3">
                {n.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    {n.type === "ul" ? (
                      <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" />
                    ) : (
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent">{j + 1}</span>
                    )}
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </List>
            );
          }
          default:
            return <p key={i} className="my-5">{inline(n.text)}</p>;
        }
      })}
    </div>
  );
}

