import { Types } from "mongoose";
import { Post } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";
import { toPostDTO } from "../dto/index.js";
import type { PostInput } from "../validators/post.validator.js";

interface ListOptions {
  includeDrafts?: boolean;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

async function uniqueSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "post";
  let slug = root;
  for (let i = 2; await Post.exists({ slug, ...(excludeId ? { _id: { $ne: new Types.ObjectId(excludeId) } } : {}) }); i++) slug = `${root}-${i}`;
  return slug;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const postService = {
  async list({ includeDrafts = false, category, search, page = 1, limit = 50 }: ListOptions = {}) {
    const filter: Record<string, unknown> = {};
    if (!includeDrafts) filter.status = "published";
    if (category) filter.category = category;
    if (search) filter.title = { $regex: escapeRegex(search), $options: "i" };

    const [items, total] = await Promise.all([
      Post.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "name")
        .lean(),
      Post.countDocuments(filter),
    ]);
    return { items: items.map(toPostDTO), total, page, pages: Math.max(1, Math.ceil(total / limit)) };
  },

  async getById(id: string) {
    const post = await Post.findById(id).populate("author", "name").lean();
    if (!post) throw ApiError.notFound("Post not found");
    return toPostDTO(post);
  },

  async getPublishedBySlug(slug: string) {
    const post = await Post.findOne({ slug, status: "published" }).populate("author", "name").lean();
    return post ? toPostDTO(post) : null;
  },

  async create(input: PostInput, authorId: string) {
    const slug = await uniqueSlug(input.slug || input.title);
    const post = await Post.create({
      ...input,
      slug,
      author: authorId,
      publishedAt: input.status === "published" ? new Date() : null,
    });
    return this.getById(String(post._id));
  },

  async update(id: string, input: Partial<PostInput>) {
    const post = await Post.findById(id);
    if (!post) throw ApiError.notFound("Post not found");

    if (input.slug !== undefined || (input.title && !post.slug)) {
      post.slug = await uniqueSlug(input.slug || input.title || post.title, id);
    }
    const { slug: _ignored, ...rest } = input;
    void _ignored;
    Object.assign(post, rest);
    if (input.status === "published" && !post.publishedAt) post.publishedAt = new Date();
    await post.save();
    return this.getById(id);
  },

  async remove(id: string) {
    const res = await Post.findByIdAndDelete(id);
    if (!res) throw ApiError.notFound("Post not found");
  },

  async count() {
    const [total, published] = await Promise.all([Post.countDocuments(), Post.countDocuments({ status: "published" })]);
    return { total, published, drafts: total - published };
  },
};
