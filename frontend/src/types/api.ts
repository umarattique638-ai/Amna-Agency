/** Shapes returned by the Express API (mirrors backend/src/dto). */
export type PostCategory = "Web Development" | "Social Media" | "Graphic Design" | "Digital Marketing" | "Video Editing";

export interface UserDTO { id: string; name: string; email: string; role: "admin" | "editor"; emailVerified: boolean; createdAt: string | null; lastLoginAt: string | null }

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
  id: string; name: string; email: string; phone: string; company: string; services: string[]; budget: string;
  message: string; status: "new" | "contacted" | "won" | "lost"; createdAt: string | null;
}

export interface SessionDTO { id: string; userAgent: string; ip: string; createdAt: string | null; lastUsedAt: string | null; current: boolean }

export interface Paginated<T> { items: T[]; total: number; page: number; pages: number }

export interface DashboardStats {
  posts: { total: number; published: number; drafts: number };
  services: number;
  leads: { total: number; new: number };
  recentLeads: LeadDTO[];
}

export interface ApiErrorBody { success: false; error: { code: string; message: string; details?: Record<string, string[] | undefined> } }

export interface UploadedImage { url: string; publicId: string; width: number; height: number; format: string; bytes: number }
