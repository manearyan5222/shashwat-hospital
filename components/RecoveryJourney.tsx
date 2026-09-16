import React from "react";
import Link from "next/link";
import { rehabPathwayStages } from "@/data/patientJourney";
import {
  Stethoscope,
  Activity,
  HeartPulse,
  Dumbbell,
  Footprints,
  Sun,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const iconMap = [Stethoscope, Activity, HeartPulse, Dumbbell, Footprints, Sun];

export function RecoveryJourney() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <Container>
        <SectionHeading
          badge="Rehabilitation Pathway"
          title="Treatment Doesn't End in the Operating Room."
          subtitle="Surgical precision is only the beginning. True recovery happens through structured, evidence-based physiotherapy, restoring your strength, mobility, and confidence."
          centered
          light
        />

        {/* 6-Stage Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {rehabPathwayStages.map((stage, idx) => {
            const IconComponent = iconMap[idx % iconMap.length];
            return (
              <div
                key={stage.step}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-extrabold text-2xl text-teal-400/40">
                      0{stage.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 mb-1 block">
                    {stage.focusArea}
                  </span>

                  <h3 className="font-heading font-bold text-lg text-white mb-2.5">
                    {stage.stageName}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {stage.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Outcomes:
                  </span>
                  {stage.keyGoals.map((goal, gIdx) => (
                    <div key={gIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Medical disclaimer & CTA */}
        <div className="mt-12 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300">
              <span className="font-semibold text-white">Individualized Care: </span>
              Every rehabilitation plan is customized by your orthopaedic surgeon and physiotherapist based on your condition, bone quality, and functional goals.
            </p>
          </div>

          <Link
            href="/rehabilitation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs whitespace-nowrap shadow-md transition-all active:scale-95"
          >
            <span>Explore Physiotherapy Care</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
