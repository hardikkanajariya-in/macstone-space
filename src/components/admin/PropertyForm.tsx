"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROPERTY_CATEGORIES, PROPERTY_STATUSES } from "@/lib/constants";

interface PropertyFormProps {
  initialData?: Record<string, unknown>;
  propertyId?: string;
  images?: { id: string; url: string; alt?: string | null; order: number }[];
}

export function PropertyForm({ initialData, propertyId, images = [] }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageList, setImageList] = useState(images);
  const [uploading, setUploading] = useState(false);

  const isEdit = !!propertyId;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setImageList((prev) => [
          ...prev,
          { id: data.publicId, url: data.url, alt: "", order: prev.length },
        ]);
      }
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      propertyType: formData.get("propertyType"),
      category: formData.get("category"),
      status: formData.get("status"),
      price: Number(formData.get("price")),
      priceLabel: formData.get("priceLabel"),
      area: formData.get("area") ? Number(formData.get("area")) : undefined,
      configuration: formData.get("configuration"),
      possession: formData.get("possession"),
      ownership: formData.get("ownership"),
      facing: formData.get("facing"),
      location: formData.get("location"),
      city: formData.get("city"),
      address: formData.get("address"),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      highlights: formData.get("highlights"),
      amenities: formData.get("amenities"),
      investmentNotes: formData.get("investmentNotes"),
      locationAdvantages: formData.get("locationAdvantages"),
      seoTitle: formData.get("seoTitle"),
      seoDescription: formData.get("seoDescription"),
      seoKeywords: formData.get("seoKeywords"),
    };

    try {
      const url = isEdit ? `/api/properties/${propertyId}` : "/api/properties";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      const property = await res.json();

      if (imageList.length > 0 && !isEdit) {
        await fetch(`/api/properties/${property.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: imageList }),
        });
      }

      router.push("/admin/properties");
      router.refresh();
    } catch {
      setError("Failed to save property");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-200 text-sm focus:border-accent focus:outline-none";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

  const get = (key: string) => (initialData?.[key] as string) || "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Title *</label>
            <input name="title" required defaultValue={get("title")} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Short Description</label>
            <input name="shortDescription" defaultValue={get("shortDescription")} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description *</label>
            <textarea name="description" required rows={6} defaultValue={get("description")} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className={labelClass}>Property Type *</label>
            <input name="propertyType" required defaultValue={get("propertyType")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select name="category" required defaultValue={get("category")} className={inputClass}>
              <option value="">Select</option>
              {PROPERTY_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" defaultValue={get("status") || "available"} className={inputClass}>
              {PROPERTY_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Configuration</label>
            <input name="configuration" defaultValue={get("configuration")} className={inputClass} placeholder="e.g. 3 BHK" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Pricing & Specifications</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Price (INR) *</label>
            <input name="price" type="number" required defaultValue={get("price")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Price Label</label>
            <input name="priceLabel" defaultValue={get("priceLabel")} className={inputClass} placeholder="e.g. ₹1.50 Cr" />
          </div>
          <div>
            <label className={labelClass}>Area (sq.ft)</label>
            <input name="area" type="number" defaultValue={get("area")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Possession</label>
            <input name="possession" defaultValue={get("possession")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ownership</label>
            <input name="ownership" defaultValue={get("ownership")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Facing</label>
            <input name="facing" defaultValue={get("facing")} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Location</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Location *</label>
            <input name="location" required defaultValue={get("location")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="city" defaultValue={get("city") || "Ahmedabad"} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Full Address</label>
            <input name="address" defaultValue={get("address")} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Details</h2>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Highlights (JSON array)</label>
            <textarea name="highlights" rows={3} defaultValue={get("highlights")} className={`${inputClass} resize-y font-mono text-xs`} placeholder='["Highlight 1", "Highlight 2"]' />
          </div>
          <div>
            <label className={labelClass}>Amenities (JSON array)</label>
            <textarea name="amenities" rows={3} defaultValue={get("amenities")} className={`${inputClass} resize-y font-mono text-xs`} placeholder='["Pool", "Gym"]' />
          </div>
          <div>
            <label className={labelClass}>Investment Notes</label>
            <textarea name="investmentNotes" rows={3} defaultValue={get("investmentNotes")} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className={labelClass}>Location Advantages (JSON)</label>
            <textarea name="locationAdvantages" rows={4} defaultValue={get("locationAdvantages")} className={`${inputClass} resize-y font-mono text-xs`} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">Images</h2>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="text-sm" />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {imageList.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imageList.map((img, i) => (
              <img key={i} src={img.url} alt="" className="w-24 h-24 object-cover border" />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-medium">SEO</h2>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input name="seoTitle" defaultValue={get("seoTitle")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea name="seoDescription" rows={2} defaultValue={get("seoDescription")} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className={labelClass}>SEO Keywords</label>
            <input name="seoKeywords" defaultValue={get("seoKeywords")} className={inputClass} placeholder="comma, separated, keywords" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={!!initialData?.featured} />
            Featured Property
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={!!initialData?.published} />
            Published
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Property" : "Create Property"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-200 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
