import type { NextConfig } from "next";

const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:5000").replace(/\/+$/, "");

// On Vercel the API lives in a separate project — never build a production site pointing at localhost.
if (process.env.VERCEL && /localhost|127\.0\.0\.1/.test(BACKEND_URL)) {
  throw new Error("BACKEND_URL is not set. Add it in Vercel → Project → Settings → Environment Variables (e.g. https://axiom-digital-api.vercel.app), then redeploy.");
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // keep visited dashboard pages in the client router cache briefly → instant back-and-forth tab switching
  experimental: { staleTimes: { dynamic: 30, static: 180 } },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  /**
   * The browser talks to the Express API through this same-origin proxy:
   * cookies stay first-party (httpOnly, SameSite) and no CORS setup is needed in the browser.
   */
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` }];
  },
};

export default nextConfig;
