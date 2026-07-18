"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-28">
      <Image
        src="/marketing/hero-studio.jpg"
        alt="Agency content operations workspace"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-primary/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        aria-hidden
      />
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl md:leading-[1.02]"
        >
          Hezntainment
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-white sm:text-2xl md:text-[2rem] md:leading-tight"
        >
          Manajemen konten, monitor performa,
          <span className="block text-warm">& laporan KPI tim</span>
          dalam satu workspace multi-brand
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-5 max-w-xl text-base text-white/80 md:text-lg"
        >
          Stop cek insight TikTok/Instagram satu per satu. Switch brand
          (Jeparanesia → Siinbooth), SYNC metrics otomatis, dan cetak Laporan KPI
          untuk Admin, Sosmed, dan Editor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Link
            href="/register"
            className="btn-warm rounded-sm px-7 py-3.5 text-sm font-bold tracking-wide"
          >
            Start Free Trial
          </Link>
          <Link
            href="/login"
            className="rounded-sm border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-warm hover:text-warm"
          >
            Open demo workspace
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
