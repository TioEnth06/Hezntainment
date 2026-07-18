# Deploy on Vercel

Phase 1 runs on Vercel with **demo logins** even without a database.
Registration / Prisma-backed users need Postgres.

## 1. Import the repo

1. [vercel.com/new](https://vercel.com/new) → import `TioEnth06/Hezntainment`
2. Framework: **Next.js** (auto-detected)
3. Root directory: repo root (default)

Build uses `prisma generate && next build` (see `package.json`).
`prisma generate` works **without** `DATABASE_URL` (placeholder URL for CLI only).

## 2. Environment variables

In **Project → Settings → Environment Variables** (Production + Preview):

| Name | Required | Example |
|------|----------|---------|
| `AUTH_SECRET` | Yes | output of `openssl rand -base64 32` |
| `AUTH_URL` | Yes | `https://your-app.vercel.app` |
| `DATABASE_URL` | Optional* | Neon / Vercel Postgres URL |
| `AUTH_GOOGLE_ID` | No | Google OAuth client id |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth client secret |

\*Without `DATABASE_URL`, use demo accounts:

- `admin@hezntainment.com` / `password123`
- `sosmed@hezntainment.com` / `password123`
- `editor@hezntainment.com` / `password123`

After you add a custom domain, update `AUTH_URL` to that HTTPS origin.

## 3. Database (optional but recommended)

1. Create a Postgres DB ([Neon](https://neon.tech) or Vercel Storage → Postgres).
2. Set `DATABASE_URL` in Vercel.
3. From your machine (or Vercel CLI):

```bash
npx prisma migrate deploy
npx prisma db seed
```

Or set **Build Command** in Vercel to:

```bash
prisma migrate deploy && prisma generate && next build
```

(only after `DATABASE_URL` is configured — otherwise migrate fails the build).

## 4. Deploy

Click **Deploy**. Landing + demo login should work immediately with `AUTH_SECRET` + `AUTH_URL`.

## Checklist

- [ ] `AUTH_SECRET` set (not the localhost placeholder)
- [ ] `AUTH_URL` matches the live HTTPS URL
- [ ] Build succeeds (`prisma generate` via `postinstall` / `build`)
- [ ] Demo login works
- [ ] (Optional) Postgres migrated + seeded for real registration

## Troubleshooting

### `/login` shows **Internal Server Error** or blank page after login

Almost always **missing / wrong `AUTH_SECRET`** (or `AUTH_URL`) in Vercel.

Live check: open `https://YOUR-APP.vercel.app/api/health/auth`  
→ must return `"ok": true`. If `503` / `authSecretConfigured: false`, env is not applied.

1. Vercel → Project → **Settings → Environment Variables**
2. Add (Production + Preview):
   - `AUTH_SECRET` = output of `openssl rand -base64 32`
   - `AUTH_URL` = exact live origin, e.g. `https://hezntainment.vercel.app` (no trailing slash)
3. **Deployments → … → Redeploy** (required — new env alone is not enough)
4. Hard-refresh `/login`, then try demo login again

Confirm in **Deployments → Runtime Logs** — look for `MissingSecret` / `Please define a secret`.

Demo accounts (no database required):

- `admin@hezntainment.com` / `password123`
- `sosmed@hezntainment.com` / `password123`
- `editor@hezntainment.com` / `password123`
