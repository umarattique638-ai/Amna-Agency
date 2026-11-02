import { posts as staticPosts } from "@/content/blog";
import { services as staticServices } from "@/content/services";
import { blocksToMarkdown } from "@/lib/markdown";
import type { PostDTO, ServiceDTO } from "@/types/api";

/** Built-in content shown when the API is unreachable or the database is still empty. */
export const fallbackPosts: PostDTO[] = staticPosts.map((p) => ({
  id: `static-${p.slug}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: blocksToMarkdown(p.content),
  category: p.category,
  coverImage: p.photo.src,
  coverAlt: p.photo.alt,
  status: "published",
  publishedAt: new Date(p.date).toISOString(),
  createdAt: new Date(p.date).toISOString(),
  updatedAt: new Date(p.date).toISOString(),
  author: null,
}));

export const fallbackServices: ServiceDTO[] = staticServices.map((s) => ({
  id: `static-${s.id}`,
  title: s.category,
  slug: s.id,
  summary: s.summary,
  description: s.description,
  deliverables: s.deliverables,
  image: s.photo.src,
  imageAlt: s.photo.alt,
  highlightValue: s.highlight.value,
  highlightLabel: s.highlight.label,
  order: s.index,
  published: true,
  updatedAt: null,
}));
