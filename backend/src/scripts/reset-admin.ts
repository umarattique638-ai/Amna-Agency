/**
 * npm run reset-admin
 * Creates OR fixes the admin from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD:
 * sets the password, role=admin and marks the email as verified. Use it when login fails.
 */
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { User } from "../models/index.js";

async function run() {
  const email = env.SEED_ADMIN_EMAIL.trim().toLowerCase();
  const password = env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("❌ Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in backend/.env first.");
    process.exit(1);
  }
  await connectDB();
  const hash = await bcrypt.hash(password, 12);
  const res = await User.updateOne(
    { email },
    {
      $set: { password: hash, role: "admin", emailVerified: true, emailVerifyTokenHash: null, emailVerifyExpires: null },
      $setOnInsert: { name: "Admin", email },
    },
    { upsert: true },
  );
  console.info(`✅ Admin ${res.upsertedCount ? "created" : "updated"}: ${email} — now log in at http://localhost:3000/login`);
  await disconnectDB();
}

run().catch(async (e) => {
  console.error("❌", e instanceof Error ? e.message : e);
  await disconnectDB();
  process.exit(1);
});
