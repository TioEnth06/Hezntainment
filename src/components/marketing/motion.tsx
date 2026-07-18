"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "scale" | "fade";
}) {
  const reduce = useReducedMotion();
  const variants =
    variant === "scale" ? scaleIn : variant === "fade" ? fadeIn : fadeUp;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Soft floating indigo/purple orbs — curated.media atmosphere */
export function AmbientOrbs({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="orb-float absolute -left-24 top-10 size-[28rem] rounded-full bg-primary/25 blur-[100px]" />
      <div className="orb-float-delayed absolute -right-20 top-32 size-[22rem] rounded-full bg-accent/30 blur-[90px]" />
      <div className="orb-float-slow absolute bottom-0 left-1/3 size-[18rem] rounded-full bg-warm/15 blur-[80px]" />
    </div>
  );
}
