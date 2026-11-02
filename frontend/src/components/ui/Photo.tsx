"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, isCloudinary, unsplashLoader } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "loader"> & {
  photo: { src: string; alt: string };
  className?: string;
};

/**
 * Responsive photo that fills its (relative) parent.
 * Unsplash / Cloudinary → resized by their CDNs; /public files → Next optimiser;
 * any other remote URL (pasted in the dashboard) → served as-is.
 */
export function Photo({ photo, className, sizes = "(max-width: 768px) 100vw, 50vw", ...rest }: PhotoProps) {
  const isUnsplash = photo.src.startsWith("https://images.unsplash.com");
  const isCdn = isCloudinary(photo.src);
  const isRemote = /^https?:\/\//.test(photo.src);
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      loader={isUnsplash ? unsplashLoader : isCdn ? cloudinaryLoader : undefined}
      unoptimized={isRemote && !isUnsplash && !isCdn}
      className={cn("object-cover", className)}
      {...rest}
    />
  );
}
