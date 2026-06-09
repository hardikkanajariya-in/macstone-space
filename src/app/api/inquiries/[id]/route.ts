import { NextRequest, NextResponse } from "next/server";
import { auth, logActivity } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: {
      status: body.status,
      notes: body.notes,
      followUpDate: body.followUpDate ? new Date(body.followUpDate) : undefined,
    },
  });

  await logActivity("updated", "inquiry", id);
  return NextResponse.json(inquiry);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.inquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
