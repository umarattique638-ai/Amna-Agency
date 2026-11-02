import type { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { revalidateFrontend } from "../services/revalidate.service.js";
import { ok } from "../utils/response.js";

export const dashboardController = {
  async stats(_req: Request, res: Response) {
    ok(res, await dashboardService.stats());
  },

  async seed(req: Request, res: Response) {
    const result = await dashboardService.seedStarterContent(req.auth!.userId);
    revalidateFrontend(["posts", "services"]);
    ok(res, result);
  },
};
