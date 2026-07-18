import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -8% 0px",
} as const;
