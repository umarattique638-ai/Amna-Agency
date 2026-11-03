export const siteConfig = {
  name: "Axiom",
  legalName: "Axiom Digital Studio",
  tagline: "Web Development, Digital Marketing, Design & Video",
  description:
    "Axiom Digital Studio is a full-service digital agency: website development with React, Next.js, Node.js, Express and Tailwind (MERN), digital marketing (SEO & PPC), social media marketing, graphic designing and video editing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axiom.studio",
  email: "hello@axiom.studio",
  phone: "+92 300 0000000",
  location: "Lahore · Remote worldwide",
  whatsapp: "https://wa.me/923000000000",
  /** Owners of the agency — shown on Home, About and in the footer. Edit roles/bios freely. */
  founders: [
    { name: "Amna", initials: "A", role: "Co-Founder & Owner", bio: "Leads strategy and client relationships, and makes sure every project is planned around real business goals.", focus: ["Strategy", "Client success", "Marketing"] },
    { name: "Bilal", initials: "B", role: "Co-Founder & Owner", bio: "Leads delivery across development, design and marketing, and keeps quality high from first call to launch.", focus: ["Development", "Design", "Delivery"] },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com", short: "IG" },
    { label: "LinkedIn", href: "https://linkedin.com", short: "IN" },
    { label: "Facebook", href: "https://facebook.com", short: "FB" },
    { label: "Behance", href: "https://behance.net", short: "BE" },
    { label: "YouTube", href: "https://youtube.com", short: "YT" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
