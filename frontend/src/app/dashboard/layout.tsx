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
  if (user === "unreachable") {
    return (
      <main className="grid min-h-svh place-items-center bg-surface p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold">Dashboard is temporarily unavailable</h1>
          <p className="mt-3 text-mute">The website can&apos;t reach the API right now. Check that the backend is running and that BACKEND_URL is set correctly, then refresh.</p>
        </div>
      </main>
    );
  }
  if (!user) redirect("/api/auth/refresh?next=/dashboard");
  return (
    <StoreProvider initialUser={user}>
      <DashboardShell>{children}</DashboardShell>
    </StoreProvider>
  );
}
