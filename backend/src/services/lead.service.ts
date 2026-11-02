import { env } from "../config/env.js";
import { Lead, LEAD_STATUS } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { toLeadDTO } from "../dto/index.js";
import type { ContactInput } from "../validators/contact.validator.js";

export type LeadStatus = (typeof LEAD_STATUS)[number];

export const leadService = {
  /** Saves the enquiry and optionally forwards it to a webhook (Slack, Zapier, CRM…). */
  async create(input: Omit<ContactInput, "website">, ip: string) {
    const lead = await Lead.create({ ...input, ip });

    const hook = env.CONTACT_WEBHOOK_URL;
    if (hook) {
      fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toLeadDTO(lead.toObject())),
      }).catch((e) => console.error("[lead] webhook failed", e));
    }
    return toLeadDTO(lead.toObject());
  },

  async list({ status }: { status?: LeadStatus } = {}) {
    const items = await Lead.find(status ? { status } : {}).sort({ createdAt: -1 }).limit(200).lean();
    return items.map(toLeadDTO);
  },

  async updateStatus(id: string, status: LeadStatus) {
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!lead) throw ApiError.notFound("Lead not found");
    return toLeadDTO(lead);
  },

  async remove(id: string) {
    const res = await Lead.findByIdAndDelete(id);
    if (!res) throw ApiError.notFound("Lead not found");
  },

  async count() {
    const [total, fresh] = await Promise.all([Lead.countDocuments(), Lead.countDocuments({ status: "new" })]);
    return { total, new: fresh };
  },
};
