import type { Request, Response } from "express";
import { postService } from "../services/post.service.js";
import { revalidateFrontend } from "../services/revalidate.service.js";
import { ok, created } from "../utils/response.js";
import { ApiError } from "../utils/ApiError.js";
import { POST_CATEGORIES } from "../validators/post.validator.js";

type IdReq = Request<{ id: string }>;
const str = (v: unknown) => (typeof v === "string" ? v : undefined);

export const postController = {
  /** GET /posts — published only; `?scope=all` (drafts too) requires a signed-in user. */
  async list(req: Request, res: Response) {
    const wantsAll = req.query.scope === "all";
    if (wantsAll && !req.auth) throw ApiError.unauthorized();
    const category = str(req.query.category);
    if (category && !POST_CATEGORIES.includes(category as (typeof POST_CATEGORIES)[number])) throw ApiError.badRequest("Unknown category");
    ok(
      res,
      await postService.list({
        includeDrafts: wantsAll,
        category,
        search: str(req.query.q)?.slice(0, 80),
        page: Math.max(1, Number(req.query.page) || 1),
        limit: Math.min(100, Math.max(1, Number(req.query.limit) || 20)),
      }),
    );
  },

  /** GET /posts/slug/:slug — public article by slug. */
  async getBySlug(req: Request<{ slug: string }>, res: Response) {
    const post = await postService.getPublishedBySlug(req.params.slug);
    if (!post) throw ApiError.notFound("Post not found");
    ok(res, { post });
  },

  async get(req: IdReq, res: Response) {
    const post = await postService.getById(req.params.id);
    if (post.status !== "published" && !req.auth) throw ApiError.notFound("Post not found");
    ok(res, { post });
  },

  async create(req: Request, res: Response) {
    const post = await postService.create(req.body, req.auth!.userId);
    revalidateFrontend(["posts"]);
    created(res, { post });
  },

  async update(req: IdReq, res: Response) {
    const post = await postService.update(req.params.id, req.body);
    revalidateFrontend(["posts"]);
    ok(res, { post });
  },

  async remove(req: IdReq, res: Response) {
    await postService.remove(req.params.id);
    revalidateFrontend(["posts"]);
    ok(res, { deleted: true });
  },
};
