import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { MNA_MONITOR_ROWS } from "@/lib/mock/mna-data";
import { runContentSync } from "@/lib/scraping/run-sync";

const bodySchema = z.object({
  contentId: z.string().min(1),
  url: z.string().url().optional(),
  workspaceId: z.string().optional(),
});

/**
 * SYNC trigger for Monitor Data.
 * Simulates scrape lag (~1.5s), then returns refreshed platform metrics.
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
    return NextResponse.json(
      { error: "contentId (and optional url) required." },
      { status: 400 },
    );
  }

  const { contentId, url, workspaceId } = parsed.data;
  const row = MNA_MONITOR_ROWS.find((r) => r.id === contentId);

  if (!row) {
    return NextResponse.json({ error: "Content not found." }, { status: 404 });
  }
  if (workspaceId && row.workspaceId !== workspaceId) {
    return NextResponse.json(
      { error: "Content does not belong to workspace." },
      { status: 403 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const result = runContentSync(contentId, url);
  if (!result) {
    return NextResponse.json({ error: "Content not found." }, { status: 404 });
  }

  return NextResponse.json(result);
}
