import { Schema, model, type InferSchemaType } from "mongoose";

export const LEAD_STATUS = ["new", "contacted", "won", "lost"] as const;

/** Contact-form enquiry. */
const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    services: { type: [String], default: [] },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: LEAD_STATUS, default: "new", index: true },
    ip: { type: String, default: "" },
  },
  { timestamps: true },
);

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const Lead = model<LeadDoc>("Lead", leadSchema);
