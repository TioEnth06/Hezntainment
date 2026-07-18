import {
  aggregateMonitor,
  MNA_EDITOR_KPI,
  MNA_KANBAN_TASKS,
  MNA_LINK_TRACKERS,
  MNA_MONITOR_ROWS,
  MNA_SPECIALIST_KPI,
} from "@/lib/mock/mna-data";
import type {
  EditorKpi,
  KanbanTask,
  MonitorContentRow,
  SpecialistKpi,
} from "@/lib/workspace/types";

export const PIPELINE_STAGES: KanbanTask["status"][] = [
  "IDEATION",
  "SCRIPTING",
  "EDITING",
  "READY_TO_REVIEW",
];

function rowViews(row: MonitorContentRow) {
  return (row.tiktok?.views ?? 0) + (row.instagram?.views ?? 0);
}

function rowLikes(row: MonitorContentRow) {
  return (row.tiktok?.likes ?? 0) + (row.instagram?.likes ?? 0);
}

export type DashboardOverview = {
  metrics: ReturnType<typeof aggregateMonitor>;
  published: number;
  pipelineCount: number;
  clicks: number;
  needsSync: number;
  stageCounts: { stage: KanbanTask["status"]; count: number }[];
  maxStage: number;
  topContent: { row: MonitorContentRow; views: number; likes: number }[];
  attention: MonitorContentRow[];
  kpiPeople: Array<SpecialistKpi | EditorKpi>;
};

export function buildDashboardOverview(workspaceId: string): DashboardOverview {
  const monitor = MNA_MONITOR_ROWS.filter((row) => row.workspaceId === workspaceId);
  const pipeline = MNA_KANBAN_TASKS.filter((task) => task.workspaceId === workspaceId);
  const links = MNA_LINK_TRACKERS.filter((row) => row.workspaceId === workspaceId);

  const stageCounts = PIPELINE_STAGES.map((stage) => ({
    stage,
    count: pipeline.filter((task) => task.status === stage).length,
  }));

  return {
    metrics: aggregateMonitor(monitor),
    published: monitor.length,
    pipelineCount: pipeline.length,
    clicks: links.reduce((sum, row) => sum + row.clicks, 0),
    needsSync: monitor.filter((row) => !row.lastSynced).length,
    stageCounts,
    maxStage: Math.max(1, ...stageCounts.map((item) => item.count)),
    topContent: [...monitor]
      .map((row) => ({
        row,
        views: rowViews(row),
        likes: rowLikes(row),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 4),
    attention: monitor.filter((row) => !row.lastSynced).slice(0, 4),
    kpiPeople: [
      ...(MNA_SPECIALIST_KPI[workspaceId] ?? []),
      ...(MNA_EDITOR_KPI[workspaceId] ?? []),
    ].slice(0, 4),
  };
}
