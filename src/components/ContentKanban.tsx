"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileVideo, GripVertical, UserRound } from "lucide-react";
import { MNA_KANBAN_TASKS } from "@/lib/mock/mna-data";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import type { AssetStatus, KanbanTask } from "@/lib/workspace/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KanbanColumnId =
  | "IDEATION"
  | "SCRIPTING"
  | "EDITING"
  | "READY_TO_REVIEW";

type KanbanMode = "brainstorm" | "antrean";

const COLUMN_IDS_LIST: KanbanColumnId[] = [
  "IDEATION",
  "SCRIPTING",
  "EDITING",
  "READY_TO_REVIEW",
];

const COLUMN_KEYS: Record<
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

const COLUMN_IDS = new Set(COLUMN_IDS_LIST);

const ASSET_KEYS: Record<AssetStatus, TranslationKey> = {
  MISSING: "kanban.asset.missing",
  DRAFT: "kanban.asset.draft",
  READY: "kanban.asset.ready",
  UPLOADED: "kanban.asset.uploaded",
};

const ASSET_VARIANT: Record<
  AssetStatus,
  "danger" | "warn" | "success" | "default"
> = {
  MISSING: "danger",
  DRAFT: "warn",
  READY: "success",
  UPLOADED: "default",
};

const MODE_FOCUS: Record<KanbanMode, KanbanColumnId[]> = {
  brainstorm: ["IDEATION", "SCRIPTING"],
  antrean: ["EDITING", "READY_TO_REVIEW"],
};

const kanbanCollision: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args);
  if (pointerHits.length > 0) {
    const columnHit = pointerHits.find((hit) =>
      COLUMN_IDS.has(String(hit.id) as KanbanColumnId),
    );
    if (columnHit) return [columnHit];
    return pointerHits;
  }
  return closestCorners(args);
};

function TaskCard({
  task,
  dragging,
}: {
  task: KanbanTask;
  dragging?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div
      className={cn(
        "rounded-md bg-panel p-3 shadow-sm ring-1 ring-line",
        dragging && "opacity-90 ring-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-foreground">{task.title}</p>
        <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge variant="brand">
          {task.brandCode} · {task.brand}
        </Badge>
        <Badge variant={ASSET_VARIANT[task.assetStatus]}>
          <FileVideo className="size-3" />
          {t(ASSET_KEYS[task.assetStatus])}
        </Badge>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <UserRound className="size-3.5" />
        <span className="font-medium text-foreground">{task.assigneeName}</span>
        <span>· {task.assigneeRole}</span>
      </div>
      {task.caption ? (
        <p className="mt-2 line-clamp-2 text-[11px] text-muted">{task.caption}</p>
      ) : null}
    </div>
  );
}

function SortableTask({ task }: { task: KanbanTask }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id, data: { type: "task", status: task.status } });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} />
    </div>
  );
}

function KanbanColumn({
  columnId,
  tasks,
  dimmed,
}: {
  columnId: KanbanColumnId;
  tasks: KanbanTask[];
  dimmed?: boolean;
}) {
  const { t } = useI18n();
  const keys = COLUMN_KEYS[columnId];
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { type: "column", status: columnId },
    disabled: dimmed,
  });

  const taskCountKey: TranslationKey =
    tasks.length === 1 ? "kanban.taskCount" : "kanban.taskCount_other";

  return (
    <Card
      className={cn(
        "flex min-h-[420px] flex-col bg-surface/60",
        dimmed && "opacity-55",
        isOver && !dimmed && "ring-2 ring-primary/30",
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{t(keys.title)}</CardTitle>
        <p className="text-[11px] text-muted">{t(keys.hint)}</p>
        <Badge variant="secondary" className="mt-2 w-fit">
          {t(taskCountKey, { n: tasks.length })}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="min-h-[280px] space-y-2.5 rounded-md p-1">
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
            {tasks.length === 0 ? (
              <p className="px-1 py-8 text-center text-xs text-muted">
                {dimmed ? t("kanban.dimmed") : t("kanban.drop")}
              </p>
            ) : null}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}

function resolveDropStatus(
  overId: string,
  tasks: KanbanTask[],
): KanbanColumnId | null {
  if (COLUMN_IDS.has(overId as KanbanColumnId)) {
    return overId as KanbanColumnId;
  }
  const overTask = tasks.find((t) => t.id === overId);
  return overTask?.status ?? null;
}

export function ContentKanban({ mode }: { mode: KanbanMode }) {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState(MNA_KANBAN_TASKS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const focusStatuses = MODE_FOCUS[mode];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const workspaceTasks = useMemo(
    () => tasks.filter((task) => task.workspaceId === activeWorkspace.id),
    [tasks, activeWorkspace.id],
  );

  const activeTask = workspaceTasks.find((task) => task.id === activeId) ?? null;

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function clearDrag() {
    setActiveId(null);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    clearDrag();
    if (!over) return;

    const nextStatus = resolveDropStatus(String(over.id), workspaceTasks);
    if (!nextStatus) return;
    if (!focusStatuses.includes(nextStatus)) return;

    const taskId = String(active.id);
    if (!workspaceTasks.some((task) => task.id === taskId)) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task,
      ),
    );
  }

  const titleKey: TranslationKey =
    mode === "brainstorm" ? "kanban.brainstorm.title" : "kanban.antrean.title";
  const bodyKey: TranslationKey =
    mode === "brainstorm" ? "kanban.brainstorm.body" : "kanban.antrean.body";

  return (
    <div className="space-y-5" key={activeWorkspace.id}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t(titleKey)}</h1>
        <p className="mt-1 text-sm text-muted">
          {t(bodyKey)} ·{" "}
          <strong className="text-foreground">{activeWorkspace.name}</strong>
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={kanbanCollision}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={clearDrag}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMN_IDS_LIST.map((columnId) => {
            const columnTasks = workspaceTasks.filter(
              (task) => task.status === columnId,
            );
            const dimmed = !focusStatuses.includes(columnId);

            return (
              <KanbanColumn
                key={columnId}
                columnId={columnId}
                tasks={columnTasks}
                dimmed={dimmed}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} dragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
