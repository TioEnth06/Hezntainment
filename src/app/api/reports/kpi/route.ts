import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  MNA_EDITOR_KPI,
  MNA_SPECIALIST_KPI,
  MNA_WORKSPACES,
} from "@/lib/mock/mna-data";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role === "EDITOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId") ?? "ws_jeparanesia";
  const month = searchParams.get("month") ?? "2026-07";
  const workspace =
    MNA_WORKSPACES.find((w) => w.id === workspaceId)?.name ?? workspaceId;

  const specialists = MNA_SPECIALIST_KPI[workspaceId] ?? [];
  const editors = MNA_EDITOR_KPI[workspaceId] ?? [];

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><title>MNA KPI — ${workspace}</title>
<style>
  body{font-family:Poppins,system-ui,sans-serif;padding:40px;color:#222020}
  h1{margin:0 0 4px;font-size:28px}
  .muted{color:#6b6560;margin:0 0 24px}
  h2{margin:28px 0 12px;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#7e5189}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  th,td{border-bottom:1px solid #e4e1de;text-align:left;padding:10px 8px;font-size:13px}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6b6560}
</style></head><body>
<h1>Laporan KPI — ${workspace}</h1>
<p class="muted">Month ${month} · Generated ${new Date().toLocaleString()} · MNA Content</p>
<h2>Specialist (Sosmed) — Create Scripts</h2>
<table><thead><tr><th>Name</th><th>Achieved</th><th>Target</th><th>Draft</th><th>Proses</th><th>Done</th></tr></thead>
<tbody>
${specialists.map((s) => `<tr><td>${s.name}</td><td>${s.achieved}</td><td>${s.target}</td><td>${s.draft}</td><td>${s.proses}</td><td>${s.done}</td></tr>`).join("")}
</tbody></table>
<h2>Editor — Finish Videos</h2>
<table><thead><tr><th>Name</th><th>Achieved</th><th>Target</th><th>Open Workload</th></tr></thead>
<tbody>
${editors.map((e) => `<tr><td>${e.name}</td><td>${e.achieved}</td><td>${e.target}</td><td>${e.openWorkload}</td></tr>`).join("")}
</tbody></table>
<script>window.print()</script>
</body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
