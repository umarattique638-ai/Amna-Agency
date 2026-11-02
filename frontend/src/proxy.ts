import { NextResponse, type NextRequest } from "next/server";

/**
 * Route guard for /dashboard (Next 16 "proxy", formerly middleware).
 * No access cookie → hand off to the API's refresh endpoint, which rotates the session
 * and redirects back, or sends the visitor to /login. The dashboard layout then asks
 * the API to fully verify the token (signature, blacklist, active session).
 */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const hasAccess = req.cookies.has("axiom_at");

  if (hasAccess) return NextResponse.next();
  return NextResponse.redirect(new URL(`/api/auth/refresh?next=${encodeURIComponent(pathname + search)}`, req.url));
}

export const config = { matcher: ["/dashboard/:path*"] };
