"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n } from "@/lib/i18n";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Welcome() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section tone="surface">
      <motion.div
        className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>{t("welcome.eyebrow")}</Eyebrow>
          <SectionTitle>
            {t("welcome.title")}
            <span className="mt-1 block text-primary">Hezntainment</span>
          </SectionTitle>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>{t("welcome.p1")}</p>
            <p>
              <strong className="text-foreground">{t("welcome.p2Strong")}</strong>
              {t("welcome.p2")}
            </p>
            <p>{t("welcome.p3")}</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={reduce ? undefined : { scale: 1.015 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line"
        >
          <Image
            src="/marketing/welcome-team.jpg"
            alt="Content team reviewing multi-brand campaign performance"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 text-sm font-semibold text-white">
            {t("welcome.caption")}
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
