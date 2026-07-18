"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Link2,
  LogOut,
  Package,
  Radio,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { MNA_NAV, roleLabel, type AppRole } from "@/lib/rbac";
import { WorkspaceSwitcher } from "@/components/mna/workspace-switcher";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof LayoutDashboard> = {
  "/mna/dashboard": LayoutDashboard,
  "/mna/kalender": CalendarDays,
  "/mna/monitor": Radio,
  "/mna/link-tracker": Link2,
  "/mna/administrasi/tim": Users,
  "/mna/administrasi/inventaris": Package,
  "/mna/administrasi/laporan-kpi": BarChart3,
};

export function MnaSidebar({
  role,
  userName,
}: {
  role: AppRole;
  userName: string;
}) {
  const pathname = usePathname();
  const utama = MNA_NAV.filter((n) => n.section === "utama" && n.roles.includes(role));
  const admin = MNA_NAV.filter((n) => n.section === "admin" && n.roles.includes(role));

  return (
    <aside className="flex w-full flex-col border-b border-line bg-ink text-white md:h-screen md:w-72 md:border-b-0 md:border-r md:border-white/10">
      <div className="px-4 py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-warm">
          MNA Content
        </p>
        <h1 className="mt-1 text-lg font-bold leading-tight">Manajemen Konten</h1>
        <div className="mt-4 rounded-sm bg-white/5 p-3 ring-1 ring-white/10">
          <p className="truncate text-sm font-semibold">{userName}</p>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-warm">
            {roleLabel(role)}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        <div>
          <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            Menu Utama
          </p>
          <div className="mt-2 space-y-1">
            {utama.map((item) => {
              const Icon = icons[item.href] ?? LayoutDashboard;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-warm text-ink"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {admin.length > 0 ? (
          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              Administrasi
            </p>
            <div className="mt-2 space-y-1">
              {admin.map((item) => {
                const Icon = icons[item.href] ?? BarChart3;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-warm text-ink"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        <div>
          <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            Ruang Kerja Saya
          </p>
          <div className="mt-2 px-1">
            <WorkspaceSwitcher />
          </div>
        </div>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 hover:text-white"
        >
          <LogOut className="size-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
