"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Activity,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Eye,
  EyeOff,
  Flame,
} from "lucide-react";
import { hospitalData } from "@/data/hospital";
import { doctorsData } from "@/data/doctors";
import { departmentsData } from "@/data/departments";
import { isVerified } from "@/lib/verify";

interface TaraHospitalHeroProps {
  onOpenBooking: () => void;
}

export const TaraHospitalHero: React.FC<TaraHospitalHeroProps> = ({ onOpenBooking }) => {
  const [careMode, setCareMode] = useState<"opd" | "emergency">("opd");
  const [hideLiveStats, setHideLiveStats] = useState(false);

  const emergencyPhone = getVerifiedPhone(hospitalData.contact.emergencyHotline);
  const primaryPhone = getVerifiedPhone(hospitalData.contact.primaryPhone);

  function getVerifiedPhone(val?: string) {
    return isVerified(val) ? val : null;
  }

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#0B132B]">
      {/* Dynamic Cyan & Teal Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/20 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>{hospitalData.name} · {hospitalData.location.locality}, {hospitalData.location.city}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              {hospitalData.tagline.split(".")[0] || "Move Better."} <br className="hidden sm:inline" />
              <span className="gradient-text-teal">
                {hospitalData.tagline.split(".")[1] || "Live Better."}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hospitalData.shortDescription} Structured clinical care from outpatient specialist consultation to laminar airflow surgery and bedside rehabilitation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Book Priority OPD Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {emergencyPhone ? (
                <a
                  href={`tel:${emergencyPhone}`}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel border border-red-500/30 text-red-300 font-bold text-base hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-red-400 animate-pulse" />
                  <span>Call Emergency: {emergencyPhone}</span>
                </a>
              ) : (
                <Link
                  href="/emergency"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel border border-red-500/30 text-red-300 font-bold text-base hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Flame className="w-5 h-5 text-red-400" />
                  <span>24/7 Trauma Information</span>
                </Link>
              )}
            </div>

            {/* Verified Feature Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-slate-300 text-xs sm:text-sm">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Laminar Airflow OTs</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Day 1 Bedside Physio</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Digital Radiography</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Medical Care Interactive Dashboard */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/20 bg-[#0B172A]/90 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Care Mode Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/5 mb-6">
                <button
                  onClick={() => setCareMode("opd")}
                  className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    careMode === "opd"
                      ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Specialty OPD Desk</span>
                </button>
                <button
                  onClick={() => setCareMode("emergency")}
                  className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    careMode === "emergency"
                      ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Emergency & Trauma</span>
                </button>
              </div>

              {/* Verified Status Box */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 relative overflow-hidden mb-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {careMode === "opd" ? "Outpatient Specialty OPD" : "24/7 Acute Care & OT"}
                  </span>
                  <button
                    onClick={() => setHideLiveStats(!hideLiveStats)}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {hideLiveStats ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight my-2">
                  {hideLiveStats ? "••••••••" : careMode === "opd" ? "Mon – Sat Consultations" : "24 Hours Operational"}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 font-mono">
                  <Activity className="w-4 h-4" />
                  <span>
                    {careMode === "opd"
                      ? `${departmentsData.length} Specialized Departments`
                      : "Laminar Airflow Suite & Digital C-Arm"}
                  </span>
                </div>
              </div>

              {/* Verified Doctors / Facilities List */}
              <div className="space-y-3 mb-6">
                {careMode === "opd" ? (
                  doctorsData.slice(0, 2).map((doc) => (
                    <div key={doc.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                          {doc.departmentId.slice(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{doc.salutation} {doc.name}</div>
                          <div className="text-xs text-slate-400">{doc.designation}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-teal-400">OPD OPD</div>
                        <div className="text-[11px] text-slate-400">Nerul Hub</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-red-500/20 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-xs">
                          OT
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Modular Laminar Airflow OT</div>
                          <div className="text-xs text-slate-400">HEPA Filtered Cleanroom</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-emerald-400">Sterile Suite</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                          XRAY
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Digital Radiography Suite</div>
                          <div className="text-xs text-slate-400">High-Resolution Diagnostic Imaging</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-teal-400">Immediate</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onOpenBooking}
                  className="py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Schedule OPD</span>
                </button>
                <Link
                  href="/emergency"
                  className="py-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900/60 transition-colors text-center"
                >
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>Emergency Info</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
