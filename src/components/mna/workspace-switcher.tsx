"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import { cn } from "@/lib/utils";

export function WorkspaceSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t } = useI18n();
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        {workspaces.map((ws) => {
          const active = ws.id === activeWorkspace.id;
          return (
            <button
              key={ws.id}
              type="button"
              title={ws.name}
              aria-label={t("workspace.switchTo", { name: ws.name })}
              aria-pressed={active}
              onClick={() => setActiveWorkspaceId(ws.id)}
              className={cn(
                "flex size-9 items-center justify-center rounded-sm text-[10px] font-bold transition",
                active
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {ws.brandCode.slice(0, 3)}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {workspaces.map((ws) => {
        const active = ws.id === activeWorkspace.id;
        return (
          <button
            key={ws.id}
            type="button"
            onClick={() => setActiveWorkspaceId(ws.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm transition",
              active
                ? "bg-primary text-white"
                : "bg-white/5 text-white/80 hover:bg-white/10",
            )}
          >
            <span>
              <span className="block font-semibold">{ws.name}</span>
              <span
                className={cn(
                  "text-[11px]",
                  active ? "text-white/70" : "text-white/45",
                )}
              >
                {t("workspace.brand", { code: ws.brandCode })}
              </span>
            </span>
            {active ? (
              <Check className="size-4 shrink-0" />
            ) : (
              <ChevronsUpDown className="size-3.5 shrink-0 opacity-50" />
            )}
          </button>
        );
      })}
      <p className="px-1 pt-1 text-[10px] leading-snug text-white/40">
        {t("workspace.hint")}
      </p>
    </div>
  );
}
