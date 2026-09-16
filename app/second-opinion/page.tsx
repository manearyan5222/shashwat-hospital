import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondOpinionForm } from "@/components/SecondOpinionForm";
import { CTASection } from "@/components/CTASection";
import { ShieldCheck, CheckCircle2, FileText, Lock, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Specialist Second Opinion | Shashwat Hospital Nerul",
  description:
    "Seek an objective clinical second opinion from senior orthopaedic surgeons at Shashwat Hospital in Nerul, Navi Mumbai for joint replacement, spine surgery, or ligament repair recommendations.",
};

export default function SecondOpinionPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Second Opinion" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Specialist Clinical Review</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Specialist Second Opinion on Orthopaedic & Spine Surgeries
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Major orthopaedic decisions deserve clarity and confidence. If you have been advised a knee replacement, hip surgery, microdiscectomy, or ligament reconstruction, our senior consultants provide objective, evidence-based reviews of your diagnostic scans.
          </p>
        </div>

        {/* Benefits of Second Opinion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Confirm Surgical Necessity
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Verify whether conservative therapy (guided physiotherapy, joint injections) could be exhausted before proceeding with surgery.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Scan & MRI Interpretation
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Our consultants correlate radiological findings on your MRI/X-ray films with your actual physical examination and mobility constraints.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-950">
              Confidential & Objective
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Your previous medical notes and diagnostic scans are treated with strict confidentiality in accordance with patient data protection protocols.
            </p>
          </div>
        </div>

        {/* Second Opinion Form */}
        <div className="mt-8 max-w-3xl mx-auto">
          <SecondOpinionForm />
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Prefer an In-Person Consultation?"
            subtitle="You are welcome to visit our OPD in Nerul with your physical MRI/X-ray films for a face-to-face evaluation."
            primaryButtonText="Book In-Person OPD"
            primaryButtonHref="/appointment"
          />
        </div>
      </Container>
    </div>
  );
}
