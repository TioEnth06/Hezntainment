import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:justify-between">
        <div>
          <p className="text-xl font-bold">Hezntainment</p>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Manajemen konten, Monitor Data, dan Laporan KPI untuk agency
            multi-brand.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 text-sm text-white/70">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Product
            </p>
            <a href="#services" className="block hover:text-warm">
              Modules
            </a>
            <a href="#pricing" className="block hover:text-warm">
              Pricing
            </a>
            <Link href="/login" className="block hover:text-warm">
              Open demo
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Connect
            </p>
            <Link href="/register" className="block hover:text-warm">
              Start Free Trial
            </Link>
            <span className="block text-white/40">
              Connect via Superteam Hub — Phase 2
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-5 text-xs text-white/35">
        © {new Date().getFullYear()} Hezntainment. All rights reserved.
      </div>
    </footer>
  );
}
