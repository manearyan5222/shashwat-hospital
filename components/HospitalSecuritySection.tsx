"use client";

import React from "react";
import { Shield, Building2, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";

export const HospitalSecuritySection: React.FC = () => {
  return (
    <section id="hospital-safety" className="py-24 relative overflow-hidden bg-[#0B132B]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4" />
            <span>Structured Surgical Infection Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Institutional Clinical Safety <span className="gradient-text-teal">Built Around You</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Surgical suite safety requires strict environmental controls. Shashwat Hospital features modular laminar airflow suites with positive pressure HEPA filtration, digital X-rays, and structured bedside physical therapy.
          </p>
        </div>

        {/* 3-Tier Safety Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-teal-500/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 text-teal-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-1">
              Surgical Cleanroom Suite
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Modular Laminar Airflow OTs</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Positive pressure vertical laminar airflow with HEPA filtration to maintain cleanroom air quality during complex joint and spine surgeries.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>HEPA particle air filtration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Integrated HD endoscopic towers</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              Sterilization Standards
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Autoclave & Instrument Care</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Strict multi-stage autoclave sterilization protocols for all surgical instrumentation and specialized orthopaedic implant sets.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Sterile barrier packaging checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Pre-op patient safety checklists</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
              Inpatient Care Unit
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Motorized Beds & Rehab Gym</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Barrier-free rooms with grab bars, adjustable orthopaedic beds, and dedicated physical therapy for early gait & mobility retraining.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Multimodal pain relief protocol</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Bedside physiotherapist evaluation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Verified Clinical Indicators */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl font-extrabold text-teal-400 font-mono block mb-1">HEPA Class</span>
            <span className="text-xs text-slate-400">Laminar Airflow Cleanroom</span>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono block mb-1">Digital</span>
            <span className="text-xs text-slate-400">High-Resolution Radiography</span>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-indigo-400 font-mono block mb-1">Day 1</span>
            <span className="text-xs text-slate-400">Bedside Physiotherapy</span>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono block mb-1">24/7</span>
            <span className="text-xs text-slate-400">Trauma & Emergency Care</span>
          </div>
        </div>
      </div>
    </section>
  );
};
