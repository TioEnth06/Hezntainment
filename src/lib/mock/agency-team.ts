import type { AppRole } from "@/lib/rbac";
import { DEMO_USERS } from "@/lib/mock/auth-users";

/** Extra agency staff for multi-seat Manajemen Tim demo */
export const AGENCY_STAFF: {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: "active" | "invited";
  lastActive: string;
}[] = [
  ...DEMO_USERS.filter((u) => u.role !== "ADMIN").map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: "active" as const,
    lastActive: "Today",
  })),
  {
    id: "user_ed2",
    name: "Maya Cut",
    email: "maya@hezntainment.com",
    role: "EDITOR",
    status: "active",
    lastActive: "Yesterday",
  },
  {
    id: "user_ed3",
    name: "Rizky Grade",
    email: "rizky@hezntainment.com",
    role: "EDITOR",
    status: "active",
    lastActive: "2d ago",
  },
  {
    id: "user_sos2",
    name: "Nina Post",
    email: "nina@hezntainment.com",
    role: "SOSMED",
    status: "active",
    lastActive: "Today",
  },
  {
    id: "user_ed4",
    name: "Fajar Motion",
    email: "fajar@hezntainment.com",
    role: "EDITOR",
    status: "invited",
    lastActive: "—",
  },
  {
    id: "user_ed5",
    name: "Lia Color",
    email: "lia@hezntainment.com",
    role: "EDITOR",
    status: "invited",
    lastActive: "—",
  },
];

export const AGENCY_SEATS = {
  plan: "Agency",
  seatLimit: 25,
  used: AGENCY_STAFF.length + 1,
};
