"use client";

import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import {
  kpiStatus,
  MNA_EDITOR_KPI,
  MNA_SPECIALIST_KPI,
} from "@/lib/mock/mna-data";
import { useWorkspace } from "@/lib/workspace/context";
import { cn } from "@/lib/utils";

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted">
        <span>Progress vs Target</span>
        <span className="font-mono font-semibold text-ink">
          {pct}% · {value}/{max}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Badge({
  label,
  tone,
}: {
  label: string;
  tone: "danger" | "warn" | "ok";
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide",
        tone === "danger" && "bg-red-100 text-red-700",
        tone === "warn" && "bg-amber-100 text-amber-800",
        tone === "ok" && "bg-emerald-100 text-emerald-800",
      )}
    >
      {label}
    </span>
  );
}

export function LaporanKpiView() {
  const { activeWorkspace } = useWorkspace();
  const [month, setMonth] = useState("2026-07");

  const specialists = useMemo(
    () => MNA_SPECIALIST_KPI[activeWorkspace.id] ?? [],
    [activeWorkspace.id],
  );
  const editors = useMemo(
    () => MNA_EDITOR_KPI[activeWorkspace.id] ?? [],
    [activeWorkspace.id],
  );

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
          <h1 className="text-2xl font-bold tracking-tight">Laporan KPI</h1>
          <p className="mt-1 text-sm text-muted">
            Monthly productivity ·{" "}
            <strong className="text-ink">{activeWorkspace.name}</strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-sm border border-line px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={printReport}
            className="btn-primary inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-bold"
          >
            <Printer className="size-4" />
            PRINT REPORT
          </button>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
          Specialist KPI · Sosmed
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {specialists.map((person) => {
            const status = kpiStatus(person.achieved, person.target, "specialist");
            return (
              <article
                key={person.userId}
                className="space-y-4 bg-panel p-5 ring-1 ring-line"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">{person.name}</p>
                    <p className="text-xs text-muted">
                      Target metric: {person.metric}
                    </p>
                  </div>
                  <Badge label={status.label} tone={status.tone} />
                </div>
                <ProgressBar value={person.achieved} max={person.target} />
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    ["DRAFT", person.draft],
                    ["PROSES", person.proses],
                    ["DONE", person.done],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-surface p-3">
                      <p className="text-[10px] font-bold tracking-wider text-muted">
                        {label}
                      </p>
                      <p className="font-mono mt-1 text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
          Editor KPI · Finish Videos
        </h2>
        <p className="text-xs text-muted">
          Counted when content status reaches READY_TO_REVIEW or PUBLISHED in the
          selected month.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {editors.map((person) => {
            const status = kpiStatus(person.achieved, person.target, "editor");
            return (
              <article
                key={person.userId}
                className="space-y-4 bg-panel p-5 ring-1 ring-line"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">{person.name}</p>
                    <p className="text-xs text-muted">
                      Target metric: {person.metric}
                    </p>
                  </div>
                  <Badge label={status.label} tone={status.tone} />
                </div>
                <ProgressBar value={person.achieved} max={person.target} />
                <p className="text-sm text-muted">
                  Current Workload:{" "}
                  <strong className="text-ink">
                    {person.openWorkload} Tasks Open
                  </strong>
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
