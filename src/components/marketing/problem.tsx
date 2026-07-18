"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Database, MessageSquareWarning, Timer } from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";

const PROBLEMS: {
  icon: typeof Timer;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}[] = [
  {
    icon: Timer,
    titleKey: "problem.manual.title",
    bodyKey: "problem.manual.body",
  },
  {
    icon: MessageSquareWarning,
    titleKey: "problem.friction.title",
    bodyKey: "problem.friction.body",
  },
  {
    icon: Database,
    titleKey: "problem.data.title",
    bodyKey: "problem.data.body",
  },
];

export function Problem() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section id="problem" tone="ink" className="relative overflow-hidden">
      <Eyebrow light>{t("problem.eyebrow")}</Eyebrow>
      <SectionTitle light>{t("problem.title")}</SectionTitle>
      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-3"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {PROBLEMS.map((item, i) => (
          <motion.article
            key={item.titleKey}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={springSoft}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <item.icon className="size-7 text-primary" />
              <span className="font-mono text-xs font-bold tracking-[0.18em] text-warm">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">{t(item.titleKey)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t(item.bodyKey)}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
