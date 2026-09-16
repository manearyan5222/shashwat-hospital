import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FacilityCard } from "@/components/FacilityCard";
import { CTASection } from "@/components/CTASection";
import { facilitiesData } from "@/data/facilities";
import { ShieldCheck, Building, Clock, HeartPulse, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Hospital Facilities & Surgical Infrastructure | Shashwat Hospital Nerul",
  description:
    "Explore our specialized medical facilities at Shashwat Hospital in Nerul, Navi Mumbai: Modular Laminar Airflow Operation Theatres, 24/7 Trauma Unit, Digital X-Ray, Inpatient Rooms, and Rehabilitation Gym.",
};

export default function FacilitiesPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Hospital Facilities" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Specialized Surgical & Recovery Infrastructure</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Facilities Designed for Sterile Surgery and Patient Comfort
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            From ultra-clean laminar airflow surgical suites to barrier-free recovery rooms and our dedicated rehabilitation gym, our hospital environment is engineered for safety, sterility, and swift functional recovery.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilitiesData.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>

        {/* Sterility & Safety Protocols */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-elevated">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Orthopaedic Sterility & Infection Control Standards
              </h2>
              <p className="text-xs text-slate-300">
                Rigorous biomedical safety and surgical infection control protocols in Nerul.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">
                Laminar Airflow & HEPA
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuous positive-pressure filtered airflow in joint replacement suites to maintain sterile air quality.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">
                Autoclave & Sterilization
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hospital Central Sterile Services Department (CSSD) strictly adheres to high-temperature surgical instrument sterilization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">
                Barrier-Free Accessibility
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ramps, wide doors, grab bars in recovery bathrooms, and wheelchair assistance from reception to inpatient beds.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Experience Patient-Centred Care at Shashwat Hospital"
            subtitle="Visit our hospital in Nerul, Navi Mumbai for specialist consultations and complete orthopaedic diagnostic evaluation."
          />
        </div>
      </Container>
    </div>
  );
}
