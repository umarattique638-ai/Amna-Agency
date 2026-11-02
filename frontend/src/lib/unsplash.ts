import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Unsplash: lets Unsplash's CDN resize/compress
 * (auto=format → AVIF/WebP) so no server-side optimiser is needed.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}

/** Build an Unsplash URL from a photo id ("photo-1498050108023-c5249f4df085"). */
export const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

/** next/image loader for Cloudinary uploads: injects width + auto format/quality into the delivery URL. */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return src.replace("/image/upload/", `/image/upload/f_auto,q_${quality ?? "auto"},c_limit,w_${width}/`);
}

export const isCloudinary = (src: string) => /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(src);
