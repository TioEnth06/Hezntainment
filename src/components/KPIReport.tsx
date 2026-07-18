"use client";

import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import {
  kpiStatus,
  MNA_EDITOR_KPI,
  MNA_SPECIALIST_KPI,
  scaleKpiForMonth,
} from "@/lib/mock/mna-data";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const MONTH_VALUES = ["2026-01", "2026-07"] as const;

const STATUS_KEYS = {
  behind: "kpi.status.behind",
  onTrack: "kpi.status.onTrack",
  slowStart: "kpi.status.slowStart",
  catchingUp: "kpi.status.catchingUp",
} as const satisfies Record<
  ReturnType<typeof kpiStatus>["code"],
  TranslationKey
>;

export function KPIReport() {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const [month, setMonth] = useState("2026-07");

  const specialists = useMemo(
    () =>
      scaleKpiForMonth(MNA_SPECIALIST_KPI[activeWorkspace.id] ?? [], month),
    [activeWorkspace.id, month],
  );
  const editors = useMemo(
    () => scaleKpiForMonth(MNA_EDITOR_KPI[activeWorkspace.id] ?? [], month),
    [activeWorkspace.id, month],
  );

  const monthLabel = t(`kpi.month.${month}` as TranslationKey);

  function printReport() {
    window.open(
      `/api/reports/kpi?workspaceId=${activeWorkspace.id}&month=${month}`,
      "_blank",
    );
  }

  return (
    <div className="space-y-6" key={activeWorkspace.id}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("kpi.title")}</h1>
          <p className="mt-1 text-sm text-muted">
            {t("kpi.body")}{" "}
            <strong className="text-foreground">{activeWorkspace.name}</strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="h-10 rounded-md border border-line bg-panel-soft px-3 text-foreground text-sm font-medium"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {MONTH_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`kpi.month.${value}` as TranslationKey)}
              </option>
            ))}
          </select>
          <Button type="button" variant="secondary" onClick={printReport}>
            <Printer className="size-4" />
            {t("kpi.print")}
          </Button>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-muted">
        {t("kpi.period", { month: monthLabel })}
      </p>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          {t("kpi.specialist")}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {specialists.map((person) => {
            const status = kpiStatus(person.achieved, person.target, "specialist");
            const pct = Math.round(
              (person.achieved / Math.max(person.target, 1)) * 100,
            );
            return (
              <Card key={person.userId}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>
                        {person.metric} · {t("kpi.target", { n: person.target })}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        status.tone === "danger"
                          ? "danger"
                          : status.tone === "warn"
                            ? "warn"
                            : "success"
                      }
                    >
                      {t(STATUS_KEYS[status.code])}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs text-muted">
                      <span>{t("kpi.progress")}</span>
                      <span className="font-mono font-semibold text-foreground">
                        {pct}% · {person.achieved}/{person.target}
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
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["DRAFT", person.draft],
                      ["PROSES", person.proses],
                      ["DONE", person.done],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-md bg-surface px-3 py-2 text-center ring-1 ring-line"
                      >
                        <p className="text-[10px] font-bold tracking-wider text-muted">
                          {label}
                        </p>
                        <p className="mt-0.5 font-mono text-lg font-bold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          {t("kpi.editor")}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {editors.map((person) => {
            const status = kpiStatus(person.achieved, person.target, "editor");
            const pct = Math.round(
              (person.achieved / Math.max(person.target, 1)) * 100,
            );
            const workloadFlag =
              person.openWorkload === 0
                ? t("kpi.tasksOpen0")
                : status.code === "slowStart"
                  ? t("kpi.status.slowStart")
                  : t("kpi.tasksOpenN", { n: person.openWorkload });

            return (
              <Card key={person.userId}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>
                        {person.metric} {t("kpi.via")}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={
                          status.tone === "warn"
                            ? "warn"
                            : status.tone === "danger"
                              ? "danger"
                              : "success"
                        }
                      >
                        {t(STATUS_KEYS[status.code])}
                      </Badge>
                      <Badge variant="muted">{workloadFlag}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-1.5 flex justify-between text-xs text-muted">
                    <span>{t("kpi.progress")}</span>
                    <span className="font-mono font-semibold text-foreground">
                      {pct}% · {person.achieved}/{person.target}
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    indicatorClassName={cn(
                      status.tone === "warn" && "bg-amber-500",
                      status.tone === "ok" && "bg-emerald-500",
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
