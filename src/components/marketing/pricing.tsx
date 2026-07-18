"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";

const plans: {
  name: string;
  price: string;
  blurbKey: TranslationKey;
  featureKeys: TranslationKey[];
  featured: boolean;
}[] = [
  {
    name: "Creator",
    price: "$29",
    blurbKey: "pricing.creator.blurb",
    featureKeys: [
      "pricing.creator.f1",
      "pricing.creator.f2",
      "pricing.creator.f3",
      "pricing.creator.f4",
      "pricing.creator.f5",
    ],
    featured: false,
  },
  {
    name: "Agency",
    price: "$99",
    blurbKey: "pricing.agency.blurb",
    featureKeys: [
      "pricing.agency.f1",
      "pricing.agency.f2",
      "pricing.agency.f3",
      "pricing.agency.f4",
      "pricing.agency.f5",
      "pricing.agency.f6",
    ],
    featured: true,
  },
];

export function Pricing() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section id="pricing" tone="panel">
      <Eyebrow>{t("pricing.eyebrow")}</Eyebrow>
      <SectionTitle>{t("pricing.title")}</SectionTitle>
      <motion.div
        className="mt-12 grid gap-6 md:grid-cols-2"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {plans.map((plan) => (
          <motion.article
            key={plan.name}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
            transition={springSoft}
            className={`rounded-2xl p-8 ring-1 ${
              plan.featured
                ? "bg-gradient-to-br from-panel to-ink text-white ring-primary/40 shadow-xl shadow-primary/20"
                : "bg-surface text-foreground ring-line"
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="font-mono text-2xl font-semibold">
                {plan.price}
                <span
                  className={`text-sm font-sans font-normal ${
                    plan.featured ? "text-white/55" : "text-muted"
                  }`}
                >
                  {t("pricing.perMonth")}
                </span>
              </p>
            </div>
            <p
              className={`mt-2 text-sm ${
                plan.featured ? "text-white/65" : "text-muted"
              }`}
            >
              {t(plan.blurbKey)}
            </p>
            <ul className="mt-7 space-y-2.5 text-sm">
              {plan.featureKeys.map((key) => (
                <li key={key} className="flex gap-2">
                  <span className={plan.featured ? "text-warm" : "text-accent"}>
                    ▸
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className={`mt-8 inline-flex w-full items-center justify-center px-4 py-3.5 text-sm font-bold tracking-wide ${
                plan.featured ? "btn-warm" : "btn-primary"
              }`}
            >
              {t("pricing.cta")}
            </Link>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-4 text-xs text-muted">{t("pricing.note")}</p>
    </Section>
  );
}
