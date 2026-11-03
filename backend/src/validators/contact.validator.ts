import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Website Development",
  "MERN Web App",
  "E-commerce Store",
  "Digital Marketing / SEO / Ads",
  "Social Media Marketing",
  "Graphic Designing",
  "Video Editing",
] as const;

/** Budget slider range (USD). The value is sent as text, e.g. "$450" or "$1,000+". */
export const BUDGET_MIN = 100;
export const BUDGET_MAX = 1000;
export const BUDGET_STEP = 50;
export const formatBudget = (v: number) => (v >= BUDGET_MAX ? "$1,000+" : `$${v}`);

/** Shared by the client form and the API route — one source of truth. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone / WhatsApp number")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Pick at least one service"),
  budget: z.string().regex(/^\$(\d{3}|1,000\+)$/, "Choose your budget"),
  message: z.string().trim().min(10, "A few more words, please").max(4000),
  /** honeypot — must stay empty */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const leadStatusSchema = z.object({ status: z.enum(["new", "contacted", "won", "lost"]) });
