import { Post, ServiceModel } from "../models/index.js";
import { postService } from "./post.service.js";
import { offeringService } from "./offering.service.js";
import { leadService } from "./lead.service.js";
import { starterPosts, starterServices } from "../data/starter.js";

export const dashboardService = {
  async stats() {
    const [posts, services, leads, recentLeads] = await Promise.all([
      postService.count(),
      offeringService.count(),
      leadService.count(),
      leadService.list(),
    ]);
    return { posts, services, leads, recentLeads: recentLeads.slice(0, 5) };
  },

  /** Inserts the starter posts/services that don't exist yet (safe to run repeatedly). */
  async seedStarterContent(authorId?: string) {
    let posts = 0;
    let services = 0;
    for (const p of starterPosts) {
      if (await Post.exists({ slug: p.slug })) continue;
      await Post.create({ ...p, status: "published", publishedAt: new Date(p.publishedAt), author: authorId });
      posts++;
    }
    for (const s of starterServices) {
      if (await ServiceModel.exists({ slug: s.slug })) continue;
      await ServiceModel.create(s);
      services++;
    }
    return { posts, services };
  },
};
