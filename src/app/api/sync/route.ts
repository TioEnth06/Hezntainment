import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { MNA_MONITOR_ROWS } from "@/lib/mock/mna-data";
import { mockScrapeMetrics } from "@/lib/scraping/sync-metrics";

const bodySchema = z.object({
  workspaceId: z.string(),
  contentIds: z.array(z.string()).optional(),
});

/**
 * POST /api/sync — SYNC ALL for a workspace
 * Enqueues scrape jobs (stub) and returns updated metrics for presentation.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role === "EDITOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { workspaceId, contentIds } = parsed.data;
  const targets = MNA_MONITOR_ROWS.filter(
    (row) =>
      row.workspaceId === workspaceId &&
      (!contentIds || contentIds.includes(row.id)),
  );

  // Simulate queue drain
  await new Promise((r) => setTimeout(r, 500));

  const results = targets.map((row) => {
    const metrics = mockScrapeMetrics(row.publishedUrl);
    return {
      contentId: row.id,
      jobStatus: "DONE" as const,
      lastSynced: new Date().toISOString(),
      metrics,
    };
  });

  return NextResponse.json({
    queued: results.length,
    workspaceId,
    results,
  });
}
