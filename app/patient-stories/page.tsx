import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatientStoryCard } from "@/components/PatientStoryCard";
import { CTASection } from "@/components/CTASection";
import { patientStoriesData } from "@/data/testimonials";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Care Case Studies & Recovery Pathways | Shashwat Hospital Nerul",
  description:
    "Review clinical recovery case studies and functional milestone pathways from patients treated for knee osteoarthritis, ACL tears, and spine disc herniation at Shashwat Hospital in Nerul.",
};

export default function PatientStoriesPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Patient Case Studies" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Clinical Pathways & Milestones</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Patient Care Case Studies & Recovery Journeys
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Every recovery is unique. The case summaries below illustrate typical clinical pathways, post-operative milestones, and structured rehabilitation protocols achieved under our multidisciplinary orthopaedic team in Nerul.
          </p>
        </div>

        {/* Transparency Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Medical Transparency Commitment: </strong>
            In adherence to medical ethics and honest healthcare reporting, Shashwat Hospital does not publish fabricated reviews, artificial success metrics, or paid endorsements. Patient narratives are anonymized clinical case summaries documenting real treatment milestones.
          </p>
        </div>

        {/* Patient Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientStoriesData.map((story) => (
            <PatientStoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Start Your Orthopaedic Recovery Pathway"
            subtitle="Book a consultation at Shashwat Hospital in Nerul, Navi Mumbai to evaluate your joint condition with our medical team."
            primaryButtonText="Book an Appointment"
            primaryButtonHref="/appointment"
          />
        </div>
      </Container>
    </div>
  );
}
