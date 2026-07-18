import type { PlatformStats } from "@/lib/workspace/types";

function jitter(base: number) {
  return Math.round(base * (0.92 + Math.random() * 0.2));
}

/** Phase 1 stub — replace with Playwright / Scraper API worker. */
export function mockScrapeMetrics(url: string): {
  tiktok: PlatformStats | null;
  instagram: PlatformStats | null;
} {
  const lower = url.toLowerCase();
  const isTiktok = lower.includes("tiktok");
  const isIg = lower.includes("instagram");

  const tiktok = isTiktok
    ? {
        views: jitter(42000),
        likes: jitter(2800),
        comments: jitter(140),
        shares: jitter(320),
      }
    : null;

  const instagram = isIg || !isTiktok
    ? {
        views: jitter(18000),
        likes: jitter(1500),
        comments: jitter(80),
        shares: jitter(120),
      }
    : isTiktok
      ? {
          views: jitter(12000),
          likes: jitter(900),
          comments: jitter(40),
          shares: jitter(60),
        }
      : null;

  return { tiktok, instagram };
}
