# Hezntainment — Manajemen Konten (Phase 1 Web2)

Multi-brand content ops: **Monitor Data**, **SYNC**, **Laporan KPI**, and **RBAC** for Admin / Sosmed / Editor.

Internal codename: MNA Content.

## Quick start

```bash
npm install
npm run dev
```

| Role | Email | Password |
|------|--------|----------|
| Admin | `admin@hezntainment.com` | `password123` |
| Sosmed | `sosmed@hezntainment.com` | `password123` |
| Editor | `editor@hezntainment.com` | `password123` |

- Landing: [http://localhost:3000](http://localhost:3000)
- App: `/mna/dashboard` (after login)
- Switch brands in sidebar: **NHM Online** ↔ **Siinbooth**

## PostgreSQL (optional)

```bash
docker compose up -d
cp .env.example .env   # if needed
npx prisma migrate dev --name mna_init
npx prisma db seed
```

## Key paths

| Path | Purpose |
|------|---------|
| `/mna/monitor` | Monitor Data + SYNC |
| `/mna/administrasi/laporan-kpi` | Laporan KPI + PRINT |
| `/mna/administrasi/tim` | Manajemen Tim (Admin) |
| `/api/sync` | SYNC ALL |
| `/api/sync/[contentId]` | SYNC one row |

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).
