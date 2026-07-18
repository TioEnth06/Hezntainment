import Link from "next/link";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

const plans = [
  {
    name: "Creator",
    price: "$29",
    blurb: "Solo / small pod — satu brand workspace.",
    features: [
      "1 workspace",
      "Up to 5 seats",
      "Kalender + Monitor Data",
      "SYNC queue (TikTok / IG / YT)",
      "Laporan KPI CSV",
    ],
    featured: false,
  },
  {
    name: "Agency",
    price: "$99",
    blurb: "Multi-brand agencies & Web3 project teams.",
    features: [
      "Unlimited workspaces*",
      "Up to 25 seats + bulk invite",
      "RBAC: Admin / Sosmed / Editor",
      "Monitor Data + PRINT KPI report",
      "Priority SYNC queue",
      "Superteam Hub connect (Phase 2)",
    ],
    featured: true,
  },
];

export function Pricing() {
  return (
    <Section id="pricing" tone="panel">
      <Eyebrow>Pricing</Eyebrow>
      <SectionTitle>
        Harga sederhana. Scale seats & brand, bukan spreadsheet.
      </SectionTitle>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`p-8 ring-1 ${
              plan.featured
                ? "bg-ink text-white ring-ink"
                : "bg-surface text-ink ring-line"
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="font-mono text-2xl font-semibold">
                {plan.price}
                <span
                  className={`text-sm font-sans font-normal ${
                    plan.featured ? "text-white/55" : "text-muted"
                  }`}
                >
                  /mo
                </span>
              </p>
            </div>
            <p
              className={`mt-2 text-sm ${
                plan.featured ? "text-white/65" : "text-muted"
              }`}
            >
              {plan.blurb}
            </p>
            <ul className="mt-7 space-y-2.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className={plan.featured ? "text-warm" : "text-accent"}>
                    ▸
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-sm px-4 py-3.5 text-sm font-bold tracking-wide ${
                plan.featured ? "btn-warm" : "btn-primary"
              }`}
            >
              Start Free Trial
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">*Fair-use limits apply during beta.</p>
    </Section>
  );
}
