import { en } from "./en";
import { id } from "./id";

export type Locale = "en" | "id";

export const LOCALES: readonly Locale[] = ["en", "id"] as const;

export type TranslationKey = keyof typeof en;

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  id,
};

export const NAV_LABEL_KEYS: Record<string, TranslationKey> = {
  "/mna/dashboard": "nav.dashboard",
  "/mna/kalender": "nav.kalender",
  "/mna/monitor": "nav.monitor",
  "/mna/link-tracker": "nav.linkTracker",
  "/mna/brainstorming": "nav.brainstorming",
  "/mna/antrean-produksi": "nav.antrean",
  "/mna/administrasi/tim": "nav.tim",
  "/mna/administrasi/inventaris": "nav.inventaris",
  "/mna/administrasi/laporan-kpi": "nav.kpi",
};

export const MARQUEE_ITEMS: Record<Locale, readonly string[]> = {
  en: [
    "Monitor Data",
    "SYNC Engine",
    "KPI Report",
    "Multi-Brand Workspaces",
    "RBAC · Admin / Sosmed / Editor",
    "Link Click Tracker",
    "Editorial Calendar",
    "NHM Online ↔ Siinbooth",
  ],
  id: [
    "Monitor Data",
    "SYNC Engine",
    "Laporan KPI",
    "Workspace Multi-Brand",
    "RBAC · Admin / Sosmed / Editor",
    "Link Click Tracker",
    "Kalender Editorial",
    "NHM Online ↔ Siinbooth",
  ],
};

export const LANG_SHORT: Record<Locale, TranslationKey> = {
  en: "lang.en",
  id: "lang.id",
};
