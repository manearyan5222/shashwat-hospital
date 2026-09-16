import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import {
  PhoneCall,
  Navigation,
  AlertCircle,
  Clock,
  ShieldAlert,
  CheckCircle2,
  MapPin,
  Ambulance,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "24/7 Orthopaedic Emergency & Trauma Care | Shashwat Hospital Nerul",
  description:
    "Round-the-clock emergency care for acute bone fractures, joint dislocations, road traffic injuries, and severe orthopaedic trauma in Nerul, Navi Mumbai.",
};

export default function EmergencyPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "24/7 Emergency Care" }]} />

        {/* High-Visibility Emergency Header */}
        <div className="mt-6 p-8 sm:p-12 rounded-3xl bg-emergency text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Immediate Emergency & Trauma Intake</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              24/7 Orthopaedic Trauma & Emergency Service
            </h1>

            <p className="text-base sm:text-lg text-red-100 leading-relaxed">
              If you or a family member have suffered an acute bone fracture, high-energy fall, joint dislocation, or vehicular trauma, our emergency casualty unit in Nerul is staffed 24/7 for swift triage and surgical stabilization.
            </p>

            {/* Direct Emergency Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${hospitalData.contact.emergencyHotline}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-emergency font-extrabold text-base sm:text-lg hover:bg-red-50 active:scale-95 transition-all shadow-xl"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call Emergency: {hospitalData.contact.displayEmergencyHotline}</span>
              </a>

              <a
                href={hospitalData.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-red-950/80 hover:bg-red-900 text-white font-bold text-sm border border-white/30 transition-all"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Instant Hospital Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Triage & Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-emergency flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Zero-Delay Trauma Intake
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Casualty medical officers and nursing staff immediately assess limb neurovascular status, administer pain relief, and apply temporary splints.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Immediate Digital Radiography
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Low-radiation digital X-ray suite operational 24 hours a day to rapidly evaluate bone displacement, joint alignment, and fracture patterns.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              On-Call Orthopaedic Surgeons
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Specialist orthopaedic surgeons on 24-hour call for emergency fracture reduction, open wound debridement, and urgent internal fixation.
            </p>
          </div>
        </div>

        {/* What constitutes an orthopaedic emergency? */}
        <div className="p-8 rounded-3xl bg-white border border-surface-border shadow-card space-y-6">
          <h2 className="font-heading font-bold text-2xl text-navy-950">
            When to Seek Immediate Emergency Orthopaedic Care
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
            {[
              "Open (Compound) Fractures: Bone fragment piercing through skin or visible deep wound near a break",
              "Severe Joint Dislocation: Shoulder, elbow, hip, or knee visibly popped out of normal anatomical socket",
              "Limb Compromise: Coldness, paleness, or complete numbness in fingers/toes following an injury",
              "Inability to Bear Weight: Severe excruciating pain after a fall with marked deformity or swelling",
              "Spinal Red-Flags: Sudden severe back/neck trauma accompanied by loss of bowel/bladder control or leg weakness",
              "High-Energy Polytrauma: Vehicular accidents involving multiple limb injuries requiring coordinated care",
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* First-Aid While En Route to Hospital */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-elevated">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            First-Aid Instructions While Traveling to Hospital
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">1. Immobilize</span>
              <p>Keep the injured limb supported with a rolled towel or splint. Do not attempt to force a crooked bone straight.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">2. Control Bleeding</span>
              <p>Apply gentle pressure with a clean cloth over open bleeding wounds. Do not wash deep open bone wounds with tap water.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">3. Ice Gently</span>
              <p>Apply an ice pack wrapped in a cloth to reduce swelling. Avoid placing bare ice directly onto open skin.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-teal-300 text-sm block">4. Keep Fasting</span>
              <p>Avoid giving solid foods or heavy liquids if emergency surgical anaesthesia may be required upon arrival.</p>
            </div>
          </div>
        </div>

        {/* Hospital Address for Emergency Arrivals */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-teal-700 shrink-0 mt-1" />
            <div>
              <p className="font-bold text-navy-950 text-base">
                Emergency Entry: Shashwat Hospital
              </p>
              <p className="text-xs text-slate-600">
                {hospitalData.location.addressLine1}, {hospitalData.location.addressLine2}, Nerul, Navi Mumbai. Dedicated ambulance bay & wheelchair ramp at ground floor entrance.
              </p>
            </div>
          </div>

          <a
            href={`tel:${hospitalData.contact.emergencyHotline}`}
            className="px-5 py-2.5 rounded-xl bg-emergency text-white font-bold text-xs whitespace-nowrap shadow-md hover:bg-red-700 transition-colors"
          >
            Call Casualty Desk
          </a>
        </div>
      </Container>
    </div>
  );
}
