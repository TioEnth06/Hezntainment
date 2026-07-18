import type { AppRole } from "@/lib/rbac";

export type WorkspaceBrand = {
  id: string;
  name: string;
  slug: string;
  brandCode: string;
};

export type PlatformStats = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
};

export type ContentPipelineStatus =
  | "IDEATION"
  | "SCRIPTING"
  | "EDITING"
  | "READY_TO_REVIEW"
  | "PUBLISHED";

export type AssetStatus = "MISSING" | "DRAFT" | "READY" | "UPLOADED";

export type MonitorContentRow = {
  id: string;
  workspaceId: string;
  title: string;
  brand: string;
  status: ContentPipelineStatus;
  uploadDate: string;
  lastSynced: string | null;
  lastSyncedLabel?: string;
  publishedUrl: string;
  tiktok: PlatformStats | null;
  instagram: PlatformStats | null;
  syncing?: boolean;
};

export type KanbanTask = {
  id: string;
  workspaceId: string;
  title: string;
  brand: string;
  brandCode: string;
  status: Exclude<ContentPipelineStatus, "PUBLISHED">;
  assigneeName: string;
  assigneeRole: "SOSMED" | "EDITOR";
  assetStatus: AssetStatus;
  caption?: string;
};

export type LinkTrackerRow = {
  id: string;
  workspaceId: string;
  label: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
};

export type SpecialistKpi = {
  userId: string;
  name: string;
  role: "SOSMED";
  metric: "Create Scripts";
  target: number;
  achieved: number;
  draft: number;
  proses: number;
  done: number;
};

export type EditorKpi = {
  userId: string;
  name: string;
  role: "EDITOR";
  metric: "Finish Videos";
  target: number;
  achieved: number;
  openWorkload: number;
};

export type SessionWorkspace = {
  workspaceId: string;
  workspaceName: string;
  role: AppRole;
};
