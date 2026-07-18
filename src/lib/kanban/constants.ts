import type { TranslationKey } from "@/lib/i18n/dictionaries";
import type { AssetStatus, KanbanTask } from "@/lib/workspace/types";

export type KanbanColumnId = KanbanTask["status"];
export type KanbanMode = "brainstorm" | "antrean";

export const COLUMN_KEYS: Record<
  KanbanColumnId,
  { title: TranslationKey; hint: TranslationKey }
> = {
  IDEATION: {
    title: "kanban.ideation.title",
    hint: "kanban.ideation.hint",
  },
  SCRIPTING: {
    title: "kanban.scripting.title",
    hint: "kanban.scripting.hint",
  },
  EDITING: {
    title: "kanban.editing.title",
    hint: "kanban.editing.hint",
  },
  READY_TO_REVIEW: {
    title: "kanban.review.title",
    hint: "kanban.review.hint",
  },
};

export const ASSET_KEYS: Record<AssetStatus, TranslationKey> = {
  MISSING: "kanban.asset.missing",
  DRAFT: "kanban.asset.draft",
  READY: "kanban.asset.ready",
  UPLOADED: "kanban.asset.uploaded",
};

export const ASSET_VARIANT: Record<
  AssetStatus,
  "danger" | "warn" | "success" | "default"
> = {
  MISSING: "danger",
  DRAFT: "warn",
  READY: "success",
  UPLOADED: "default",
};

export const MODE_COLUMNS: Record<KanbanMode, KanbanColumnId[]> = {
  brainstorm: ["IDEATION", "SCRIPTING"],
  antrean: ["EDITING", "READY_TO_REVIEW"],
};

export const MODE_META: Record<
  KanbanMode,
  {
    title: TranslationKey;
    body: TranslationKey;
    otherHref: string;
    otherLabel: TranslationKey;
  }
> = {
  brainstorm: {
    title: "kanban.brainstorm.title",
    body: "kanban.brainstorm.body",
    otherHref: "/mna/antrean-produksi",
    otherLabel: "kanban.openQueue",
  },
  antrean: {
    title: "kanban.antrean.title",
    body: "kanban.antrean.body",
    otherHref: "/mna/brainstorming",
    otherLabel: "kanban.openBrainstorm",
  },
};
