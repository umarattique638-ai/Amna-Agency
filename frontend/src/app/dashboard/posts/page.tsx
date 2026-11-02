"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { apiError, useDeletePostMutation, usePostsQuery } from "@/store/api";
import { Badge, Btn, EmptyState, Input, PageHeader, Select, Skeleton } from "@/components/dashboard/controls";
import { useConfirm, useToast } from "@/components/dashboard/feedback";
import type { PostDTO } from "@/types/api";

export default function PostsPage() {
  const { data, isLoading: loading } = usePostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const toast = useToast();
  const confirm = useConfirm();

  const posts = useMemo(
    () =>
      (data?.items ?? []).filter(
        (p) => (status === "all" || p.status === status) && p.title.toLowerCase().includes(q.toLowerCase()),
      ),
    [data, q, status],
  );

  const remove = async (p: PostDTO) => {
    if (!(await confirm({ title: "Delete this post?", text: `“${p.title}” will be removed permanently.` }))) return;
    try {
      await deletePost(p.id).unwrap();
      toast("Post deleted");
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  return (
    <>
      <PageHeader
        title="Blog posts"
        description="Write, publish and update articles on your blog."
        actions={<Link href="/dashboard/posts/new"><Btn>+ New post</Btn></Link>}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search posts" className="sm:max-w-xs" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="sm:max-w-44">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-20" />)}</div>
      ) : posts.length === 0 ? (
        <EmptyState title="No posts found" text="Create your first article — it appears on the blog as soon as you publish it." action={<Link href="/dashboard/posts/new"><Btn>Write a post</Btn></Link>} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-page">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs tracking-wide text-mute uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Post</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Updated</th>
                <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-surface/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element -- tiny admin thumbnail */}
                      <img src={p.coverImage.includes("unsplash") ? `${p.coverImage}?w=120&q=60&auto=format` : p.coverImage} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <Link href={`/dashboard/posts/${p.id}`} className="line-clamp-1 font-semibold hover:text-accent">{p.title}</Link>
                        <p className="line-clamp-1 text-xs text-mute">/blog/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-mute md:table-cell">{p.category}</td>
                  <td className="px-5 py-3"><Badge value={p.status} /></td>
                  <td className="hidden px-5 py-3 text-mute lg:table-cell">{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {p.status === "published" && (
                      <Link href={`/blog/${p.slug}`} target="_blank" className="mr-3 text-xs font-semibold text-mute hover:text-fg">View</Link>
                    )}
                    <Link href={`/dashboard/posts/${p.id}`} className="mr-3 text-xs font-semibold text-accent">Edit</Link>
                    <button onClick={() => remove(p)} className="text-xs font-semibold text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
