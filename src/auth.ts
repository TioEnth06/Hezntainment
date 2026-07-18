import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { DEMO_USERS, DEMO_WORKSPACE } from "@/lib/mock/auth-users";
import type { AppRole } from "@/lib/rbac";

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID) && Boolean(process.env.AUTH_GOOGLE_SECRET);

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

        const demo = DEMO_USERS.find((u) => u.email === email);
        if (!demo || demo.password !== password) return null;

        return {
          id: demo.id,
          name: demo.name,
          email: demo.email,
          role: demo.role as AppRole,
          workspaceId: DEMO_WORKSPACE.id,
          workspaceName: DEMO_WORKSPACE.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub ?? "";
        token.role = user.role;
        token.workspaceId = user.workspaceId;
        token.workspaceName = user.workspaceName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.id ?? token.sub ?? "");
      session.user.role = token.role as AppRole;
      session.user.workspaceId = String(token.workspaceId ?? "");
      session.user.workspaceName = String(token.workspaceName ?? "");
      return session;
    },
  },
});
