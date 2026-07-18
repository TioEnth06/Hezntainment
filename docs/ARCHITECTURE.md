# MNA Content / Hezntainment — Phase 1 Architecture

## Directory structure

```text
Framework/
├── docker-compose.yml
├── docs/ARCHITECTURE.md
├── prisma/
│   ├── schema.prisma          # PostgreSQL multi-tenant + RBAC
│   ├── seed.ts
│   └── sql/001_init.sql
├── public/marketing/          # Landing imagery
└── src/
    ├── app/
    │   ├── page.tsx           # Marketing landing
    │   ├── login/ · register/ · onboarding/
    │   ├── mna/               # Product shell
    │   │   ├── layout.tsx
    │   │   ├── dashboard/
    │   │   ├── kalender/
    │   │   ├── monitor/
    │   │   ├── link-tracker/
    │   │   └── administrasi/{tim,inventaris,laporan-kpi}/
    │   └── api/
    │       ├── auth/[...nextauth]/
    │       ├── register/
    │       ├── sync/ · sync/[contentId]/
    │       └── reports/kpi/
    ├── components/
    │   ├── marketing/         # Landing sections
    │   ├── mna/               # App shell + Monitor + KPI + Team
    │   ├── auth/
    │   └── providers/
    ├── lib/
    │   ├── mock/              # Presentation data (auth, monitor, team)
    │   ├── workspace/         # Active workspace context
    │   ├── scraping/          # SYNC metric stub
    │   ├── rbac.ts
    │   └── prisma.ts
    ├── auth.ts
    └── proxy.ts               # Auth + role guards (+ legacy URL redirects)
```

## Multi-tenant isolation

1. User ↔ workspace via `workspace_members` (+ role).
2. Active workspace lives in client context (`localStorage`).
3. Monitor Data / Laporan KPI always filter by `workspace_id`.

## RBAC (sidebar)

| Role    | Menu utama                         | Administrasi         |
|---------|------------------------------------|----------------------|
| ADMIN   | All                                | Tim, Inventaris, KPI |
| SOSMED  | Dashboard, Kalender, Monitor, Link | Laporan KPI          |
| EDITOR  | Dashboard, Kalender                | —                    |
