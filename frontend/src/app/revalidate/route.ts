import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED = new Set(["posts", "services"]);

/** Called by the Express API after content changes so the public pages refresh instantly. */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const { tags } = (await req.json().catch(() => ({}))) as { tags?: string[] };
  const valid = (tags ?? []).filter((t) => ALLOWED.has(t));
  valid.forEach((t) => revalidateTag(t, { expire: 0 }));
  return NextResponse.json({ success: true, revalidated: valid });
}
