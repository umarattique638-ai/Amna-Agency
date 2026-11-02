import { Schema, model, type InferSchemaType } from "mongoose";

export const POST_CATEGORIES = ["Web Development", "Social Media", "Graphic Design", "Digital Marketing", "Video Editing"] as const;
export const POST_STATUS = ["draft", "published"] as const;

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 320 },
    /** Markdown-lite: ## headings, - lists, **bold**, [links](https://…) */
    content: { type: String, required: true },
    category: { type: String, enum: POST_CATEGORIES, required: true },
    coverImage: { type: String, required: true },
    coverAlt: { type: String, default: "" },
    status: { type: String, enum: POST_STATUS, default: "draft", index: true },
    publishedAt: { type: Date, default: null },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

postSchema.index({ status: 1, publishedAt: -1 });

export type PostDoc = InferSchemaType<typeof postSchema>;
export const Post = model<PostDoc>("Post", postSchema);
