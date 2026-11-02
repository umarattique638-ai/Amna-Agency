"use client";

import { use } from "react";
import { useServiceQuery } from "@/store/api";
import { ServiceEditor } from "@/components/dashboard/ServiceEditor";
import { EmptyState, Skeleton } from "@/components/dashboard/controls";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useServiceQuery(id);
  if (isLoading) return <Skeleton className="h-[600px]" />;
  if (isError || !data) return <EmptyState title="Service not found" text="It may have been deleted." />;
  return <ServiceEditor key={data.service.id} service={data.service} />;
}
