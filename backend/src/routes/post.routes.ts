import { Router } from "express";
import { postController as c } from "../controllers/post.controller.js";
import { optionalAuth, requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { postInputSchema, postUpdateSchema } from "../validators/post.validator.js";

const r = Router();

r.get("/", optionalAuth, c.list);
r.get("/slug/:slug", c.getBySlug);
r.get("/:id", optionalAuth, c.get);
r.post("/", requireAuth, requireRole("admin", "editor"), validateBody(postInputSchema), c.create);
r.patch("/:id", requireAuth, requireRole("admin", "editor"), validateBody(postUpdateSchema), c.update);
r.delete("/:id", requireAuth, requireRole("admin"), c.remove);

export default r;
