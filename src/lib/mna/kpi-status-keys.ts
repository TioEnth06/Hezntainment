import type { TranslationKey } from "@/lib/i18n/dictionaries";

/** Shared map from kpiStatus() codes → i18n keys */
export const KPI_STATUS_KEYS = {
  behind: "kpi.status.behind",
  onTrack: "kpi.status.onTrack",
  slowStart: "kpi.status.slowStart",
  catchingUp: "kpi.status.catchingUp",
} as const satisfies Record<string, TranslationKey>;

export type KpiStatusCode = keyof typeof KPI_STATUS_KEYS;
