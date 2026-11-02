import { env } from "../config/env.js";

/**
 * Tells the Next.js frontend to refresh its cached pages after content changes,
 * so edits made in the dashboard appear on the public site immediately.
 * Fire-and-forget: a failure here must never fail the API request.
 */
export function revalidateFrontend(tags: Array<"posts" | "services">) {
  if (!env.FRONTEND_REVALIDATE_URL || !env.REVALIDATE_SECRET) return;
  fetch(env.FRONTEND_REVALIDATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-revalidate-secret": env.REVALIDATE_SECRET },
    body: JSON.stringify({ tags }),
  }).catch((e) => console.warn("[revalidate] frontend not reachable:", (e as Error).message));
}
