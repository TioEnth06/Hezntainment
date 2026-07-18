"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { homePathForRole, type AppRole } from "@/lib/rbac";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [email, setEmail] = useState("admin@hezntainment.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }

    const session = await getSession();
    const role = (session?.user as { role?: AppRole } | undefined)?.role;
    const destination =
      callbackUrl && callbackUrl.startsWith("/mna")
        ? callbackUrl
        : role
          ? homePathForRole(role)
          : "/mna/dashboard";

    setLoading(false);
    router.push(destination);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-primary focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-primary focus:ring-2"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="btn-warm w-full rounded-sm px-4 py-2.5 text-sm font-bold disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <div className="space-y-1 text-center text-xs text-muted">
        <p>All roles land in MNA Content · workspace switcher in sidebar</p>
        <p>admin@ / sosmed@ / editor@hezntainment.com · password123</p>
      </div>
      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="font-medium text-accent">
          Create workspace
        </Link>
      </p>
    </form>
  );
}
