import { Types } from "mongoose";
import { ServiceModel } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";
import { toServiceDTO } from "../dto/index.js";
import type { ServiceInput } from "../validators/service.validator.js";

async function uniqueSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "service";
  let slug = root;
  for (let i = 2; await ServiceModel.exists({ slug, ...(excludeId ? { _id: { $ne: new Types.ObjectId(excludeId) } } : {}) }); i++) slug = `${root}-${i}`;
  return slug;
}

/** Business logic for the agency's service offerings (named to avoid clashing with "service layer"). */
export const offeringService = {
  async list({ includeUnpublished = false } = {}) {
    const items = await ServiceModel.find(includeUnpublished ? {} : { published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return items.map(toServiceDTO);
  },

  async getById(id: string) {
    const item = await ServiceModel.findById(id).lean();
    if (!item) throw ApiError.notFound("Service not found");
    return toServiceDTO(item);
  },

  async create(input: ServiceInput) {
    const slug = await uniqueSlug(input.slug || input.title);
    const item = await ServiceModel.create({ ...input, slug });
    return toServiceDTO(item.toObject());
  },

  async update(id: string, input: Partial<ServiceInput>) {
    const item = await ServiceModel.findById(id);
    if (!item) throw ApiError.notFound("Service not found");
    if (input.slug !== undefined) item.slug = await uniqueSlug(input.slug || input.title || item.title, id);
    const { slug: _ignored, ...rest } = input;
    void _ignored;
    Object.assign(item, rest);
    await item.save();
    return toServiceDTO(item.toObject());
  },

  async remove(id: string) {
    const res = await ServiceModel.findByIdAndDelete(id);
    if (!res) throw ApiError.notFound("Service not found");
  },

  async count() {
    return ServiceModel.countDocuments();
  },
};
