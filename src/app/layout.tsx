import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hezntainment — Manajemen Konten & KPI",
    template: "%s · Hezntainment",
  },
  description:
    "Hezntainment ContentOps: sync X, Instagram & TikTok, manage creative teams with RBAC, and prepare social data for the Web3 economy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fira.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-sans text-foreground">
        <AuthSessionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
