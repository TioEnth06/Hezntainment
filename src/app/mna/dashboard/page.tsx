import Link from "next/link";

export const metadata = { title: "Dashboard · MNA Content" };

export default function MnaDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          MNA Content — operasional konten, monitor performa, dan KPI tim dalam
          satu ruang kerja multi-brand.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            href: "/mna/monitor",
            title: "Monitor Data",
            body: "Aggregate views/likes + SYNC per post.",
          },
          {
            href: "/mna/administrasi/laporan-kpi",
            title: "Laporan KPI",
            body: "Sosmed & Editor monthly productivity.",
          },
          {
            href: "/mna/kalender",
            title: "Kalender Editorial",
            body: "Timeline konten per workspace (stub).",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-panel p-5 ring-1 ring-line transition hover:ring-primary/40"
          >
            <p className="text-lg font-bold">{card.title}</p>
            <p className="mt-1 text-sm text-muted">{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
