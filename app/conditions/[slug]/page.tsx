import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { conditionsData, Condition } from "@/data/conditions";
import { treatmentsData } from "@/data/treatments";
import { doctorsData } from "@/data/doctors";
import { hospitalData } from "@/data/hospital";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DoctorCard } from "@/components/DoctorCard";
import { CTASection } from "@/components/CTASection";
import { FAQJsonLd } from "@/components/JsonLd";
import {
  Calendar,
  Stethoscope,
  Phone,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Activity,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

export function generateStaticParams() {
  return conditionsData.map((c) => ({
    slug: c.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const condition = conditionsData.find((c) => c.slug === params.slug);
  if (!condition) {
    return { title: "Condition Not Found" };
  }

  return {
    title: `${condition.title} | Symptoms, Causes & Care | Shashwat Hospital`,
    description: condition.shortDescription,
    openGraph: {
      title: `${condition.title} - Orthopaedic Care in Nerul`,
      description: condition.shortDescription,
      type: "article",
    },
  };
}

export default function ConditionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const condition = conditionsData.find((c) => c.slug === params.slug);
  if (!condition) {
    notFound();
  }

  const relatedDoctors = doctorsData.filter((d) =>
    condition.relatedDoctorIds.includes(d.id)
  );

  const relatedTreatments = treatmentsData.filter((t) =>
    condition.relatedTreatmentSlugs.includes(t.slug)
  );

  return (
    <div className="py-8 space-y-16">
      <FAQJsonLd faqs={condition.faqs} />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Condition Library", href: "/conditions" },
            { label: condition.title },
          ]}
        />

        {/* 01: HERO SECTION */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <span>{condition.bodyRegion} Health Guide</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {condition.title}
            </h1>

            <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
              {condition.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/appointment?condition=${condition.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Consult an Orthopaedic Specialist</span>
              </Link>

              <a
                href={`tel:${hospitalData.contact.primaryPhone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-navy-900 px-3 py-2"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>OPD Desk: {hospitalData.contact.primaryPhone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src={condition.imageUrl}
              alt={condition.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* 02: MEDICAL DISCLAIMER NOTICE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Medical Transparency Notice: </span>
            This information is for general educational purposes and should not replace professional medical advice. Your doctor can determine the most appropriate treatment based on your condition.
          </div>
        </div>

        {/* 03: WHAT IS IT? OVERVIEW */}
        <div className="mt-12 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Understanding the Condition
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-950">
              What Is {condition.title}?
            </h2>
            <p className="text-sm sm:text-base text-surface-muted leading-relaxed max-w-4xl">
              {condition.overview}
            </p>
          </div>

          {/* Symptoms & Causes 2-column comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Common Symptoms */}
            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-4">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg">
                <Activity className="w-5 h-5 text-teal-700" />
                <h3>Common Symptoms</h3>
              </div>
              <ul className="space-y-2.5">
                {condition.commonSymptoms.map((symptom, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Causes */}
            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-4">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg">
                <HelpCircle className="w-5 h-5 text-teal-700" />
                <h3>Common Causes & Triggers</h3>
              </div>
              <ul className="space-y-2.5">
                {condition.commonCauses.map((cause, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-800 mt-2 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 04: WHEN TO CONSULT A DOCTOR & HOW DOCTORS EVALUATE IT */}
        <div className="mt-16 pt-16 border-t border-surface-border grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* When to consult */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-red-50/50 border border-red-200/70 space-y-4">
            <div className="flex items-center gap-2.5 text-emergency font-heading font-bold text-lg">
              <AlertCircle className="w-5 h-5 text-emergency" />
              <h3>When Should You Consult an Orthopaedic Doctor?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you notice any of the following clinical warning signs, seek specialized orthopaedic assessment:
            </p>
            <ul className="space-y-2.5 pt-1">
              {condition.whenToConsultDoctor.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emergency mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How doctors evaluate */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-surface-border shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-navy-950 font-heading font-bold text-lg">
              <Stethoscope className="w-5 h-5 text-teal-700" />
              <h3>How Doctors Evaluate & Diagnose This Condition</h3>
            </div>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Our clinical protocol combines precise physical examination with advanced diagnostic imaging:
            </p>
            <ul className="space-y-2.5 pt-1">
              {condition.evaluationMethods.map((method, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 05: TREATMENT OPTIONS & REHABILITATION */}
        <div className="mt-16 pt-16 border-t border-surface-border space-y-8">
          <SectionHeading
            badge="Care Pathways"
            title="Evidence-Based Treatment Options"
            subtitle="Treatment is determined on an individualized basis following doctor evaluation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {condition.treatmentOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <h4 className="font-heading font-bold text-base text-navy-950">
                    {opt.category}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-surface-muted leading-relaxed pt-1">
                  {opt.details}
                </p>
              </div>
            ))}
          </div>

          {/* Rehabilitation section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-elevated">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-6 h-6 text-teal-400" />
              <h3 className="font-heading font-bold text-xl text-white">
                Rehabilitation & Physiotherapy Guidance
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {condition.rehabilitationGuidance}
            </p>
          </div>
        </div>

        {/* 06: RELATED SPECIALISTS */}
        {relatedDoctors.length > 0 && (
          <div className="mt-16 pt-16 border-t border-surface-border space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <SectionHeading
                badge="Specialist Team"
                title="Doctors Treating This Condition"
                subtitle="Consult with our qualified orthopaedic surgeons and physiotherapists in Nerul."
                className="mb-0"
              />
              <Link
                href="/doctors"
                className="text-xs font-bold text-teal-800 hover:text-navy-950 inline-flex items-center gap-1"
              >
                <span>View All Specialists →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          </div>
        )}

        {/* 07: FREQUENTLY ASKED QUESTIONS */}
        {condition.faqs.length > 0 && (
          <div className="mt-16 pt-16 border-t border-surface-border">
            <SectionHeading
              badge="Educational FAQs"
              title={`Frequently Asked Questions About ${condition.title}`}
              subtitle="Clear, verified answers for patients and families."
              centered
            />

            <div className="max-w-3xl mx-auto">
              <FAQAccordion faqs={condition.faqs} />
            </div>
          </div>
        )}

        {/* 08: FINAL CTA */}
        <div className="mt-16">
          <CTASection
            title="Concerned About Joint or Mobility Symptoms?"
            subtitle="Get an accurate clinical evaluation and personalized management plan at Shashwat Hospital, Nerul, Navi Mumbai."
            primaryButtonText="Book an Appointment"
            primaryButtonHref={`/appointment?condition=${condition.id}`}
          />
        </div>
      </Container>
    </div>
  );
}
