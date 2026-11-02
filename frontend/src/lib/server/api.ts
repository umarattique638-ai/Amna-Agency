import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { fallbackPosts, fallbackServices } from "@/lib/fallback";
import type { Paginated, PostDTO, ServiceDTO, UserDTO } from "@/types/api";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

/**
 * Server-side calls to the Express API (Server Components only).
 * Responses are cached with tags; the backend pings /revalidate after edits.
 */
async function apiGet<T>(path: string, tags: string[]): Promise<T> {
  const res = await fetch(`${BACKEND_URL}/api${path}`, {
    next: { revalidate: 300, tags },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return (await res.json()).data as T;
}

async function withFallback<T>(fn: () => Promise<T>, fallback: T, label: string) {
  try {
    return await fn();
  } catch (e) {
    console.warn(`[api] ${label} unavailable, using built-in content:`, (e as Error).message);
    return fallback;
  }
}

export const getPublishedPosts = cache(async () => {
  const data = await withFallback(() => apiGet<Paginated<PostDTO>>("/posts?limit=100", ["posts"]), null, "posts");
  return data?.items.length ? data.items : fallbackPosts;
});

export const getPostBySlug = cache(async (slug: string) => {
  const post = await withFallback(
    async () => (await apiGet<{ post: PostDTO }>(`/posts/slug/${encodeURIComponent(slug)}`, ["posts"])).post,
    null,
    "post",
  );
  return post ?? (await getPublishedPosts()).find((p) => p.slug === slug) ?? null;
});

export const getServices = cache(async () => {
  const data = await withFallback(() => apiGet<{ services: ServiceDTO[] }>("/services", ["services"]), null, "services");
  return data?.services.length ? data.services : fallbackServices;
});

/** Dashboard gate: asks the API who the cookie belongs to (full blacklist + session check). */
export async function getSessionUser(): Promise<UserDTO | null> {
  const cookie = (await cookies()).toString();
  if (!cookie) return null;
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { cookie }, cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return (await res.json()).data.user as UserDTO;
  } catch {
    return null;
  }
}
