"use client";

import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { articlesData, HealthArticle } from "@/data/articles";
import { Search, BookOpen, ShieldCheck } from "lucide-react";

const categories = [
  "ALL",
  "Joint Health",
  "Spine Health",
  "Sports Injuries",
  "Bone Health",
  "Physiotherapy",
];

export default function HealthLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === "ALL" || article.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Health Library" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Evidence-Based Healthcare Guides</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Orthopaedic & Joint Health Library
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Physician-reviewed articles, joint preservation guidelines, ergonomic advice, and surgical recovery timelines written for patients and families.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by topic (e.g., knee arthritis, ergonomics, ACL, bone density)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 text-navy-950"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-navy-950">
              No articles found matching your criteria.
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or browse all categories.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Need Personalized Advice for Your Joint Health?"
            subtitle="Our orthopaedic specialists in Nerul are available for outpatient consultations and thorough clinical evaluations."
          />
        </div>
      </Container>
    </div>
  );
}
