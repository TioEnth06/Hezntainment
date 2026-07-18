import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { DEMO_USERS, DEMO_WORKSPACE } from "@/lib/mock/auth-users";
import { prisma } from "@/lib/prisma";
import type { AppRole } from "@/lib/rbac";

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID) && Boolean(process.env.AUTH_GOOGLE_SECRET);

const DEFAULT_ROLE: AppRole = "ADMIN";

function sessionUserFields(input: {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: AppRole;
  workspaceId?: string;
  workspaceName?: string;
}) {
  return {
    id: input.id,
    name: input.name ?? "User",
    email: input.email ?? undefined,
    role: input.role ?? DEFAULT_ROLE,
    workspaceId: input.workspaceId ?? DEMO_WORKSPACE.id,
    workspaceName: input.workspaceName ?? DEMO_WORKSPACE.name,
  };
}

async function authorizeDemo(email: string, password: string) {
  const demo = DEMO_USERS.find((u) => u.email === email);
  if (!demo || demo.password !== password) return null;
  return sessionUserFields({
    id: demo.id,
    name: demo.name,
    email: demo.email,
    role: demo.role,
    workspaceId: DEMO_WORKSPACE.id,
    workspaceName: DEMO_WORKSPACE.name,
  });
}

async function authorizeDatabase(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: { include: { role: true } },
        memberships: {
          include: { role: true, workspace: true },
          take: 1,
          orderBy: { createdAt: "asc" },
        },
      },
    });
    if (!user?.passwordHash) return null;
    const valid = await compare(password, user.passwordHash);
    if (!valid) return null;

    const roleName =
      (user.memberships[0]?.role.roleName as AppRole | undefined) ??
      (user.userRoles[0]?.role.roleName as AppRole | undefined) ??
      DEFAULT_ROLE;

    return sessionUserFields({
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleName,
      workspaceId: user.memberships[0]?.workspaceId ?? DEMO_WORKSPACE.id,
      workspaceName: user.memberships[0]?.workspace.name ?? DEMO_WORKSPACE.name,
    });
  } catch {
    // DB unavailable — fall through to demo-only auth
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: "/login",
  },
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .toLowerCase()
          .trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        return (
          (await authorizeDemo(email, password)) ??
          (await authorizeDatabase(email, password))
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const fields = sessionUserFields({
          id: user.id ?? token.sub ?? "",
          name: user.name,
          email: user.email,
          role: user.role,
          workspaceId: user.workspaceId,
          workspaceName: user.workspaceName,
        });
        token.id = fields.id;
        token.role = fields.role;
        token.workspaceId = fields.workspaceId;
        token.workspaceName = fields.workspaceName;
      }

      // Google (and any OAuth) may omit custom fields — keep session usable
      if (account?.provider === "google" || !token.role) {
        token.role = (token.role as AppRole | undefined) ?? DEFAULT_ROLE;
        token.workspaceId =
          (token.workspaceId as string | undefined) || DEMO_WORKSPACE.id;
        token.workspaceName =
          (token.workspaceName as string | undefined) || DEMO_WORKSPACE.name;
        token.id = String(token.id ?? token.sub ?? "");
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.id ?? token.sub ?? "");
      session.user.role = (token.role as AppRole | undefined) ?? DEFAULT_ROLE;
      session.user.workspaceId = String(
        token.workspaceId ?? DEMO_WORKSPACE.id,
      );
      session.user.workspaceName = String(
        token.workspaceName ?? DEMO_WORKSPACE.name,
      );
      return session;
    },
  },
});
