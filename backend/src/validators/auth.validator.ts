import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email").transform((v) => v.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.email("Enter a valid email").transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/[0-9]/, "Add a number"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const emailSchema = z.object({
  email: z.email("Enter a valid email").transform((v) => v.toLowerCase().trim()),
});
