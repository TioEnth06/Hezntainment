"use client";

import { useI18n, LANG_SHORT, LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
  /** dark = marketing/chrome; light = app panels */
  tone?: "dark" | "light";
};

export function LanguageToggle({
  className,
  tone = "dark",
}: LanguageToggleProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-[11px] font-bold tracking-wide",
        tone === "dark"
          ? "bg-white/10 ring-1 ring-white/15"
          : "bg-panel-soft ring-1 ring-line",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={cn(
              "rounded-full px-2.5 py-1 transition",
              active
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : tone === "dark"
                  ? "text-white/65 hover:text-white"
                  : "text-muted hover:text-foreground",
            )}
          >
            {t(LANG_SHORT[code])}
          </button>
        );
      })}
    </div>
  );
}
