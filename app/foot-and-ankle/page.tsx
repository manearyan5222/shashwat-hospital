"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FootPainZoneInteractive } from "@/components/FootPainZoneInteractive";
import { CustomOrthoticsAnalyzer } from "@/components/CustomOrthoticsAnalyzer";
import { QuickAppointmentModal } from "@/components/QuickAppointmentModal";

import {
  Footprints,
  ShieldCheck,
  Stethoscope,
  Activity,
  ArrowRight,
  CheckCircle2,
  Zap,
  Phone,
} from "lucide-react";
import { hospitalData } from "@/data/hospital";

export default function FootAndAnklePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* HERO BANNER FOR FOOT & ANKLE CLINIC */}
      <section className="relative pt-24 pb-20 bg-[#0B132B] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-teal-500/20 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Footprints className="w-4 h-4" />
              <span>Foot & Ankle Orthopaedic Centre of Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Specialized Foot & Ankle Care <br />
              <span className="gradient-text-teal">From Heel Pain to Custom Orthotics</span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed">
              Inspired by world-class podiatry and foot clinics, Shashwat Hospital delivers evidence-based orthopaedic care for plantar fasciitis, Achilles tendonitis, flat feet, bunions, and diabetic foot disorders in Nerul.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-teal-500/30 transition-all flex items-center gap-2"
              >
                <span>Book Foot & Ankle OPD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/appointment"
                className="px-6 py-4 rounded-2xl glass-panel border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                View Doctor Schedule
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* INTERACTIVE PAIN ZONE CHECKER */}
      <FootPainZoneInteractive onOpenBooking={() => setIsModalOpen(true)} />

      {/* 3D CUSTOM ORTHOTICS ANALYZER */}
      <CustomOrthoticsAnalyzer onOpenBooking={() => setIsModalOpen(true)} />

      {/* CLINICAL SERVICES LIST */}
      <section className="py-20 bg-[#0B172A] border-y border-white/10">
        <Container>
          <SectionHeading
            badge="Foot & Ankle Treatments"
            title="Comprehensive Foot Clinic Services"
            subtitle="From non-invasive laser 3D orthotics to sub-2mm keyhole arthroscopy and bunion correction."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Heel Pain & Plantar Fasciitis Clinic",
                desc: "Radial Extracorporeal Shockwave Therapy (ESWT) combined with custom calcaneal spur off-loading insoles for 95%+ success without surgery.",
              },
              {
                title: "Custom 3D Laser Orthotic Insoles",
                desc: "Pressure-plate dynamic gait scanning to fabricate medical-grade arch supports that realign ankle and knee joint axes.",
              },
              {
                title: "Minimally Invasive Bunion Correction",
                desc: "Keyhole mini-incision osteotomy for Hallux Valgus bunions allowing immediate post-op weight-bearing in specialized footwear.",
              },
              {
                title: "Achilles Tendon Repair & Arthroscopy",
                desc: "Sub-2mm endoscopic keyhole ligament tightener and PRP tendon injections for sports injuries and recurrent sprains.",
              },
              {
                title: "Diabetic Foot & Neuropathy Care",
                desc: "Comprehensive nerve sensitivity mapping, vascular Doppler checks, and custom depth footwear to prevent ulcers.",
              },
              {
                title: "Painless Ingrown Nail Matrixectomy",
                desc: "Permanent laser matrixectomy under local block with zero downtime and permanent prevention of ingrown toenails.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center mb-4 border border-teal-500/30 text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{service.desc}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-teal-400 hover:text-white inline-flex items-center gap-1 mt-2"
                >
                  <span>Book Consult</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MODAL */}
      <QuickAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDepartment="orthopaedics"
      />
    </>
  );
}
