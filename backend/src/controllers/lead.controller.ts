import type { Request, Response } from "express";
import { leadService, type LeadStatus } from "../services/lead.service.js";
import { ok, created } from "../utils/response.js";
import { LEAD_STATUS } from "../models/Lead.js";
import { ApiError } from "../utils/ApiError.js";

type IdReq = Request<{ id: string }>;

export const leadController = {
  /** POST /contact — public enquiry form. */
  async submit(req: Request, res: Response) {
    const { website, ...lead } = req.body;
    if (website) return ok(res, { received: true }); // honeypot filled → silently ignore bots
    await leadService.create(lead, req.ip ?? "");
    created(res, { received: true });
  },

  async list(req: Request, res: Response) {
    const status = req.query.status;
    if (status && !LEAD_STATUS.includes(status as LeadStatus)) throw ApiError.badRequest("Unknown status");
    ok(res, { leads: await leadService.list({ status: status as LeadStatus | undefined }) });
  },

  async updateStatus(req: IdReq, res: Response) {
    ok(res, { lead: await leadService.updateStatus(req.params.id, req.body.status) });
  },

  async remove(req: IdReq, res: Response) {
    await leadService.remove(req.params.id);
    ok(res, { deleted: true });
  },
};
