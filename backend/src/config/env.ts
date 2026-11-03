import { z } from "zod";

/** Validated environment — the process refuses to start with a bad config. */
const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().default(5000),
  MONGO_URL: z.string().min(1, "MONGO_URL is required"),
  MONGO_DB_NAME: z.string().default("axiom_agency"),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  ACCESS_TOKEN_TTL: z.coerce.number().int().positive().default(15 * 60),
  REFRESH_TOKEN_TTL: z.coerce.number().int().positive().default(7 * 24 * 60 * 60),
  ALLOW_REGISTRATION: z.enum(["true", "false"]).default("false").transform((v) => v === "true"),
  /** Comma-separated list of browser origins allowed to call the API (the Next.js frontend). */
  CLIENT_URL: z.string().default("http://localhost:3000"),
  /** Frontend on-demand revalidation (so edits show up on the public site instantly). */
  FRONTEND_REVALIDATE_URL: z.string().optional().default(""),
  REVALIDATE_SECRET: z.string().optional().default(""),
  CONTACT_WEBHOOK_URL: z.string().optional().default(""),
  /** SMTP for verification emails. If SMTP_HOST is empty, links are printed to the console (dev). */
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  MAIL_FROM: z.string().default("Axiom Digital Studio <no-reply@axiom.studio>"),
  /** Comma-separated admin emails that get an instant alert for every new contact-form lead. */
  LEAD_NOTIFY_EMAILS: z.string().optional().default(""),
  EMAIL_VERIFY_TTL_HOURS: z.coerce.number().int().positive().default(24),
  /** Cloudinary image uploads (dashboard). Find these on cloudinary.com → Dashboard → API Keys. */
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(""),
  CLOUDINARY_API_KEY: z.string().optional().default(""),
  CLOUDINARY_API_SECRET: z.string().optional().default(""),
  CLOUDINARY_FOLDER: z.string().default("axiom_agency"),
  UPLOAD_MAX_MB: z.coerce.number().positive().max(10).default(5),
  /** Used only by `npm run seed` to create the first admin. */
  SEED_ADMIN_EMAIL: z.string().optional().default(""),
  SEED_ADMIN_PASSWORD: z.string().optional().default(""),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  for (const issue of parsed.error.issues) console.error(`   • ${issue.path.join(".")}: ${issue.message}`);
  console.error("   See .env.example");
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const cloudinaryEnabled = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
export const allowedOrigins = env.CLIENT_URL.split(",").map((s) => s.trim()).filter(Boolean);
