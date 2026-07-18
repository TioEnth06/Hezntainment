"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState(MNA_WORKSPACES[0].id);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && MNA_WORKSPACES.some((w) => w.id === saved)) {
      setActiveId(saved);
    }
  }, []);

  const setActiveWorkspaceId = useCallback((id: string) => {
    setActiveId(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const activeWorkspace =
    MNA_WORKSPACES.find((w) => w.id === activeId) ?? MNA_WORKSPACES[0];

  const value = useMemo(
    () => ({
      workspaces: MNA_WORKSPACES,
      activeWorkspace,
      setActiveWorkspaceId,
    }),
    [activeWorkspace, setActiveWorkspaceId],
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
