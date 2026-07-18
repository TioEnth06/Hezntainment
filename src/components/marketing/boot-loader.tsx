"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const STEP_KEYS: TranslationKey[] = [
  "boot.step1",
  "boot.step2",
  "boot.step3",
  "boot.step4",
];

/**
 * Boot splash inspired by curated.media init sequence.
 * Skips after first view in the session.
 */
export function BootLoader({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [showBoot, setShowBoot] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const skip =
      reduce === true ||
      (typeof window !== "undefined" &&
        window.sessionStorage.getItem("mna.boot") === "1");

    if (skip) {
      const frame = window.requestAnimationFrame(() => setShowBoot(false));
      return () => window.cancelAnimationFrame(frame);
    }

    let stepIdx = 0;
    const stepTimer = window.setInterval(() => {
      stepIdx += 1;
      if (stepIdx < STEP_KEYS.length) {
        setStep(stepIdx);
      }
    }, 520);

    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("mna.boot", "1");
      setShowBoot(false);
    }, 2200);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduce]);

  const stepLabel = t(STEP_KEYS[step] ?? "boot.step1");

  return (
    <>
      <AnimatePresence>
        {showBoot ? (
          <motion.div
            key="boot"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div className="relative mb-10">
              <div className="boot-ring size-16 rounded-full border border-primary/40" />
              <div className="boot-ring-inner absolute inset-2 rounded-full border border-accent/50" />
              <div className="absolute inset-0 m-auto size-2 rounded-full bg-warm" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-warm">
              Hezntainment
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={stepLabel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="mt-4 font-mono text-sm text-white/70"
              >
                <span className="boot-cursor mr-2 inline-block h-3 w-1.5 bg-primary align-middle" />
                {stepLabel}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
