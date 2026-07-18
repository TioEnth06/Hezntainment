export type AppRole = "ADMIN" | "SOSMED" | "EDITOR";

export type MnaNavSection = "utama" | "produksi" | "admin";

export type MnaNavItem = {
  href: string;
  label: string;
  section: MnaNavSection;
  roles: AppRole[];
};

export function isAdmin(role: AppRole) {
  return role === "ADMIN";
}

/** All roles currently land on the same MNA dashboard. */
export function homePathForRole() {
  return "/mna/dashboard";
}

export function roleLabel(role: AppRole) {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "SOSMED":
      return "Sosmed";
    case "EDITOR":
      return "Editor";
  }
}

export const MNA_NAV: MnaNavItem[] = [
  {
    href: "/mna/dashboard",
    label: "Dashboard",
    section: "utama",
    roles: ["ADMIN", "SOSMED", "EDITOR"],
  },
  {
    href: "/mna/kalender",
    label: "Kalender Editorial",
    section: "utama",
    roles: ["ADMIN", "SOSMED", "EDITOR"],
  },
  {
    href: "/mna/monitor",
    label: "Monitor Data",
    section: "utama",
    roles: ["ADMIN", "SOSMED"],
  },
  {
    href: "/mna/link-tracker",
    label: "Link Click Tracker",
    section: "utama",
    roles: ["ADMIN", "SOSMED"],
  },
  {
    href: "/mna/brainstorming",
    label: "Brainstorming",
    section: "produksi",
    roles: ["ADMIN", "SOSMED", "EDITOR"],
  },
  {
    href: "/mna/antrean-produksi",
    label: "Antrean Produksi",
    section: "produksi",
    roles: ["ADMIN", "SOSMED", "EDITOR"],
  },
  {
    href: "/mna/administrasi/tim",
    label: "Manajemen Tim",
    section: "admin",
    roles: ["ADMIN"],
  },
  {
    href: "/mna/administrasi/inventaris",
    label: "Inventaris Brand",
    section: "admin",
    roles: ["ADMIN"],
  },
  {
    href: "/mna/administrasi/laporan-kpi",
    label: "Laporan KPI",
    section: "admin",
    roles: ["ADMIN", "SOSMED"],
  },
];

/** Longest-prefix match so nested admin routes don't collide. */
export function matchNavItem(pathname: string) {
  return [...MNA_NAV]
    .filter((n) => pathname === n.href || pathname.startsWith(`${n.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];
}

export function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function canAccessPath(role: AppRole | undefined, pathname: string) {
  if (!role) return false;
  const item = matchNavItem(pathname);
  if (!item) return true;
  return item.roles.includes(role);
}
