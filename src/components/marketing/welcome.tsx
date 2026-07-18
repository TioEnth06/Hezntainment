"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

export function Welcome() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Eyebrow>Product</Eyebrow>
          <SectionTitle>
            Welcome to
            <span className="mt-1 block text-primary">Hezntainment</span>
          </SectionTitle>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              An all-in-one social management hub: editorial calendar, Monitor
              Data, link tracking, and role-based team administration.
            </p>
            <p>
              <strong className="text-ink">Multi-tenant workspaces</strong> keep
              every brand isolated — switch from Jeparanesia to Siinbooth and
              every metric view remounts cleanly.
            </p>
            <p>
              Phase 1 ships the Web2 core (RBAC, sync queue, KPI reports). Phase
              2 plugs into Superteam / Solana without rewriting daily ops.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="relative aspect-[4/3] overflow-hidden ring-1 ring-line"
        >
          <Image
            src="/marketing/welcome-team.jpg"
            alt="Content team reviewing multi-brand campaign performance"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 text-sm font-semibold text-white">
            Monitor Data · Laporan KPI · Workspace switcher
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
