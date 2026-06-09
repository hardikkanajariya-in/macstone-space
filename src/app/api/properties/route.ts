import { NextRequest, NextResponse } from "next/server";
import { auth, logActivity } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePropertyId, slugify } from "@/lib/utils";
import { z } from "zod";

const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  shortDescription: z.string().optional(),
  propertyType: z.string(),
  category: z.string(),
  status: z.string().default("available"),
  price: z.number().positive(),
  priceLabel: z.string().optional(),
  area: z.number().optional(),
  configuration: z.string().optional(),
  possession: z.string().optional(),
  ownership: z.string().optional(),
  facing: z.string().optional(),
  location: z.string(),
  city: z.string().default("Ahmedabad"),
  address: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  highlights: z.string().optional(),
  amenities: z.string().optional(),
  investmentNotes: z.string().optional(),
  locationAdvantages: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const properties = await prisma.property.findMany({
    include: { images: { orderBy: { order: "asc" } }, _count: { select: { inquiries: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const data = propertySchema.parse(body);
    const slug = slugify(data.title);

    const existing = await prisma.property.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const property = await prisma.property.create({
      data: {
        ...data,
        slug: finalSlug,
        propertyId: generatePropertyId(),
      },
    });

    await logActivity("created", "property", property.id, property.title);

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
