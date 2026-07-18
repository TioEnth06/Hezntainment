"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Link2,
  Radio,
  RefreshCw,
  Users,
} from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

const services = [
  {
    icon: CalendarDays,
    title: "Kalender Editorial",
    body: "Timeline konten per workspace — Ideation sampai Published, filtered by active brand.",
  },
  {
    icon: Radio,
    title: "Monitor Data",
    body: "Summary cards + tabel metrics TikTok & Instagram. Last synced timestamp di setiap baris.",
  },
  {
    icon: RefreshCw,
    title: "SYNC Engine",
    body: "Tombol SYNC per URL atau SYNC ALL. Queue backend menghindari rate-limit saat banyak link.",
  },
  {
    icon: BarChart3,
    title: "Laporan KPI",
    body: "Sosmed: Create Scripts (DRAFT/PROSES/DONE). Editor: Finish Videos + workload indicator.",
  },
  {
    icon: Users,
    title: "Manajemen Tim (RBAC)",
    body: "Admin, Sosmed, Editor. Bulk invite untuk agency berkursi banyak — staff tidak melihat billing.",
  },
  {
    icon: Link2,
    title: "Link Click Tracker",
    body: "Lacak outbound / bio links per brand workspace (Phase 1 stub, siap di-wire setelah sync stabil).",
  },
];

export function Features() {
  return (
    <Section id="services" tone="panel">
      <Eyebrow>Core modules</Eyebrow>
      <SectionTitle>
        Menu yang dipakai agency setiap hari — sudah di satu shell.
      </SectionTitle>
      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group border-t border-line pt-6"
          >
            <service.icon className="size-7 text-primary transition group-hover:text-accent" />
            <h3 className="mt-4 text-xl font-bold text-ink">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-accent transition group-hover:text-primary">
              Included in Phase 1
            </span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
