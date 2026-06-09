import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const content = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key, value } = await request.json();

  const content = await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  return NextResponse.json(content);
}
