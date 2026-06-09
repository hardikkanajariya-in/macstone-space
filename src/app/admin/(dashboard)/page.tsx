import { prisma } from "@/lib/prisma";
import { Building2, Star, MessageSquare, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";

async function getDashboardData() {
  const [
    totalProperties,
    featuredProperties,
    publishedProperties,
    newInquiries,
    totalInquiries,
    recentInquiries,
    recentActivities,
    propertiesByType,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { featured: true } }),
    prisma.property.count({ where: { published: true } }),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.inquiry.count(),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: { select: { title: true } } },
    }),
    prisma.activity.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
    prisma.property.groupBy({
      by: ["propertyType"],
      _count: { id: true },
      where: { published: true },
    }),
  ]);

  return {
    totalProperties,
    featuredProperties,
    publishedProperties,
    newInquiries,
    totalInquiries,
    recentInquiries,
    recentActivities,
    propertiesByType,
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { label: "Total Properties", value: data.totalProperties, icon: Building2 },
    { label: "Featured", value: data.featuredProperties, icon: Star },
    { label: "New Inquiries", value: data.newInquiries, icon: MessageSquare },
    { label: "Total Inquiries", value: data.totalInquiries, icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-semibold mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium">Recent Inquiries</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {data.recentInquiries.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">No inquiries yet</p>
            ) : (
              data.recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{inquiry.name}</p>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {inquiry.type} · {inquiry.phone}
                    {inquiry.property && ` · ${inquiry.property.title}`}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium">Property Statistics</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Published</span>
              <span className="font-medium">{data.publishedProperties} / {data.totalProperties}</span>
            </div>
            {data.propertiesByType.map((group) => (
              <div key={group.propertyType} className="flex justify-between text-sm">
                <span className="text-gray-500">{group.propertyType}</span>
                <span className="font-medium">{group._count.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {data.recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-3 flex items-center justify-between text-sm">
                <span>
                  <span className="capitalize">{activity.action}</span>{" "}
                  <span className="text-gray-500">{activity.entity}</span>
                  {activity.details && (
                    <span className="text-gray-400"> — {activity.details}</span>
                  )}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(activity.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
