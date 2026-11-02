import { Router } from "express";
import { serviceController as c } from "../controllers/service.controller.js";
import { optionalAuth, requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { serviceInputSchema, serviceUpdateSchema } from "../validators/service.validator.js";

const r = Router();

r.get("/", optionalAuth, c.list);
r.get("/:id", optionalAuth, c.get);
r.post("/", requireAuth, requireRole("admin", "editor"), validateBody(serviceInputSchema), c.create);
r.patch("/:id", requireAuth, requireRole("admin", "editor"), validateBody(serviceUpdateSchema), c.update);
r.delete("/:id", requireAuth, requireRole("admin"), c.remove);

export default r;
