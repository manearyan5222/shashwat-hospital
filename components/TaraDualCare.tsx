"use client";

import React from "react";
import { Stethoscope, Activity, Sparkles, ShieldCheck, Flame, RefreshCw, Zap, ArrowRight } from "lucide-react";

interface TaraDualCareProps {
  onOpenBooking: () => void;
}

export const TaraDualCare: React.FC<TaraDualCareProps> = ({ onOpenBooking }) => {
  return (
    <section id="dual-care" className="py-24 relative overflow-hidden bg-[#0B132B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <RefreshCw className="w-4 h-4" />
            <span>Dual Clinical Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Two specialized medical wings. <br />
            <span className="gradient-text-teal">One continuous recovery pathway.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            General clinics lack advanced surgical cleanrooms, while giant corporate hospitals cause registration chaos. Shashwat Hospital merges specialist OPD care with ultra-clean surgical infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Outpatient Specialty Hub */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-teal-500/30 bg-gradient-to-b from-slate-900/90 via-[#0B172A]/90 to-teal-950/20 relative overflow-hidden group hover:border-teal-500/60 transition-all duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Stethoscope className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono font-bold border border-teal-500/20">
                SPECIALTY OPD
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Outpatient Specialty Hub
            </h3>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Your diagnostic & non-surgical preservation center. Consult orthopaedic consultants with zero registration queues, digital X-rays, and targeted joint injections.
            </p>

            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Precision clinical Joint & Spine examinations</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>High-resolution Digital X-Ray & MRI coordination</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Non-surgical cartilage & ligament preservation</span>
              </li>
            </ul>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/40 text-teal-300 font-bold text-sm hover:bg-teal-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Outpatient Consultations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: 24/7 Surgical & Emergency Wing */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-rose-500/30 bg-gradient-to-b from-slate-900/90 via-[#0B172A]/90 to-rose-950/20 relative overflow-hidden group hover:border-rose-500/60 transition-all duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Flame className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold border border-rose-500/20">
                24/7 SURGICAL OT
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              24/7 Surgical & Trauma Wing
            </h3>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Your surgical excellence sanctuary. Class 100 HEPA laminar airflow operation theatres, sub-millimeter joint replacement alignment, and 24/7 emergency fracture intake.
            </p>

            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Laminar Airflow cleanrooms with zero-infection protocols</span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Minimally invasive keyhole arthroscopy</span>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Day 1 post-op bedside physiotherapist mobilization</span>
              </li>
            </ul>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 font-bold text-sm hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Surgical Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
