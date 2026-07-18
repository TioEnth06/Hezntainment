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

export type MonitorContentRow = {
  id: string;
  workspaceId: string;
  title: string;
  brand: string;
  status: "PUBLISHED" | "READY_TO_REVIEW" | "EDITING" | "SCRIPTING" | "IDEATION";
  uploadDate: string;
  lastSynced: string | null;
  publishedUrl: string;
  tiktok: PlatformStats | null;
  instagram: PlatformStats | null;
  syncing?: boolean;
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
