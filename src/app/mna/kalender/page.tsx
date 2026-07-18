"use client";

import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { MNA_KANBAN_TASKS, MNA_MONITOR_ROWS } from "@/lib/mock/mna-data";
import { useI18n } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KalenderPage() {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();

  const events = useMemo(() => {
    const pipeline = MNA_KANBAN_TASKS.filter(
      (task) => task.workspaceId === activeWorkspace.id,
    ).map((task) => ({
      id: task.id,
      title: task.title,
      when: "pipeline" as const,
      status: task.status,
      kind: "produksi" as const,
      person: task.assigneeName,
    }));

    const published = MNA_MONITOR_ROWS.filter(
      (row) => row.workspaceId === activeWorkspace.id,
    ).map((row) => ({
      id: row.id,
      title: row.title,
      when: row.uploadDate,
      status: row.status,
      kind: "published" as const,
      person: "published" as const,
    }));

    return [...pipeline, ...published].sort((a, b) =>
      String(a.when).localeCompare(String(b.when)),
    );
  }, [activeWorkspace.id]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("calendar.title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("calendar.body")}{" "}
          <strong className="text-foreground">{activeWorkspace.name}</strong>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="size-4" />
            {t("calendar.schedule")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {events.map((event) => {
            const whenLabel =
              event.when === "pipeline" ? t("calendar.inPipeline") : event.when;
            const personLabel =
              event.person === "published"
                ? t("calendar.published")
                : event.person;

            return (
              <div
                key={`${event.kind}-${event.id}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-surface px-3 py-3 ring-1 ring-line"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {personLabel} · {whenLabel}
                  </p>
                </div>
                <Badge
                  variant={event.kind === "published" ? "success" : "secondary"}
                >
                  {event.status.replaceAll("_", " ")}
                </Badge>
              </div>
            );
          })}
          {events.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              {t("calendar.empty")}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
