import { Schema, model, type InferSchemaType } from "mongoose";

/** An agency service offering shown on Home and /services. */
const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    deliverables: { type: [String], default: [] },
    image: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    highlightValue: { type: String, default: "" },
    highlightLabel: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export type ServiceDoc = InferSchemaType<typeof serviceSchema>;
export const ServiceModel = model<ServiceDoc>("Service", serviceSchema);
