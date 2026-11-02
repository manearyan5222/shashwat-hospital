"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Footprints, ShieldCheck, Sparkles, Zap } from "lucide-react";

interface CustomOrthoticsAnalyzerProps {
  onOpenBooking: () => void;
}

interface ArchType {
  id: string;
  name: string;
  description: string;
  recommendedInsole: string;
  supportLevel: string;
}

const ARCH_TYPES: ArchType[] = [
  {
    id: "flat-feet",
    name: "Flat Feet / Low Arch (Overpronation)",
    description: "Foot rolls inward excessively; causes heel, knee, and lower back fatigue.",
    recommendedInsole: "Rigid Medial Arch Support + Deep Heel Cup Stabilizer",
    supportLevel: "Maximum Motion Control",
  },
  {
    id: "neutral-arch",
    name: "Normal / Neutral Arch",
    description: "Even weight distribution; requires shock absorption and fatigue reduction for long standing.",
    recommendedInsole: "Semi-Rigid Dynamic Arch Cushion + Metatarsal Pad",
    supportLevel: "Balanced Cushioning",
  },
  {
    id: "high-arch",
    name: "High Arch (Underpronation / Supination)",
    description: "Excessive pressure on heel and ball of foot; risk of plantar fasciitis and stress fractures.",
    recommendedInsole: "Full-Length Soft Metatarsal Cushion + Lateral Wedge",
    supportLevel: "High Impact Absorption",
  },
];

export const CustomOrthoticsAnalyzer: React.FC<CustomOrthoticsAnalyzerProps> = ({ onOpenBooking }) => {
  const [selectedArch, setSelectedArch] = useState<ArchType>(ARCH_TYPES[0]);
  const [activityLevel, setActivityLevel] = useState<string>("standing");
  const [patientLabel, setPatientLabel] = useState<string>("CUSTOM 3D LASER SCAN");
  const [rotateDeg, setRotateDeg] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateDeg({ x: -(y / 15), y: x / 15 });
  };

  const handleMouseLeave = () => {
    setRotateDeg({ x: 0, y: 0 });
  };

  return (
    <section id="custom-orthotics" className="py-20 bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Footprints className="w-4 h-4" />
            <span>Biomechanical Footwear & Custom Orthotics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            3D Laser Scanned <span className="gradient-text-teal">Custom Medical Orthotics</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Standard store-bought insoles fail because they don&apos;t correct biomechanical ankle alignment. Our orthopaedic clinic utilizes 3D laser pressure-plate scanning to fabricate custom orthotic insoles tailored to your precise foot structure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 3D Interactive Orthotic Preview Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateDeg.x}deg) rotateY(${rotateDeg.y}deg)`,
                transition: rotateDeg.x === 0 ? "all 0.5s ease" : "none",
              }}
              className="w-full max-w-md aspect-[1.586/1] rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-[#0B172A] to-teal-950 border border-teal-500/40 shadow-2xl shadow-teal-500/10 flex flex-col justify-between relative overflow-hidden cursor-pointer select-none group"
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-400/20 border border-teal-400/40 flex items-center justify-center">
                    <Footprints className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="font-bold text-white text-base tracking-wider">SHASHWAT FOOT CARE</span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedArch.supportLevel}
                </span>
              </div>

              {/* Center Arch Details */}
              <div className="z-10 my-3">
                <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest block mb-1">
                  BIOMECHANICAL SCAN RESULT
                </span>
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  {selectedArch.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{selectedArch.recommendedInsole}</p>
              </div>

              {/* Bottom Row */}
              <div className="z-10 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                    SPECIFICATION LABEL
                  </span>
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    {patientLabel || "MEDICAL ORTHOTIC"}
                  </span>
                </div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                  3D SCAN GUARANTEE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Hover & tilt card to inspect 3D orthotic biomechanical specification
            </p>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Your Foot Arch Structure:
              </label>
              <div className="space-y-2">
                {ARCH_TYPES.map((arch) => {
                  const isSelected = selectedArch.id === arch.id;
                  return (
                    <button
                      key={arch.id}
                      onClick={() => setSelectedArch(arch)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-teal-400 bg-teal-500/10 shadow-md shadow-teal-500/10"
                          : "border-white/5 bg-slate-900/60 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-xs text-white">{arch.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 leading-tight block">{arch.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Primary Daily Activity:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standing", label: "Prolonged Standing / Work" },
                  { id: "walking", label: "Walking & Daily Commute" },
                  { id: "sports", label: "Running & Sports Impact" },
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setActivityLevel(act.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                      activityLevel === act.id
                        ? "border-teal-400 bg-teal-500/10 text-teal-300 font-bold"
                        : "border-white/5 bg-slate-900/60 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
              <span className="text-xs text-slate-300">
                Custom orthotics covered under most insurance / TPA health policies.
              </span>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:shadow-xl hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule 3D Foot Gait Scan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
