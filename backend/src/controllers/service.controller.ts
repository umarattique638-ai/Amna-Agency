import type { Request, Response } from "express";
import { offeringService } from "../services/offering.service.js";
import { revalidateFrontend } from "../services/revalidate.service.js";
import { ok, created } from "../utils/response.js";
import { ApiError } from "../utils/ApiError.js";

type IdReq = Request<{ id: string }>;

/** Agency service offerings (Website Development, Social Media Marketing, …). */
export const serviceController = {
  async list(req: Request, res: Response) {
    const wantsAll = req.query.scope === "all";
    if (wantsAll && !req.auth) throw ApiError.unauthorized();
    ok(res, { services: await offeringService.list({ includeUnpublished: wantsAll }) });
  },

  async get(req: IdReq, res: Response) {
    const service = await offeringService.getById(req.params.id);
    if (!service.published && !req.auth) throw ApiError.notFound("Service not found");
    ok(res, { service });
  },

  async create(req: Request, res: Response) {
    const service = await offeringService.create(req.body);
    revalidateFrontend(["services"]);
    created(res, { service });
  },

  async update(req: IdReq, res: Response) {
    const service = await offeringService.update(req.params.id, req.body);
    revalidateFrontend(["services"]);
    ok(res, { service });
  },

  async remove(req: IdReq, res: Response) {
    await offeringService.remove(req.params.id);
    revalidateFrontend(["services"]);
    ok(res, { deleted: true });
  },
};
