"use client";

import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { useI18n } from "@/lib/i18n";

export function LoginPageClient() {
  const { t } = useI18n();

  return (
    <AuthShell title={t("auth.welcome")} description={t("auth.welcomeBody")}>
      <Suspense fallback={<p className="text-sm text-muted">{t("common.loading")}</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
