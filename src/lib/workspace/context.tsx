"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { MNA_WORKSPACES } from "@/lib/mock/mna-data";
import type { WorkspaceBrand } from "@/lib/workspace/types";

const STORAGE_KEY = "mna.activeWorkspaceId";

type WorkspaceContextValue = {
  workspaces: WorkspaceBrand[];
  activeWorkspace: WorkspaceBrand;
  setActiveWorkspaceId: (id: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getActiveWorkspaceId() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && MNA_WORKSPACES.some((w) => w.id === saved)) return saved;
  return MNA_WORKSPACES[0].id;
}

function getServerWorkspaceId() {
  return MNA_WORKSPACES[0].id;
}

function setActiveWorkspaceId(id: string) {
  window.localStorage.setItem(STORAGE_KEY, id);
  emit();
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const activeId = useSyncExternalStore(
    subscribe,
    getActiveWorkspaceId,
    getServerWorkspaceId,
  );

  const activeWorkspace =
    MNA_WORKSPACES.find((w) => w.id === activeId) ?? MNA_WORKSPACES[0];

  const value = useMemo(
    () => ({
      workspaces: MNA_WORKSPACES,
      activeWorkspace,
      setActiveWorkspaceId,
    }),
    [activeWorkspace],
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return ctx;
}
