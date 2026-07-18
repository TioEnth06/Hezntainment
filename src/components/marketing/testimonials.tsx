"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";

const QUOTES: {
  quoteKey: TranslationKey;
  roleKey: TranslationKey;
  name: string;
}[] = [
  {
    quoteKey: "testimonials.q1",
    roleKey: "testimonials.q1.role",
    name: "Sinta R.",
  },
  {
    quoteKey: "testimonials.q2",
    roleKey: "testimonials.q2.role",
    name: "Prasetio W.",
  },
  {
    quoteKey: "testimonials.q3",
    roleKey: "testimonials.q3.role",
    name: "Eko M.",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section tone="surface">
      <Eyebrow>{t("testimonials.eyebrow")}</Eyebrow>
      <SectionTitle>{t("testimonials.title")}</SectionTitle>
      <motion.div
        className="mt-12 grid gap-6 md:grid-cols-3"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {QUOTES.map((item) => (
          <motion.blockquote
            key={item.name}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
            transition={springSoft}
            className="flex flex-col rounded-2xl bg-panel p-6 shadow-sm ring-1 ring-line transition hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <p className="text-warm" aria-hidden>
              ★ ★ ★ ★ ★
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
              “{t(item.quoteKey)}”
            </p>
            <footer className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-bold text-foreground">{item.name}</p>
              <p className="text-xs text-muted">{t(item.roleKey)}</p>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </Section>
  );
}
