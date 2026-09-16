import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConditionCard } from "@/components/ConditionCard";
import { CTASection } from "@/components/CTASection";
import { conditionsData } from "@/data/conditions";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Orthopaedic Condition Education Library | Shashwat Hospital Nerul",
  description:
    "Patient educational guides on joint pain, knee osteoarthritis, ACL tears, shoulder rotator cuff injuries, low back pain, slip disc, and bone fractures from Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function ConditionsPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Condition Library" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Patient Education & Self-Care</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Orthopaedic Condition Education Library
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Understanding your symptoms is the first step toward effective recovery. Explore evidence-based information on common bone, joint, ligament, and spine conditions.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Educational Notice: </strong>
            The condition guides below are published for general educational reference and do not constitute personal clinical diagnosis or individual treatment plans. Always consult our qualified orthopaedic doctors for personalized evaluation.
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditionsData.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Experiencing Persistent Joint or Spine Discomfort?"
            subtitle="Book a consultation with our orthopaedic specialists in Nerul, Navi Mumbai to receive an objective diagnosis and structured recovery plan."
            primaryButtonText="Book an Appointment"
            primaryButtonHref="/appointment"
          />
        </div>
      </Container>
    </div>
  );
}
