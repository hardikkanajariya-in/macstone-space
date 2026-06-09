import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyForm } from "@/components/admin/PropertyForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Edit Property</h1>
      <PropertyForm
        propertyId={property.id}
        initialData={property as unknown as Record<string, unknown>}
        images={property.images}
      />
    </div>
  );
}
