import { z } from "zod";

export const serviceInputSchema = z.object({
  title: z.string().trim().min(3).max(80),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]*$/, "Only lowercase letters, numbers and dashes")
    .max(96)
    .optional()
    .or(z.literal("")),
  summary: z.string().trim().min(10, "Add a one-line summary").max(200),
  description: z.string().trim().min(20, "Describe the service").max(1200),
  deliverables: z.array(z.string().trim().min(1).max(60)).max(12).default([]),
  image: z.url("Enter a full image URL (https://…)"),
  imageAlt: z.string().trim().max(160).optional().default(""),
  highlightValue: z.string().trim().max(20).optional().default(""),
  highlightLabel: z.string().trim().max(40).optional().default(""),
  order: z.coerce.number().int().min(0).max(999).default(0),
  published: z.boolean().default(true),
});

export const serviceUpdateSchema = serviceInputSchema.partial();

export type ServiceInput = z.infer<typeof serviceInputSchema>;
