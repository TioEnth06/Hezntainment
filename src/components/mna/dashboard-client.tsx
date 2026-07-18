"use client";

import Link from "next/link";
import {
  BarChart3,
  Clapperboard,
  Lightbulb,
  Link2,
  Radio,
} from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const LINKS: {
  href: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  icon: typeof Radio;
}[] = [
  {
    href: "/mna/monitor",
    titleKey: "nav.monitor",
    bodyKey: "dashboard.card.monitor",
    icon: Radio,
  },
  {
    href: "/mna/administrasi/laporan-kpi",
    titleKey: "nav.kpi",
    bodyKey: "dashboard.card.kpi",
    icon: BarChart3,
  },
  {
    href: "/mna/brainstorming",
    titleKey: "nav.brainstorming",
    bodyKey: "dashboard.card.brainstorm",
    icon: Lightbulb,
  },
  {
    href: "/mna/antrean-produksi",
    titleKey: "nav.antrean",
    bodyKey: "dashboard.card.antrean",
    icon: Clapperboard,
  },
  {
    href: "/mna/link-tracker",
    titleKey: "nav.linkTracker",
    bodyKey: "dashboard.card.links",
    icon: Link2,
  },
];

export function DashboardClient() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("dashboard.body")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {LINKS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-xl bg-panel p-5 ring-1 ring-line transition hover:ring-primary/40"
            >
              <Icon className="size-5 text-primary" />
              <p className="mt-3 text-lg font-bold">{t(card.titleKey)}</p>
              <p className="mt-1 text-sm text-muted">{t(card.bodyKey)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
