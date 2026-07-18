"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import {
  aggregateMonitor,
  MNA_MONITOR_ROWS,
} from "@/lib/mock/mna-data";
import { useWorkspace } from "@/lib/workspace/context";
import type { MonitorContentRow } from "@/lib/workspace/types";
import { formatNumber } from "@/lib/utils";

function StatCell({
  label,
  stats,
}: {
  label: string;
  stats: MonitorContentRow["tiktok"];
}) {
  if (!stats) {
    return <span className="text-xs text-muted">—</span>;
  }
  return (
    <div className="space-y-0.5 text-[11px] leading-tight">
      <p className="font-semibold text-ink">{label}</p>
      <p>V {formatNumber(stats.views)}</p>
      <p>L {formatNumber(stats.likes)}</p>
      <p>C {formatNumber(stats.comments)}</p>
      <p>S {formatNumber(stats.shares)}</p>
    </div>
  );
}

export function MonitorView() {
  const { activeWorkspace } = useWorkspace();
  const [rows, setRows] = useState(MNA_MONITOR_ROWS);
  const [filter, setFilter] = useState<"all" | "views">("all");
  const [syncAllBusy, setSyncAllBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const workspaceRows = useMemo(() => {
    let list = rows.filter((r) => r.workspaceId === activeWorkspace.id);
    if (filter === "views") {
      list = [...list].sort((a, b) => {
        const av = (a.tiktok?.views ?? 0) + (a.instagram?.views ?? 0);
        const bv = (b.tiktok?.views ?? 0) + (b.instagram?.views ?? 0);
        return bv - av;
      });
    }
    return list;
  }, [rows, activeWorkspace.id, filter]);

  const summary = useMemo(
    () => aggregateMonitor(workspaceRows),
    [workspaceRows],
  );

  async function syncOne(contentId: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === contentId ? { ...r, syncing: true } : r)),
    );
    setNotice(null);

    const res = await fetch(`/api/sync/${contentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId: activeWorkspace.id }),
    });
    const data = await res.json();

    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== contentId) return r;
        if (!res.ok || !data.metrics) {
          return { ...r, syncing: false };
        }
        return {
          ...r,
          syncing: false,
          lastSynced: data.lastSynced ?? new Date().toISOString(),
          tiktok: data.metrics.tiktok ?? r.tiktok,
          instagram: data.metrics.instagram ?? r.instagram,
        };
      }),
    );

    setNotice(
      res.ok
        ? `Synced ${contentId} via scrape queue.`
        : data.error ?? "Sync failed",
    );
  }

  async function syncAll() {
    setSyncAllBusy(true);
    setNotice(null);
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workspaceId: activeWorkspace.id,
        contentIds: workspaceRows.map((r) => r.id),
      }),
    });
    const data = await res.json();
    setSyncAllBusy(false);

    if (res.ok && Array.isArray(data.results)) {
      setRows((prev) =>
        prev.map((row) => {
          const hit = data.results.find(
            (x: { contentId: string }) => x.contentId === row.id,
          );
          if (!hit?.metrics) return row;
          return {
            ...row,
            lastSynced: hit.lastSynced,
            tiktok: hit.metrics.tiktok ?? row.tiktok,
            instagram: hit.metrics.instagram ?? row.instagram,
          };
        }),
      );
      setNotice(`SYNC ALL queued ${data.results.length} items for ${activeWorkspace.name}.`);
    } else {
      setNotice(data.error ?? "SYNC ALL failed");
    }
  }

  const cards = [
    { label: "Total Views", value: summary.views },
    { label: "Total Likes", value: summary.likes },
    { label: "Total Comments", value: summary.comments },
    { label: "Total Shares", value: summary.shares },
  ];

  return (
    <div className="space-y-6" key={activeWorkspace.id}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitor Data</h1>
          <p className="mt-1 text-sm text-muted">
            Performance hub · active brand{" "}
            <strong className="text-ink">{activeWorkspace.name}</strong>
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-panel p-4 ring-1 ring-line">
            <p className="text-xs uppercase tracking-wider text-muted">
              {card.label}
            </p>
            <p className="font-mono mt-2 text-2xl font-semibold">
              {formatNumber(card.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 bg-panel p-3 ring-1 ring-line">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "views")}
          className="rounded-sm border border-line px-3 py-2 text-sm"
        >
          <option value="all">Filter by Brand / Default</option>
          <option value="views">Sort by Views</option>
        </select>
        <button
          type="button"
          onClick={syncAll}
          disabled={syncAllBusy || workspaceRows.length === 0}
          className="btn-primary inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-bold disabled:opacity-60"
        >
          {syncAllBusy ? <Loader2 className="size-4 animate-spin" /> : null}
          SYNC ALL
        </button>
        <button
          type="button"
          onClick={() => setNotice(`Refreshed view for ${activeWorkspace.name}`)}
          className="inline-flex items-center gap-2 rounded-sm border border-line px-3 py-2 text-sm font-medium hover:bg-surface"
          aria-label="Manual refresh"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {notice ? (
        <p className="rounded-sm bg-warm/25 px-3 py-2 text-sm text-ink">{notice}</p>
      ) : null}

      <div className="overflow-x-auto bg-panel ring-1 ring-line">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Content</th>
              <th className="px-4 py-3 font-medium">Upload</th>
              <th className="px-4 py-3 font-medium">TikTok</th>
              <th className="px-4 py-3 font-medium">Instagram</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {workspaceRows.map((row) => (
              <tr key={row.id} className="border-t border-line/80 align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{row.title}</p>
                  <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {row.brand}
                  </span>
                  <p className="mt-1 text-[11px] text-muted">
                    Last synced:{" "}
                    {row.lastSynced
                      ? new Date(row.lastSynced).toLocaleString()
                      : "Never"}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted">{row.uploadDate}</td>
                <td className="px-4 py-3">
                  <StatCell label="TT" stats={row.tiktok} />
                </td>
                <td className="px-4 py-3">
                  <StatCell label="IG" stats={row.instagram} />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => syncOne(row.id)}
                    disabled={row.syncing}
                    className="btn-warm inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-bold disabled:opacity-60"
                  >
                    {row.syncing ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : null}
                    SYNC
                  </button>
                </td>
              </tr>
            ))}
            {workspaceRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  No published content in this workspace.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
