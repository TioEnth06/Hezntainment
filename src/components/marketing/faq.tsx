"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const FAQ_KEYS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
];

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<TranslationKey | null>("faq.q1");
  const reduce = useReducedMotion();

  return (
    <Section id="faq" tone="surface">
      <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
      <SectionTitle>{t("faq.title")}</SectionTitle>
      <motion.div
        className="mt-10 divide-y divide-line"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={viewportOnce}
      >
        {FAQ_KEYS.map((item) => {
          const isOpen = open === item.q;
          return (
            <motion.div key={item.q} variants={fadeUp} className="py-2">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.q)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "text-base font-semibold md:text-lg",
                    isOpen ? "text-primary" : "text-foreground",
                  )}
                >
                  {t(item.q)}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-primary",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted md:text-base">
                      {t(item.a)}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
