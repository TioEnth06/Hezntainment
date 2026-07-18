import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/lib/rbac";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: AppRole;
      workspaceId: string;
      workspaceName: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: AppRole;
    workspaceId: string;
    workspaceName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppRole;
    workspaceId: string;
    workspaceName: string;
  }
}
