"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export function InvoiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const addItem = () => setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const taxRate = Number(formData.get("taxRate")) || 18;

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: formData.get("clientName"),
        clientEmail: formData.get("clientEmail"),
        clientPhone: formData.get("clientPhone"),
        clientAddress: formData.get("clientAddress"),
        description: formData.get("description"),
        taxRate,
        notes: formData.get("notes"),
        dueDate: formData.get("dueDate"),
        items: items.filter((i) => i.description && i.unitPrice > 0),
      }),
    });

    if (res.ok) {
      const invoice = await res.json();
      router.push(`/admin/invoices/${invoice.id}`);
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-accent";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Client Information</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Client Name *</label>
            <input name="clientName" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="clientEmail" type="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="clientPhone" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input name="dueDate" type="date" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <textarea name="clientAddress" rows={2} className={`${inputClass} resize-y`} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Line Items</h2>
          <button type="button" onClick={addItem} className="flex items-center gap-1 text-sm text-accent">
            <Plus size={14} /> Add Item
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-6">
              {i === 0 && <label className={labelClass}>Description</label>}
              <input
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                className={inputClass}
                placeholder="Service description"
              />
            </div>
            <div className="col-span-2">
              {i === 0 && <label className={labelClass}>Qty</label>}
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                className={inputClass}
                min={1}
              />
            </div>
            <div className="col-span-3">
              {i === 0 && <label className={labelClass}>Unit Price</label>}
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))}
                className={inputClass}
                min={0}
              />
            </div>
            <div className="col-span-1">
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(i)} className="p-2 text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        <p className="text-right text-sm font-medium">Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Tax Rate (%)</label>
            <input name="taxRate" type="number" defaultValue={18} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input name="description" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Notes</label>
            <textarea name="notes" rows={2} className={`${inputClass} resize-y`} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Invoice"}
      </button>
    </form>
  );
}
