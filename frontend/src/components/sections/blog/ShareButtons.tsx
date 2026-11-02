"use client";

import { useState } from "react";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", short: "WA", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", short: "X", href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { label: "Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Share on ${l.label}`}
          className="grid size-10 place-items-center rounded-xl border border-line text-sm font-bold text-fg/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
        >
          {l.short}
        </a>
      ))}
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="h-10 rounded-xl border border-line px-3 text-sm font-semibold text-fg/70 transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? "✓ Copied" : "Copy link"}
      </button>
    </div>
  );
}
