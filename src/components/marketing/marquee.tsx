"use client";

import { useReducedMotion } from "framer-motion";
import { useI18n, MARQUEE_ITEMS } from "@/lib/i18n";

export function LogoMarquee() {
  const reduce = useReducedMotion();
  const { locale, t } = useI18n();
  const items = MARQUEE_ITEMS[locale];
  const row = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-5">
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
        {t("marquee.label")}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
        <div
          className={
            reduce
              ? "flex flex-wrap justify-center gap-8 px-5"
              : "marquee-track flex w-max gap-10"
          }
        >
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap text-sm font-semibold tracking-wide text-white/70"
            >
              <span className="mr-3 text-primary">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
