"use client";

import { useId, useRef, useState } from "react";
import { apiError, useUploadImageMutation } from "@/store/api";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { Input } from "./controls";

const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_MB = 5;

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  /** Cloudinary sub-folder */
  folder: "posts" | "services" | "misc";
  alt?: string;
  error?: string;
  id?: string;
}

/**
 * Drag & drop / click-to-pick image upload → Express → Cloudinary.
 * The returned secure URL is what gets saved in MongoDB. Pasting an existing URL still works.
 */
export function ImageUploader({ value, onChange, folder, alt, error, id }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const urlId = id ?? `${autoId}-url`;
  const [drag, setDrag] = useState(false);
  const [localError, setLocalError] = useState("");
  const [upload, { isLoading }] = useUploadImageMutation();

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setLocalError("");
    if (!TYPES.includes(file.type)) return setLocalError("Only JPG, PNG, WEBP, GIF or AVIF images.");
    if (file.size > MAX_MB * 1024 * 1024) return setLocalError(`Image must be smaller than ${MAX_MB} MB.`);
    try {
      const { image } = await upload({ file, folder }).unwrap();
      onChange(image.url);
      toast.success("Image uploaded", "Don't forget to save your changes.");
    } catch (e) {
      const msg = apiError(e).message;
      setLocalError(msg);
      toast.error("Upload failed", msg);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const shownError = localError || error;

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label={value ? "Replace image" : "Upload image"}
        aria-busy={isLoading}
        onClick={() => !isLoading && inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), inputRef.current?.click())}
        onDragOver={(e) => (e.preventDefault(), setDrag(true))}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-colors",
          drag ? "border-accent bg-accent-soft" : "border-line bg-surface-2 hover:border-accent/60",
          shownError && "border-red-400",
        )}
      >
        {value && (
          // eslint-disable-next-line @next/next/no-img-element -- live preview of any URL
          <img src={value} alt={alt || "Preview"} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div
          className={cn(
            "absolute inset-0 grid place-items-center p-4 text-center transition-opacity",
            value ? "bg-dark/55 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "text-mute",
            (isLoading || drag) && "opacity-100",
          )}
        >
          {isLoading ? (
            <span className="flex flex-col items-center gap-2 text-sm font-semibold">
              <span className="size-7 animate-spin rounded-full border-[3px] border-current border-t-transparent" aria-hidden />
              Uploading…
            </span>
          ) : (
            <span className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              <span className="text-sm font-semibold">{value ? "Click or drop to replace" : "Click or drag an image here"}</span>
              <span className="text-xs opacity-80">JPG, PNG, WEBP · max {MAX_MB} MB</span>
            </span>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept={TYPES.join(",")} className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => void handleFile(e.target.files?.[0])} />

      {shownError && <p role="alert" className="text-xs font-medium text-red-600">{shownError}</p>}

      <div className="flex items-center gap-2">
        <label htmlFor={urlId} className="sr-only">Image URL</label>
        <Input id={urlId} value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste an image URL" aria-invalid={!!shownError} />
        {value && (
          <button type="button" onClick={() => onChange("")} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-mute hover:bg-surface hover:text-red-600">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
