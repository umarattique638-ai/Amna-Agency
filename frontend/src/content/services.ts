import type { Service, StackItem } from "@/types";
import { photos } from "./photos";

/** The agency's offer. Everything about services on the site is driven from this file. */
export const services: Service[] = [
  {
    id: "website-development",
    index: 1,
    title: "Website Development",
    category: "Website Development",
    summary: "Fast, SEO-ready business websites and landing pages built with React, Next.js and Tailwind CSS.",
    description:
      "Business websites, landing pages and portfolios built with React, Next.js and Tailwind CSS — lightning fast, mobile-first, SEO-ready and easy for your team to update from a dashboard.",
    deliverables: ["Next.js", "React", "Tailwind CSS", "Responsive", "On-page SEO", "CMS dashboard"],
    photo: photos.codeMacbook,
    highlight: { value: "95+", label: "Lighthouse target" },
  },
  {
    id: "mern-apps",
    index: 2,
    title: "MERN Web Apps",
    category: "MERN Stack Development",
    summary: "Custom web apps, dashboards, SaaS and e-commerce on MongoDB, Express, React and Node.js.",
    description:
      "Custom web applications on the MERN stack — MongoDB, Express, React and Node.js. Admin dashboards, SaaS products, e-commerce stores, booking systems and secure REST APIs with authentication and payments.",
    deliverables: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Auth & Payments"],
    photo: photos.codeReact,
    highlight: { value: "MERN", label: "Full-stack JS" },
  },
  {
    id: "digital-marketing",
    index: 3,
    title: "Digital Marketing",
    category: "Digital Marketing (SEO & PPC)",
    summary: "SEO, Google Ads, Meta Ads and analytics focused on leads and sales — not vanity numbers.",
    description:
      "Search engine optimisation, Google and Meta pay-per-click campaigns, landing-page optimisation and analytics. Every campaign is tracked and tied to real leads and sales.",
    deliverables: ["SEO", "Google Ads", "Meta Ads", "Email Marketing", "GA4 Analytics"],
    photo: photos.analyticsLaptop,
    highlight: { value: "ROI", label: "Tracked monthly" },
  },
  {
    id: "social-media-marketing",
    index: 4,
    title: "Social Media Marketing",
    category: "Social Media Marketing",
    summary: "Content calendars, reels and community management on Instagram, Facebook, TikTok and LinkedIn.",
    description:
      "Strategy, content calendars, designed posts, reels and community management across Instagram, Facebook, TikTok and LinkedIn — turning followers into paying customers.",
    deliverables: ["Content Calendar", "Reels & Shorts", "Community Management", "Influencers", "Paid Social"],
    photo: photos.socialPhone,
    highlight: { value: "4", label: "Platforms" },
  },
  {
    id: "graphic-designing",
    index: 5,
    title: "Graphic Designing",
    category: "Graphic Designing",
    summary: "Logos, brand identity, social media creatives, packaging, print and UI design.",
    description:
      "Logos and brand identity, social media creatives, ad banners, packaging, brochures and UI/UX design in Figma — a consistent look that makes your brand instantly recognisable.",
    deliverables: ["Logo & Identity", "Social Creatives", "Print & Packaging", "UI/UX in Figma", "Brand Guidelines"],
    photo: photos.designTablet,
    highlight: { value: "Figma", label: "Adobe CC" },
  },
  {
    id: "video-editing",
    index: 6,
    title: "Video Editing",
    category: "Video Editing",
    summary: "Reels, YouTube videos, ads and motion graphics edited to stop the scroll.",
    description:
      "Short-form reels and TikToks, YouTube videos, product and ad videos, subtitles, colour grading and motion graphics — edited for retention and built for each platform's format.",
    deliverables: ["Reels & TikToks", "YouTube Editing", "Video Ads", "Motion Graphics", "Subtitles & Colour"],
    photo: photos.videoEditing,
    highlight: { value: "9:16", label: "& 16:9 formats" },
  },
];

export const servicesHero = {
  photo: photos.teamLaptops,
};

export const stack: StackItem[] = [
  { letter: "M", name: "MongoDB", role: "Database", description: "Flexible NoSQL database that stores your users, products and orders — scales as you grow." },
  { letter: "E", name: "Express.js", role: "Backend API", description: "Secure REST APIs for login, payments, bookings and integrations with any service." },
  { letter: "R", name: "React", role: "Frontend", description: "Fast, interactive interfaces — with Next.js for SEO, speed and server rendering." },
  { letter: "N", name: "Node.js", role: "Server runtime", description: "JavaScript on the server, so one team builds the whole product end-to-end." },
];

/** Hotspot callouts on the stack dashboard (positions in % of the frame). */
export const stackHotspots = [
  { label: "React + Next.js", meta: "Frontend · SSR", dot: { x: 18, y: 26 }, card: { x: 34, y: 36 } },
  { label: "Express API", meta: "REST · 12ms", dot: { x: 66, y: 60 }, card: { x: 24, y: 72 } },
  { label: "MongoDB Atlas", meta: "Database · Backups", dot: { x: 86, y: 44 }, card: { x: 56, y: 22 } },
];

export const packages = [
  {
    name: "One-time project",
    bestFor: "New website, app, logo or launch campaign",
    features: ["Fixed scope & timeline", "Milestone payments", "30 days free support", "Full ownership of files"],
  },
  {
    name: "Monthly growth",
    bestFor: "Social media, SEO and ads that run every month",
    features: ["Content calendar & posting", "Ad campaign management", "Monthly report & call", "Cancel anytime"],
    popular: true,
  },
  {
    name: "Dedicated team",
    bestFor: "Companies that need ongoing development & design",
    features: ["Developer + designer + marketer", "Weekly sprints", "Slack / WhatsApp access", "Priority support"],
  },
];

export const faqs = [
  {
    title: "Can I hire you for just one service?",
    body: "Yes. Many clients start with a website or a monthly social media package and add other services later.",
  },
  {
    title: "What is the MERN stack and why do you use it?",
    body: "MERN = MongoDB, Express.js, React and Node.js. It is all JavaScript, fast to develop, easy to scale, and used by companies of every size — perfect for websites, dashboards and e-commerce.",
  },
  {
    title: "How long does a website take?",
    body: "A business website usually takes 2–4 weeks. Custom MERN web apps and e-commerce stores take 4–10 weeks depending on features.",
  },
  {
    title: "What is included in monthly social media management?",
    body: "A content calendar, designed posts and reels, captions and hashtags, posting, replying to comments and messages, and a monthly performance report.",
  },
  {
    title: "Do I need to pay for ads separately?",
    body: "Yes. Ad spend is paid directly to Google or Meta from your own account, so you stay in full control. Our fee covers strategy, creatives and management.",
  },
];
