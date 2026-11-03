"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Clip {
  src: string;
  poster: string;
  title: string;
  meta: string;
  ratio: string;
}

const clips: Clip[] = [
  { src: "/videos/axiom-promo.mp4", poster: "/videos/axiom-promo.jpg", title: "Brand promo film", meta: "16:9 · YouTube & website", ratio: "aspect-video" },
  { src: "/videos/axiom-reel.mp4", poster: "/videos/axiom-reel.jpg", title: "Social media reel", meta: "4:5 · Instagram & Facebook", ratio: "aspect-[4/5]" },
];

/** Muted preview plays while on screen; click to watch with sound. */
function VideoCard({ clip, className }: { clip: Clip; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? void v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    setActive(true);
    v.muted = false;
    v.currentTime = 0;
    void v.play();
  };

  return (
    <figure className={cn("group relative", className)}>
      <div className={cn("relative overflow-hidden rounded-[24px] bg-dark shadow-[0_40px_80px_-40px_rgba(4,31,115,0.6)] ring-1 ring-line", clip.ratio)}>
        <video
          ref={ref}
          src={clip.src}
          poster={clip.poster}
          muted
          loop={!active}
          playsInline
          preload="metadata"
          controls={active}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
        />
        {!active && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play ${clip.title} with sound`}
            className="absolute inset-0 flex items-end bg-gradient-to-t from-dark/70 via-transparent to-transparent p-5"
          >
            <span className="flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-[15px] font-bold text-navy shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] text-white">
                <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
              </span>
              Watch with sound
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[17px] font-bold text-fg">{clip.title}</span>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[12.5px] font-bold text-accent">{clip.meta}</span>
      </figcaption>
    </figure>
  );
}

/** "Our recent edits" — sits under the Video Editing service. */
export function VideoShowcase() {
  return (
    <div className="container-x">
      <div className="rounded-[32px] border border-line bg-white p-6 md:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-wider text-accent uppercase">Our recent edits</p>
            <h3 className="display mt-2 text-[clamp(1.6rem,2.6vw,2.25rem)]">Made in-house, for every platform.</h3>
          </div>
          <p className="max-w-md text-[15.5px] text-mute">Tap a video to watch it with sound. Same story, cut for widescreen and for the social feed.</p>
        </div>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.9fr_1fr]">
          {clips.map((c) => (
            <VideoCard key={c.src} clip={c} className={c.ratio.includes("4/5") ? "mx-auto w-full max-w-[420px] lg:max-w-none" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
