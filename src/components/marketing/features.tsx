"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Radio, Workflow } from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";

const services: {
  icon: typeof Radio;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}[] = [
  {
    icon: Radio,
    titleKey: "features.monitor.title",
    bodyKey: "features.monitor.body",
  },
  {
    icon: Workflow,
    titleKey: "features.pipeline.title",
    bodyKey: "features.pipeline.body",
  },
  {
    icon: BarChart3,
    titleKey: "features.reporter.title",
    bodyKey: "features.reporter.body",
  },
];

export function Features() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section id="services" tone="panel">
      <Eyebrow>{t("features.eyebrow")}</Eyebrow>
      <SectionTitle>{t("features.title")}</SectionTitle>
      <motion.div
        className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {services.map((service) => (
          <motion.article
            key={service.titleKey}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -6 }}
            transition={springSoft}
            className="group rounded-xl border border-transparent border-t border-t-line pt-6 transition hover:border-primary/25 hover:bg-white/[0.03] hover:px-4 hover:pb-4"
          >
            <service.icon className="size-7 text-primary transition duration-300 group-hover:rotate-6 group-hover:text-accent" />
            <h3 className="mt-4 text-xl font-bold text-foreground">
              {t(service.titleKey)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(service.bodyKey)}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-accent transition group-hover:text-primary">
              {t("features.included")}
            </span>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
