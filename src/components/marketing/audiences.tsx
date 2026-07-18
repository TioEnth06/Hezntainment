"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

const audiences = [
  {
    title: "Social Media Agencies",
    body: "Kelola banyak brand client (Jeparanesia, Siinbooth, …) tanpa campur data Monitor & KPI.",
  },
  {
    title: "Web3 / Superteam Projects",
    body: "Ops Web2 dulu — roadmap Phase 2 siap hubungkan Superteam Hub tanpa ganti board harian.",
  },
  {
    title: "Sosmed Specialists",
    body: "SYNC published URLs, pantau views/likes, dan isi target Create Scripts tiap bulan.",
  },
  {
    title: "Editors & Admins",
    body: "Editor fokusat Finish Videos + workload. Admin pegang seats, inventaris brand, dan PRINT REPORT.",
  },
];

export function Audiences() {
  return (
    <Section id="audiences" tone="transparent" fullBleed className="relative overflow-hidden">
      <Image
        src="/marketing/audiences-collab.jpg"
        alt="Agency team managing multiple brand workspaces"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/90" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-white md:py-28">
        <Eyebrow light>Who We Serve</Eyebrow>
        <SectionTitle light>
          Dibangun untuk desk produksi yang menjalankan lebih dari satu brand.
        </SectionTitle>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {audiences.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-t border-white/25 pt-6"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
