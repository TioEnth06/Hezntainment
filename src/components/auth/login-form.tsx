"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { homePathForRole } from "@/lib/rbac";

export function LoginForm() {
  const { t } = useI18n();
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

    try {
      const health = await fetch("/api/health/auth").then((r) => r.json());
      if (!health?.ok) {
        setError(t("auth.configError"));
        setLoading(false);
        return;
      }
    } catch {
      setError(t("auth.configError"));
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      setError(t("auth.invalid"));
      return;
    }

    const session = await getSession();
    if (!session?.user) {
      setLoading(false);
      setError(t("auth.sessionFailed"));
      return;
    }

    const destination =
      callbackUrl && callbackUrl.startsWith("/mna")
        ? callbackUrl
        : homePathForRole();

    setLoading(false);
    router.push(destination);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("auth.email")}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line bg-panel-soft px-3 py-2.5 text-sm text-foreground outline-none ring-primary/40 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t("auth.password")}
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line bg-panel-soft px-3 py-2.5 text-sm text-foreground outline-none ring-primary/40 focus:ring-2"
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="btn-warm w-full px-4 py-2.5 text-sm font-bold disabled:opacity-60"
      >
        {loading ? t("auth.signingIn") : t("auth.signIn")}
      </button>
      <div className="space-y-1 text-center text-xs text-muted">
        <p>{t("auth.demoHint")}</p>
        <p>{t("auth.demoAccounts")}</p>
      </div>
      <p className="text-center text-sm text-muted">
        {t("auth.newHere")}{" "}
        <Link href="/register" className="font-medium text-primary hover:text-warm">
          {t("auth.createWorkspace")}
        </Link>
      </p>
    </form>
  );
}
