import React from "react";
import Link from "next/link";
import { Treatment } from "@/data/treatments";

interface TreatmentCardProps {
  treatment?: Treatment;
  title?: string;
  shortDescription?: string;
  category?: string;
  href?: string;
}

export function TreatmentCard({
  treatment,
  title = treatment?.title || "",
  shortDescription = treatment?.shortDescription || "",
  category = treatment?.categoryLabel || "",
  href = treatment ? `/treatments/${treatment.slug}` : "#",
}: TreatmentCardProps) {
  // Convert category label to sentence case (e.g. "Joint replacement", "Arthroscopy & sports")
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "";

  return (
    <Link
      href={href}
      className="group block p-6 bg-white border border-[#E2E8F0] rounded-[10px] transition-all duration-200 hover:border-[#0E7490]/40 hover:shadow-[0_2px_8px_rgba(11,37,69,0.06)] flex flex-col justify-between"
    >
      <div className="space-y-2">
        {formattedCategory && (
          <span className="text-[12px] font-semibold text-[#0E7490] block">
            {formattedCategory}
          </span>
        )}
        <h3 className="text-[20px] font-semibold text-[#0B2545] leading-snug group-hover:text-[#0E7490] transition-colors">
          {title}
        </h3>
        <p className="text-[14px] text-[#64748B] leading-relaxed line-clamp-2">
          {shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E2E8F0]/60 text-xs font-semibold text-[#0B2545] group-hover:text-[#0E7490] flex items-center justify-between">
        <span>Explore treatment details</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
