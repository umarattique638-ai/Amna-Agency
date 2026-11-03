import { PageSkeleton } from "@/components/dashboard/PageSkeleton";

/** Route-level fallback while a dashboard page's server payload streams in. */
export default function DashboardLoading() {
  return <PageSkeleton />;
}
