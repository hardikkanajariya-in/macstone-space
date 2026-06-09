import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { images } = await request.json();

  if (!Array.isArray(images)) {
    return NextResponse.json({ error: "Invalid images" }, { status: 400 });
  }

  await prisma.propertyImage.deleteMany({ where: { propertyId: id } });

  const created = await prisma.propertyImage.createMany({
    data: images.map(
      (img: { url: string; publicId?: string; alt?: string; order?: number }, i: number) => ({
        propertyId: id,
        url: img.url,
        publicId: img.publicId || null,
        alt: img.alt || null,
        order: img.order ?? i,
        isPrimary: i === 0,
      })
    ),
  });

  return NextResponse.json({ count: created.count });
}
