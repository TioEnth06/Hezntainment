"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

const NAV: { href: string; key: TranslationKey }[] = [
  { href: "#problem", key: "nav.problem" },
  { href: "#services", key: "nav.modules" },
  { href: "#web3-horizon", key: "nav.web3" },
  { href: "#audiences", key: "nav.audiences" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#faq", key: "nav.faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.05 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink/80 shadow-lg shadow-primary/10 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-white md:text-xl"
        >
          Hezntainment
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-white/80 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition hover:text-warm after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle tone="dark" />
          <Link
            href="/login"
            className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-white/90 transition hover:text-warm sm:inline"
          >
            {t("nav.login")}
          </Link>
          <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register"
              className="btn-warm px-3 py-2 text-[12px] font-semibold tracking-wide sm:px-4 sm:py-2.5 sm:text-[13px]"
            >
              {t("nav.cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
