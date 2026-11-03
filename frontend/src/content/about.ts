import { photos } from "./photos";

export const aboutHero = {
  photo: photos.teamOpenOffice,
  photo2: photos.designImac,
  stats: [
    { value: "2019", label: "Founded" },
    { value: "18", label: "Team members" },
    { value: "140+", label: "Projects delivered" },
    { value: "6", label: "Countries served" },
  ],
};

export const missionVision = {
  mission: "To give growing businesses the same quality of website, branding and marketing that big companies enjoy — at a price and pace that makes sense for them.",
  vision: "To be the most trusted digital partner for ambitious brands in Pakistan and beyond, known for honest advice and work that delivers measurable growth.",
};

export const teams = [
  { icon: "</>", name: "Development", count: "7 engineers", text: "MERN stack, Next.js, APIs, e-commerce and performance.", skills: ["React", "Node.js", "MongoDB", "Next.js"] },
  { icon: "✎", name: "Design studio", count: "5 designers", text: "Brand identity, UI/UX, social creatives and print.", skills: ["Figma", "Illustrator", "Branding", "Motion"] },
  { icon: "↗", name: "Growth & marketing", count: "6 specialists", text: "Social media, content, SEO and paid campaigns.", skills: ["Meta Ads", "Google Ads", "SEO", "Content"] },
  { icon: "▶", name: "Video & motion", count: "3 editors", text: "Reels, YouTube edits, video ads and motion graphics.", skills: ["Premiere Pro", "After Effects", "CapCut", "Subtitles"] },
];

export const story = {
  photo: photos.teamWhiteboard,
  paragraphs: [
    "Axiom started in 2019 with two freelancers — a developer and a designer — helping local businesses get online. Clients kept asking the same question: “Can you also handle our Instagram and ads?”",
    "So we grew into a full-service team. Today our developers, designers and marketers work side by side, so a client's website, social media and campaigns are planned together and push in the same direction.",
    "We work with startups, shops, clinics, restaurants and growing companies in Pakistan and abroad — and we still treat every project like it's our own business.",
  ],
  milestones: [
    { year: "2019", text: "Started as a two-person web studio" },
    { year: "2021", text: "Launched social media & design team" },
    { year: "2023", text: "Added performance marketing (Google & Meta)" },
    { year: "2026", text: "140+ websites and 85+ brands managed" },
  ],
};

export const values = [
  { title: "Honest advice", text: "We tell you what will actually work for your budget — even if it means a smaller project." },
  { title: "Quality first", text: "Clean code, thoughtful design and content we're proud to put our name on." },
  { title: "Results you can see", text: "Every project has clear goals and every month you get numbers, not excuses." },
  { title: "Long-term partners", text: "Most of our clients have worked with us for years. We grow when you grow." },
];

export const processSteps = [
  { title: "Discover", text: "A free call to understand your business, audience, competitors and goals." },
  { title: "Plan & Design", text: "A clear plan, budget and timeline — then designs for your brand, website or content." },
  { title: "Build & Launch", text: "Our developers and creators build, test and launch. You approve every step." },
  { title: "Grow & Report", text: "Marketing brings customers in. Monthly reports show what's working and what's next." },
];

export const industries = [
  "Retail & E-commerce",
  "Real Estate",
  "Restaurants & Cafés",
  "Healthcare & Clinics",
  "Education",
  "SaaS & Startups",
  "Fashion & Beauty",
  "Travel & Hospitality",
];

export const aboutPage = {
  mission: {
    title: ["Great marketing shouldn't be a luxury.", "It should be how every business grows."],
    text: "For years, small and growing businesses had two bad options: cheap freelancers who disappear, or big agencies with big retainers. We built Axiom to be the third option — a senior, full-service team that is honest about budgets and obsessed with results.",
  },
  whatWeDo: [
    { icon: "code", title: "We build", text: "Fast, secure websites and web apps with React, Next.js and Node — designed to rank on Google and turn visitors into customers.", link: { label: "See development", href: "/services#website-development" } },
    { icon: "pen", title: "We design", text: "Logos, brand identities, UI and social creatives that make your business instantly recognisable and trusted.", link: { label: "See design", href: "/services#graphic-designing" } },
    { icon: "play", title: "We film & edit", text: "Reels, YouTube videos and video ads — edited for retention and cut for every platform's format.", link: { label: "See video editing", href: "/services#video-editing" } },
    { icon: "bolt", title: "We grow", text: "Social media, SEO and paid ads that bring the right people to your brand — measured every single month.", link: { label: "See marketing", href: "/services#digital-marketing" } },
  ],
  different: [
    { title: "Honest advice", text: "If a cheaper solution is the right one for you, we'll say so. Our reputation matters more than one invoice." },
    { title: "One accountable team", text: "Developers, designers and marketers sit together. You get one plan, one contact and one monthly report." },
    { title: "Numbers you can see", text: "Every project starts with clear goals — speed, leads, followers or sales — and we report against them." },
  ],
  nameStory: "An axiom is a statement so true it doesn't need proving. That's how we see good work: fast websites, clear design and campaigns that pay for themselves should speak for themselves.",
  founderQuote:
    "We started Axiom because we kept meeting business owners who had been burned — a website nobody could update, an Instagram account that went quiet, ads that spent money without a single lead. We wanted to be the team we'd hire ourselves: straightforward, skilled and accountable for results.",
};
