"use client";

import { useId, useSyncExternalStore } from "react";
import { Cpu, Sparkles, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";
import {
  CONTRIBUTION_EPOCH,
  contributionEpochProgress,
  getContributionState,
  getContributionStateServer,
  subscribeContribution,
} from "@/lib/depin/contribution-store";
import { cn, formatNumber } from "@/lib/utils";

export function AiDataFeedCard() {
  const { t } = useI18n();
  const gradId = useId();
  const state = useSyncExternalStore(
    subscribeContribution,
    getContributionState,
    getContributionStateServer,
  );
  const epoch = contributionEpochProgress(state.points);
  const pulseKey = `${state.syncCount}-${state.lastSyncAt ?? "0"}`;
  const showPulse = state.syncCount > 0 && state.lastDelta > 0;

  return (
    <section
      aria-label={t("dashboard.feed.title")}
      className="relative overflow-hidden rounded-xl bg-panel ring-1 ring-line"
    >
      {showPulse ? (
        <div
          key={pulseKey}
          aria-hidden
          className="feed-pulse-glow pointer-events-none absolute inset-0 rounded-xl"
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(102,108,255,0.22),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(140,82,255,0.14),transparent_50%)]"
      />
      <div className="relative grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-5">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-warm">
              <Cpu className="size-3" />
              {t("dashboard.feed.badge")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold text-muted ring-1 ring-white/10">
              <Sparkles className="size-3 text-accent" />
              {t("dashboard.feed.phase")}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              {t("dashboard.feed.title")}
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
              {t("dashboard.feed.body")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-lg bg-surface/80 px-3 py-2.5 ring-1 ring-line">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {t("dashboard.feed.points")}
              </p>
              <p
                key={`pts-${pulseKey}`}
                className={cn(
                  "mt-0.5 font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl",
                  showPulse && "feed-pulse-value text-warm",
                )}
              >
                {formatNumber(state.points)}
              </p>
            </div>
            <div className="rounded-lg bg-surface/80 px-3 py-2.5 ring-1 ring-line">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {t("dashboard.feed.syncs")}
              </p>
              <p className="mt-0.5 font-mono text-xl font-bold tracking-tight sm:text-2xl">
                {formatNumber(state.syncCount)}
              </p>
            </div>
            <div className="col-span-2 rounded-lg bg-surface/80 px-3 py-2.5 ring-1 ring-line sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {t("dashboard.feed.lastDelta")}
              </p>
              <p className="mt-0.5 flex items-center gap-1 font-mono text-xl font-bold tracking-tight text-primary sm:text-2xl">
                <Zap
                  key={`zap-${pulseKey}`}
                  className={cn("size-4", showPulse && "feed-pulse-zap")}
                />
                {state.lastDelta > 0
                  ? t("dashboard.feed.plusPoints", { n: state.lastDelta })
                  : "—"}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="font-semibold text-foreground">
                {t("dashboard.feed.epoch", { n: epoch.epochIndex })}
              </span>
              <span className="font-mono text-muted">
                {formatNumber(epoch.inEpoch)} / {formatNumber(CONTRIBUTION_EPOCH)}
              </span>
            </div>
            <Progress
              value={epoch.percent}
              className="h-2.5"
              indicatorClassName="bg-gradient-to-r from-primary to-accent"
            />
            <p className="text-[11px] text-muted">{t("dashboard.feed.hint")}</p>
          </div>
        </div>

        <div className="mx-auto flex size-28 shrink-0 items-center justify-center sm:mx-0 sm:size-32">
          <div className="relative flex size-full items-center justify-center rounded-full bg-ink/40 ring-1 ring-primary/30">
            <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(42,46,77,0.9)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(epoch.percent / 100) * 326.7} 326.7`}
                className="transition-[stroke-dasharray] duration-700 ease-out"
              />
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#666cff" />
                  <stop offset="100%" stopColor="#8c52ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative text-center">
              <p className="font-mono text-lg font-bold text-foreground sm:text-xl">
                {epoch.percent}%
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
                {t("dashboard.feed.ringLabel")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
