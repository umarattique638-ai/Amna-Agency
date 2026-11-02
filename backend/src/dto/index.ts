import type { Types } from "mongoose";
import type { POST_CATEGORIES } from "../validators/post.validator.js";

export type PostCategory = (typeof POST_CATEGORIES)[number];

/** Plain JSON-safe shapes sent to clients (no password hashes, no internal fields). */
type WithId = { _id: Types.ObjectId | string | unknown };
const id = (d: WithId) => String(d._id);
const iso = (d?: Date | null) => (d ? new Date(d).toISOString() : null);

export interface UserDTO { id: string; name: string; email: string; role: string; emailVerified: boolean; createdAt: string | null; lastLoginAt: string | null }
export interface PostDTO {
  id: string; title: string; slug: string; excerpt: string; content: string; category: PostCategory;
  coverImage: string; coverAlt: string; status: "draft" | "published"; publishedAt: string | null;
  createdAt: string | null; updatedAt: string | null; author: { id: string; name: string } | null;
}
export interface ServiceDTO {
  id: string; title: string; slug: string; summary: string; description: string; deliverables: string[];
  image: string; imageAlt: string; highlightValue: string; highlightLabel: string; order: number; published: boolean;
  updatedAt: string | null;
}
export interface LeadDTO {
  id: string; name: string; email: string; company: string; services: string[]; budget: string;
  message: string; status: string; createdAt: string | null;
}
export interface SessionDTO { id: string; userAgent: string; ip: string; createdAt: string | null; lastUsedAt: string | null; current: boolean }

/* eslint-disable @typescript-eslint/no-explicit-any -- lean() documents are loosely typed */
export const toUserDTO = (u: any): UserDTO => ({
  id: id(u), name: u.name, email: u.email, role: u.role, emailVerified: !!u.emailVerified, createdAt: iso(u.createdAt), lastLoginAt: iso(u.lastLoginAt),
});

export const toPostDTO = (p: any): PostDTO => ({
  id: id(p), title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, category: p.category,
  coverImage: p.coverImage, coverAlt: p.coverAlt ?? "", status: p.status, publishedAt: iso(p.publishedAt),
  createdAt: iso(p.createdAt), updatedAt: iso(p.updatedAt),
  author: p.author && typeof p.author === "object" && "name" in p.author ? { id: id(p.author), name: p.author.name } : null,
});

export const toServiceDTO = (s: any): ServiceDTO => ({
  id: id(s), title: s.title, slug: s.slug, summary: s.summary, description: s.description,
  deliverables: s.deliverables ?? [], image: s.image, imageAlt: s.imageAlt ?? "", highlightValue: s.highlightValue ?? "",
  highlightLabel: s.highlightLabel ?? "", order: s.order ?? 0, published: !!s.published, updatedAt: iso(s.updatedAt),
});

export const toLeadDTO = (l: any): LeadDTO => ({
  id: id(l), name: l.name, email: l.email, company: l.company ?? "", services: l.services ?? [], budget: l.budget ?? "",
  message: l.message, status: l.status, createdAt: iso(l.createdAt),
});

export const toSessionDTO = (s: any, currentSid?: string): SessionDTO => ({
  id: String(s._id), userAgent: s.userAgent, ip: s.ip, createdAt: iso(s.createdAt), lastUsedAt: iso(s.lastUsedAt),
  current: String(s._id) === currentSid,
});
/* eslint-enable @typescript-eslint/no-explicit-any */
