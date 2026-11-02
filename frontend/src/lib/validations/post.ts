import { z } from "zod";

export const POST_CATEGORIES = ["Web Development", "Social Media", "Graphic Design", "Digital Marketing", "Video Editing"] as const;

const imageUrl = z.url("Enter a full image URL (https://…)").refine((u) => u.startsWith("https://"), "Use an https URL");

export const postInputSchema = z.object({
  title: z.string().trim().min(5, "Title is too short").max(160),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]*$/, "Only lowercase letters, numbers and dashes")
    .max(96)
    .optional()
    .or(z.literal("")),
  excerpt: z.string().trim().min(20, "Write a short summary (20+ characters)").max(320),
  content: z.string().trim().min(50, "Content is too short"),
  category: z.enum(POST_CATEGORIES),
  coverImage: imageUrl,
  coverAlt: z.string().trim().max(160).optional().default(""),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const postUpdateSchema = postInputSchema.partial();

export type PostInput = z.infer<typeof postInputSchema>;
