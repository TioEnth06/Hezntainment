import type {
  EditorKpi,
  MonitorContentRow,
  SpecialistKpi,
  WorkspaceBrand,
} from "@/lib/workspace/types";

export const MNA_WORKSPACES: WorkspaceBrand[] = [
  { id: "ws_jeparanesia", name: "Jeparanesia", slug: "jeparanesia", brandCode: "JPR" },
  { id: "ws_siinbooth", name: "Siinbooth", slug: "siinbooth", brandCode: "SNB" },
];

const empty = { views: 0, likes: 0, comments: 0, shares: 0 };

export const MNA_MONITOR_ROWS: MonitorContentRow[] = [
  {
    id: "c_jpr_1",
    workspaceId: "ws_jeparanesia",
    title: "Jepara Heritage Reel — Teak Craft",
    brand: "Jeparanesia",
    status: "PUBLISHED",
    uploadDate: "2026-07-02",
    lastSynced: "2026-07-18T02:10:00.000Z",
    publishedUrl: "https://www.tiktok.com/@jeparanesia/video/demo1",
    tiktok: { views: 84200, likes: 6100, comments: 312, shares: 890 },
    instagram: { views: 22100, likes: 1840, comments: 96, shares: 140 },
  },
  {
    id: "c_jpr_2",
    workspaceId: "ws_jeparanesia",
    title: "Workshop Tour — Behind the Carving",
    brand: "Jeparanesia",
    status: "PUBLISHED",
    uploadDate: "2026-07-08",
    lastSynced: "2026-07-17T18:40:00.000Z",
    publishedUrl: "https://www.instagram.com/p/jepara-demo",
    tiktok: { views: 15600, likes: 920, comments: 44, shares: 71 },
    instagram: { views: 38900, likes: 3200, comments: 188, shares: 260 },
  },
  {
    id: "c_jpr_3",
    workspaceId: "ws_jeparanesia",
    title: "Buyer FAQ — Export Ready Furniture",
    brand: "Jeparanesia",
    status: "PUBLISHED",
    uploadDate: "2026-07-14",
    lastSynced: null,
    publishedUrl: "https://www.tiktok.com/@jeparanesia/video/demo3",
    tiktok: { ...empty },
    instagram: null,
  },
  {
    id: "c_snb_1",
    workspaceId: "ws_siinbooth",
    title: "Siinbooth Setup in 60s",
    brand: "Siinbooth",
    status: "PUBLISHED",
    uploadDate: "2026-07-03",
    lastSynced: "2026-07-18T01:05:00.000Z",
    publishedUrl: "https://www.tiktok.com/@siinbooth/video/demo1",
    tiktok: { views: 120400, likes: 9800, comments: 540, shares: 2100 },
    instagram: { views: 45200, likes: 4100, comments: 210, shares: 380 },
  },
  {
    id: "c_snb_2",
    workspaceId: "ws_siinbooth",
    title: "Event Booth Lighting Tips",
    brand: "Siinbooth",
    status: "PUBLISHED",
    uploadDate: "2026-07-11",
    lastSynced: "2026-07-16T09:20:00.000Z",
    publishedUrl: "https://www.instagram.com/reel/siinbooth-demo",
    tiktok: null,
    instagram: { views: 27800, likes: 2450, comments: 132, shares: 198 },
  },
  {
    id: "c_snb_3",
    workspaceId: "ws_siinbooth",
    title: "Client Testimonial — Expo Jakarta",
    brand: "Siinbooth",
    status: "PUBLISHED",
    uploadDate: "2026-07-15",
    lastSynced: "2026-07-18T03:00:00.000Z",
    publishedUrl: "https://www.tiktok.com/@siinbooth/video/demo3",
    tiktok: { views: 33400, likes: 2100, comments: 97, shares: 310 },
    instagram: { views: 19200, likes: 1500, comments: 64, shares: 88 },
  },
];

export const MNA_SPECIALIST_KPI: Record<string, SpecialistKpi[]> = {
  ws_jeparanesia: [
    {
      userId: "user_sosmed",
      name: "Sinta Sosmed",
      role: "SOSMED",
      metric: "Create Scripts",
      target: 30,
      achieved: 11,
      draft: 4,
      proses: 3,
      done: 11,
    },
  ],
  ws_siinbooth: [
    {
      userId: "user_sosmed",
      name: "Sinta Sosmed",
      role: "SOSMED",
      metric: "Create Scripts",
      target: 30,
      achieved: 22,
      draft: 2,
      proses: 5,
      done: 22,
    },
    {
      userId: "user_sos2",
      name: "Nina Post",
      role: "SOSMED",
      metric: "Create Scripts",
      target: 25,
      achieved: 9,
      draft: 5,
      proses: 2,
      done: 9,
    },
  ],
};

export const MNA_EDITOR_KPI: Record<string, EditorKpi[]> = {
  ws_jeparanesia: [
    {
      userId: "user_editor",
      name: "Eko Editor",
      role: "EDITOR",
      metric: "Finish Videos",
      target: 20,
      achieved: 3,
      openWorkload: 4,
    },
    {
      userId: "user_ed2",
      name: "Maya Cut",
      role: "EDITOR",
      metric: "Finish Videos",
      target: 20,
      achieved: 14,
      openWorkload: 1,
    },
  ],
  ws_siinbooth: [
    {
      userId: "user_editor",
      name: "Eko Editor",
      role: "EDITOR",
      metric: "Finish Videos",
      target: 18,
      achieved: 12,
      openWorkload: 0,
    },
    {
      userId: "user_ed3",
      name: "Rizky Grade",
      role: "EDITOR",
      metric: "Finish Videos",
      target: 18,
      achieved: 6,
      openWorkload: 3,
    },
  ],
};

export function aggregateMonitor(rows: MonitorContentRow[]) {
  return rows.reduce(
    (acc, row) => {
      for (const platform of [row.tiktok, row.instagram]) {
        if (!platform) continue;
        acc.views += platform.views;
        acc.likes += platform.likes;
        acc.comments += platform.comments;
        acc.shares += platform.shares;
      }
      return acc;
    },
    { views: 0, likes: 0, comments: 0, shares: 0 },
  );
}

export function kpiStatus(
  achieved: number,
  target: number,
  kind: "specialist" | "editor",
): { label: string; tone: "danger" | "warn" | "ok" } {
  const pct = target === 0 ? 0 : (achieved / target) * 100;
  if (kind === "specialist") {
    if (pct < 40) return { label: "BEHIND", tone: "danger" };
    if (pct < 80) return { label: "CATCHING UP", tone: "warn" };
    return { label: "ON TRACK", tone: "ok" };
  }
  if (pct < 25) return { label: "SLOW START", tone: "warn" };
  if (pct < 70) return { label: "CATCHING UP", tone: "warn" };
  return { label: "ON TRACK", tone: "ok" };
}
