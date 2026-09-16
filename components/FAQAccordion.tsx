"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
  className?: string;
}

export function FAQAccordion({ faqs, allowMultiple = false, className }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFAQ = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-white border-teal-300 shadow-sm ring-1 ring-teal-500/20"
                : "bg-white border-surface-border hover:border-slate-300"
            )}
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-2xl"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-bold text-sm sm:text-base text-navy-950">
                {faq.question}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                  isOpen ? "bg-teal-50 text-teal-800 rotate-180" : "bg-slate-100 text-slate-600"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-surface-muted leading-relaxed border-t border-slate-100 pt-3">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
