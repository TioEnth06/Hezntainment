export type AppRole = "ADMIN" | "SOSMED" | "EDITOR";

export type MnaNavItem = {
  href: string;
  label: string;
  section: "utama" | "admin";
  roles: AppRole[];
};

export function isAdmin(role: AppRole) {
  return role === "ADMIN";
}

export function homePathForRole(_role: AppRole) {
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

export function canAccessPath(role: AppRole, href: string) {
  const item = MNA_NAV.find(
    (n) => href === n.href || href.startsWith(`${n.href}/`),
  );
  if (!item) return true;
  return item.roles.includes(role);
}
