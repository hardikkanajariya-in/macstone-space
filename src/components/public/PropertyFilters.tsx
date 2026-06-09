"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PROPERTY_CATEGORIES, PROPERTY_STATUSES } from "@/lib/constants";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/properties");
  };

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-11 pr-4 py-3 border border-border bg-transparent text-sm focus:border-accent transition-colors"
          />
        </form>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-sm hover:border-charcoal transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-muted hover:text-foreground transition-colors"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-surface-warm border border-border-light">
          <div>
            <label className="label text-[0.625rem] mb-2 block">Category</label>
            <select
              value={searchParams.get("category") || ""}
              onChange={(e) => updateParams("category", e.target.value)}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm"
            >
              <option value="">All Categories</option>
              {PROPERTY_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label text-[0.625rem] mb-2 block">Location</label>
            <input
              defaultValue={searchParams.get("location") || ""}
              onBlur={(e) => updateParams("location", e.target.value)}
              placeholder="e.g. Navrangpura"
              className="w-full px-3 py-2.5 border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label className="label text-[0.625rem] mb-2 block">Status</label>
            <select
              value={searchParams.get("status") || ""}
              onChange={(e) => updateParams("status", e.target.value)}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm"
            >
              <option value="">All Status</option>
              {PROPERTY_STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label text-[0.625rem] mb-2 block">Featured</label>
            <select
              value={searchParams.get("featured") || ""}
              onChange={(e) => updateParams("featured", e.target.value)}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm"
            >
              <option value="">All Properties</option>
              <option value="true">Featured Only</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
