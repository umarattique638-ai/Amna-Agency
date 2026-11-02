import { Router } from "express";
import { leadController as c } from "../controllers/lead.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { leadStatusSchema } from "../validators/contact.validator.js";

const r = Router();

r.use(requireAuth);
r.get("/", c.list);
r.patch("/:id", validateBody(leadStatusSchema), c.updateStatus);
r.delete("/:id", requireRole("admin"), c.remove);

export default r;
