import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { estimateReadTime } from "@/lib/markdown";
import type { BlogPostItem } from "@/types";

const shortDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

/** Blog card — image, full-width category pill, meta, title, excerpt, outline "Read article" pill. */
export function PostCard({ post }: { post: BlogPostItem }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-page transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(28,31,48,0.5)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-dark">
        <Photo photo={{ src: post.coverImage, alt: post.coverAlt || post.title }} sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="block rounded-full bg-accent-soft px-3 py-1.5 text-[10.5px] font-bold tracking-[0.06em] text-accent uppercase">{post.category}</span>
        <p className="mt-4 text-[11.5px] text-mute">
          <time dateTime={post.publishedAt ?? undefined}>{shortDate(post.publishedAt)}</time>
          <span className="mx-1.5" aria-hidden>·</span>
          {estimateReadTime(post.content)}
        </p>
        <h3 className="mt-2 text-[15px] leading-snug font-bold text-fg transition-colors group-hover:text-accent">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-mute">{post.excerpt}</p>
        <span className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/20 px-4 py-2 text-[12.5px] font-semibold text-fg transition-colors group-hover:border-accent group-hover:text-accent">
            Read article <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </span>
      </div>
    </article>
  );
}
