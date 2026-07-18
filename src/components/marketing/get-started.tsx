import Image from "next/image";
import Link from "next/link";
import { Eyebrow, SectionTitle } from "@/components/marketing/section";

export function GetStarted() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <Image
        src="/marketing/hero-studio.jpg"
        alt="Ready to run the next multi-brand content sprint"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/88" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 text-white md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-28">
        <div>
          <Eyebrow light>Let&apos;s Get Started</Eyebrow>
          <SectionTitle light className="mt-3">
            Siap jalankan Monitor Data & KPI dalam satu shell?
          </SectionTitle>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Buat trial Admin, undang Sosmed/Editor, switch brand workspace, lalu
            SYNC konten published pertama Anda.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-white/75">
            <li>Multi-brand workspaces · RBAC Admin / Sosmed / Editor</li>
            <li>Phase 1 Web2 · Phase 2 Superteam-ready</li>
            <li>Demo: admin@hezntainment.com / password123</li>
          </ul>
        </div>
        <div className="bg-panel p-7 text-ink shadow-xl shadow-black/40">
          <p className="text-lg font-bold">Open Hezntainment</p>
          <p className="mt-2 text-sm text-muted">
            Setelah login Anda masuk ke dashboard manajemen konten. Superteam Hub
            connect menyusul di Phase 2.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/register"
              className="btn-warm inline-flex items-center justify-center rounded-sm px-5 py-3.5 text-sm font-bold"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="btn-primary inline-flex items-center justify-center rounded-sm px-5 py-3.5 text-sm font-bold"
            >
              Log in to demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
