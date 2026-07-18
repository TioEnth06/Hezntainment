"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const audiences: { titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { titleKey: "audiences.agency.title", bodyKey: "audiences.agency.body" },
  { titleKey: "audiences.web3.title", bodyKey: "audiences.web3.body" },
  { titleKey: "audiences.sosmed.title", bodyKey: "audiences.sosmed.body" },
  { titleKey: "audiences.editors.title", bodyKey: "audiences.editors.body" },
];

export function Audiences() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section id="audiences" className="relative overflow-hidden">
      <Image
        src="/marketing/audiences-collab.jpg"
        alt="Agency team managing multiple brand workspaces"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/85 to-ink/90"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-white md:py-28">
        <Eyebrow light>{t("audiences.eyebrow")}</Eyebrow>
        <SectionTitle light>{t("audiences.title")}</SectionTitle>
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          {audiences.map((item) => (
            <motion.article
              key={item.titleKey}
              variants={fadeUp}
              whileHover={reduce ? undefined : { x: 6 }}
              className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition hover:border-warm/40 hover:bg-white/10"
            >
              <h3 className="text-xl font-bold">{t(item.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {t(item.bodyKey)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
