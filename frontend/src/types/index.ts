export interface NavItem {
  label: string;
  href: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  index: number;
  /** Short title used in big type */
  title: string;
  /** Full category name, e.g. "Website Development" */
  category: string;
  summary: string;
  description: string;
  deliverables: string[];
  photo: Photo;
  /** Small highlight shown on the photo */
  highlight: { value: string; label: string };
}

export interface Project {
  id: string;
  title: string;
  client: string;
  tags: string[];
  result: string;
  photo: Photo;
}

export interface StackItem {
  letter: string;
  name: string;
  role: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface BlogBlock {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface StaticPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Web Development" | "Social Media" | "Graphic Design" | "Digital Marketing" | "Video Editing";
  /** ISO date */
  date: string;
  readTime: string;
  photo: Photo;
  content: BlogBlock[];
}

/** Shapes the public pages render — identical to the API DTOs, so API data and fallbacks are interchangeable. */
export type { PostDTO as BlogPostItem, ServiceDTO as ServiceItem } from "./api";
