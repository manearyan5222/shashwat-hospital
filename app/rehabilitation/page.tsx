import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecoveryJourney } from "@/components/RecoveryJourney";
import { CTASection } from "@/components/CTASection";
import { doctorsData } from "@/data/doctors";
import { DoctorCard } from "@/components/DoctorCard";
import {
  HeartPulse,
  Activity,
  CheckCircle2,
  Dumbbell,
  Footprints,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Orthopaedic Rehabilitation & Physiotherapy | Shashwat Hospital Nerul",
  description:
    "Comprehensive post-operative joint rehabilitation, sports injury conditioning, gait retraining, and spine core physical therapy at Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function RehabilitationPage() {
  const physiotherapist = doctorsData.find(
    (d) => d.id === "lead-physiotherapist"
  );

  return (
    <div className="py-8 space-y-16">
      <Container>
        <Breadcrumbs items={[{ label: "Rehabilitation & Physiotherapy" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Functional Mobility Restoration</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Orthopaedic Physiotherapy & Functional Rehabilitation
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Successful surgical outcomes depend critically on dedicated rehabilitation. Our physiotherapy protocols rebuild muscle strength, joint range of motion, and everyday confidence.
          </p>
        </div>

        {/* Core Recovery Philosophy */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Early Mobilization Protocol
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Assisted walking and bedside joint flexion begin within 24 hours of joint replacement or fracture fixation to prevent stiffness and circulatory stasis.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Phased Strength Progression
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Targeted resistance drills re-educate quadriceps, hamstrings, rotator cuff, and spine core muscles to provide lifelong mechanical protection to healing joints.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Footprints className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Gait & Functional Balance
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Mirror-guided gait re-education, stair navigation, and proprioceptive drills ensure safe, confident, and independent daily movement.
            </p>
          </div>
        </div>

        {/* Rehabilitation Gym Infrastructure */}
        <div className="mt-16 pt-16 border-t border-surface-border space-y-6">
          <SectionHeading
            badge="Rehab Facility"
            title="Dedicated In-Hospital Physiotherapy Gym"
            subtitle="Equipped with electrotherapy modalities, parallel walking bars, balance trainers, and resistance equipment in Nerul."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Electrotherapy Modalities",
                desc: "Interferential Therapy (IFT), TENS, and Therapeutic Ultrasound for localized pain relief and swelling reduction.",
              },
              {
                title: "Gait Retraining Unit",
                desc: "Parallel walking bars and posture mirrors for restoring symmetrical walking rhythm after surgery.",
              },
              {
                title: "Joint Mobilization Stations",
                desc: "Continuous Passive Motion (CPM) and manual therapist mobilization to safely regain joint flexion.",
              },
              {
                title: "Spine & Core Conditioning",
                desc: "Swiss stability balls, resistance bands, and lumbar extension benches for ergonomic postural restoration.",
              },
            ].map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-surface-border shadow-card space-y-2"
              >
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-navy-950">
                  {mod.title}
                </h4>
                <p className="text-xs text-surface-muted leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Physiotherapist Card if present */}
        {physiotherapist && (
          <div className="mt-16 pt-16 border-t border-surface-border space-y-6">
            <SectionHeading
              badge="Rehab Leadership"
              title="Supervised by Clinical Physiotherapy Specialists"
              subtitle="Coordinating closely with your operating surgeon for seamless post-surgical protocols."
            />
            <div className="max-w-md">
              <DoctorCard doctor={physiotherapist} />
            </div>
          </div>
        )}

        {/* Recovery Journey Component */}
        <div className="mt-16 pt-8">
          <RecoveryJourney />
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CTASection
            title="Start Your Structured Rehabilitation Plan"
            subtitle="Schedule a physiotherapy consultation at Shashwat Hospital in Nerul, Navi Mumbai."
            primaryButtonText="Book Physiotherapy Session"
            primaryButtonHref="/appointment?department=physiotherapy-rehabilitation"
          />
        </div>
      </Container>
    </div>
  );
}
