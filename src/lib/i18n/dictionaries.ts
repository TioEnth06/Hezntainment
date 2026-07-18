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
    "Unified Social Monitor",
    "X · Instagram · TikTok",
    "RBAC Pipeline",
    "One-Click KPI Reporter",
    "AI Data Feed Points",
    "Web3 Data Horizon",
    "Multi-Brand Workspaces",
    "Cross-Chain Ready",
  ],
  id: [
    "Unified Social Monitor",
    "X · Instagram · TikTok",
    "Pipeline RBAC",
    "Laporan KPI Sekali Klik",
    "AI Data Feed Points",
    "Web3 Data Horizon",
    "Workspace Multi-Brand",
    "Siap Cross-Chain",
  ],
};

export const LANG_SHORT: Record<Locale, TranslationKey> = {
  en: "lang.en",
  id: "lang.id",
};
