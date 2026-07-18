"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section } from "@/components/marketing/section";

export function Mission() {
  return (
    <Section id="mission" tone="ink">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow light>Our Mission</Eyebrow>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-5 text-2xl font-semibold leading-snug md:text-4xl md:leading-tight"
        >
          Agency content shouldn&apos;t live in five native apps and a spreadsheet.
          <span className="mt-3 block text-warm">
            We centralize planning, sync, and team KPI — per brand.
          </span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          Hezntainment is built for social agencies and Web3 projects that run
          multiple brands. Switch workspace, filter Monitor Data & Laporan KPI
          instantly, and keep Admin tooling away from day-to-day staff views.
        </motion.p>
      </div>
    </Section>
  );
}
