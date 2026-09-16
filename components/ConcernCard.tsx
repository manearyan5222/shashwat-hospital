import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ConcernCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function ConcernCard({ icon: Icon, label, href }: ConcernCardProps) {
  return (
    <Link
      href={href}
      className="group block p-[28px_20px] bg-white border border-[#E2E8F0] rounded-[16px] text-center transition-all duration-200 hover:bg-[#F0F9FA] hover:shadow-[0_4px_12px_rgba(11,37,69,0.08)] hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7490]"
    >
      <div className="w-12 h-12 mx-auto mb-3.5 flex items-center justify-center text-[#0E7490] group-hover:scale-105 transition-transform">
        <Icon className="w-8 h-8" strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#0B2545] transition-colors leading-snug">
        {label}
      </h3>
    </Link>
  );
}
