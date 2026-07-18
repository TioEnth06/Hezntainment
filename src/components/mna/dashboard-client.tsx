"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  Clapperboard,
  Eye,
  Heart,
  Lightbulb,
  Link2,
  Radio,
  RefreshCw,
  Workflow,
} from "lucide-react";
import {
  OverviewEmpty,
  OverviewSectionCard,
  OverviewStatCard,
} from "@/components/mna/dashboard/overview-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { buildDashboardOverview } from "@/lib/mna/build-dashboard-overview";
import { KPI_STATUS_KEYS } from "@/lib/mna/kpi-status-keys";
import { kpiStatus } from "@/lib/mock/mna-data";
import { cn, formatNumber } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace/context";
import type { KanbanTask } from "@/lib/workspace/types";

const STAGE_KEYS: Record<KanbanTask["status"], TranslationKey> = {
  IDEATION: "dashboard.stage.IDEATION",
  SCRIPTING: "dashboard.stage.SCRIPTING",
  EDITING: "dashboard.stage.EDITING",
  READY_TO_REVIEW: "dashboard.stage.READY_TO_REVIEW",
};

const QUICK_LINKS: {
  href: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  icon: typeof Radio;
}[] = [
  {
    href: "/mna/monitor",
    titleKey: "nav.monitor",
    bodyKey: "dashboard.card.monitor",
    icon: Radio,
  },
  {
    href: "/mna/administrasi/laporan-kpi",
    titleKey: "nav.kpi",
    bodyKey: "dashboard.card.kpi",
    icon: BarChart3,
  },
  {
    href: "/mna/brainstorming",
    titleKey: "nav.brainstorming",
    bodyKey: "dashboard.card.brainstorm",
    icon: Lightbulb,
  },
  {
    href: "/mna/antrean-produksi",
    titleKey: "nav.antrean",
    bodyKey: "dashboard.card.antrean",
    icon: Clapperboard,
  },
  {
    href: "/mna/link-tracker",
    titleKey: "nav.linkTracker",
    bodyKey: "dashboard.card.links",
    icon: Link2,
  },
];

export function DashboardClient() {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const { data: session } = useSession();

  const displayName =
    session?.user?.name?.split(" ")[0] ??
    session?.user?.email?.split("@")[0] ??
    null;

  const overview = useMemo(
    () => buildDashboardOverview(activeWorkspace.id),
    [activeWorkspace.id],
  );

  return (
    <div className="space-y-5 sm:space-y-6" key={activeWorkspace.id}>
      <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px]">
            {t("dashboard.overview")}
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            {displayName
              ? t("dashboard.greeting", { name: displayName })
              : t("dashboard.greetingAnon")}
          </h1>
          <p className="mt-1 hidden text-sm text-muted sm:block">
            {t("dashboard.body")}
          </p>
        </div>
        <div className="w-full rounded-xl bg-panel px-3.5 py-2.5 ring-1 ring-line sm:w-auto sm:px-4 sm:py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            {t("dashboard.workspace")}
          </p>
          <p className="mt-0.5 truncate text-sm font-bold text-foreground">
            {activeWorkspace.name}
            <span className="ml-2 font-mono text-xs font-semibold text-primary">
              {activeWorkspace.brandCode}
            </span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
        <OverviewStatCard
          icon={Eye}
          label={t("dashboard.stat.views")}
          value={formatNumber(overview.metrics.views)}
          hint={`${t("dashboard.stat.likes")} · ${formatNumber(overview.metrics.likes)}`}
        />
        <OverviewStatCard
          icon={Radio}
          label={t("dashboard.stat.published")}
          value={String(overview.published)}
          hint={
            overview.needsSync > 0
              ? t("dashboard.stat.needsSyncCount", { n: overview.needsSync })
              : t("dashboard.stage.PUBLISHED")
          }
        />
        <OverviewStatCard
          icon={Workflow}
          label={t("dashboard.stat.pipeline")}
          value={String(overview.pipelineCount)}
          hint={t("dashboard.pipeline.body")}
        />
        <OverviewStatCard
          icon={Link2}
          label={t("dashboard.stat.clicks")}
          value={formatNumber(overview.clicks)}
          hint={t("nav.linkTracker")}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-2">
        <OverviewSectionCard
          title={t("dashboard.pipeline.title")}
          description={t("dashboard.pipeline.body")}
          href="/mna/antrean-produksi"
        >
          {overview.stageCounts.every((item) => item.count === 0) ? (
            <OverviewEmpty>{t("dashboard.pipeline.empty")}</OverviewEmpty>
          ) : (
            <div className="space-y-3">
              {overview.stageCounts.map((item) => (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="min-w-0 truncate font-semibold text-foreground">
                      {t(STAGE_KEYS[item.stage])}
                    </span>
                    <span className="shrink-0 font-mono font-bold text-muted">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-panel-soft">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.round((item.count / overview.maxStage) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </OverviewSectionCard>

        <OverviewSectionCard
          title={t("dashboard.top.title")}
          description={t("dashboard.top.body")}
          href="/mna/monitor"
        >
          {overview.topContent.length === 0 ? (
            <OverviewEmpty>{t("dashboard.top.empty")}</OverviewEmpty>
          ) : (
            <div className="space-y-2">
              {overview.topContent.map(({ row, views, likes }, index) => (
                <div
                  key={row.id}
                  className="flex items-start justify-between gap-2 rounded-lg bg-surface px-3 py-2.5 ring-1 ring-line sm:gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      <span className="mr-1.5 font-mono text-xs text-muted sm:mr-2">
                        #{index + 1}
                      </span>
                      {row.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                      <Heart className="size-3 shrink-0" />
                      <span className="truncate">
                        {formatNumber(likes)} {t("dashboard.unit.likes")}
                      </span>
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-sm font-bold text-foreground">
                      {formatNumber(views)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">
                      {t("dashboard.unit.views")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OverviewSectionCard>
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-2">
        <OverviewSectionCard
          title={t("dashboard.kpi.title")}
          description={t("dashboard.kpi.body")}
          href="/mna/administrasi/laporan-kpi"
        >
          {overview.kpiPeople.length === 0 ? (
            <OverviewEmpty>{t("dashboard.kpi.empty")}</OverviewEmpty>
          ) : (
            <div className="space-y-4">
              {overview.kpiPeople.map((person) => {
                const kind = person.role === "EDITOR" ? "editor" : "specialist";
                const status = kpiStatus(person.achieved, person.target, kind);
                const pct = Math.round(
                  (person.achieved / Math.max(person.target, 1)) * 100,
                );

                return (
                  <div
                    key={`${person.userId}-${person.metric}`}
                    className="space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {person.name}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {person.metric}
                        </p>
                      </div>
                      <Badge
                        className="shrink-0"
                        variant={
                          status.tone === "danger"
                            ? "danger"
                            : status.tone === "warn"
                              ? "warn"
                              : "success"
                        }
                      >
                        {t(KPI_STATUS_KEYS[status.code])}
                      </Badge>
                    </div>
                    <div className="flex justify-between gap-2 text-[11px] text-muted">
                      <span className="truncate">
                        {t("dashboard.kpi.ofTarget", {
                          achieved: person.achieved,
                          target: person.target,
                        })}
                      </span>
                      <span className="shrink-0 font-mono font-semibold text-foreground">
                        {pct}%
                      </span>
                    </div>
                    <Progress
                      value={pct}
                      indicatorClassName={cn(
                        status.tone === "danger" && "bg-red-500",
                        status.tone === "warn" && "bg-amber-500",
                        status.tone === "ok" && "bg-emerald-500",
                      )}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </OverviewSectionCard>

        <OverviewSectionCard
          title={t("dashboard.recent.title")}
          description={t("dashboard.recent.body")}
        >
          <div className="space-y-2">
            {overview.attention.length === 0 ? (
              <OverviewEmpty>{t("dashboard.recent.empty")}</OverviewEmpty>
            ) : (
              overview.attention.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-2 rounded-lg bg-surface px-3 py-2.5 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{row.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-amber-200">
                      <RefreshCw className="size-3 shrink-0" />
                      {t("dashboard.neverSynced")}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="warm"
                    className="w-full sm:w-auto"
                  >
                    <Link href="/mna/monitor">{t("monitor.sync")}</Link>
                  </Button>
                </div>
              ))
            )}
            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <Link href="/mna/monitor">{t("dashboard.openMonitor")}</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <Link href="/mna/administrasi/laporan-kpi">
                  {t("dashboard.openKpi")}
                </Link>
              </Button>
            </div>
          </div>
        </OverviewSectionCard>
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
            {t("dashboard.quick.title")}
          </h2>
          <p className="mt-0.5 text-sm text-muted">{t("dashboard.quick.body")}</p>
        </div>
        <div className="-mx-3 flex gap-2.5 overflow-x-auto px-3 pb-1 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-5">
          {QUICK_LINKS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="w-[min(70vw,16rem)] shrink-0 snap-start rounded-xl bg-panel p-4 ring-1 ring-line transition active:scale-[0.98] hover:ring-primary/40 sm:w-auto"
              >
                <Icon className="size-4 text-primary" />
                <p className="mt-2 text-sm font-bold">{t(card.titleKey)}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted">
                  {t(card.bodyKey)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
