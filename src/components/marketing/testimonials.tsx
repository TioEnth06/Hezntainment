"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

const quotes = [
  {
    quote:
      "SYNC ALL di Monitor Data menggantikan buka TikTok/IG satu-satu. Client review jadi soal buka Laporan KPI, bukan screenshot malam-malam.",
    name: "Sinta R.",
    role: "Sosmed Lead, multi-brand agency",
  },
  {
    quote:
      "Switch workspace Jeparanesia ke Siinbooth dan seluruh tabel metrics ikut bersih. Itu yang kami butuhkan untuk tim 20+ seat.",
    name: "Prasetio W.",
    role: "Agency Admin",
  },
  {
    quote:
      "Editor cuma lihat workload & Finish Videos. Admin pegang seats. Role-nya benar-benar terpisah — bukan satu dashboard untuk semua.",
    name: "Eko M.",
    role: "Video Editor",
  },
];

export function Testimonials() {
  return (
    <Section tone="surface">
      <Eyebrow>What Teams Are Saying</Eyebrow>
      <SectionTitle>Dari lantai produksi, bukan pitch slide.</SectionTitle>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {quotes.map((item, i) => (
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex flex-col bg-panel p-6 shadow-sm ring-1 ring-line"
          >
            <p className="text-warm" aria-hidden>
              ★ ★ ★ ★ ★
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
              “{item.quote}”
            </p>
            <footer className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-bold text-ink">{item.name}</p>
              <p className="text-xs text-muted">{item.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}
