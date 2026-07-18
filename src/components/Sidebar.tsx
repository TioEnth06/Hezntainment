"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  LayoutDashboard,
  Lightbulb,
  Link2,
  LogOut,
  Menu,
  Package,
  Radio,
  Users,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  isNavActive,
  MNA_NAV,
  roleLabel,
  type AppRole,
  type MnaNavItem,
} from "@/lib/rbac";
import {
  getSidebarCollapsed,
  getSidebarCollapsedServer,
  subscribeSidebarCollapsed,
  toggleSidebarCollapsed,
} from "@/lib/sidebar/collapse-store";
import { LanguageToggle } from "@/components/language-toggle";
import { WorkspaceSwitcher } from "@/components/mna/workspace-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n, NAV_LABEL_KEYS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof LayoutDashboard> = {
  "/mna/dashboard": LayoutDashboard,
  "/mna/kalender": CalendarDays,
  "/mna/monitor": Radio,
  "/mna/link-tracker": Link2,
  "/mna/brainstorming": Lightbulb,
  "/mna/antrean-produksi": Clapperboard,
  "/mna/administrasi/tim": Users,
  "/mna/administrasi/inventaris": Package,
  "/mna/administrasi/laporan-kpi": BarChart3,
};

function NavSection({
  title,
  items,
  pathname,
  onNavigate,
  collapsed,
}: {
  title: string;
  items: MnaNavItem[];
  pathname: string;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const { t } = useI18n();
  if (items.length === 0) return null;

  return (
    <div>
      {!collapsed ? (
        <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
          {title}
        </p>
      ) : null}
      <div className={cn("space-y-1", !collapsed && "mt-2")}>
        {items.map((item) => {
          const Icon = ICONS[item.href] ?? LayoutDashboard;
          const active = isNavActive(pathname, item.href);
          const labelKey = NAV_LABEL_KEYS[item.href];
          const label = labelKey ? t(labelKey) : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={label}
              className={cn(
                "flex items-center gap-2 rounded-sm text-sm font-medium transition",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2",
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed ? <span>{label}</span> : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SidebarPanel({
  role,
  userName,
  pathname,
  onNavigate,
  className,
  collapsed = false,
  showCollapseToggle = false,
}: {
  role: AppRole;
  userName: string;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
  collapsed?: boolean;
  showCollapseToggle?: boolean;
}) {
  const { t } = useI18n();
  const sections = useMemo(() => {
    const forRole = MNA_NAV.filter((n) => n.roles.includes(role));
    return {
      utama: forRole.filter((n) => n.section === "utama"),
      produksi: forRole.filter((n) => n.section === "produksi"),
      admin: forRole.filter((n) => n.section === "admin"),
    };
  }, [role]);

  return (
    <aside
      className={cn(
        "relative flex h-full w-full flex-col bg-ink text-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2 px-4 py-5",
          collapsed && "flex-col items-center px-2 pt-4",
        )}
      >
        <div className={cn("min-w-0 flex-1", collapsed && "w-full text-center")}>
          {!collapsed ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-warm">
                {t("sidebar.brand")}
              </p>
              <h1 className="mt-1 text-lg font-bold leading-tight">
                {t("sidebar.subtitle")}
              </h1>
              <div className="mt-4 rounded-sm bg-white/5 p-3 ring-1 ring-white/10">
                <p className="truncate text-sm font-semibold">{userName}</p>
                <div className="mt-2">
                  <Badge variant="brand" className="bg-primary/20 text-warm">
                    {roleLabel(role)}
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            <p
              className="text-[10px] font-bold uppercase tracking-wider text-warm"
              title={t("sidebar.brand")}
            >
              MNA
            </p>
          )}
        </div>

        {showCollapseToggle ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={collapsed ? t("sidebar.expand") : t("sidebar.collapse")}
            aria-pressed={collapsed}
            onClick={toggleSidebarCollapsed}
            className={cn(
              "size-8 shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white",
              collapsed && "mt-2",
            )}
          >
            {collapsed ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        ) : null}
      </div>

      <nav
        className={cn(
          "flex-1 space-y-5 overflow-y-auto pb-4",
          collapsed ? "px-1.5" : "px-3",
        )}
      >
        <NavSection
          title={t("sidebar.menuMain")}
          items={sections.utama}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
        <NavSection
          title={t("sidebar.menuProd")}
          items={sections.produksi}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
        <NavSection
          title={t("sidebar.menuAdmin")}
          items={sections.admin}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />

        <div>
          {!collapsed ? (
            <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              {t("sidebar.workspace")}
            </p>
          ) : null}
          <div className={cn(collapsed ? "mt-0" : "mt-2 px-1")}>
            <WorkspaceSwitcher compact={collapsed} />
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "space-y-3 border-t border-white/10 py-4",
          collapsed ? "flex flex-col items-center px-1" : "px-4",
        )}
      >
        <LanguageToggle tone="dark" className={collapsed ? "scale-90" : undefined} />
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          title={t("sidebar.signOut")}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium text-white/55 hover:text-white",
            collapsed && "justify-center p-2",
          )}
        >
          <LogOut className="size-3.5" />
          {!collapsed ? t("sidebar.signOut") : null}
        </button>
      </div>
    </aside>
  );
}

export function Sidebar({
  role,
  userName,
}: {
  role: AppRole;
  userName: string;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = useSyncExternalStore(
    subscribeSidebarCollapsed,
    getSidebarCollapsed,
    getSidebarCollapsedServer,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onViewport = () => {
      if (mq.matches) setMobileOpen(false);
    };
    onViewport();
    mq.addEventListener("change", onViewport);
    return () => mq.removeEventListener("change", onViewport);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div
      className={cn(
        "order-1 w-full transition-[width] duration-300 ease-out md:order-2 md:shrink-0",
        collapsed ? "md:w-16" : "md:w-72",
      )}
    >
      <header className="sticky top-0 z-40 flex w-full items-center gap-3 border-b border-line bg-ink px-4 py-3 text-white md:hidden">
        <div className="min-w-0 flex-1 text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-warm">
            {t("sidebar.brand")}
          </p>
          <p className="truncate text-sm font-bold">{t("sidebar.subtitle")}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={mobileOpen ? t("sidebar.close") : t("sidebar.open")}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </header>

      <div
        className={cn(
          "relative hidden h-screen border-l border-white/10 bg-ink transition-[width] duration-300 ease-out md:sticky md:top-0 md:block",
          collapsed ? "w-16" : "w-72",
        )}
      >
        <SidebarPanel
          role={role}
          userName={userName}
          pathname={pathname}
          collapsed={collapsed}
          showCollapseToggle
          className="w-full"
        />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label={t("common.closeOverlay")}
          className={cn(
            "absolute inset-0 bg-ink/50 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center gap-3 border-b border-white/10 bg-ink px-4 py-3">
            <p className="flex-1 text-xs font-bold uppercase tracking-wider text-warm">
              {t("sidebar.nav")}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t("sidebar.close")}
              onClick={() => setMobileOpen(false)}
              className="ml-auto shrink-0 text-white hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </Button>
          </div>
          <SidebarPanel
            role={role}
            userName={userName}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            className="min-h-0 flex-1"
          />
        </div>
      </div>
    </div>
  );
}

export { Sidebar as MnaSidebar };
