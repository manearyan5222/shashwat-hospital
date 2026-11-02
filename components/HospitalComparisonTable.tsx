"use client";

import React from "react";
import { Check, X, RefreshCw } from "lucide-react";

export const HospitalComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      feature: "Specialist OPD Waiting Time",
      shashwat: "< 15 Mins (Priority Slot)",
      clinic: "1-2 Hours (Unpredictable)",
      corporate: "2-3 Hours (Long Queue)",
    },
    {
      feature: "Class 100 HEPA Laminar Airflow OTs",
      shashwat: true,
      clinic: false,
      corporate: true,
    },
    {
      feature: "Bedside Physiotherapy Starts",
      shashwat: "Day 1 (Within 24 Hours)",
      clinic: "Day 3-5 (Outsourced)",
      corporate: "Day 2-3 (Variable)",
    },
    {
      feature: "Transparent Package Pricing (No Hidden Fees)",
      shashwat: true,
      clinic: false,
      corporate: false,
    },
    {
      feature: "24/7 Fracture Trauma Intake & Digital C-Arm",
      shashwat: true,
      clinic: false,
      corporate: true,
    },
    {
      feature: "Direct Access to Senior Surgeon (Not Junior Residents)",
      shashwat: true,
      clinic: true,
      corporate: false,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B132B]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <RefreshCw className="w-4 h-4" />
            <span>Why Patients Choose Shashwat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Compare Shashwat with <span className="gradient-text-teal">conventional healthcare options</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Small nursing homes lack advanced surgical cleanrooms, while mega corporate chains charge exorbitant hidden fees with endless wait times. Shashwat provides corporate-grade surgical precision with personalized care.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/90 text-sm">
                  <th className="p-6 text-slate-300 font-bold w-1/3">Clinical Feature</th>
                  <th className="p-6 bg-teal-950/40 text-teal-400 font-extrabold border-x border-teal-500/20 text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center">S</div>
                      <span>Shashwat Hospital</span>
                    </div>
                  </th>
                  <th className="p-6 text-slate-400 font-semibold">Local General Clinics</th>
                  <th className="p-6 text-slate-400 font-semibold">Mega Corporate Chains</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-white font-medium">{row.feature}</td>

                    {/* Shashwat Column */}
                    <td className="p-6 bg-teal-950/20 font-bold text-teal-300 border-x border-teal-500/20">
                      {typeof row.shashwat === "boolean" ? (
                        row.shashwat ? (
                          <div className="flex items-center gap-2 text-teal-400">
                            <Check className="w-5 h-5 stroke-[3]" />
                            <span>Standard Protocol</span>
                          </div>
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )
                      ) : (
                        <span>{row.shashwat}</span>
                      )}
                    </td>

                    {/* General Clinic */}
                    <td className="p-6 text-slate-400">
                      {typeof row.clinic === "boolean" ? (
                        row.clinic ? (
                          <Check className="w-5 h-5 text-teal-500/70" />
                        ) : (
                          <X className="w-5 h-5 text-red-400/60" />
                        )
                      ) : (
                        <span>{row.clinic}</span>
                      )}
                    </td>

                    {/* Corporate Chain */}
                    <td className="p-6 text-slate-400">
                      {typeof row.corporate === "boolean" ? (
                        row.corporate ? (
                          <Check className="w-5 h-5 text-teal-500/70" />
                        ) : (
                          <X className="w-5 h-5 text-red-400/60" />
                        )
                      ) : (
                        <span>{row.corporate}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
