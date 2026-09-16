"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calendar, AlertCircle } from "lucide-react";
import { hospitalData } from "@/data/hospital";

interface MobileActionBarProps {
  phoneNumber?: string;
  appointmentHref?: string;
}

export function MobileActionBar({
  phoneNumber = hospitalData.contact.primaryPhone,
  appointmentHref = "/appointment",
}: MobileActionBarProps) {
  const emergencyNumber = hospitalData.contact.emergencyHotline;

  return (
    <nav
      aria-label="Mobile Navigation Quick Bar"
      className="fixed bottom-0 left-0 right-0 z-50 h-[64px] bg-[#FFFFFF] border-t border-[#E2E8F0] shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:hidden flex items-center justify-around"
    >
      {/* 1. CALL */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 h-full flex flex-col items-center justify-center text-[#0F172A] hover:bg-slate-50 active:bg-slate-100 transition-colors"
        aria-label="Call Hospital OPD"
      >
        <Phone className="w-5 h-5 text-[#0E7490] mb-0.5" />
        <span className="text-[11px] font-semibold tracking-tight">CALL</span>
      </a>

      {/* 2. BOOK */}
      <Link
        href={appointmentHref}
        className="flex-1 h-full flex flex-col items-center justify-center text-[#0B2545] border-x border-[#E2E8F0] hover:bg-slate-50 active:bg-slate-100 transition-colors"
        aria-label="Book Appointment"
      >
        <Calendar className="w-5 h-5 text-[#0B2545] mb-0.5" />
        <span className="text-[11px] font-bold tracking-tight">BOOK</span>
      </Link>

      {/* 3. EMERGENCY */}
      <a
        href={`tel:${emergencyNumber}`}
        className="flex-1 h-full flex flex-col items-center justify-center text-[#DC2626] hover:bg-red-50 active:bg-red-100 transition-colors"
        aria-label="Call 24/7 Emergency Care"
      >
        <AlertCircle className="w-5 h-5 text-[#DC2626] mb-0.5 animate-pulse" />
        <span className="text-[11px] font-bold tracking-tight text-[#DC2626]">EMERGENCY</span>
      </a>
    </nav>
  );
}
