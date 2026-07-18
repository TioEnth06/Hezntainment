"use client";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { useI18n } from "@/lib/i18n";

export function RegisterPageClient() {
  const { t } = useI18n();

  return (
    <AuthShell title={t("register.title")} description={t("register.body")}>
      <RegisterForm />
    </AuthShell>
  );
}
