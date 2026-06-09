"use client";

import { useEffect, useState } from "react";

interface ContentItem {
  id: string;
  key: string;
  value: string;
}

const contentSections = [
  { label: "Homepage", keys: ["hero_headline", "hero_subheadline", "intro_title", "intro_text"] },
  { label: "About Page", keys: ["about_story", "founder_message", "vision", "mission"] },
];

const keyLabels: Record<string, string> = {
  hero_headline: "Hero Headline",
  hero_subheadline: "Hero Subheadline",
  intro_title: "Introduction Title",
  intro_text: "Introduction Text",
  about_story: "Company Story",
  founder_message: "Founder Message",
  vision: "Vision",
  mission: "Mission",
};

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data: ContentItem[]) => {
        const map: Record<string, string> = {};
        data.forEach((item) => { map[item.key] = item.value; });
        setContent(map);
        setLoading(false);
      });
  }, []);

  const handleSave = async (key: string) => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: content[key] }),
    });
    setSaving(false);
    setMessage("Saved successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Content Management</h1>
      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      {contentSections.map((section) => (
        <div key={section.label} className="bg-white border border-gray-200 p-6 mb-6 space-y-5">
          <h2 className="font-medium">{section.label}</h2>
          {section.keys.map((key) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                {keyLabels[key] || key}
              </label>
              <textarea
                value={content[key] || ""}
                onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                rows={key.includes("text") || key.includes("message") || key.includes("story") ? 4 : 2}
                className="w-full px-3 py-2 border border-gray-200 text-sm resize-y focus:outline-none focus:border-accent"
              />
              <button
                onClick={() => handleSave(key)}
                disabled={saving}
                className="mt-2 px-4 py-1.5 bg-charcoal text-white text-xs hover:bg-charcoal/90 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
