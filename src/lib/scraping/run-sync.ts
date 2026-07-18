import { MNA_MONITOR_ROWS } from "@/lib/mock/mna-data";
import { mockScrapeMetrics } from "@/lib/scraping/sync-metrics";
import type { PlatformStats } from "@/lib/workspace/types";

export function formatSyncedLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", "");
}

function bump(base: number) {
  return Math.max(0, base + Math.floor(Math.random() * 900) + 120);
}

function mergeStats(
  current: PlatformStats | null,
  scraped: PlatformStats | null,
): PlatformStats | null {
  if (!current && !scraped) return null;
  const base = current ?? scraped!;
  return {
    views: bump(base.views),
    likes: bump(base.likes),
    comments: bump(base.comments),
    shares: bump(base.shares),
  };
}

export type SyncResult = {
  contentId: string;
  url: string;
  lastSynced: string;
  lastSyncedLabel: string;
  metrics: {
    tiktok: PlatformStats;
    instagram: PlatformStats;
  };
};

/** Apply mock scrape + mutate in-memory row baseline. */
export function runContentSync(contentId: string, url?: string): SyncResult | null {
  const row = MNA_MONITOR_ROWS.find((r) => r.id === contentId);
  if (!row) return null;

  const targetUrl = url ?? row.publishedUrl;
  const scraped = mockScrapeMetrics(targetUrl);
  const now = new Date();
  const lastSynced = now.toISOString();
  const lastSyncedLabel = formatSyncedLabel(now);

  const tiktok = mergeStats(row.tiktok, scraped.tiktok) ?? {
    views: bump(42000),
    likes: bump(2800),
    comments: bump(140),
    shares: bump(320),
  };

  const instagram =
    mergeStats(row.instagram, scraped.instagram) ??
    ({
      views: Math.floor(tiktok.views * 0.42),
      likes: Math.floor(tiktok.likes * 0.38),
      comments: Math.floor(tiktok.comments * 0.45),
      shares: Math.floor(tiktok.shares * 0.35),
    } satisfies PlatformStats);

  row.lastSynced = lastSynced;
  row.lastSyncedLabel = lastSyncedLabel;
  row.tiktok = tiktok;
  row.instagram = instagram;

  return {
    contentId,
    url: targetUrl,
    lastSynced,
    lastSyncedLabel,
    metrics: { tiktok, instagram },
  };
}
