# Axiom — Agency Website + Admin Dashboard

```
axiom/
├─ backend/    Express 5 + TypeScript + MongoDB (Mongoose) — REST API, MVC
└─ frontend/   Next.js 16 + React 19 + Tailwind v4 + Redux Toolkit (RTK Query)
```

## Run it
```bash
npm install            # installs root + backend + frontend (postinstall)
npm run seed           # optional: starter blog posts & services (+ admin if SEED_ADMIN_* set)
npm run dev            # API → http://localhost:5000/api   Website → http://localhost:3000
```
Then open **http://localhost:3000/register** → create the first account (becomes **admin**) →
click the verification link → you land in **/dashboard**.

> Email: if `SMTP_*` is empty in `backend/.env`, the verification link is printed in the API
> console **and** shown on screen (development only). Add SMTP (Gmail app password, Brevo,
> Resend, Mailgun…) to send real emails.

## Backend (`backend/`) — MVC
```
src/
├─ server.ts / app.ts      bootstrap: helmet, cors, cookies, rate limits, logging, graceful shutdown
├─ routes/                 URL → middleware chain → controller
├─ controllers/            HTTP layer (req/res only)
├─ services/               business logic: auth, token, mail, post, offering, lead, dashboard, revalidate
├─ models/                 Mongoose: User, Session, TokenBlacklist, Post, Service, Lead
├─ validators/             zod schemas (validateBody middleware)
├─ middlewares/            requireAuth / requireRole / optionalAuth, validate, security, errors
├─ dto/                    safe response shapes
├─ data/starter.ts         starter content
└─ scripts/seed.ts         npm run seed
```
**Auth**
- Register → **email verification link** (single-use, hashed, expires in 24h). Login is blocked until verified; “resend link” never reveals whether an email exists.
- JWT **access token (15 min)** + **refresh token (7 days)** in httpOnly cookies (refresh cookie only sent to `/api/auth`). Bearer header also supported for mobile/API clients.
- **Refresh rotation + reuse detection** (old refresh token replayed → whole session revoked).
- **Logout blacklists the access token** (jti, TTL-indexed) and revokes the session → a copied token stops working instantly. “Sign out all devices” + per-device sign-out.
- bcrypt(12), rate limits, origin check on mutations, helmet, roles (admin/editor), zod everywhere.

**Endpoints** (`/api`)
`auth/register · verify-email · resend-verification · login · refresh (POST/GET) · logout · logout-all · me · sessions · sessions/:id`
`posts (GET list, /slug/:slug, /:id; POST/PATCH/DELETE)` · `services (…)` · `leads (…)` · `contact (POST)` · `dashboard/stats · dashboard/seed` · `health`

## Frontend (`frontend/`)
- Public pages (Home, About, Services, Blog, Blog post, Contact) render on the server from the API, cached and **revalidated instantly** when content changes in the dashboard (`/revalidate` webhook). If the API is down, built-in starter content is shown.
- `/api/*` is proxied to the backend by Next.js (same-origin cookies, no CORS in the browser).
- **Redux Toolkit**: `src/store` — RTK Query API slice (auto token refresh on 401, cache tags), auth slice (current user). Used by login/register/verify and the dashboard.
- Dashboard: overview, blog posts (editor with preview), services, leads, account & sessions.

## Environment
`backend/.env` (see `.env.example`): `MONGO_URL`, `MONGO_DB_NAME`, `JWT_*`, `CLIENT_URL`, `REVALIDATE_SECRET`, `SMTP_*`, `SEED_ADMIN_*`.
`frontend/.env.local`: `BACKEND_URL`, `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET` (same value as backend).

⚠️ Rotate the MongoDB password that was shared in chat, and never commit `.env` files.

## Brand & owners
- Logo files: `frontend/public/brand/` — `axiom-logo.svg` (light bg), `axiom-logo-white.svg` (dark bg), `axiom-mark.svg` / `axiom-mark.png` (icon), `logo-preview.png`. The site uses the same mark via `components/ui/Logo.tsx`; favicon is `src/app/icon.svg`.
- Owners (Amna & Bilal) are set in `frontend/src/config/site.ts → founders` and appear on Home (About section), About (Meet the founders) and the footer. Edit names, roles and bios there.
- Placeholder numbers/projects live in `frontend/src/content/home.ts` and `content/about.ts` — replace with real ones before launch.

## Image uploads (Cloudinary)
1. cloudinary.com → **Dashboard** (or Settings → **API Keys**) → copy *Cloud name*, *API Key*, *API Secret*.
2. Paste them in `backend/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```
3. Restart `npm run dev`. `http://localhost:5000/api/health` should show `"uploads":"cloudinary"`.

Dashboard → Blog post / Service editor → drag & drop or click the image box. Flow: browser → Next `/api` proxy → Express `POST /api/uploads/image` (login required, admin/editor, JPG/PNG/WEBP/GIF/AVIF, max 5 MB, magic-byte check, rate-limited) → Cloudinary folder `axiom_agency/posts|services`. Only the returned `https://res.cloudinary.com/...` URL is stored in MongoDB. Public pages serve it through Cloudinary's CDN with automatic format/quality/width (`lib/unsplash.ts → cloudinaryLoader`).

## Deploying to Vercel (two projects from this one repo)
| Vercel project | Root Directory | Framework |
|---|---|---|
| **API** (e.g. `axiom-digital-api`) | `backend` | Other (uses `backend/vercel.json`) |
| **Website** (e.g. `axiom-digital-studio`) | `frontend` | Next.js |

**API env vars:** `MONGO_URL`, `MONGO_DB_NAME`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `REVALIDATE_SECRET`, `CLIENT_URL=https://<website>.vercel.app`, `FRONTEND_REVALIDATE_URL=https://<website>.vercel.app/revalidate` (+ SMTP_* for real emails).
**Website env vars:** `BACKEND_URL=https://<api>.vercel.app`, `NEXT_PUBLIC_SITE_URL=https://<website>.vercel.app`, `REVALIDATE_SECRET` (same value as API).
**MongoDB Atlas → Network Access:** add `0.0.0.0/0` (Vercel has no fixed IPs).
Note: rate limits are in-memory, so on serverless they apply per instance.
