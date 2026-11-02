import { Schema, model, type InferSchemaType } from "mongoose";

export const ROLES = ["admin", "editor"] as const;
export type Role = (typeof ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "editor" },
    lastLoginAt: { type: Date },
    /** Email verification — users can't sign in until they click the link we send. */
    emailVerified: { type: Boolean, default: false },
    emailVerifyTokenHash: { type: String, default: null, select: false },
    emailVerifyExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema>;
export const User = model<UserDoc>("User", userSchema);
