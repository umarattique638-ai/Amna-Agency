import { Router } from "express";
import mongoose from "mongoose";
import { cloudinaryEnabled } from "../config/env.js";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";
import serviceRoutes from "./service.routes.js";
import leadRoutes from "./lead.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import uploadRoutes from "./upload.routes.js";
import { leadController } from "../controllers/lead.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { contactLimiter } from "../middlewares/security.middleware.js";
import { contactSchema } from "../validators/contact.validator.js";

const api = Router();

api.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok", db: mongoose.connection.readyState === 1 ? "up" : "down", uploads: cloudinaryEnabled ? "cloudinary" : "disabled", uptime: process.uptime() } });
});
api.use("/auth", authRoutes);
api.use("/posts", postRoutes);
api.use("/services", serviceRoutes);
api.use("/leads", leadRoutes);
api.use("/dashboard", dashboardRoutes);
api.use("/uploads", uploadRoutes);
api.post("/contact", contactLimiter, validateBody(contactSchema), leadController.submit);

export default api;
