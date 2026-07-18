"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function RegisterForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoading(false);
      setError(data.error ?? "Could not register.");
      return;
    }

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (login?.error) {
      router.push("/login");
      return;
    }
    router.push("/onboarding");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          {t("register.name")}
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line bg-panel-soft px-3 py-2.5 text-sm text-foreground outline-none ring-primary/40 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          {t("register.email")}
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
        <label htmlFor="password" className="text-sm font-medium">
          {t("register.password")}
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
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
        {loading ? t("register.creating") : t("register.submit")}
      </button>
      <p className="text-center text-sm text-muted">
        {t("register.haveAccount")}{" "}
        <Link href="/login" className="font-medium text-primary hover:text-warm">
          {t("nav.login")}
        </Link>
      </p>
    </form>
  );
}
