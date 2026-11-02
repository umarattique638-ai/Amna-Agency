import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/server/api";
import { DashboardShell } from "@/components/dashboard/Shell";
import { StoreProvider } from "@/components/providers/StoreProvider";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** Server-side gate: the API verifies signature, blacklist and session before anything renders. */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/api/auth/refresh?next=/dashboard");
  return (
    <StoreProvider initialUser={user}>
      <DashboardShell>{children}</DashboardShell>
    </StoreProvider>
  );
}
