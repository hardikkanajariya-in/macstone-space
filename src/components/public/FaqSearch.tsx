"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { FaqAccordion } from "./FaqAccordion";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const categoryLabels: Record<string, string> = {
  general: "General",
  buying: "Buying",
  investment: "Investment",
  consultation: "Consultation",
  documentation: "Documentation",
};

export function FaqSearch({ faqs, categories }: { faqs: Faq[]; categories: string[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        !search ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, search, activeCategory]);

  const grouped = useMemo(() => {
    if (activeCategory) return { [activeCategory]: filtered };
    const groups: Record<string, Faq[]> = {};
    filtered.forEach((faq) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filtered, activeCategory]);

  return (
    <div>
      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-11 pr-4 py-3 border border-border bg-transparent text-sm focus:border-accent transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
            !activeCategory
              ? "bg-charcoal text-white"
              : "border border-border text-muted hover:border-charcoal"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
              activeCategory === cat
                ? "bg-charcoal text-white"
                : "border border-border text-muted hover:border-charcoal"
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-10">
          {!activeCategory && (
            <h2 className="label mb-6">{categoryLabels[category] || category}</h2>
          )}
          <FaqAccordion faqs={items} />
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">No questions found matching your search.</p>
      )}
    </div>
  );
}
