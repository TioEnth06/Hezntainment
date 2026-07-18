import {
  ContentStatus,
  KpiMetricType,
  Platform,
  PrismaClient,
  RoleName,
} from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all(
    (
      [
        [RoleName.ADMIN, "Full workspace administration"],
        [RoleName.SOSMED, "Planning, scraping, KPI"],
        [RoleName.EDITOR, "Assigned editing only"],
      ] as const
    ).map(([roleName, description]) =>
      prisma.role.upsert({
        where: { roleName },
        update: { description },
        create: { roleName, description },
      }),
    ),
  );

  const byName = Object.fromEntries(roles.map((r) => [r.roleName, r])) as Record<
    RoleName,
    (typeof roles)[number]
  >;

  const passwordHash = await hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@mna.content" },
    update: { passwordHash, name: "MNA Admin" },
    create: {
      email: "admin@mna.content",
      name: "MNA Admin",
      passwordHash,
    },
  });

  const sosmed = await prisma.user.upsert({
    where: { email: "sosmed@mna.content" },
    update: { passwordHash, name: "Sinta Sosmed" },
    create: {
      email: "sosmed@mna.content",
      name: "Sinta Sosmed",
      passwordHash,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@mna.content" },
    update: { passwordHash, name: "Eko Editor" },
    create: {
      email: "editor@mna.content",
      name: "Eko Editor",
      passwordHash,
    },
  });

  for (const [user, role] of [
    [admin, RoleName.ADMIN],
    [sosmed, RoleName.SOSMED],
    [editor, RoleName.EDITOR],
  ] as const) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: { userId: user.id, roleId: byName[role].id },
      },
      update: {},
      create: { userId: user.id, roleId: byName[role].id },
    });
  }

  const brands = [
    { name: "NHM Online", slug: "nhmonline", brandCode: "NHM" },
    { name: "Siinbooth", slug: "siinbooth", brandCode: "SNB" },
  ];

  for (const brand of brands) {
    const workspace = await prisma.workspace.upsert({
      where: { slug: brand.slug },
      update: { name: brand.name, brandCode: brand.brandCode },
      create: {
        name: brand.name,
        slug: brand.slug,
        brandCode: brand.brandCode,
        createdById: admin.id,
      },
    });

    for (const [user, role] of [
      [admin, RoleName.ADMIN],
      [sosmed, RoleName.SOSMED],
      [editor, RoleName.EDITOR],
    ] as const) {
      await prisma.workspaceMember.upsert({
        where: {
          workspaceId_userId: { workspaceId: workspace.id, userId: user.id },
        },
        update: { roleId: byName[role].id },
        create: {
          workspaceId: workspace.id,
          userId: user.id,
          roleId: byName[role].id,
        },
      });
    }

    const brandCount = await prisma.brandInventory.count({
      where: { workspaceId: workspace.id },
    });
    if (brandCount === 0) {
      await prisma.brandInventory.create({
        data: {
          workspaceId: workspace.id,
          name: `${brand.name} brand kit`,
          notes: "Logo, fonts, caption guidelines",
        },
      });
    }

    const existing = await prisma.content.count({
      where: { workspaceId: workspace.id },
    });
    if (existing === 0) {
      const content = await prisma.content.create({
        data: {
          workspaceId: workspace.id,
          title: `${brand.name} launch reel`,
          status: ContentStatus.PUBLISHED,
          caption: "Demo published content for Monitor Data",
          publishedUrl: `https://www.tiktok.com/@${brand.slug}/video/demo`,
          uploadDate: new Date("2026-07-10"),
          lastSynced: new Date(),
          createdById: sosmed.id,
          assignedToId: editor.id,
        },
      });

      await prisma.contentMetric.createMany({
        data: [
          {
            contentId: content.id,
            platform: Platform.TIKTOK,
            views: 50000,
            likes: 3200,
            comments: 180,
            shares: 400,
          },
          {
            contentId: content.id,
            platform: Platform.INSTAGRAM,
            views: 21000,
            likes: 1600,
            comments: 90,
            shares: 120,
          },
        ],
      });
    }

    const month = 7;
    const year = 2026;
    await prisma.kpiTarget.upsert({
      where: {
        workspaceId_userId_metricType_month_year: {
          workspaceId: workspace.id,
          userId: sosmed.id,
          metricType: KpiMetricType.CREATE_SCRIPTS,
          month,
          year,
        },
      },
      update: { targetValue: 30 },
      create: {
        workspaceId: workspace.id,
        userId: sosmed.id,
        metricType: KpiMetricType.CREATE_SCRIPTS,
        targetValue: 30,
        month,
        year,
      },
    });
    await prisma.kpiTarget.upsert({
      where: {
        workspaceId_userId_metricType_month_year: {
          workspaceId: workspace.id,
          userId: editor.id,
          metricType: KpiMetricType.FINISH_VIDEOS,
          month,
          year,
        },
      },
      update: { targetValue: 20 },
      create: {
        workspaceId: workspace.id,
        userId: editor.id,
        metricType: KpiMetricType.FINISH_VIDEOS,
        targetValue: 20,
        month,
        year,
      },
    });

    const linkCount = await prisma.linkTracker.count({
      where: { workspaceId: workspace.id },
    });
    if (linkCount === 0) {
      await prisma.linkTracker.createMany({
        data: [
          {
            workspaceId: workspace.id,
            label: `${brand.name} Bio Link`,
            url: `https://${brand.slug}.com`,
            clicks: brand.slug === "nhmonline" ? 1284 : 892,
            lastClicked: new Date("2026-07-17T14:20:00.000Z"),
          },
          {
            workspaceId: workspace.id,
            label: "Campaign landing",
            url: `https://${brand.slug}.com/promo`,
            clicks: brand.slug === "nhmonline" ? 420 : 310,
            lastClicked: new Date("2026-07-18T08:05:00.000Z"),
          },
        ],
      });
    }
  }

  console.log("Seeded MNA Content workspaces: NHM Online, Siinbooth");
  console.log("Logins: admin@ / sosmed@ / editor@mna.content — password123");
  console.log("(Demo UI also accepts *@hezntainment.com via auth mock)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
