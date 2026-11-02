"use client";

import React, { useState } from "react";
import { Activity, ArrowRight, CheckCircle2, ShieldCheck, Stethoscope, Zap, HeartPulse } from "lucide-react";

interface FootPainZone {
  id: string;
  zoneName: string;
  iconTag: string;
  commonDiagnosis: string;
  symptoms: string[];
  recommendedCare: string;
  shashwatApproach: string;
}

const PAIN_ZONES: FootPainZone[] = [
  {
    id: "heel-pain",
    zoneName: "Heel & Plantar Surface",
    iconTag: "HEEL",
    commonDiagnosis: "Plantar Fasciitis / Calcaneal Spur",
    symptoms: [
      "Stabbing heel pain upon taking first steps in the morning",
      "Throbbing pain after prolonged standing or walking",
      "Tenderness along the bottom of the foot arch",
    ],
    recommendedCare: "Custom 3D Laser Orthotics & Radial Shockwave Therapy",
    shashwatApproach:
      "Non-surgical targeted shockwave therapy to stimulate tendon healing, coupled with custom rigid arch support orthotics for 95%+ symptom resolution.",
  },
  {
    id: "achilles-ankle",
    zoneName: "Achilles Tendon & Ankle Joint",
    iconTag: "ANKLE",
    commonDiagnosis: "Achilles Tendonitis / Ankle Instability / Sprain",
    symptoms: [
      "Pain and stiffness above the heel along the back of the leg",
      "Frequent ankle roll-over or sensation of joint giving way",
      "Swelling after sports or running activities",
    ],
    recommendedCare: "Anatomic Reconstruction & Keyhole Arthroscopy",
    shashwatApproach:
      "Precision ultrasound-guided PRP injections for mild tendonitis, or sub-2mm keyhole arthroscopic ligament tightener for chronic ankle instability.",
  },
  {
    id: "forefoot-toes",
    zoneName: "Forefoot & Toes (Bunions & Nails)",
    iconTag: "TOES",
    commonDiagnosis: "Hallux Valgus (Bunions) / Ingrown Nails / Neuroma",
    symptoms: [
      "Painful bony bump at the base of the big toe",
      "Burning pain between toes (Morton's Neuroma)",
      "Redness, swelling, and sharp pressure from ingrown toenails",
    ],
    recommendedCare: "Minimally Invasive Bunion Correction & Laser Excision",
    shashwatApproach:
      "Keyhole mini-incision bunion realigning osteotomy for rapid walking, and painless zero-recurrence ingrown nail matrixectomy.",
  },
  {
    id: "arch-flatfoot",
    zoneName: "Arch & Midfoot (Flat Feet & High Arches)",
    iconTag: "ARCH",
    commonDiagnosis: "Adult Acquired Flat Foot / Posterior Tibial Dysfunction",
    symptoms: [
      "Progressive flattening of the foot arch over time",
      "Pain along the inside of the foot and ankle",
      "Rapid fatigue and leg muscle cramps while walking",
    ],
    recommendedCare: "3D Biomechanical Gait Scanning & Custom Orthotic Insoles",
    shashwatApproach:
      "Computerized pressure-plate gait assessment to design medical-grade custom orthotic inserts that re-align the ankle and knee axis.",
  },
  {
    id: "diabetic-foot",
    zoneName: "Diabetic Foot & Neuropathy Care",
    iconTag: "DIABETIC",
    commonDiagnosis: "Diabetic Neuropathy / Foot Ulcer Risk / Numbness",
    symptoms: [
      "Tingling, numbness, or loss of sensation in toes and soles",
      "Slow-healing blisters, sores, or calluses",
      "Cold feet or reduced arterial pulse in lower limbs",
    ],
    recommendedCare: "Comprehensive Neuropathy Assessment & Off-Loading Footwear",
    shashwatApproach:
      "Monofilament nerve sensitivity mapping, Doppler vascular checks, and specialized diabetic custom depth footwear to prevent ulcers.",
  },
];

interface FootPainZoneProps {
  onOpenBooking: () => void;
}

export const FootPainZoneInteractive: React.FC<FootPainZoneProps> = ({ onOpenBooking }) => {
  const [selectedZone, setSelectedZone] = useState<FootPainZone>(PAIN_ZONES[0]);

  return (
    <section id="foot-pain-checker" className="py-20 bg-[#0B132B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity className="w-4 h-4" />
            <span>Interactive Foot & Ankle Pain Zone Checker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Where does your <span className="gradient-text-teal">foot or ankle hurt?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Inspired by specialized foot clinics, select your pain area below to explore accurate orthopaedic diagnoses, custom orthotic solutions, and specialized surgical care at Shashwat Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pain Zone Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Select Pain Zone:
            </span>
            {PAIN_ZONES.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/10"
                      : "border-white/5 bg-slate-900/60 hover:bg-slate-800/60 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center text-xs ${
                        isSelected
                          ? "bg-teal-400 text-slate-950 font-black"
                          : "bg-slate-800 text-slate-300 border border-white/5"
                      }`}
                    >
                      {zone.iconTag}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{zone.zoneName}</div>
                      <div className="text-xs text-slate-400">{zone.commonDiagnosis.split("/")[0]}</div>
                    </div>
                  </div>
                  {isSelected && <Zap className="w-4 h-4 text-teal-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Diagnosis & Treatment Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 bg-[#0B172A]/90 shadow-2xl space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block mb-1">
                  ORTHOPAEDIC EVALUATION · {selectedZone.iconTag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedZone.commonDiagnosis}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                Specialist Clinic
              </span>
            </div>

            {/* Typical Symptoms */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Key Symptoms & Warning Signs:
              </h4>
              <ul className="space-y-2">
                {selectedZone.symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Care & Approach */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span>Recommended Clinical Solution:</span>
              </div>
              <div className="text-sm font-semibold text-white">{selectedZone.recommendedCare}</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-white/5">
                {selectedZone.shashwatApproach}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Consult our Foot & Ankle Specialist in Nerul
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Book Foot & Ankle OPD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
