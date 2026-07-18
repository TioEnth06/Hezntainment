# MNA Content / Hezntainment — Phase 1 Architecture

## Directory structure

```text
Framework/
├── components.json            # shadcn/ui config
├── docker-compose.yml
├── docs/ARCHITECTURE.md
├── prisma/
│   ├── schema.prisma          # PostgreSQL multi-tenant + RBAC + LinkTracker
│   ├── seed.ts
│   └── sql/001_init.sql
├── public/marketing/
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
    │   │   ├── brainstorming/
    │   │   ├── antrean-produksi/
    │   │   └── administrasi/{tim,inventaris,laporan-kpi}/
    │   └── api/
    │       ├── auth/[...nextauth]/
    │       ├── register/
    │       ├── sync/ · sync/[contentId]/
    │       ├── sync-content/   # Monitor SYNC (1.5s mock lag)
    │       └── reports/kpi/
    ├── components/
    │   ├── ui/                # shadcn primitives
    │   ├── Sidebar.tsx
    │   ├── ContentKanban.tsx
    │   ├── LinkTracker.tsx
    │   ├── PerformanceMonitor.tsx
    │   ├── KPIReport.tsx
    │   ├── marketing/
    │   ├── mna/               # Team console, workspace switcher
    │   ├── auth/
    │   └── providers/
    ├── lib/
    │   ├── mock/              # Presentation data
    │   ├── workspace/
    │   ├── scraping/
    │   ├── rbac.ts
    │   └── prisma.ts
    ├── auth.ts
    └── proxy.ts
```

## Multi-tenant isolation

1. User ↔ workspace via `workspace_members` (+ role).
2. Active workspace lives in client context (`localStorage`).
3. Monitor Data / Laporan KPI / Kanban / Link Tracker filter by `workspace_id`.

## RBAC (sidebar)

| Role    | Menu utama                         | Produksi              | Administrasi         |
|---------|------------------------------------|-----------------------|----------------------|
| ADMIN   | All                                | Brainstorming, Antrean| Tim, Inventaris, KPI |
| SOSMED  | Dashboard, Kalender, Monitor, Link | Brainstorming, Antrean| Laporan KPI          |
| EDITOR  | Dashboard, Kalender                | Brainstorming, Antrean| —                    |
