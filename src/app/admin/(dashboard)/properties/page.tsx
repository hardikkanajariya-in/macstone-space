import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Eye } from "lucide-react";

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    include: { images: { take: 1, orderBy: { order: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-charcoal/90 transition-colors"
        >
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-6 py-3 font-medium">Property</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Published</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {property.images[0] && (
                      <img
                        src={property.images[0].url}
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-xs text-gray-400">{property.propertyId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{property.propertyType}</td>
                <td className="px-6 py-4 text-gray-600">{property.location}</td>
                <td className="px-6 py-4">{property.priceLabel || formatPrice(property.price, true)}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {property.published ? (
                    <span className="text-xs text-green-600">Live</span>
                  ) : (
                    <span className="text-xs text-gray-400">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/properties/${property.id}`}
                      className="p-1.5 text-gray-400 hover:text-charcoal"
                    >
                      <Pencil size={16} />
                    </Link>
                    {property.published && (
                      <Link
                        href={`/properties/${property.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-charcoal"
                      >
                        <Eye size={16} />
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && (
          <p className="p-8 text-center text-gray-500">No properties yet. Add your first property.</p>
        )}
      </div>
    </div>
  );
}
