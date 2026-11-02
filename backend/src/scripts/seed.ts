/**
 * npm run seed
 * Creates the first admin (from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, if no users exist)
 * and inserts the starter blog posts + services. Safe to run more than once.
 */
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { User } from "../models/index.js";
import { dashboardService } from "../services/dashboard.service.js";

async function run() {
  await connectDB();
  let admin = await User.findOne({ role: "admin" });
  if (!admin && env.SEED_ADMIN_EMAIL && env.SEED_ADMIN_PASSWORD) {
    admin = await User.create({
      name: "Admin",
      email: env.SEED_ADMIN_EMAIL.toLowerCase(),
      password: await bcrypt.hash(env.SEED_ADMIN_PASSWORD, 12),
      role: "admin",
      emailVerified: true,
    });
    console.info(`👤 Admin created: ${admin.email}`);
  } else if (!admin) {
    console.info("ℹ️  No admin yet — set SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD or register at /register");
  }
  const result = await dashboardService.seedStarterContent(admin ? String(admin._id) : undefined);
  console.info(`🌱 Seeded ${result.posts} posts and ${result.services} services`);
  await disconnectDB();
}

run().catch(async (e) => {
  console.error(e);
  await disconnectDB();
  process.exit(1);
});
