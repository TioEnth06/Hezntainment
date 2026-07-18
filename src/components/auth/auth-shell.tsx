"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-bold text-white">
            Hezntainment
          </Link>
          <LanguageToggle tone="dark" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-2 text-sm text-white/65">{description}</p>
        <div className="mt-8 rounded-2xl bg-panel p-6 shadow-xl shadow-black/30 ring-1 ring-line">
          {children}
        </div>
      </div>
    </div>
  );
}
