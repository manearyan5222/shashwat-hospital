import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { treatmentsData, Treatment } from "@/data/treatments";
import { doctorsData } from "@/data/doctors";
import { conditionsData } from "@/data/conditions";
import { hospitalData } from "@/data/hospital";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { TreatmentJourney } from "@/components/TreatmentJourney";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DoctorCard } from "@/components/DoctorCard";
import { CTASection } from "@/components/CTASection";
import { FAQJsonLd } from "@/components/JsonLd";
import {
  Calendar,
  Stethoscope,
  Phone,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export function generateStaticParams() {
  return treatmentsData.map((t) => ({
    slug: t.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);
  if (!treatment) {
    return { title: "Treatment Not Found" };
  }

  return {
    title: `${treatment.title} | Shashwat Hospital Nerul`,
    description: treatment.shortDescription,
    openGraph: {
      title: `${treatment.title} in Nerul, Navi Mumbai`,
      description: treatment.shortDescription,
      type: "article",
    },
  };
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);
  if (!treatment) {
    notFound();
  }

  const relatedDoctors = doctorsData.filter((d) =>
    treatment.relatedDoctorIds.includes(d.id)
  );

  const relatedConditions = conditionsData.filter((c) =>
    treatment.relatedConditionSlugs.includes(c.slug)
  );

  return (
    <div className="py-8 space-y-16">
      <FAQJsonLd faqs={treatment.faqs} />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Treatments", href: "/treatments" },
            { label: treatment.title },
          ]}
        />

        {/* 01: HERO SECTION */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <span>{treatment.categoryLabel}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {treatment.title}
            </h1>

            <p className="text-base sm:text-lg font-medium text-teal-900">
              {treatment.heroHeadline}
            </p>

            <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
              {treatment.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/appointment?treatment=${treatment.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book Appointment</span>
              </Link>

              <Link
                href="/second-opinion"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy-950 font-semibold text-sm border border-slate-200 shadow-sm transition-all"
              >
                <Stethoscope className="w-4 h-4 text-teal-700" />
                <span>Request Second Opinion</span>
              </Link>

              <a
                href={`tel:${hospitalData.contact.primaryPhone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-navy-900 px-3 py-2"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>Call Desk: {hospitalData.contact.primaryPhone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src={treatment.imageUrl}
              alt={treatment.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* 02: OVERVIEW & CLINICAL OBJECTIVES */}
        <div className="mt-16 pt-16 border-t border-surface-border grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Clinical Overview
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-950">
                What is {treatment.title}?
              </h2>
              <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
                {treatment.overview}
              </p>
            </div>

            {/* When is it considered? */}
            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-4">
              <h3 className="font-heading font-bold text-lg text-navy-950">
                When Is This Procedure Considered?
              </h3>
              <ul className="space-y-2.5">
                {treatment.whenConsidered.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right sidebar: Clinical Objectives & Related Conditions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-elevated">
              <h3 className="font-heading font-bold text-lg text-white">
                Primary Clinical Objectives
              </h3>
              <ul className="space-y-2.5">
                {treatment.clinicalObjectives.map((obj, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {relatedConditions.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Related Conditions:
                </span>
                <div className="space-y-2">
                  {relatedConditions.map((cond) => (
                    <Link
                      key={cond.id}
                      href={`/conditions/${cond.slug}`}
                      className="block p-3 rounded-xl bg-surface-bg hover:bg-teal-50 border border-surface-border text-xs font-semibold text-navy-950 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span>{cond.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 03: 6-STEP TREATMENT JOURNEY */}
        <div className="mt-16 pt-16 border-t border-surface-border">
          <SectionHeading
            badge="Treatment Pathway"
            title="The 6-Step Clinical Treatment Journey"
            subtitle="From your initial outpatient consultation through hospital admission, surgical execution, and guided rehabilitation."
            centered
          />

          <TreatmentJourney steps={treatment.journeySteps} title="" />
        </div>

        {/* 04: RECOVERY & FUNCTIONAL MILESTONES */}
        <div className="mt-16 pt-16 border-t border-surface-border space-y-8">
          <SectionHeading
            badge="Rehabilitation & Recovery"
            title="Recovery Timeline & Milestones"
            subtitle={treatment.recoveryOverview}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {treatment.recoveryMilestones.map((milestone, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-surface-border shadow-card space-y-2"
              >
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                  {milestone.period}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 05: RELATED SPECIALISTS */}
        {relatedDoctors.length > 0 && (
          <div className="mt-16 pt-16 border-t border-surface-border space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <SectionHeading
                badge="Specialist Faculty"
                title="Doctors Performing This Procedure"
                subtitle="Meet our orthopaedic consultants with dedicated expertise in this treatment."
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

        {/* 06: FREQUENTLY ASKED QUESTIONS */}
        {treatment.faqs.length > 0 && (
          <div className="mt-16 pt-16 border-t border-surface-border">
            <SectionHeading
              badge="Patient Questions"
              title="Frequently Asked Questions About This Treatment"
              subtitle="Evidence-based answers to help you and your family make informed healthcare decisions."
              centered
            />

            <div className="max-w-3xl mx-auto">
              <FAQAccordion faqs={treatment.faqs} />
            </div>
          </div>
        )}

        {/* 07: FINAL CTA */}
        <div className="mt-16">
          <CTASection
            title="Discuss Your Treatment Options with a Specialist"
            subtitle="Schedule an outpatient consultation at Shashwat Hospital in Nerul, Navi Mumbai to evaluate if this treatment is right for your condition."
            primaryButtonText="Book an Appointment"
            primaryButtonHref={`/appointment?treatment=${treatment.id}`}
          />
        </div>
      </Container>
    </div>
  );
}
