import type { Project, Stat } from "@/types";
import { photos } from "./photos";

/**
 * Home page copy. Numbers and projects below are PLACEHOLDERS —
 * replace them with your real results before going live.
 */
export const hero = {
  eyebrow: "We build · design · grow",
  description:
    "We design and develop fast, modern websites and web apps with React, Next.js, Node.js, Express and Tailwind CSS — then grow them with SEO, social media marketing, graphic design and video editing.",
  checklist: ["Free strategy call", "Fixed, transparent quotes", "You own 100% of the code"],
  /** Project-roadmap card on the right of the hero */
  card: {
    title: "Your project roadmap",
    sub: "Plan · Build · Grow",
    badge: "Free strategy call",
    highlight: { title: "From idea to launch.", text: "Design, development and marketing — handled by one team, step by step." },
    steps: [
      { icon: "search", title: "Discovery & planning", tag: "Plan" },
      { icon: "pen", title: "UI/UX design in Figma", tag: "Design" },
      { icon: "code", title: "Build with React, Next.js & Node", tag: "Build" },
      { icon: "bolt", title: "Speed, SEO & testing", tag: "Test" },
      { icon: "rocket", title: "Launch & grow with marketing", tag: "Grow" },
    ],
    chips: {
      top: { icon: "layers", title: "Full-stack + marketing", text: "One team, every channel" },
      left: { icon: "stack", title: "Next.js · Node · MongoDB", text: "Modern, scalable stack" },
      right: { icon: "play", title: "Social · Design · Video", text: "Content that converts" },
    },
  },
};

/** Stack strip below the hero. */
export const techLogos = ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "TypeScript", "Redux", "Figma", "Premiere Pro", "After Effects", "Google Ads", "Meta Ads"];

export const stackTiles = [
  { name: "React", role: "UI library", icon: "react", color: "#149eca" },
  { name: "Next.js", role: "SSR & SEO", icon: "next", color: "#111111" },
  { name: "Node.js", role: "Server runtime", icon: "node", color: "#5fa04e" },
  { name: "Express", role: "REST APIs", icon: "express", color: "#353535" },
  { name: "MongoDB", role: "Database", icon: "mongodb", color: "#47a248" },
  { name: "Tailwind", role: "Styling", icon: "tailwind", color: "#06b6d4" },
  { name: "TypeScript", role: "Type safety", icon: "typescript", color: "#3178c6" },
  { name: "Redux", role: "App state", icon: "redux", color: "#764abc" },
] as const;

export const about = {
  photo: photos.teamPresenting,
  values: [
    { icon: "</>", title: "Clean, scalable code", text: "Typed, tested and documented — easy to grow later." },
    { icon: "⚡", title: "Speed & SEO first", text: "Core Web Vitals and on-page SEO baked in from day one." },
    { icon: "✎", title: "Design that converts", text: "Every screen, post and video is made to win customers." },
    { icon: "↗", title: "Growth after launch", text: "Marketing, content and ads that bring real traffic." },
  ],
};

export const stats: Stat[] = [
  { value: 140, suffix: "+", label: "Websites & apps launched" },
  { value: 85, suffix: "+", label: "Brands marketed" },
  { value: 500, suffix: "+", label: "Designs & videos delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

export const whyChoose = {
  features: [
    { icon: "layers", title: "One team, every channel", text: "Developers, designers, editors and marketers under one roof." },
    { icon: "clock", title: "Clear weekly updates", text: "Progress links and simple reports — no confusing jargon." },
    { icon: "shield", title: "No lock-in", text: "Your code, designs, accounts and data always belong to you." },
  ],
  cards: [
    { n: "01", title: "Development-first agency", text: "Our core is engineering. Your site is built properly on React, Next.js and Node — not a slow page builder." },
    { n: "02", title: "Marketing that's measured", text: "Every campaign is tracked from click to lead, so you know exactly what your budget returns." },
    { n: "03", title: "Creative in-house", text: "Logos, social creatives, reels and video ads made by the same team that builds your website." },
  ],
};

export const featuredWork: Project[] = [
  { id: "p1", title: "E-commerce store on MERN", client: "Fashion retailer", tags: ["MERN", "E-commerce"], result: "Web Development", photo: photos.codeDesk },
  { id: "p2", title: "Instagram & TikTok growth", client: "Restaurant chain", tags: ["Social Media", "Video"], result: "Social Media", photo: photos.socialIcons },
  { id: "p3", title: "Brand identity & packaging", client: "Organic skincare", tags: ["Branding"], result: "Graphic Design", photo: photos.designSwatches },
  { id: "p4", title: "Lead-gen SEO & Google Ads", client: "Dental clinic", tags: ["SEO", "PPC"], result: "Digital Marketing", photo: photos.analyticsChart },
];

export const processSteps = [
  { n: "01", icon: "search", title: "Discover", text: "A free call to understand your goals, users and budget." },
  { n: "02", icon: "pen", title: "Design", text: "Wireframes and pixel-perfect UI you approve in Figma." },
  { n: "03", icon: "code", title: "Develop", text: "We build, test and share progress links every week." },
  { n: "04", icon: "rocket", title: "Launch & grow", text: "Go live, then SEO, social, video and ads bring customers." },
];

export const homeFaqs = [
  { title: "How much does a website cost?", body: "Business websites usually start from a few hundred dollars; custom MERN web apps and e-commerce depend on features. Share your requirements and you get a fixed quote within 24 hours." },
  { title: "Which technologies do you use?", body: "React and Next.js for the frontend, Node.js and Express for APIs, MongoDB for the database and Tailwind CSS for styling — all written in TypeScript." },
  { title: "How long does a project take?", body: "Landing pages 1–2 weeks, business websites 2–4 weeks, custom web apps and stores 4–10 weeks." },
  { title: "Can I update the website myself?", body: "Yes. You get an easy dashboard to edit text, images, blog posts and services — no coding needed." },
  { title: "Do you offer social media and video packages?", body: "Yes — monthly plans cover the content calendar, designed posts, reels and video editing, posting and community management." },
  { title: "Can I hire you for just one service?", body: "Of course. Many clients start with a website or a monthly marketing package and add other services later." },
];
