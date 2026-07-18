"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white md:text-xl"
        >
          Hezntainment
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-white/85 md:flex">
          <a href="#mission" className="transition hover:text-warm">
            Mission
          </a>
          <a href="#services" className="transition hover:text-warm">
            Modules
          </a>
          <a href="#audiences" className="transition hover:text-warm">
            Who We Serve
          </a>
          <a href="#pricing" className="transition hover:text-warm">
            Pricing
          </a>
          <a href="#faq" className="transition hover:text-warm">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-sm px-3 py-2 text-[13px] font-medium text-white/90 transition hover:text-warm sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="btn-warm rounded-sm px-4 py-2.5 text-[13px] font-semibold tracking-wide"
          >
            Let&apos;s Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
