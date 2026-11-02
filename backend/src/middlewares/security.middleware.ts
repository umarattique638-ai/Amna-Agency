import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { allowedOrigins } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * CSRF defence in depth (cookies are already SameSite): state-changing browser
 * requests must come from an allowed origin. Requests without Origin (curl, mobile
 * apps using Bearer tokens) are allowed — they can't ride on a victim's cookies.
 */
export function originCheck(req: Request, _res: Response, next: NextFunction) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.get("origin");
  if (origin && !allowedOrigins.includes(origin)) throw ApiError.forbidden("Cross-origin request blocked");
  next();
}

const limiter = (windowMs: number, limit: number, message: string) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({ success: false, error: { code: "RATE_LIMITED", message } }),
  });

export const apiLimiter = limiter(60_000, 300, "Too many requests, slow down a little.");
export const loginLimiter = limiter(15 * 60_000, 10, "Too many login attempts. Try again in 15 minutes.");
export const registerLimiter = limiter(60 * 60_000, 5, "Too many sign-ups from this network.");
export const contactLimiter = limiter(60_000, 5, "Too many messages. Please wait a minute.");
export const uploadLimiter = limiter(60 * 60_000, 60, "Upload limit reached. Please try again later.");
export const emailLimiter = limiter(15 * 60_000, 10, "Too many email requests. Please wait a few minutes.");
