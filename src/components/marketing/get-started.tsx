"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, SectionTitle } from "@/components/marketing/section";
import { useI18n } from "@/lib/i18n";
import { fadeUp, springSoft, viewportOnce } from "@/lib/motion";

export function GetStarted() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section id="contact" className="relative overflow-hidden">
      <Image
        src="/marketing/hero-studio.jpg"
        alt="Ready to run the next multi-brand content sprint"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/88" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 text-white md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-28">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Eyebrow light>{t("cta.eyebrow")}</Eyebrow>
          <SectionTitle light className="mt-3">
            {t("cta.title")}
          </SectionTitle>
          <p className="mt-4 max-w-xl text-base text-white/75">{t("cta.body")}</p>
          <ul className="mt-8 space-y-2 text-sm text-white/75">
            <li>{t("cta.bullet1")}</li>
            <li>{t("cta.bullet2")}</li>
            <li>{t("cta.bullet3")}</li>
          </ul>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={springSoft}
          className="rounded-2xl bg-panel p-7 text-foreground shadow-xl shadow-primary/15 ring-1 ring-line"
        >
          <p className="text-lg font-bold">{t("cta.cardTitle")}</p>
          <p className="mt-2 text-sm text-muted">{t("cta.cardBody")}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/register"
              className="btn-warm inline-flex items-center justify-center px-5 py-3.5 text-sm font-bold"
            >
              {t("pricing.cta")}
            </Link>
            <Link
              href="/login"
              className="btn-primary inline-flex items-center justify-center px-5 py-3.5 text-sm font-bold"
            >
              {t("cta.login")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
