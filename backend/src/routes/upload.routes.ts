import { Router } from "express";
import { uploadController as c } from "../controllers/upload.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { imageUpload } from "../middlewares/upload.middleware.js";
import { uploadLimiter } from "../middlewares/security.middleware.js";

const r = Router();

// auth runs BEFORE multer, so anonymous requests are rejected without reading the file
r.post("/image", requireAuth, requireRole("admin", "editor"), uploadLimiter, imageUpload, c.image);
r.delete("/image", requireAuth, requireRole("admin"), c.remove);

export default r;
