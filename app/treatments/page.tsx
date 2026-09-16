import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TreatmentCard } from "@/components/TreatmentCard";
import { CTASection } from "@/components/CTASection";
import { treatmentsData } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Orthopaedic Treatments & Surgical Procedures | Shashwat Hospital Nerul",
  description:
    "Explore verified orthopaedic treatments offered at Shashwat Hospital in Nerul, Navi Mumbai: Knee Replacement, Hip Arthroplasty, Arthroscopic ACL Reconstruction, Rotator Cuff Repair, Spine Microdiscectomy, Fracture Trauma, and Physiotherapy.",
};

const categories = [
  { id: "ALL", label: "All Treatments" },
  { id: "JOINT_REPLACEMENT", label: "Joint Replacement" },
  { id: "ARTHROSCOPY", label: "Arthroscopy & Sports" },
  { id: "SPINE", label: "Spine Care" },
  { id: "TRAUMA", label: "Trauma & Fractures" },
  { id: "REHABILITATION", label: "Rehabilitation" },
];

export default function TreatmentsPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Treatments & Procedures" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Surgical & Therapeutic Care</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Evidence-Based Orthopaedic Treatments & Procedures
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Every procedure at Shashwat Hospital is planned with precision, clinical integrity, and clear patient guidance. Browse our primary surgical and non-surgical care pathways below.
          </p>
        </div>

        {/* Treatment Grid categorized */}
        <div className="mt-12 space-y-12">
          {["JOINT_REPLACEMENT", "ARTHROSCOPY", "SPINE", "TRAUMA", "REHABILITATION"].map(
            (cat) => {
              const items = treatmentsData.filter((t) => t.category === cat);
              if (items.length === 0) return null;

              const categoryTitleMap: Record<string, string> = {
                JOINT_REPLACEMENT: "Joint Replacement & Arthroplasty",
                ARTHROSCOPY: "Keyhole Arthroscopy & Sports Medicine",
                SPINE: "Spine Evaluation & Minimally Invasive Care",
                TRAUMA: "24/7 Fracture Care & Trauma Surgery",
                REHABILITATION: "Physiotherapy & Recovery Regimens",
              };

              return (
                <div key={cat} className="space-y-6 pt-6 first:pt-0 border-t first:border-0 border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy-950">
                      {categoryTitleMap[cat]}
                    </h2>
                    <span className="text-xs font-semibold text-teal-800">
                      {items.length} {items.length === 1 ? "Procedure" : "Procedures"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((treatment) => (
                      <TreatmentCard key={treatment.id} treatment={treatment} />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Have Questions About an Advised Treatment?"
            subtitle="Schedule a consultation or request a second opinion with our senior orthopaedic surgeons in Nerul, Navi Mumbai."
          />
        </div>
      </Container>
    </div>
  );
}
