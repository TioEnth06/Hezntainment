import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { MNA_MONITOR_ROWS } from "@/lib/mock/mna-data";
import { mockScrapeMetrics } from "@/lib/scraping/sync-metrics";

type Params = { params: Promise<{ contentId: string }> };

/**
 * POST /api/sync/:contentId — SYNC one published content URL
 */
export async function POST(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role === "EDITOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { contentId } = await params;
  const body = await request.json().catch(() => ({}));
  const workspaceId = String(body?.workspaceId ?? "");

  const row = MNA_MONITOR_ROWS.find(
    (r) =>
      r.id === contentId && (!workspaceId || r.workspaceId === workspaceId),
  );

  if (!row) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }
  if (!row.publishedUrl) {
    return NextResponse.json(
      { error: "published_url required before SYNC" },
      { status: 400 },
    );
  }

  await new Promise((r) => setTimeout(r, 450));
  const metrics = mockScrapeMetrics(row.publishedUrl);

  // Future: prisma.scrapeJob.create + worker + content_metrics upsert
  return NextResponse.json({
    contentId,
    jobStatus: "DONE",
    lastSynced: new Date().toISOString(),
    metrics,
  });
}
