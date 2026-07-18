"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/marketing/section";

const pillars = [
  {
    title: "Monitor Data",
    href: "#services",
    copy: "Views, likes, comments, shares per brand — SYNC one post or SYNC ALL via the scrape queue.",
    image: "/marketing/pillar-insights.png",
    alt: "Performance metrics dashboard for published social content",
  },
  {
    title: "Laporan KPI",
    href: "#services",
    copy: "Monthly Sosmed & Editor productivity with progress bars, status badges, and PRINT REPORT.",
    image: "/marketing/pillar-kpi.jpg",
    alt: "Team KPI report with progress tracking",
  },
  {
    title: "Multi-Brand Workspaces",
    href: "#audiences",
    copy: "Switch Jeparanesia ↔ Siinbooth instantly. Admin seats stay separate from staff daily work.",
    image: "/marketing/pillar-planner.jpg",
    alt: "Creative production planning for multiple brand clients",
  },
];

export function Pillars() {
  return (
    <Section tone="ink" fullBleed>
      <div className="grid md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group relative min-h-[340px] overflow-hidden md:min-h-[460px]"
          >
            <Image
              src={pillar.image}
              alt={pillar.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 transition group-hover:via-ink/45" />
            <Link
              href={pillar.href}
              className="relative flex h-full min-h-[340px] flex-col justify-end p-8 md:min-h-[460px]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
                {pillar.copy}
              </p>
              <span className="mt-6 text-sm font-semibold text-warm">
                Explore →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
