"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import {
  aggregateMonitor,
  MNA_MONITOR_ROWS,
  MNA_WORKSPACES,
} from "@/lib/mock/mna-data";
import { useI18n } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import type { MonitorContentRow, PlatformStats } from "@/lib/workspace/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

function StatCell({
  label,
  stats,
}: {
  label: string;
  stats: PlatformStats | null;
}) {
  if (!stats) {
    return <span className="text-xs text-muted">—</span>;
  }
  return (
    <div className="space-y-0.5 text-[11px] leading-tight">
      <p className="font-semibold text-foreground">{label}</p>
      <p>V {formatNumber(stats.views)}</p>
      <p>L {formatNumber(stats.likes)}</p>
      <p>C {formatNumber(stats.comments)}</p>
      <p>S {formatNumber(stats.shares)}</p>
    </div>
  );
}

function formatSynced(row: MonitorContentRow, neverLabel: string) {
  if (row.lastSyncedLabel) return row.lastSyncedLabel;
  if (!row.lastSynced) return neverLabel;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(row.lastSynced));
}

export function PerformanceMonitor() {
  const { t } = useI18n();
  const { activeWorkspace, setActiveWorkspaceId } = useWorkspace();
  const [rows, setRows] = useState<MonitorContentRow[]>(MNA_MONITOR_ROWS);
  const [brandFilter, setBrandFilter] = useState<string>("active");
  const [syncAllBusy, setSyncAllBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const visibleRows = useMemo(() => {
    if (brandFilter === "all") return rows;
    if (brandFilter === "active") {
      return rows.filter((r) => r.workspaceId === activeWorkspace.id);
    }
    return rows.filter((r) => r.workspaceId === brandFilter);
  }, [rows, brandFilter, activeWorkspace.id]);

  const summary = useMemo(
    () => aggregateMonitor(visibleRows),
    [visibleRows],
  );

  async function applySyncResult(
    contentId: string,
    data: {
      metrics?: {
        tiktok?: PlatformStats | null;
        instagram?: PlatformStats | null;
      };
      lastSynced?: string;
      lastSyncedLabel?: string;
      error?: string;
    },
    ok: boolean,
  ) {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== contentId) return r;
        if (!ok || !data.metrics) {
          return { ...r, syncing: false };
        }
        return {
          ...r,
          syncing: false,
          lastSynced: data.lastSynced ?? new Date().toISOString(),
          lastSyncedLabel: data.lastSyncedLabel,
          tiktok: data.metrics.tiktok ?? r.tiktok,
          instagram: data.metrics.instagram ?? r.instagram,
        };
      }),
    );
  }

  async function syncOne(row: MonitorContentRow): Promise<boolean> {
    setRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, syncing: true } : r)),
    );

    try {
      const res = await fetch("/api/sync-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: row.id,
          url: row.publishedUrl,
          workspaceId: row.workspaceId,
        }),
      });
      const data = await res.json().catch(() => ({ error: "Invalid response" }));
      await applySyncResult(row.id, data, res.ok);
      if (!res.ok) {
        setNotice(data.error ?? t("monitor.syncFailed"));
        return false;
      }
      setNotice(
        t("monitor.synced", {
          title: row.title,
          when: data.lastSyncedLabel ?? t("monitor.updated"),
        }),
      );
      return true;
    } catch {
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, syncing: false } : r)),
      );
      setNotice(t("monitor.networkError"));
      return false;
    }
  }

  async function syncAll() {
    setSyncAllBusy(true);
    setNotice(null);
    const targets = visibleRows.filter((r) => r.publishedUrl);
    let okCount = 0;
    try {
      for (const row of targets) {
        if (await syncOne(row)) okCount += 1;
      }
      setNotice(
        t("monitor.syncAllDone", { ok: okCount, total: targets.length }),
      );
    } finally {
      setSyncAllBusy(false);
    }
  }

  function refreshLocal() {
    setRows(MNA_MONITOR_ROWS.map((row) => ({ ...row })));
    setNotice(t("monitor.refreshed"));
  }

  const cards = [
    { label: t("monitor.views"), value: summary.views },
    { label: t("monitor.likes"), value: summary.likes },
    { label: t("monitor.comments"), value: summary.comments },
    { label: t("monitor.shares"), value: summary.shares },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("monitor.title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("monitor.body")}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="bg-ink text-white">
            <CardContent className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-warm">
                {card.label}
              </p>
              <p className="mt-2 font-mono text-3xl font-bold tracking-tight">
                {formatNumber(card.value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-md bg-panel p-3 ring-1 ring-line">
        <label className="text-xs font-bold uppercase tracking-wider text-muted">
          {t("monitor.filter")}
        </label>
        <select
          className="h-9 rounded-md border border-line bg-panel-soft px-3 text-foreground text-sm"
          value={brandFilter}
          onChange={(e) => {
            const value = e.target.value;
            setBrandFilter(value);
            if (value !== "all" && value !== "active") {
              setActiveWorkspaceId(value);
            }
          }}
        >
          <option value="active">
            {t("monitor.activeWs", { name: activeWorkspace.name })}
          </option>
          <option value="all">{t("monitor.allBrands")}</option>
          {MNA_WORKSPACES.map((ws) => (
            <option key={ws.id} value={ws.id}>
              {ws.name}
            </option>
          ))}
        </select>

        <div className="ml-auto flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={refreshLocal}
            aria-label={t("monitor.refresh")}
          >
            <RefreshCw className="size-4" />
          </Button>
          <Button
            type="button"
            variant="warm"
            disabled={syncAllBusy}
            onClick={syncAll}
          >
            {syncAllBusy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            {t("monitor.syncAll")}
          </Button>
        </div>
      </div>

      {notice ? (
        <p className="rounded-md bg-primary/5 px-3 py-2 text-sm text-primary ring-1 ring-primary/15">
          {notice}
        </p>
      ) : null}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[220px]">{t("monitor.content")}</TableHead>
                <TableHead>{t("monitor.upload")}</TableHead>
                <TableHead>{t("monitor.tiktok")}</TableHead>
                <TableHead>{t("monitor.instagram")}</TableHead>
                <TableHead className="text-right">{t("monitor.action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <p className="font-semibold text-foreground">{row.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge variant="brand">{row.brand}</Badge>
                      <span className="text-[11px] text-muted">
                        {t("monitor.lastSynced", {
                          when: formatSynced(row, t("monitor.never")),
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted">
                    {row.uploadDate}
                  </TableCell>
                  <TableCell>
                    <StatCell label={t("monitor.tiktok")} stats={row.tiktok} />
                  </TableCell>
                  <TableCell>
                    <StatCell
                      label={t("monitor.instagram")}
                      stats={row.instagram}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      disabled={!!row.syncing || syncAllBusy}
                      onClick={() => syncOne(row)}
                    >
                      {row.syncing ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : null}
                      {t("monitor.sync")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted">
                    {t("monitor.empty")}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
