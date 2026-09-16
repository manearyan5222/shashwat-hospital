import React from "react";
import Image from "next/image";
import { Facility } from "@/data/facilities";

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  // If image is unverified or VERIFY_WITH_HOSPITAL, do not render per Section C.3
  const isVerifiedPhoto =
    facility.imageUrl &&
    facility.imageUrl !== "VERIFY_WITH_HOSPITAL" &&
    facility.imageUrl.trim() !== "";

  if (!isVerifiedPhoto) {
    return null;
  }

  return (
    <div className="group bg-white rounded-[10px] border border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:shadow-[0_2px_8px_rgba(11,37,69,0.06)] flex flex-col justify-between">
      {/* 16:9 Image Top with rounded top corners */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden rounded-t-[10px]">
        <Image
          src={facility.imageUrl}
          alt={facility.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-[18px] font-semibold text-[#0B2545] leading-snug mb-1.5">
            {facility.title}
          </h3>
          <p className="text-[14px] text-[#64748B] leading-relaxed line-clamp-3">
            {facility.shortDescription}
          </p>
        </div>

        {facility.features && facility.features.length > 0 && (
          <div className="pt-3 border-t border-[#E2E8F0]/60 space-y-1">
            {facility.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E7490] mt-1.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
