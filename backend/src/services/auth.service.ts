import bcrypt from "bcryptjs";
import { randomBytes, randomUUID } from "node:crypto";
import { allowedOrigins, env, isProd } from "../config/env.js";
import { mailService } from "./mail.service.js";
import { User, Session, TokenBlacklist, type Role } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { toSessionDTO, toUserDTO } from "../dto/index.js";
import {
  sha256,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  type AccessPayload,
} from "./token.service.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";

export interface ClientMeta {
  ip: string;
  userAgent: string;
}

export interface AuthContext {
  userId: string;
  role: Role;
  sid: string;
  jti: string;
  exp: number;
}

/** A valid hash to compare against when the email doesn't exist (keeps timing uniform). */
const DUMMY_HASH = "$2a$12$CwTycUXWue0Thq9StjUM0uJ8.Y5Gx6b3xA8kVfF8lQ0bZ5yZrQe1W";
/** Concurrent refreshes (two tabs) may present the previous token for a short moment. */
const ROTATION_GRACE_MS = 15_000;

async function issueTokens(userId: string, role: Role, sid: string) {
  const [access, refresh] = await Promise.all([
    signAccessToken({ userId, role, sid }),
    signRefreshToken({ userId, sid }),
  ]);
  return { accessToken: access.token, refreshToken: refresh.token, refreshJti: refresh.jti };
}

async function createSession(user: { _id: unknown; role: Role }, meta: ClientMeta) {
  const sid = randomUUID();
  const userId = String(user._id);
  const tokens = await issueTokens(userId, user.role, sid);
  await Session.create({
    _id: sid,
    user: userId,
    refreshTokenHash: sha256(tokens.refreshJti),
    userAgent: meta.userAgent,
    ip: meta.ip,
    expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL * 1000),
  });
  return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
}

/** Creates a fresh single-use token (only its hash is stored) and emails the link. */
async function issueVerification(user: { _id: unknown; email: string; name: string; set: (v: object) => void; save: () => Promise<unknown> }) {
  const token = randomBytes(32).toString("base64url");
  user.set({
    emailVerifyTokenHash: sha256(token),
    emailVerifyExpires: new Date(Date.now() + env.EMAIL_VERIFY_TTL_HOURS * 3600_000),
  });
  await user.save();
  const url = `${allowedOrigins[0]}/verify-email?token=${token}`;
  await mailService.sendVerificationEmail(user.email, user.name, url);
  return url;
}

export const authService = {
  /**
   * Creates the account (first one becomes admin) and emails a verification link.
   * No session is created until the email is verified.
   */
  async register(input: RegisterInput) {
    const count = await User.estimatedDocumentCount();
    if (count > 0 && !env.ALLOW_REGISTRATION) throw ApiError.forbidden("Registration is closed. Ask an admin for an account.");
    if (await User.exists({ email: input.email })) throw ApiError.conflict("An account with this email already exists");

    const user = await User.create({
      name: input.name,
      email: input.email,
      password: await bcrypt.hash(input.password, 12),
      role: count === 0 ? "admin" : "editor",
      emailVerified: false,
    });
    const url = await issueVerification(user);
    return { email: user.email, devVerifyUrl: isProd ? undefined : url };
  },

  /** Confirms the email and signs the user straight in. Tokens are single-use and expire. */
  async verifyEmail(token: string, meta: ClientMeta) {
    if (!token || token.length < 20) throw ApiError.badRequest("Invalid verification link");
    const user = await User.findOne({ emailVerifyTokenHash: sha256(token) }).select("+emailVerifyExpires");
    if (!user) throw ApiError.badRequest("This verification link is invalid or has already been used");
    if (!user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      throw new ApiError(410, "This verification link has expired — request a new one", "LINK_EXPIRED");
    }
    user.emailVerified = true;
    user.set({ emailVerifyTokenHash: null, emailVerifyExpires: null });
    user.lastLoginAt = new Date();
    await user.save();
    const tokens = await createSession(user, meta);
    return { user: toUserDTO(user), ...tokens };
  },

  /** Always answers the same way, so it can't be used to discover which emails have accounts. */
  async resendVerification(email: string) {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user && !user.emailVerified) {
      const url = await issueVerification(user);
      return { devVerifyUrl: isProd ? undefined : url };
    }
    return {};
  },

  async login(input: LoginInput, meta: ClientMeta) {
    const user = await User.findOne({ email: input.email }).select("+password");
    const valid = await bcrypt.compare(input.password, user?.password ?? DUMMY_HASH);
    if (!user || !valid) throw ApiError.unauthorized("Incorrect email or password");
    if (!user.emailVerified) {
      throw new ApiError(403, "Please verify your email first — check your inbox for the link", "EMAIL_NOT_VERIFIED");
    }

    user.lastLoginAt = new Date();
    await user.save();
    const tokens = await createSession(user, meta);
    return { user: toUserDTO(user), ...tokens };
  },

  /**
   * Refresh-token rotation with reuse detection: each refresh token works once.
   * Presenting an already-rotated token (outside a short grace window) means it was
   * stolen, so the whole session is revoked.
   */
  async refresh(refreshToken: string | undefined, meta: ClientMeta) {
    if (!refreshToken) throw ApiError.unauthorized("Session expired, please log in again");
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) throw ApiError.unauthorized("Session expired, please log in again");

    const session = await Session.findById(payload.sid);
    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw ApiError.unauthorized("Session has ended, please log in again");
    }

    const presented = sha256(payload.jti);
    const inGrace =
      session.previousTokenHash === presented &&
      !!session.rotatedAt &&
      Date.now() - session.rotatedAt.getTime() < ROTATION_GRACE_MS;

    if (session.refreshTokenHash !== presented && !inGrace) {
      session.revokedAt = new Date();
      session.revokedReason = "refresh_token_reuse";
      await session.save();
      throw ApiError.unauthorized("Session was invalidated for security reasons, please log in again");
    }

    const user = await User.findById(payload.sub).lean();
    if (!user) throw ApiError.unauthorized("Account no longer exists");

    const tokens = await issueTokens(String(user._id), user.role as Role, payload.sid);
    await Session.updateOne(
      { _id: payload.sid },
      {
        $set: {
          refreshTokenHash: sha256(tokens.refreshJti),
          previousTokenHash: session.refreshTokenHash,
          rotatedAt: new Date(),
          lastUsedAt: new Date(),
          ip: meta.ip,
          userAgent: meta.userAgent,
        },
      },
    );
    return { user: toUserDTO(user), accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
  },

  /**
   * Logout: blacklist the access token's jti until it expires (so a copied token is useless
   * immediately) and revoke the session (so its refresh token can't mint new ones).
   */
  async logout(tokens: { accessToken?: string; refreshToken?: string }) {
    const access = tokens.accessToken ? await verifyAccessToken(tokens.accessToken) : null;
    const refresh = !access && tokens.refreshToken ? await verifyRefreshToken(tokens.refreshToken) : null;

    if (access) {
      await TokenBlacklist.updateOne(
        { jti: access.jti },
        { $setOnInsert: { jti: access.jti, user: access.sub, reason: "logout", expiresAt: new Date(access.exp * 1000) } },
        { upsert: true },
      );
    }
    const sid = access?.sid ?? refresh?.sid;
    if (sid) await Session.updateOne({ _id: sid, revokedAt: null }, { revokedAt: new Date(), revokedReason: "logout" });
  },

  /** Ends every session of the user (all devices). Their access tokens fail on the next request. */
  async logoutAll(ctx: AuthContext) {
    await TokenBlacklist.updateOne(
      { jti: ctx.jti },
      { $setOnInsert: { jti: ctx.jti, user: ctx.userId, reason: "logout_all", expiresAt: new Date(ctx.exp * 1000) } },
      { upsert: true },
    );
    const res = await Session.updateMany({ user: ctx.userId, revokedAt: null }, { revokedAt: new Date(), revokedReason: "logout_all" });
    return { revoked: res.modifiedCount };
  },

  /** Verifies signature + expiry, then checks the blacklist and that the session is still active. */
  async authenticate(token: string | undefined): Promise<AuthContext> {
    if (!token) throw ApiError.unauthorized();
    const payload: AccessPayload | null = await verifyAccessToken(token);
    if (!payload) throw ApiError.unauthorized("Access token is invalid or expired");

    const [blacklisted, session] = await Promise.all([
      TokenBlacklist.exists({ jti: payload.jti }),
      Session.findById(payload.sid).select("revokedAt expiresAt").lean(),
    ]);
    if (blacklisted) throw ApiError.unauthorized("Token has been revoked");
    if (!session || session.revokedAt || session.expiresAt < new Date()) throw ApiError.unauthorized("Session has ended");

    return { userId: payload.sub, role: payload.role, sid: payload.sid, jti: payload.jti, exp: payload.exp };
  },

  async me(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user) throw ApiError.notFound("User not found");
    return toUserDTO(user);
  },

  async listSessions(ctx: AuthContext) {
    const sessions = await Session.find({ user: ctx.userId, revokedAt: null, expiresAt: { $gt: new Date() } })
      .sort({ lastUsedAt: -1 })
      .lean();
    return sessions.map((s) => toSessionDTO(s, ctx.sid));
  },

  async revokeSession(ctx: AuthContext, sid: string) {
    const res = await Session.updateOne({ _id: sid, user: ctx.userId, revokedAt: null }, { revokedAt: new Date(), revokedReason: "revoked_by_user" });
    if (res.matchedCount === 0) throw ApiError.notFound("Session not found");
  },
};
