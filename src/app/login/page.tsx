import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <Link href="/" className="text-2xl font-bold text-white">
          Hezntainment
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-white/65">
          Sign in with email/password. Google Auth activates when OAuth keys are set.
        </p>
        <div className="mt-8 bg-panel p-6 shadow-xl shadow-black/30">
          <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
