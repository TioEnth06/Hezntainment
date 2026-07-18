"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:justify-between">
        <div>
          <p className="text-xl font-bold">Hezntainment</p>
          <p className="mt-2 max-w-sm text-sm text-white/55">{t("footer.tagline")}</p>
        </div>
        <div className="flex flex-wrap gap-12 text-sm text-white/70">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              {t("footer.product")}
            </p>
            <a href="#services" className="block hover:text-warm">
              {t("footer.modules")}
            </a>
            <a href="#pricing" className="block hover:text-warm">
              {t("footer.pricing")}
            </a>
            <Link href="/login" className="block hover:text-warm">
              {t("footer.demo")}
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              {t("footer.connect")}
            </p>
            <Link href="/register" className="block hover:text-warm">
              {t("footer.trial")}
            </Link>
            <span className="block text-white/40">{t("footer.phase2")}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-5 text-xs text-white/35">
        © {new Date().getFullYear()} Hezntainment. {t("footer.rights")}
      </div>
    </footer>
  );
}
