import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Website Development",
  "MERN Web App",
  "E-commerce Store",
  "Social Media Marketing",
  "Graphic Designing",
  "Digital Marketing / Ads",
  "SEO",
] as const;

export const BUDGET_OPTIONS = ["< $500", "$500 – $2k", "$2k – $5k", "$5k +"] as const;

/** Shared by the client form and the API route — one source of truth. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  email: z.email("Enter a valid email"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Pick at least one service"),
  budget: z.enum(BUDGET_OPTIONS, { error: "Choose a budget range" }),
  message: z.string().trim().min(10, "A few more words, please").max(4000),
  /** honeypot — must stay empty */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
