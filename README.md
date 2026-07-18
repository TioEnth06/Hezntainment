# Hezntainment

Multi-brand content ops for social agencies and in-house brand teams.

**What you get:** one shell to plan content, SYNC TikTok/Instagram/YouTube metrics, track link clicks, and print team KPI — per brand workspace, with Admin / Sosmed / Editor roles.

Repo: https://github.com/TioEnth06/Hezntainment  
Internal codename: **MNA Content**

---

## Stack

| Layer | Choice |
|-------|--------|
| App | Next.js 16 (App Router) + TypeScript |
| UI | Tailwind CSS 4 + Framer Motion |
| Auth | Auth.js (NextAuth v5) — credentials + optional Google |
| Data | Prisma + PostgreSQL (optional for demo) |
| i18n | EN / ID toggle (`localStorage`) |

---

## Requirements

- Node.js 20+
- npm
- (Optional) Docker — only if you want a real Postgres DB locally

---

## Setup (local)

```bash
git clone https://github.com/TioEnth06/Hezntainment.git
cd Hezntainment

cp .env.example .env
# Edit AUTH_SECRET (required). For local demo you can keep AUTH_URL as http://localhost:3000

npm install
npm run dev
```

Open:

| URL | What |
|-----|------|
| http://localhost:3000 | Marketing landing |
| http://localhost:3000/login | Sign in |
| http://localhost:3000/mna/dashboard | App overview (after login) |

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `AUTH_SECRET` | Yes | Session secret — `openssl rand -base64 32` |
| `AUTH_URL` | Yes | App origin — `http://localhost:3000` locally |
| `DATABASE_URL` | No* | Postgres connection string |
| `AUTH_GOOGLE_ID` | No | Google OAuth client id |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth client secret |

\*Without `DATABASE_URL`, **demo logins still work**. Registration / real DB users need Postgres.

### Optional: Postgres

```bash
docker compose up -d
# Ensure .env DATABASE_URL matches docker-compose (see .env.example)

npx prisma migrate deploy
npx prisma db seed
```

---

## Demo accounts

Password for all: `password123`

| Role | Email | Lands on |
|------|--------|----------|
| Admin | `admin@hezntainment.com` | Full app + Administration |
| Sosmed | `sosmed@hezntainment.com` | Monitor, KPI, production boards |
| Editor | `editor@hezntainment.com` | Calendar / production focus |

After login, switch brands in the sidebar: **NHM Online** ↔ **Siinbooth**.

Language: use the **EN / ID** toggle in the header (marketing) or sidebar (app).

---

## Product map

| Path | Module |
|------|--------|
| `/mna/dashboard` | Overview — metrics, pipeline, KPI snapshot |
| `/mna/kalender` | Editorial calendar |
| `/mna/monitor` | Monitor Data + SYNC / SYNC ALL |
| `/mna/link-tracker` | Outbound / bio link clicks |
| `/mna/brainstorming` | Ideation + Scripting board |
| `/mna/antrean-produksi` | Editing + Ready-to-review board |
| `/mna/administrasi/laporan-kpi` | Monthly KPI + PRINT REPORT |
| `/mna/administrasi/tim` | Team invites (Admin) |
| `/mna/administrasi/inventaris` | Brand inventory (Admin) |

### API

| Endpoint | Purpose |
|----------|---------|
| `POST /api/sync-content` | SYNC one published URL (mock lag ~1.5s) |
| `POST /api/sync` · `POST /api/sync/[contentId]` | Sync helpers |
| `GET /api/reports/kpi` | KPI report print view |
| `POST /api/register` | Create Admin account (needs DB + seed) |

---

## Scripts

```bash
npm run dev          # local development
npm run build        # prisma generate && next build
npm run start        # production server
npm run lint         # ESLint

npm run db:migrate   # prisma migrate dev
npm run db:deploy    # prisma migrate deploy (CI / Vercel)
npm run db:seed      # seed roles + demo data
npm run db:studio    # Prisma Studio
```

---

## Deploy (Vercel)

1. Import `TioEnth06/Hezntainment` at [vercel.com/new](https://vercel.com/new)
2. Set at least:
   - `AUTH_SECRET` → `openssl rand -base64 32`
   - `AUTH_URL` → your live `https://….vercel.app` URL
3. Deploy — then log in with a demo account above

Full checklist (Postgres, Google OAuth, migrate): [`docs/VERCEL.md`](./docs/VERCEL.md)

---

## Docs

| File | Contents |
|------|----------|
| [`docs/VERCEL.md`](./docs/VERCEL.md) | Vercel env + deploy steps |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Folder layout & system notes |
| [`brand.md`](./brand.md) | Brand / theme tokens |

---

## License

Private / proprietary unless otherwise stated by the repo owner.
