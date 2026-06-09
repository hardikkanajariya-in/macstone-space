import { prisma } from "./prisma";

export async function getFeaturedProperties(limit = 4) {
  return prisma.property.findMany({
    where: { published: true, featured: true },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getProperties(filters?: {
  category?: string;
  type?: string;
  location?: string;
  status?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) {
  const where: Record<string, unknown> = { published: true };

  if (filters?.category) where.category = filters.category;
  if (filters?.type) where.propertyType = filters.type;
  if (filters?.status) where.status = filters.status;
  if (filters?.featured) where.featured = true;
  if (filters?.location) {
    where.OR = [
      { location: { contains: filters.location } },
      { city: { contains: filters.location } },
    ];
  }
  if (filters?.minPrice || filters?.maxPrice) {
    where.price = {};
    if (filters.minPrice) (where.price as Record<string, number>).gte = filters.minPrice;
    if (filters.maxPrice) (where.price as Record<string, number>).lte = filters.maxPrice;
  }
  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { location: { contains: filters.search } },
      { description: { contains: filters.search } },
    ];
  }

  return prisma.property.findMany({
    where,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug, published: true },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });
}

export async function getRelatedProperties(
  currentId: string,
  category: string,
  limit = 3
) {
  return prisma.property.findMany({
    where: {
      published: true,
      category,
      id: { not: currentId },
    },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    take: limit,
    orderBy: { featured: "desc" },
  });
}

export async function getFaqs(category?: string) {
  return prisma.faq.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { order: "asc" },
  });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getSiteContent(key: string) {
  const content = await prisma.siteContent.findUnique({ where: { key } });
  return content?.value || null;
}

export async function getMultipleSiteContent(keys: string[]) {
  const contents = await prisma.siteContent.findMany({
    where: { key: { in: keys } },
  });
  return Object.fromEntries(contents.map((c) => [c.key, c.value]));
}
