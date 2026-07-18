"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";

const PILLARS: {
  titleKey: TranslationKey;
  copyKey: TranslationKey;
  altKey: TranslationKey;
  href: string;
  image: string;
}[] = [
  {
    titleKey: "pillars.monitor.title",
    copyKey: "pillars.monitor.copy",
    altKey: "pillars.monitor.alt",
    href: "#services",
    image: "/marketing/pillar-insights.png",
  },
  {
    titleKey: "pillars.kpi.title",
    copyKey: "pillars.kpi.copy",
    altKey: "pillars.kpi.alt",
    href: "#services",
    image: "/marketing/pillar-kpi.jpg",
  },
  {
    titleKey: "pillars.workspace.title",
    copyKey: "pillars.workspace.copy",
    altKey: "pillars.workspace.alt",
    href: "#audiences",
    image: "/marketing/pillar-planner.jpg",
  },
];

export function Pillars() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <Section tone="ink" fullBleed>
      <motion.div
        className="grid md:grid-cols-3"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.titleKey}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={springSoft}
            className="group relative min-h-[340px] overflow-hidden md:min-h-[460px]"
          >
            <Image
              src={pillar.image}
              alt={t(pillar.altKey)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 transition duration-500 group-hover:via-primary/35" />
            <Link
              href={pillar.href}
              className="relative flex h-full min-h-[340px] flex-col justify-end p-8 md:min-h-[460px]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                {t(pillar.titleKey)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
                {t(pillar.copyKey)}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-warm transition group-hover:gap-2">
                {t("pillars.explore")} <span aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
