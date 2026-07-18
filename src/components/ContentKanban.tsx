"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
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
import {
  ArrowLeftRight,
  ArrowRight,
  FileVideo,
  GripVertical,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import {
  ASSET_KEYS,
  ASSET_VARIANT,
  COLUMN_KEYS,
  MODE_COLUMNS,
  MODE_META,
  type KanbanColumnId,
  type KanbanMode,
} from "@/lib/kanban/constants";
import {
  getKanbanTasks,
  getKanbanTasksServer,
  setKanbanTaskStatus,
  subscribeKanbanTasks,
} from "@/lib/kanban/task-store";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace/context";
import type { KanbanTask } from "@/lib/workspace/types";

function TaskCard({
  task,
  dragging,
  mode,
}: {
  task: KanbanTask;
  dragging?: boolean;
  mode: KanbanMode;
}) {
  const { t } = useI18n();
  const canSendToQueue = mode === "brainstorm" && task.status === "SCRIPTING";
  const canSendBack = mode === "antrean" && task.status === "EDITING";

  return (
    <div
      className={cn(
        "rounded-md bg-panel p-3 shadow-sm ring-1 ring-line",
        dragging && "opacity-90 ring-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-foreground">
          {task.title}
        </p>
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

      {canSendToQueue || canSendBack ? (
        <Button
          type="button"
          size="sm"
          variant={canSendToQueue ? "warm" : "outline"}
          className="mt-3 w-full"
          title={t("kanban.handoff.hint")}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            setKanbanTaskStatus(
              task.id,
              canSendToQueue ? "EDITING" : "SCRIPTING",
            );
          }}
        >
          <ArrowRight className="size-3.5" />
          {canSendToQueue
            ? t("kanban.handoff.toQueue")
            : t("kanban.handoff.toBrainstorm")}
        </Button>
      ) : null}
    </div>
  );
}

function SortableTask({ task, mode }: { task: KanbanTask; mode: KanbanMode }) {
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
      <TaskCard task={task} mode={mode} />
    </div>
  );
}

function KanbanColumn({
  columnId,
  tasks,
  mode,
}: {
  columnId: KanbanColumnId;
  tasks: KanbanTask[];
  mode: KanbanMode;
}) {
  const { t } = useI18n();
  const keys = COLUMN_KEYS[columnId];
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { type: "column", status: columnId },
  });

  const taskCountKey: TranslationKey =
    tasks.length === 1 ? "kanban.taskCount" : "kanban.taskCount_other";

  return (
    <Card
      className={cn(
        "flex min-h-[380px] w-[min(85vw,20rem)] shrink-0 snap-start flex-col bg-surface/60 sm:min-h-[420px] md:w-auto md:min-w-0",
        isOver && "ring-2 ring-primary/30",
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
          <div
            ref={setNodeRef}
            className="min-h-[280px] space-y-2.5 rounded-md p-1"
          >
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} mode={mode} />
            ))}
            {tasks.length === 0 ? (
              <p className="px-1 py-8 text-center text-xs text-muted">
                {t("kanban.drop")}
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
  allowed: Set<KanbanColumnId>,
  tasks: KanbanTask[],
): KanbanColumnId | null {
  if (allowed.has(overId as KanbanColumnId)) {
    return overId as KanbanColumnId;
  }
  const overTask = tasks.find((task) => task.id === overId);
  if (overTask && allowed.has(overTask.status)) return overTask.status;
  return null;
}

export function ContentKanban({ mode }: { mode: KanbanMode }) {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const tasks = useSyncExternalStore(
    subscribeKanbanTasks,
    getKanbanTasks,
    getKanbanTasksServer,
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns = MODE_COLUMNS[mode];
  const allowed = useMemo(() => new Set(columns), [columns]);
  const meta = MODE_META[mode];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const boardTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.workspaceId === activeWorkspace.id && allowed.has(task.status),
      ),
    [tasks, activeWorkspace.id, allowed],
  );

  const activeTask = boardTasks.find((task) => task.id === activeId) ?? null;

  const kanbanCollision: CollisionDetection = (args) => {
    const pointerHits = pointerWithin(args);
    if (pointerHits.length > 0) {
      const columnHit = pointerHits.find((hit) =>
        allowed.has(String(hit.id) as KanbanColumnId),
      );
      if (columnHit) return [columnHit];
      return pointerHits;
    }
    return closestCorners(args);
  };

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

    const nextStatus = resolveDropStatus(String(over.id), allowed, boardTasks);
    if (!nextStatus) return;

    const taskId = String(active.id);
    if (!boardTasks.some((task) => task.id === taskId)) return;

    setKanbanTaskStatus(taskId, nextStatus);
  }

  return (
    <div className="space-y-5" key={`${mode}-${activeWorkspace.id}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {t(meta.title)}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t(meta.body)} ·{" "}
            <strong className="text-foreground">{activeWorkspace.name}</strong>
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
          <Link href={meta.otherHref}>
            <ArrowLeftRight className="size-3.5" />
            {t(meta.otherLabel)}
          </Link>
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={kanbanCollision}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={clearDrag}
      >
        <div className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {columns.map((columnId) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              mode={mode}
              tasks={boardTasks.filter((task) => task.status === columnId)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} mode={mode} dragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
