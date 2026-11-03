import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/server/api";
import { Photo } from "@/components/ui/Photo";
import { Markdown } from "@/components/ui/Markdown";
import { PostCard } from "@/components/sections/blog/PostCard";
import { ReadingProgress } from "@/components/sections/blog/ReadingProgress";
import { ShareButtons } from "@/components/sections/blog/ShareButtons";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { estimateReadTime, parseMarkdown, slugifyHeading } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;
/** Posts created later in the dashboard are rendered on first visit, then cached. */
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt ?? undefined, images: [post.coverImage] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  const all = await getPublishedPosts();
  const related = [
    ...all.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...all.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);
  const toc = parseMarkdown(post.content).filter((n) => n.type === "h2") as { text: string }[];
  const author = post.author?.name ?? `${siteConfig.name} Team`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage,
    author: { "@type": "Person", name: author },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <article className="bg-page pt-28 pb-20">
        <header className="container-x mt-12 max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-accent uppercase">{post.category}</span>
          <h1 className="display mt-5 text-[clamp(2rem,4.2vw,3.4rem)]">{post.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mute">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-mute">
            <span className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-white">{author.slice(0, 1)}</span>
              <span className="font-semibold text-fg">{author}</span>
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{estimateReadTime(post.content)}</span>
          </div>
        </header>

        <div className="container-x mt-12 max-w-6xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(28,31,48,0.5)]">
            <Photo photo={{ src: post.coverImage, alt: post.coverAlt || post.title }} priority sizes="(max-width: 1200px) 100vw, 1150px" />
          </div>
        </div>

        <div className="container-x mt-14 grid max-w-6xl gap-12 lg:grid-cols-[1fr_260px]">
          <div id="article-body" className="max-w-3xl text-lg leading-relaxed text-fg/80">
            <Markdown source={post.content} />

            <div className="mt-14 flex flex-col justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
              <p className="font-semibold text-fg">Found this useful? Share it</p>
              <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
            </div>

            <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-dark p-8 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold">Need help with {post.category.toLowerCase()}?</p>
                <p className="mt-1 text-base text-white/75">Our team does this for businesses every day.</p>
              </div>
              <Link href="/contact" className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Free consultation →</Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length > 0 && (
                <nav aria-label="On this page" className="rounded-3xl border border-line p-6">
                  <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-mute uppercase">On this page</p>
                  <ol className="space-y-3 text-sm">
                    {toc.map((h, i) => (
                      <li key={h.text} className="flex gap-3">
                        <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <a href={`#${slugifyHeading(h.text)}`} className="text-fg/70 hover:text-accent">{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="rounded-3xl bg-surface p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-mute uppercase">Category</p>
                <p className="mt-2 font-semibold">{post.category}</p>
                <Link href="/blog" className="mt-4 inline-block text-sm font-semibold text-accent">All articles →</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-label="More articles" className="bg-surface py-20">
          <div className="container-x">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="display text-3xl md:text-4xl">Keep reading</h2>
              <Link href="/blog" className="text-sm font-semibold text-accent">View all →</Link>
            </div>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((p) => <li key={p.id}><PostCard post={p} /></li>)}
            </ul>
          </div>
        </section>
      )}
      <CtaBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
