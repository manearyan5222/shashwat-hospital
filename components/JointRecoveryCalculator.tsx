"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowRight, ShieldCheck, Activity, Zap, Clock } from "lucide-react";

interface JointRecoveryCalculatorProps {
  onOpenBooking: () => void;
}

interface ConditionSpec {
  id: string;
  name: string;
  avgStandardDays: number;
  shashwatDays: number;
  description: string;
}

const CONDITIONS: ConditionSpec[] = [
  {
    id: "knee-oa",
    name: "Knee Osteoarthritis (Total Knee Replacement)",
    avgStandardDays: 90,
    shashwatDays: 28,
    description: "Day 1 bedside physiotherapy & sub-millimeter implant alignment for rapid walking.",
  },
  {
    id: "acl-tear",
    name: "ACL Ligament Tear (Arthroscopy Keyhole)",
    avgStandardDays: 120,
    shashwatDays: 45,
    description: "Anatomic autograft reconstruction with accelerated sports rehabilitation protocol.",
  },
  {
    id: "fracture",
    name: "Trauma & Fracture Fixation",
    avgStandardDays: 60,
    shashwatDays: 21,
    description: "24/7 immediate anatomical reduction & rigid internal fixation under C-arm guidance.",
  },
  {
    id: "shoulder",
    name: "Shoulder Rotator Cuff Repair",
    avgStandardDays: 105,
    shashwatDays: 35,
    description: "Minimally invasive keyhole anchor placement with early passive motion.",
  },
];

export const JointRecoveryCalculator: React.FC<JointRecoveryCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedCondition, setSelectedCondition] = useState<ConditionSpec>(CONDITIONS[0]);
  const [painLevel, setPainLevel] = useState<number>(7);

  const daysSaved = selectedCondition.avgStandardDays - selectedCondition.shashwatDays;
  const painReductionPercent = Math.round(90 + (painLevel * 0.9));

  return (
    <section id="recovery-calculator" className="py-24 relative overflow-hidden bg-teal-950/10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Accelerated Recovery Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Recover painless mobility <span className="gradient-text-teal">3x faster</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Unlike conventional hospitals with delayed rehab, Shashwat combines Day 1 bedside physical therapy with precision laminar surgery to return you to active life weeks ahead of standard timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Select Your Orthopaedic Condition
              </label>
              <div className="space-y-2.5">
                {CONDITIONS.map((cond) => {
                  const isSelected = selectedCondition.id === cond.id;
                  return (
                    <button
                      key={cond.id}
                      onClick={() => setSelectedCondition(cond)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex justify-between items-center ${
                        isSelected
                          ? "border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/10"
                          : "border-white/5 bg-slate-900/60 hover:bg-slate-800/60"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm text-white">{cond.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{cond.description}</div>
                      </div>
                      {isSelected && <Zap className="w-5 h-5 text-teal-400 shrink-0 ml-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-slate-300">Current Pain Level Index (1 - 10)</label>
                <span className="text-2xl font-bold text-amber-400 font-mono">
                  {painLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>1 (Mild Stiffness)</span>
                <span>5 (Moderate Pain)</span>
                <span>10 (Severe Mobility Loss)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                Bedside physiotherapy starts within <strong className="text-white">24 hours of procedure</strong>. Unlocked mobility with multimodal pain management and zero narcotics dependency.
              </p>
            </div>
          </div>

          {/* Result & Timeline Visualization */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-8 bg-gradient-to-b from-slate-900/90 to-teal-950/30">
            <div>
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Estimated Recovery Milestone Summary</span>
              <div className="mt-4 space-y-6">
                {/* Shashwat Accelerated Box */}
                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">Shashwat Accelerated Protocol</span>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1">
                        ~{selectedCondition.shashwatDays} Days to Full Mobility
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold font-mono">
                      Fast Track
                    </span>
                  </div>
                  <div className="w-full bg-slate-950/60 h-2.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full w-full animate-pulse" />
                  </div>
                </div>

                {/* Standard Conventional Hospital Box */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 opacity-75">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Standard Conventional Care</span>
                      <h4 className="text-xl font-bold text-slate-300 font-mono mt-1">
                        ~{selectedCondition.avgStandardDays} Days Average
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      Delayed Rehab
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-slate-600 h-full rounded-full"
                      style={{ width: `${Math.max(10, (selectedCondition.shashwatDays / selectedCondition.avgStandardDays) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Time Saved & CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Days Saved Back to Active Life</span>
                <span className="text-2xl font-extrabold text-teal-400 font-mono">
                  +{daysSaved} Days Faster Recovery
                </span>
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Consult Specialist Surgeon</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
