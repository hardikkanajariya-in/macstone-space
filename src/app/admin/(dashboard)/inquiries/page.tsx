"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  type: string;
  status: string;
  notes: string | null;
  followUpDate: string | null;
  createdAt: string;
  property: { title: string; slug: string } | null;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    const params = new URLSearchParams();
    if (filter) params.set("status", filter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/inquiries/admin?${params}`);
    if (res.ok) setInquiries(await res.json());
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter, search]);

  const updateInquiry = async (id: string, data: Partial<Inquiry>) => {
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchInquiries();
    setSelected(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Inquiries</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone..."
          className="flex-1 px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-accent"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 text-sm"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200">
          <div className="divide-y divide-gray-100">
            {inquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setSelected(inquiry)}
                className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === inquiry.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{inquiry.name}</p>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">
                    {inquiry.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {inquiry.type} · {inquiry.phone} · {new Date(inquiry.createdAt).toLocaleDateString("en-IN")}
                </p>
                {inquiry.property && (
                  <p className="text-xs text-accent mt-1">{inquiry.property.title}</p>
                )}
              </button>
            ))}
            {inquiries.length === 0 && (
              <p className="p-8 text-center text-gray-500 text-sm">No inquiries found</p>
            )}
          </div>
        </div>

        {selected && (
          <div className="bg-white border border-gray-200 p-6 space-y-4 h-fit sticky top-8">
            <h2 className="font-medium">{selected.name}</h2>
            <div className="text-sm space-y-2 text-gray-600">
              <p>{selected.email}</p>
              <p>{selected.phone}</p>
              <p className="capitalize">Type: {selected.type}</p>
              {selected.property && <p>Property: {selected.property.title}</p>}
              {selected.message && <p className="mt-3 text-gray-800">{selected.message}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
              <select
                value={selected.status}
                onChange={(e) => setSelected({ ...selected, status: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-200 text-sm"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
                <option value="spam">Spam</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</label>
              <textarea
                value={selected.notes || ""}
                onChange={(e) => setSelected({ ...selected, notes: e.target.value })}
                rows={3}
                className="w-full mt-1 px-3 py-2 border border-gray-200 text-sm resize-y"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Follow-up Date</label>
              <input
                type="date"
                value={selected.followUpDate?.split("T")[0] || ""}
                onChange={(e) => setSelected({ ...selected, followUpDate: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-200 text-sm"
              />
            </div>

            <button
              onClick={() => updateInquiry(selected.id, {
                status: selected.status,
                notes: selected.notes,
                followUpDate: selected.followUpDate,
              })}
              className="w-full py-2 bg-charcoal text-white text-sm hover:bg-charcoal/90"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
