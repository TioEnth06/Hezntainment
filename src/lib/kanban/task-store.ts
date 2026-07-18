import { MNA_KANBAN_TASKS } from "@/lib/mock/mna-data";
import type { KanbanTask } from "@/lib/workspace/types";

const listeners = new Set<() => void>();

let tasks: KanbanTask[] = MNA_KANBAN_TASKS.map((task) => ({ ...task }));

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeKanbanTasks(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getKanbanTasks() {
  return tasks;
}

export function getKanbanTasksServer() {
  return MNA_KANBAN_TASKS;
}

export function setKanbanTaskStatus(
  taskId: string,
  status: KanbanTask["status"],
) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, status } : task,
  );
  emit();
}
