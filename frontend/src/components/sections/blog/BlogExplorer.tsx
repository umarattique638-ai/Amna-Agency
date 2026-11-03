"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import type { BlogPostItem } from "@/types";

const PAGE = 9;

/** Category chips + search over the posts passed from the server, with "load more". */
export function BlogExplorer({ posts }: { posts: BlogPostItem[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (active === "All" || p.category === active) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)));
  }, [posts, active, query]);

  return (
    <div className="container-x pb-24">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div role="tablist" aria-label="Filter by topic" className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => {
                setActive(c);
                setVisible(PAGE);
              }}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                active === c ? "bg-accent text-white" : "bg-surface text-fg/70 hover:bg-accent-soft hover:text-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative w-full sm:w-64">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Search articles…"
            className="w-full rounded-full border border-line bg-page px-4 py-2 text-[13px] outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-surface py-16 text-center text-mute">No articles match — try another topic or word.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visible).map((post, i) => (
            <li key={post.id} className="animate-[cardIn_.6s_cubic-bezier(.16,1,.3,1)_both]" style={{ animationDelay: `${(i % PAGE) * 50}ms` }}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisible((v) => v + PAGE)} className="rounded-full border border-fg/20 px-6 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent">
            Load more articles
          </button>
        </div>
      )}
      <style>{`@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
