"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AmbientOrbs } from "@/components/marketing/motion";
import { useI18n } from "@/lib/i18n";
import { easeOutExpo, springSoft } from "@/lib/motion";

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);

  return (
    <section
      ref={ref}
      className="marketing-glow relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-28 md:items-center md:pb-28 md:pt-28"
    >
      <AmbientOrbs />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50"
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: easeOutExpo }}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-warm"
        >
          {t("hero.eyebrow")}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...springSoft, delay: 0.2 }}
          className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl md:leading-[1.02]"
        >
          {t("hero.title")}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: easeOutExpo }}
          className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-white/90 sm:text-2xl md:text-[2rem] md:leading-tight"
        >
          {t("hero.headline")}
          <motion.span
            className="mt-2 block text-warm"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: easeOutExpo }}
          >
            {t("hero.accent")}
          </motion.span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: easeOutExpo }}
          className="mt-5 max-w-xl text-base text-white/65 md:text-lg"
        >
          {t("hero.body")}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.62, ease: easeOutExpo }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register"
              className="btn-warm inline-flex px-7 py-3.5 text-sm font-bold tracking-wide"
            >
              {t("hero.ctaPrimary")}
            </Link>
          </motion.div>
          <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/login"
              className="inline-flex rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-primary hover:bg-primary/20"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#mission"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 hover:text-warm"
      >
        {t("hero.scroll")}
        <span className="scroll-cue block h-8 w-px bg-gradient-to-b from-primary to-transparent" />
      </motion.a>
    </section>
  );
}
