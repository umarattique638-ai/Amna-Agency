import type { NextFunction, Request, Response } from "express";
import { authService, type AuthContext } from "../services/auth.service.js";
import { ACCESS_COOKIE } from "../utils/cookies.js";
import { ApiError } from "../utils/ApiError.js";
import type { Role } from "../models/User.js";

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthContext;
  }
}

/** Bearer header (API clients/mobile) takes precedence over the httpOnly cookie (browser). */
export function getAccessToken(req: Request): string | undefined {
  const header = req.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7).trim();
  return req.cookies?.[ACCESS_COOKIE];
}

/** Requires a valid, non-blacklisted access token with an active session. */
export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  req.auth = await authService.authenticate(getAccessToken(req));
  next();
};

/** Role gate — use after requireAuth. */
export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) throw ApiError.forbidden();
    next();
  };

/** Attaches req.auth when a valid token is present, otherwise continues anonymously. */
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const token = getAccessToken(req);
  if (token) req.auth = await authService.authenticate(token).catch(() => undefined);
  next();
};
