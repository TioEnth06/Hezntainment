import type { AppRole } from "@/lib/rbac";

/** Demo credentials for Auth.js (Phase 1 presentation). */
export const DEMO_USERS: {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  password: string;
}[] = [
  {
    id: "user_admin",
    name: "Prasetio Admin",
    email: "admin@hezntainment.com",
    role: "ADMIN",
    password: "password123",
  },
  {
    id: "user_sosmed",
    name: "Sinta Sosmed",
    email: "sosmed@hezntainment.com",
    role: "SOSMED",
    password: "password123",
  },
  {
    id: "user_editor",
    name: "Eko Editor",
    email: "editor@hezntainment.com",
    role: "EDITOR",
    password: "password123",
  },
];

export const DEMO_WORKSPACE = {
  id: "ws_hezntainment",
  name: "Hezntainment Studio",
  slug: "hezntainment",
  plan: "agency",
};
