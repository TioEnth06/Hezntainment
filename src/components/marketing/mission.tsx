"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Section } from "@/components/marketing/section";
import { AmbientOrbs } from "@/components/marketing/motion";
import { useI18n } from "@/lib/i18n";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Mission() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section id="mission" tone="ink" className="relative overflow-hidden">
      <AmbientOrbs />
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        <Eyebrow light>{t("mission.eyebrow")}</Eyebrow>
        <motion.p
          variants={fadeUp}
          className="mt-5 text-2xl font-semibold leading-snug md:text-4xl md:leading-tight"
        >
          {t("mission.line1")}
          <span className="mt-3 block text-warm">{t("mission.line2")}</span>
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          {t("mission.body")}
        </motion.p>
      </motion.div>
    </Section>
  );
}
