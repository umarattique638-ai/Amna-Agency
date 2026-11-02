import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { getPublishedPosts } from "@/lib/server/api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const pages = mainNav.map((n) => ({
    url: `${siteConfig.url}${n.href === "/" ? "" : n.href}`,
    lastModified: new Date(),
    priority: n.href === "/" ? 1 : 0.8,
  }));
  const articles = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt ?? Date.now()),
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
