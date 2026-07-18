import type {
  EditorKpi,
  KanbanTask,
  LinkTrackerRow,
  MonitorContentRow,
  SpecialistKpi,
  WorkspaceBrand,
} from "@/lib/workspace/types";

export const MNA_WORKSPACES: WorkspaceBrand[] = [
  { id: "ws_nhmonline", name: "NHM Online", slug: "nhmonline", brandCode: "NHM" },
  { id: "ws_siinbooth", name: "Siinbooth", slug: "siinbooth", brandCode: "SNB" },
];

const empty = { views: 0, likes: 0, comments: 0, shares: 0 };

export const MNA_MONITOR_ROWS: MonitorContentRow[] = [
  {
    id: "c_nhm_1",
    workspaceId: "ws_nhmonline",
    title: "NHM Online — Product highlight reel",
    brand: "NHM Online",
    status: "PUBLISHED",
    uploadDate: "2026-07-02",
    lastSynced: "2026-07-18T02:10:00.000Z",
    publishedUrl: "https://www.tiktok.com/@nhmonline/video/demo1",
    tiktok: { views: 84200, likes: 6100, comments: 312, shares: 890 },
    instagram: { views: 22100, likes: 1840, comments: 96, shares: 140 },
  },
  {
    id: "c_nhm_2",
    workspaceId: "ws_nhmonline",
    title: "Website walkthrough — nhmonline.com",
    brand: "NHM Online",
    status: "PUBLISHED",
    uploadDate: "2026-07-08",
    lastSynced: "2026-07-17T18:40:00.000Z",
    publishedUrl: "https://www.instagram.com/p/nhmonline-demo",
    tiktok: { views: 15600, likes: 920, comments: 44, shares: 71 },
    instagram: { views: 38900, likes: 3200, comments: 188, shares: 260 },
  },
  {
    id: "c_nhm_3",
    workspaceId: "ws_nhmonline",
    title: "FAQ — How to order via NHM Online",
    brand: "NHM Online",
    status: "PUBLISHED",
    uploadDate: "2026-07-14",
    lastSynced: null,
    publishedUrl: "https://www.tiktok.com/@nhmonline/video/demo3",
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
  ws_nhmonline: [
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
  ws_nhmonline: [
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

export const MNA_KANBAN_TASKS: KanbanTask[] = [
  {
    id: "k_nhm_1",
    workspaceId: "ws_nhmonline",
    title: "Homepage promo series ideas",
    brand: "NHM Online",
    brandCode: "NHM",
    status: "IDEATION",
    assigneeName: "Sinta Sosmed",
    assigneeRole: "SOSMED",
    assetStatus: "MISSING",
    caption: "Hook ideas driving traffic to nhmonline.com",
  },
  {
    id: "k_nhm_2",
    workspaceId: "ws_nhmonline",
    title: "New arrival — 30s script",
    brand: "NHM Online",
    brandCode: "NHM",
    status: "SCRIPTING",
    assigneeName: "Sinta Sosmed",
    assigneeRole: "SOSMED",
    assetStatus: "DRAFT",
  },
  {
    id: "k_nhm_3",
    workspaceId: "ws_nhmonline",
    title: "Site feature cutdown",
    brand: "NHM Online",
    brandCode: "NHM",
    status: "EDITING",
    assigneeName: "Eko Editor",
    assigneeRole: "EDITOR",
    assetStatus: "READY",
  },
  {
    id: "k_nhm_4",
    workspaceId: "ws_nhmonline",
    title: "Order FAQ reel — final polish",
    brand: "NHM Online",
    brandCode: "NHM",
    status: "READY_TO_REVIEW",
    assigneeName: "Maya Cut",
    assigneeRole: "EDITOR",
    assetStatus: "UPLOADED",
  },
  {
    id: "k_nhm_5",
    workspaceId: "ws_nhmonline",
    title: "Flash sale story pack",
    brand: "NHM Online",
    brandCode: "NHM",
    status: "EDITING",
    assigneeName: "Maya Cut",
    assigneeRole: "EDITOR",
    assetStatus: "DRAFT",
  },
  {
    id: "k_snb_1",
    workspaceId: "ws_siinbooth",
    title: "Booth pack-down ASMR",
    brand: "Siinbooth",
    brandCode: "SNB",
    status: "IDEATION",
    assigneeName: "Nina Post",
    assigneeRole: "SOSMED",
    assetStatus: "MISSING",
  },
  {
    id: "k_snb_2",
    workspaceId: "ws_siinbooth",
    title: "Lighting kit checklist script",
    brand: "Siinbooth",
    brandCode: "SNB",
    status: "SCRIPTING",
    assigneeName: "Sinta Sosmed",
    assigneeRole: "SOSMED",
    assetStatus: "DRAFT",
  },
  {
    id: "k_snb_3",
    workspaceId: "ws_siinbooth",
    title: "Expo Jakarta testimonial edit",
    brand: "Siinbooth",
    brandCode: "SNB",
    status: "EDITING",
    assigneeName: "Rizky Grade",
    assigneeRole: "EDITOR",
    assetStatus: "READY",
  },
  {
    id: "k_snb_4",
    workspaceId: "ws_siinbooth",
    title: "Setup in 60s — review cut",
    brand: "Siinbooth",
    brandCode: "SNB",
    status: "READY_TO_REVIEW",
    assigneeName: "Eko Editor",
    assigneeRole: "EDITOR",
    assetStatus: "UPLOADED",
  },
  {
    id: "k_snb_5",
    workspaceId: "ws_siinbooth",
    title: "Client logo wall B-roll",
    brand: "Siinbooth",
    brandCode: "SNB",
    status: "IDEATION",
    assigneeName: "Sinta Sosmed",
    assigneeRole: "SOSMED",
    assetStatus: "MISSING",
  },
];

export const MNA_LINK_TRACKERS: LinkTrackerRow[] = [
  {
    id: "lt_nhm_1",
    workspaceId: "ws_nhmonline",
    label: "NHM Online website",
    url: "https://nhmonline.com",
    clicks: 1284,
    lastClicked: "2026-07-17T14:20:00.000Z",
  },
  {
    id: "lt_nhm_2",
    workspaceId: "ws_nhmonline",
    label: "Shop / catalog",
    url: "https://nhmonline.com",
    clicks: 420,
    lastClicked: "2026-07-18T08:05:00.000Z",
  },
  {
    id: "lt_nhm_3",
    workspaceId: "ws_nhmonline",
    label: "WhatsApp Sales",
    url: "https://wa.me/6281234567890",
    clicks: 96,
    lastClicked: "2026-07-16T11:40:00.000Z",
  },
  {
    id: "lt_snb_1",
    workspaceId: "ws_siinbooth",
    label: "Siinbooth Bio Link",
    url: "https://siinbooth.com",
    clicks: 892,
    lastClicked: "2026-07-18T09:12:00.000Z",
  },
  {
    id: "lt_snb_2",
    workspaceId: "ws_siinbooth",
    label: "Booking form",
    url: "https://siinbooth.com/book",
    clicks: 310,
    lastClicked: "2026-07-17T16:30:00.000Z",
  },
  {
    id: "lt_snb_3",
    workspaceId: "ws_siinbooth",
    label: "Promo landing",
    url: "https://siinbooth.com/promo",
    clicks: 154,
    lastClicked: null,
  },
];

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
): {
  code: "behind" | "onTrack" | "slowStart" | "catchingUp";
  tone: "danger" | "warn" | "ok";
} {
  const pct = target === 0 ? 0 : (achieved / target) * 100;
  if (kind === "specialist") {
    if (pct < 80) return { code: "behind", tone: pct < 40 ? "danger" : "warn" };
    return { code: "onTrack", tone: "ok" };
  }
  if (pct < 25) return { code: "slowStart", tone: "warn" };
  if (pct < 70) return { code: "catchingUp", tone: "warn" };
  return { code: "onTrack", tone: "ok" };
}

/** July = baseline mock; January = earlier-month pace (~55%). */
export function scaleKpiForMonth<T extends SpecialistKpi | EditorKpi>(
  rows: T[],
  month: string,
): T[] {
  if (month === "2026-07") return rows;
  const factor = month === "2026-01" ? 0.55 : 1;
  return rows.map((row) => {
    if (row.role === "SOSMED") {
      const specialist = row as SpecialistKpi;
      const achieved = Math.max(0, Math.round(specialist.achieved * factor));
      return {
        ...specialist,
        achieved,
        draft: Math.max(0, Math.round(specialist.draft * factor)),
        proses: Math.max(0, Math.round(specialist.proses * factor)),
        done: achieved,
      } as T;
    }
    const editor = row as EditorKpi;
    return {
      ...editor,
      achieved: Math.max(0, Math.round(editor.achieved * factor)),
      openWorkload: Math.max(0, Math.round(editor.openWorkload * (2 - factor))),
    } as T;
  });
}
