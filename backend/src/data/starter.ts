/** Starter content — loaded by `npm run seed` or the dashboard "Import starter content" button. */

export const starterPosts = [
  {
    "title": "What is the MERN stack — and is it right for your business website?",
    "slug": "what-is-the-mern-stack",
    "excerpt": "MongoDB, Express, React and Node.js explained in plain language, with when to choose MERN and when a simpler site is enough.",
    "content": "If you have talked to a developer recently you have probably heard “we'll build it on MERN”. Here is what that means, without the jargon.\n\n## The four parts\n\n- MongoDB — the database where your products, users and orders are stored.\n- Express.js — the backend that handles logins, payments and other requests.\n- React — the part your visitors see and click on.\n- Node.js — runs JavaScript on the server, so one language powers everything.\n\n## When MERN is a great choice\n\nChoose MERN when your website needs to do things: user accounts, dashboards, online booking, e-commerce, or connecting to other apps. It is fast to build, easy to scale and has a huge ecosystem of ready-made tools.\n\n## When you don't need it\n\nA simple 5-page company website does not need a custom database. A fast Next.js site with a content editor is cheaper and quicker. A good agency will tell you honestly which one you need.",
    "category": "Web Development",
    "coverImage": "https://images.unsplash.com/photo-1619410283995-43d9134e7656",
    "coverAlt": "Code editor displaying React source code",
    "publishedAt": "2026-10-20"
  },
  {
    "title": "A simple monthly social media content plan for small businesses",
    "slug": "monthly-social-media-content-plan",
    "excerpt": "Stop posting randomly. A 4-week framework you can copy today — what to post, how often, and how to measure it.",
    "content": "Consistency beats perfection on social media. The easiest way to stay consistent is to plan the whole month in one sitting.\n\n## The 4-1-1 mix\n\n- 4 helpful or entertaining posts (tips, behind the scenes, reels)\n- 1 post about your product or offer\n- 1 post sharing a customer review or result\n\n## How often to post\n\n3–4 posts a week on Instagram and Facebook, daily short videos if you are growing on TikTok, and 2–3 posts a week on LinkedIn for B2B. Pick fewer channels and do them well.\n\n## What to measure\n\nIgnore vanity numbers. Track saves, shares, profile visits, website clicks and messages — those lead to sales.",
    "category": "Social Media",
    "coverImage": "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
    "coverAlt": "Smartphone showing social media apps",
    "publishedAt": "2026-10-08"
  },
  {
    "title": "Logo vs brand identity: what your business actually needs",
    "slug": "logo-vs-brand-identity",
    "excerpt": "A logo is just the start. Here's what a complete brand identity includes and why it makes every post and ad look better.",
    "content": "Many businesses ask for “just a logo” — then struggle to make their posts, website and packaging look consistent.\n\n## What a brand identity includes\n\n- Primary logo plus icon and horizontal versions\n- Colour palette with exact codes\n- Fonts for headings and text\n- Social media templates and post styles\n- A short brand guide so anyone can use it correctly\n\n## Why it matters\n\nWhen customers see the same colours, fonts and style everywhere, they recognise you faster and trust you more. It also makes content creation quicker and cheaper every month.",
    "category": "Graphic Design",
    "coverImage": "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    "coverAlt": "Pantone colour swatch book used by graphic designers",
    "publishedAt": "2026-09-22"
  },
  {
    "title": "Google Ads vs Meta Ads: which should you start with?",
    "slug": "google-ads-vs-meta-ads",
    "excerpt": "Search ads catch people who are already looking; social ads create demand. How to choose — and how to split a small budget.",
    "content": "## Google Ads: capture existing demand\n\nPeople type exactly what they want — “dentist near me”, “buy running shoes”. If customers already search for your product or service, Google Ads usually brings the fastest leads.\n\n## Meta Ads: create new demand\n\nFacebook and Instagram ads reach people based on interests and behaviour, before they search. They work best for visual products, offers and building awareness.\n\n## A simple starting split\n\n- Service businesses: 70% Google, 30% Meta retargeting\n- Fashion, food and lifestyle: 70% Meta, 30% Google brand searches\n- Review results after 30 days and move budget to what's working",
    "category": "Digital Marketing",
    "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "coverAlt": "Laptop showing marketing analytics charts",
    "publishedAt": "2026-09-05"
  },
  {
    "title": "Why a slow website is quietly costing you customers",
    "slug": "website-speed-and-sales",
    "excerpt": "Every extra second of loading time loses visitors. The most common speed problems and how modern websites fix them.",
    "content": "Most visitors arrive on a phone, often on mobile data. If your page takes too long, they simply go back and click a competitor.\n\n## Common causes\n\n- Huge, uncompressed images\n- Too many plugins and tracking scripts\n- Cheap shared hosting\n- Old themes that load everything on every page\n\n## How we fix it\n\nModern frameworks like Next.js load only what each page needs, serve images in light formats automatically and host on fast global networks. The result: better Google rankings and more enquiries.",
    "category": "Web Development",
    "coverImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "coverAlt": "MacBook showing lines of code on a developer's desk",
    "publishedAt": "2026-08-18"
  }
] as const;

export const starterServices = [
  {
    "title": "Website Development",
    "slug": "website-development",
    "summary": "Fast, SEO-ready business websites and landing pages built with React, Next.js and Tailwind CSS.",
    "description": "Business websites, landing pages and portfolios built with React, Next.js and Tailwind CSS — lightning fast, mobile-first, SEO-ready and easy for your team to update from a dashboard.",
    "deliverables": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Responsive",
      "On-page SEO",
      "CMS dashboard"
    ],
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "imageAlt": "MacBook showing lines of code on a developer's desk",
    "highlightValue": "95+",
    "highlightLabel": "Lighthouse target",
    "order": 1,
    "published": true
  },
  {
    "title": "MERN Stack Development",
    "slug": "mern-apps",
    "summary": "Custom web apps, dashboards, SaaS and e-commerce on MongoDB, Express, React and Node.js.",
    "description": "Custom web applications on the MERN stack — MongoDB, Express, React and Node.js. Admin dashboards, SaaS products, e-commerce stores, booking systems and secure REST APIs with authentication and payments.",
    "deliverables": [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "REST APIs",
      "Auth & Payments"
    ],
    "image": "https://images.unsplash.com/photo-1619410283995-43d9134e7656",
    "imageAlt": "Code editor displaying React source code",
    "highlightValue": "MERN",
    "highlightLabel": "Full-stack JS",
    "order": 2,
    "published": true
  },
  {
    "title": "Digital Marketing (SEO & PPC)",
    "slug": "digital-marketing",
    "summary": "SEO, Google Ads, Meta Ads and analytics focused on leads and sales — not vanity numbers.",
    "description": "Search engine optimisation, Google and Meta pay-per-click campaigns, landing-page optimisation and analytics. Every campaign is tracked and tied to real leads and sales.",
    "deliverables": [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Email Marketing",
      "GA4 Analytics"
    ],
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "imageAlt": "Laptop showing marketing analytics charts",
    "highlightValue": "ROI",
    "highlightLabel": "Tracked monthly",
    "order": 3,
    "published": true
  },
  {
    "title": "Social Media Marketing",
    "slug": "social-media-marketing",
    "summary": "Content calendars, reels and community management on Instagram, Facebook, TikTok and LinkedIn.",
    "description": "Strategy, content calendars, designed posts, reels and community management across Instagram, Facebook, TikTok and LinkedIn — turning followers into paying customers.",
    "deliverables": [
      "Content Calendar",
      "Reels & Shorts",
      "Community Management",
      "Influencers",
      "Paid Social"
    ],
    "image": "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
    "imageAlt": "Smartphone showing social media apps",
    "highlightValue": "4",
    "highlightLabel": "Platforms",
    "order": 4,
    "published": true
  },
  {
    "title": "Graphic Designing",
    "slug": "graphic-designing",
    "summary": "Logos, brand identity, social media creatives, packaging, print and UI design.",
    "description": "Logos and brand identity, social media creatives, ad banners, packaging, brochures and UI/UX design in Figma — a consistent look that makes your brand instantly recognisable.",
    "deliverables": [
      "Logo & Identity",
      "Social Creatives",
      "Print & Packaging",
      "UI/UX in Figma",
      "Brand Guidelines"
    ],
    "image": "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
    "imageAlt": "Designer drawing on a tablet with colour swatches and markers",
    "highlightValue": "Figma",
    "highlightLabel": "Adobe CC",
    "order": 5,
    "published": true
  },
  {
    "title": "Video Editing",
    "slug": "video-editing",
    "summary": "Reels, YouTube videos, ads and motion graphics edited to stop the scroll.",
    "description": "Short-form reels and TikToks, YouTube videos, product and ad videos, subtitles, colour grading and motion graphics — edited for retention and built for each platform's format.",
    "deliverables": [
      "Reels & TikToks",
      "YouTube Editing",
      "Video Ads",
      "Motion Graphics",
      "Subtitles & Colour"
    ],
    "image": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
    "imageAlt": "Video editor working on a timeline in editing software",
    "highlightValue": "9:16",
    "highlightLabel": "& 16:9 formats",
    "order": 6,
    "published": true
  }
];
