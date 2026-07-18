"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import { MNA_LINK_TRACKERS } from "@/lib/mock/mna-data";
import { useI18n } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import type { LinkTrackerRow } from "@/lib/workspace/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

function formatTimestamp(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function LinkTracker() {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const [rows, setRows] = useState<LinkTrackerRow[]>(MNA_LINK_TRACKERS);
  const [creating, setCreating] = useState(false);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const workspaceRows = useMemo(
    () =>
      rows
        .filter((r) => r.workspaceId === activeWorkspace.id)
        .sort((a, b) => b.clicks - a.clicks),
    [rows, activeWorkspace.id],
  );

  const totalClicks = workspaceRows.reduce((sum, r) => sum + r.clicks, 0);

  function createLink() {
    setError(null);
    const trimmedLabel = label.trim();
    const trimmedUrl = url.trim();
    if (!trimmedLabel || !trimmedUrl) {
      setError(t("links.errRequired"));
      return;
    }
    let valid = true;
    try {
      const parsed = new URL(trimmedUrl);
      valid = parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      valid = false;
    }
    if (!valid) {
      setError(t("links.errUrl"));
      return;
    }

    const next: LinkTrackerRow = {
      id: `lt_${activeWorkspace.slug}_${Date.now()}`,
      workspaceId: activeWorkspace.id,
      label: trimmedLabel,
      url: trimmedUrl,
      clicks: 0,
      lastClicked: null,
    };
    setRows((prev) => [next, ...prev]);
    setLabel("");
    setUrl("");
    setCreating(false);
  }

  function simulateClick(id: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              clicks: r.clicks + 1,
              lastClicked: new Date().toISOString(),
            }
          : r,
      ),
    );
  }

  return (
    <div className="space-y-5" key={activeWorkspace.id}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {t("links.title")}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t("links.body")}{" "}
            <strong className="text-foreground">{activeWorkspace.name}</strong>
            {" · "}
            {t("links.totalClicks", { n: formatNumber(totalClicks) })}
          </p>
        </div>
        <Button
          type="button"
          variant="warm"
          className="w-full sm:w-auto"
          onClick={() => setCreating((v) => !v)}
        >
          <Plus className="size-4" />
          {t("links.create")}
        </Button>
      </div>

      {creating ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("links.new")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-[1fr_1.4fr_auto]">
            <Input
              placeholder={t("links.labelPh")}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <Input
              placeholder="https://destination.example"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex gap-2">
              <Button type="button" className="flex-1 sm:flex-none" onClick={createLink}>
                {t("links.save")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => {
                  setCreating(false);
                  setError(null);
                }}
              >
                {t("links.cancel")}
              </Button>
            </div>
            {error ? (
              <p className="text-sm text-red-600 md:col-span-3">{error}</p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>{t("links.colLabel")}</TableHead>
                <TableHead>{t("links.colUrl")}</TableHead>
                <TableHead className="text-right">{t("links.colClicks")}</TableHead>
                <TableHead>{t("links.colLast")}</TableHead>
                <TableHead className="text-right">{t("links.colAction")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaceRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-semibold text-foreground">
                    {row.label}
                  </TableCell>
                  <TableCell>
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => simulateClick(row.id)}
                      className="inline-flex max-w-[320px] items-center gap-1 truncate text-primary hover:underline"
                    >
                      {row.url}
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {formatNumber(row.clicks)}
                  </TableCell>
                  <TableCell className="text-muted">
                    {formatTimestamp(row.lastClicked)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => simulateClick(row.id)}
                    >
                      {t("links.plusClick")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {workspaceRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted">
                    {t("links.empty")}
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
