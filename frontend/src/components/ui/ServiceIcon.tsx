const paths: Record<string, string> = {
  "website-development": "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01M9 13l-2 2 2 2M15 13l2 2-2 2",
  "mern-apps": "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5",
  "digital-marketing": "M4 20V10M10 20V4M16 20v-7M22 20H2",
  "social-media-marketing": "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a6 6 0 0 1 12 0M13 20a5 5 0 0 1 9-3",
  "graphic-designing": "M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3.5 3H15a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 21ZM7.5 11h.01M10 7h.01M15 7.5h.01",
  "video-editing": "M3 6h13v12H3zM16 10l5-3v10l-5-3",
};
const fallback = "M12 2l2.6 6.9L22 9.3l-5.6 4.7L18 21l-6-3.8L6 21l1.6-7L2 9.3l7.4-.4Z";

/** Line icon per service slug (unknown slugs from the dashboard get a star). */
export function ServiceIcon({ slug, className = "size-6" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[slug] ?? fallback} />
    </svg>
  );
}
