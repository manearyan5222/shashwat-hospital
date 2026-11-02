"use client";

import React, { useState } from "react";
import { Activity, Check, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";

interface SurgicalTechCustomizerProps {
  onOpenBooking: () => void;
}

interface TechSpec {
  id: string;
  name: string;
  tagline: string;
  gradientClass: string;
  badgeBg: string;
  textColor: string;
  category: string;
}

const TECH_SPECS: TechSpec[] = [
  {
    id: "titanium-knee",
    name: "High-Flex Titanium Knee System",
    tagline: "Biocompatible ultra-flex joint design for deep squatting and bending",
    gradientClass: "from-slate-950 via-slate-900 to-teal-950 border-teal-500/40",
    badgeBg: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    textColor: "text-white",
    category: "JOINT REPLACEMENT",
  },
  {
    id: "arthroscopy-keyhole",
    name: "Sub-2mm Keyhole Arthroscopy",
    tagline: "4K High-Definition joint endoscopy for ligament & meniscus repair",
    gradientClass: "from-[#0B172A] via-cyan-950 to-slate-950 border-cyan-500/40",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    textColor: "text-cyan-100",
    category: "SPORTS MEDICINE",
  },
  {
    id: "ceramic-hip",
    name: "Ceramic-on-Ceramic Hip Bearing",
    tagline: "Ultra-low friction diamond-hard ceramic surface lasting 30+ years",
    gradientClass: "from-indigo-950 via-slate-900 to-slate-950 border-indigo-500/40",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    textColor: "text-indigo-100",
    category: "HIP ARTHROPLASTY",
  },
  {
    id: "c-arm-trauma",
    name: "3D Digital C-Arm Radiography",
    tagline: "Sub-millimeter real-time intraoperative fracture alignment guidance",
    gradientClass: "from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/40",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    textColor: "text-emerald-100",
    category: "TRAUMA CARE",
  },
];

export const SurgicalTechCustomizer: React.FC<SurgicalTechCustomizerProps> = ({ onOpenBooking }) => {
  const [selectedTech, setSelectedTech] = useState<TechSpec>(TECH_SPECS[0]);
  const [patientName, setPatientName] = useState<string>("SURGICAL SPECIFICATION");
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
    <section id="surgical-tech" className="py-24 relative overflow-hidden bg-[#0B132B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity className="w-4 h-4" />
            <span>Surgical Technology & Implants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Institutional-Grade Implants <span className="gradient-text-teal">Customized for You</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Every joint replacement and trauma procedure at Shashwat Hospital utilizes imported titanium alloys, 4K HD keyhole endoscopes, and laser-guided alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Interactive Tech Card Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateDeg.x}deg) rotateY(${rotateDeg.y}deg)`,
                transition: rotateDeg.x === 0 ? "all 0.5s ease" : "none",
              }}
              className={`w-full max-w-md aspect-[1.586/1] rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${selectedTech.gradientClass} border shadow-2xl shadow-teal-500/10 flex flex-col justify-between relative overflow-hidden cursor-pointer select-none group`}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-400/20 border border-teal-400/40 flex items-center justify-center">
                    <span className="font-extrabold text-teal-400 text-sm">S</span>
                  </div>
                  <span className="font-bold text-white text-base tracking-wider">SHASHWAT HOSPITAL</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${selectedTech.badgeBg}`}>
                  {selectedTech.category}
                </span>
              </div>

              {/* Center Tech Name */}
              <div className="z-10 my-4">
                <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest block mb-1">
                  CLASS 100 STERILE SYSTEM
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {selectedTech.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{selectedTech.tagline}</p>
              </div>

              {/* Bottom Row */}
              <div className="z-10 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                    CLINICAL STANDARD
                  </span>
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    {patientName}
                  </span>
                </div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                  NABH ACCREDITED
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Hover & tilt card to inspect 3D surgical technology specification
            </p>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Surgical Plan Label
              </label>
              <input
                type="text"
                maxLength={30}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value.toUpperCase())}
                placeholder="ENTER SPECIFICATION LABEL"
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/60 text-white font-mono uppercase focus:outline-none focus:border-teal-500 transition-colors text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Select Surgical Tech & Implant System
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TECH_SPECS.map((tech) => {
                  const isSelected = selectedTech.id === tech.id;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTech(tech)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/10"
                          : "border-white/5 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">{tech.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 leading-tight">{tech.tagline}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sub-mm Alignment</h4>
                  <p className="text-[11px] text-slate-400">Zero leg length discrepancy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">30+ Yr Longevity</h4>
                  <p className="text-[11px] text-slate-400">FDA-approved implants</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Consult Surgeon on Implants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
