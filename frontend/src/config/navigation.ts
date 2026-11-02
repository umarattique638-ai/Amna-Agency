import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Services mega menu — grouped like the reference site. Slugs match content/services.ts. */
export const serviceMenu = [
  {
    group: "Development",
    icon: "</>",
    items: [
      { label: "Website Development", href: "/services#website-development", text: "React · Next.js · Tailwind" },
      { label: "MERN Web Apps", href: "/services#mern-apps", text: "MongoDB · Express · React · Node" },
    ],
  },
  {
    group: "Marketing",
    icon: "↗",
    items: [
      { label: "Digital Marketing", href: "/services#digital-marketing", text: "SEO · Google & Meta Ads" },
      { label: "Social Media Marketing", href: "/services#social-media-marketing", text: "Content · Reels · Community" },
    ],
  },
  {
    group: "Creative",
    icon: "✎",
    items: [
      { label: "Graphic Designing", href: "/services#graphic-designing", text: "Logos · Branding · Creatives" },
      { label: "Video Editing", href: "/services#video-editing", text: "Reels · YouTube · Ads" },
    ],
  },
];
