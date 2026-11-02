import type { StaticPost } from "@/types";
import { photos } from "./photos";

export const posts: StaticPost[] = [
  {
    slug: "what-is-the-mern-stack",
    title: "What is the MERN stack — and is it right for your business website?",
    excerpt: "MongoDB, Express, React and Node.js explained in plain language, with when to choose MERN and when a simpler site is enough.",
    category: "Web Development",
    date: "2026-10-20",
    readTime: "6 min read",
    photo: photos.codeReact,
    content: [
      {
        paragraphs: [
          "If you have talked to a developer recently you have probably heard “we'll build it on MERN”. Here is what that means, without the jargon.",
        ],
      },
      {
        heading: "The four parts",
        list: [
          "MongoDB — the database where your products, users and orders are stored.",
          "Express.js — the backend that handles logins, payments and other requests.",
          "React — the part your visitors see and click on.",
          "Node.js — runs JavaScript on the server, so one language powers everything.",
        ],
      },
      {
        heading: "When MERN is a great choice",
        paragraphs: [
          "Choose MERN when your website needs to do things: user accounts, dashboards, online booking, e-commerce, or connecting to other apps. It is fast to build, easy to scale and has a huge ecosystem of ready-made tools.",
        ],
      },
      {
        heading: "When you don't need it",
        paragraphs: [
          "A simple 5-page company website does not need a custom database. A fast Next.js site with a content editor is cheaper and quicker. A good agency will tell you honestly which one you need.",
        ],
      },
    ],
  },
  {
    slug: "monthly-social-media-content-plan",
    title: "A simple monthly social media content plan for small businesses",
    excerpt: "Stop posting randomly. A 4-week framework you can copy today — what to post, how often, and how to measure it.",
    category: "Social Media",
    date: "2026-10-08",
    readTime: "5 min read",
    photo: photos.socialPhone,
    content: [
      {
        paragraphs: ["Consistency beats perfection on social media. The easiest way to stay consistent is to plan the whole month in one sitting."],
      },
      {
        heading: "The 4-1-1 mix",
        list: [
          "4 helpful or entertaining posts (tips, behind the scenes, reels)",
          "1 post about your product or offer",
          "1 post sharing a customer review or result",
        ],
      },
      {
        heading: "How often to post",
        paragraphs: [
          "3–4 posts a week on Instagram and Facebook, daily short videos if you are growing on TikTok, and 2–3 posts a week on LinkedIn for B2B. Pick fewer channels and do them well.",
        ],
      },
      {
        heading: "What to measure",
        paragraphs: ["Ignore vanity numbers. Track saves, shares, profile visits, website clicks and messages — those lead to sales."],
      },
    ],
  },
  {
    slug: "logo-vs-brand-identity",
    title: "Logo vs brand identity: what your business actually needs",
    excerpt: "A logo is just the start. Here's what a complete brand identity includes and why it makes every post and ad look better.",
    category: "Graphic Design",
    date: "2026-09-22",
    readTime: "4 min read",
    photo: photos.designSwatches,
    content: [
      {
        paragraphs: ["Many businesses ask for “just a logo” — then struggle to make their posts, website and packaging look consistent."],
      },
      {
        heading: "What a brand identity includes",
        list: [
          "Primary logo plus icon and horizontal versions",
          "Colour palette with exact codes",
          "Fonts for headings and text",
          "Social media templates and post styles",
          "A short brand guide so anyone can use it correctly",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "When customers see the same colours, fonts and style everywhere, they recognise you faster and trust you more. It also makes content creation quicker and cheaper every month.",
        ],
      },
    ],
  },
  {
    slug: "google-ads-vs-meta-ads",
    title: "Google Ads vs Meta Ads: which should you start with?",
    excerpt: "Search ads catch people who are already looking; social ads create demand. How to choose — and how to split a small budget.",
    category: "Digital Marketing",
    date: "2026-09-05",
    readTime: "6 min read",
    photo: photos.analyticsLaptop,
    content: [
      {
        heading: "Google Ads: capture existing demand",
        paragraphs: [
          "People type exactly what they want — “dentist near me”, “buy running shoes”. If customers already search for your product or service, Google Ads usually brings the fastest leads.",
        ],
      },
      {
        heading: "Meta Ads: create new demand",
        paragraphs: [
          "Facebook and Instagram ads reach people based on interests and behaviour, before they search. They work best for visual products, offers and building awareness.",
        ],
      },
      {
        heading: "A simple starting split",
        list: [
          "Service businesses: 70% Google, 30% Meta retargeting",
          "Fashion, food and lifestyle: 70% Meta, 30% Google brand searches",
          "Review results after 30 days and move budget to what's working",
        ],
      },
    ],
  },
  {
    slug: "website-speed-and-sales",
    title: "Why a slow website is quietly costing you customers",
    excerpt: "Every extra second of loading time loses visitors. The most common speed problems and how modern websites fix them.",
    category: "Web Development",
    date: "2026-08-18",
    readTime: "4 min read",
    photo: photos.codeMacbook,
    content: [
      {
        paragraphs: ["Most visitors arrive on a phone, often on mobile data. If your page takes too long, they simply go back and click a competitor."],
      },
      {
        heading: "Common causes",
        list: [
          "Huge, uncompressed images",
          "Too many plugins and tracking scripts",
          "Cheap shared hosting",
          "Old themes that load everything on every page",
        ],
      },
      {
        heading: "How we fix it",
        paragraphs: [
          "Modern frameworks like Next.js load only what each page needs, serve images in light formats automatically and host on fast global networks. The result: better Google rankings and more enquiries.",
        ],
      },
    ],
  },
];

