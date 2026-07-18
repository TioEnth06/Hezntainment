import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { RoleName } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration data." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    const adminRole = await prisma.role.findUnique({
      where: { roleName: RoleName.ADMIN },
    });
    if (!adminRole) {
      return NextResponse.json(
        { error: "Roles not seeded. Run npm run db:setup first." },
        { status: 503 },
      );
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const slugBase = parsed.data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 24);
    const slug = `${slugBase || "workspace"}-${Date.now().toString(36)}`;

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email,
        passwordHash,
        userRoles: { create: { roleId: adminRole.id } },
      },
    });

    const workspace = await prisma.workspace.create({
      data: {
        name: `${parsed.data.name}'s Workspace`,
        slug,
        brandCode: "NEW",
        createdBy: user.id,
        members: {
          create: {
            userId: user.id,
            roleId: adminRole.id,
          },
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      workspaceId: workspace.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "Database not ready. Use demo logins (*@hezntainment.com / password123) or start Postgres + npm run db:setup.",
      },
      { status: 503 },
    );
  }
}
