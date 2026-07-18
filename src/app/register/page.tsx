import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Start Free Trial" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <Link href="/" className="text-2xl font-bold text-white">
          Hezntainment
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Start your free trial
        </h1>
        <p className="mt-2 text-sm text-white/65">
          Create an Admin account, then invite Sosmed and Editor teammates.
        </p>
        <div className="mt-8 bg-panel p-6 shadow-xl shadow-black/30">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
