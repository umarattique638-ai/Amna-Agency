# Axiom — Agency Website + CMS Dashboard (Next.js · MongoDB · JWT)

Multi-page agency website (Home, About, Services, Blog, Contact) with a built-in admin
dashboard to manage **blog posts, services and leads**. Backend is inside Next.js
(Route Handlers) following an **MVC / layered architecture**, data in **MongoDB**.

## Quick start
```bash
npm install
# .env.local is included — check MONGO_URL / MONGO_DB_NAME, then:
npm run dev                 # http://localhost:3000
```
1. Open **http://localhost:3000/register** → the **first account becomes admin** (registration then closes).
2. Go to **/dashboard** → click **“Import starter content”** to load the demo posts & services into MongoDB.
3. Edit / add posts and services — the public site updates immediately.

Production: `npm run build && npm start`. Checks: `npm run lint && npm run typecheck`.

## Environment (`.env.local`)
| Variable | Purpose |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `MONGO_DB_NAME` | Database name used by the app (default `axiom_agency`) |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Two different random secrets (48+ chars) |
| `ACCESS_TOKEN_TTL` / `REFRESH_TOKEN_TTL` | Seconds (default 15 min / 7 days) |
| `ALLOW_REGISTRATION` | `true` lets more people sign up (as *editor*) |
| `CONTACT_WEBHOOK_URL` | Optional — forward new leads to Slack/Zapier/your API |

> If MongoDB is unreachable or empty, the public site shows the built-in starter content instead of breaking.

## Backend architecture (MVC)
```
src/
├─ app/api/**/route.ts        ROUTES     — thin: map HTTP verbs → controller methods
├─ server/
│  ├─ controllers/            CONTROLLERS — parse/validate input, call services, shape responses
│  ├─ services/               SERVICES    — business logic (auth, posts, services, leads, dashboard)
│  ├─ models/                 MODELS      — Mongoose schemas: User, Session, TokenBlacklist, Post, Service, Lead
│  ├─ middlewares/            auth (requireAuth / roles), errorHandler, rateLimit, csrf (origin check)
│  ├─ dto/                    safe JSON shapes sent to clients (no password hashes etc.)
│  ├─ data/                   read-models for pages (+ fallback starter content)
│  ├─ config/                 validated env (zod) + cached DB connection
│  └─ utils/                  ApiError, response envelope, cookies, slugify, request helpers
├─ lib/validations/           zod schemas shared by API and forms
├─ proxy.ts                   route guard for /dashboard (Next 16 “proxy”, formerly middleware)
└─ app/(site) | (auth) | dashboard   VIEWS — public pages, login/register, admin UI
```
Public pages read through the same service layer as the REST API (server-side, no extra HTTP hop) and are cached; every create/update/delete in the dashboard revalidates the affected pages.

## Authentication & security
- **Access token** (JWT, 15 min) + **refresh token** (JWT, 7 days), both in **httpOnly** cookies (`Secure` in production). Refresh cookie is scoped to `/api/auth` only.
- **Sessions** stored in MongoDB (one per device). Only a SHA-256 hash of the refresh token id is stored.
- **Refresh rotation + reuse detection** — every refresh issues a new refresh token; replaying an old one revokes the whole session.
- **Logout blacklists** the access token (`jti`) until it expires and revokes the session → a copied token stops working immediately. TTL indexes clean both collections automatically.
- **Logout all devices** and per-device sign-out from *Account & security*.
- bcrypt (cost 12), rate limiting on login/register/contact, same-origin check on mutations, roles (`admin`, `editor`), zod validation everywhere, security headers.

## REST API
All responses: `{ success: true, data }` or `{ success: false, error: { code, message, details } }`.
Auth: cookie (browser) or `Authorization: Bearer <accessToken>`.

| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/auth/register` · `/api/auth/login` | — |
| POST | `/api/auth/refresh` (cookie or `{ refreshToken }`) | refresh |
| POST | `/api/auth/logout` · `/api/auth/logout-all` | ✓ |
| GET | `/api/auth/me` · `/api/auth/sessions` · DELETE `/api/auth/sessions/:id` | ✓ |
| GET | `/api/posts` (`?category=&q=&page=&limit=`, `?scope=all` for drafts) | public |
| POST · PATCH · DELETE | `/api/posts` · `/api/posts/:id` | editor / admin (delete: admin) |
| GET | `/api/services` (`?scope=all`) · `/api/services/:id` | public |
| POST · PATCH · DELETE | `/api/services` · `/api/services/:id` | editor / admin |
| POST | `/api/contact` | public |
| GET · PATCH · DELETE | `/api/leads` · `/api/leads/:id` | ✓ |
| GET · POST | `/api/dashboard/stats` · `/api/dashboard/seed` | ✓ / admin |

## Editing static content
`src/content/*` (home, about, contact copy), `src/config/site.ts` (name, email, phone, WhatsApp),
`src/app/globals.css` (colours & fonts).
