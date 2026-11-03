import { VideoCard } from "@/components/ui/VideoCard";
import { reelVideo } from "@/content/videos";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LineIcon } from "@/components/ui/LineIcon";
import { Accent, Eyebrow, Red } from "@/components/ui/SectionHeading";

const points = [
  { icon: "play", text: "Reels, TikToks & YouTube Shorts" },
  { icon: "pen", text: "Captions, motion graphics & colour" },
  { icon: "bolt", text: "Cut for retention on every platform" },
];

/** Home: the social media reel next to a short pitch for content & video. */
export function ReelSection() {
  return (
    <section aria-labelledby="reel-title" className="bg-page py-24 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal stagger>
          <Eyebrow>Social media &amp; video</Eyebrow>
          <h2 id="reel-title" className="display h2-display mt-4">
            Content That <Red>Stops</Red> <Accent>the Scroll.</Accent>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mute">
            We plan, design and edit short-form videos that bring attention to your brand — like this reel we made for our own launch.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.text} className="flex items-center gap-4 text-[16px] font-semibold text-fg">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><LineIcon name={p.icon} /></span>
                {p.text}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/services#video-editing" arrow>Video Editing</ButtonLink>
            <ButtonLink href="/services#social-media-marketing" variant="ghost">Social Media Marketing</ButtonLink>
          </div>
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-accent/25 to-[#9cc3ff]/10 blur-2xl" />
          <VideoCard clip={reelVideo} className="relative" />
        </Reveal>
      </div>
    </section>
  );
}
