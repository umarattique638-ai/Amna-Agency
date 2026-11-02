"use client";

import { use } from "react";
import { usePostQuery } from "@/store/api";
import { PostEditor } from "@/components/dashboard/PostEditor";
import { EmptyState, Skeleton } from "@/components/dashboard/controls";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = usePostQuery(id);
  if (isLoading) return <Skeleton className="h-[600px]" />;
  if (isError || !data) return <EmptyState title="Post not found" text="It may have been deleted." />;
  return <PostEditor key={data.post.id} post={data.post} />;
}
