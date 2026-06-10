"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className={`font-display text-lg pr-8 group-hover:text-accent transition-colors ${
                isOpen ? "text-accent" : "text-foreground"
              }`}>
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-accent" : "text-muted"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed pr-8">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
