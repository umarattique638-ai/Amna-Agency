import { Router } from "express";
import { dashboardController as c } from "../controllers/dashboard.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const r = Router();

r.use(requireAuth);
r.get("/stats", c.stats);
r.post("/seed", requireRole("admin"), c.seed);

export default r;
