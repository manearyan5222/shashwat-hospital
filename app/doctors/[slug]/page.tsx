import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { doctorsData, Doctor } from "@/data/doctors";
import { treatmentsData } from "@/data/treatments";
import { hospitalData } from "@/data/hospital";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import {
  Calendar,
  Phone,
  Clock,
  Award,
  Globe,
  CheckCircle2,
  Building,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export function generateStaticParams() {
  return doctorsData.map((d) => ({
    slug: d.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doctor = doctorsData.find((d) => d.slug === params.slug);
  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return {
    title: `${doctor.salutation} ${doctor.name} - ${doctor.designation} | Shashwat Hospital Nerul`,
    description: doctor.specializationSummary,
    openGraph: {
      title: `${doctor.salutation} ${doctor.name} | Orthopaedic Specialist in Nerul`,
      description: doctor.specializationSummary,
      type: "profile",
    },
  };
}

export default function DoctorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const doctor = doctorsData.find((d) => d.slug === params.slug);
  if (!doctor) {
    notFound();
  }

  const relatedTreatments = treatmentsData.filter((t) =>
    doctor.treatmentsHandled.includes(t.slug)
  );

  return (
    <div className="py-8 space-y-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Doctors", href: "/doctors" },
            { label: `${doctor.salutation} ${doctor.name}` },
          ]}
        />

        {/* Doctor Profile Hero Card */}
        <div className="mt-6 p-6 sm:p-10 rounded-3xl bg-white border border-surface-border shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Doctor Image */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-slate-100 border-2 border-slate-100">
              <Image
                src={doctor.imageUrl}
                alt={`${doctor.salutation} ${doctor.name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Globe className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Languages: {doctor.languages.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Building className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Affiliation: Shashwat Hospital, Nerul</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Reg: {doctor.registrationNumber}</span>
              </div>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 mb-2">
                {doctor.departmentName}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950">
                {doctor.salutation} {doctor.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-teal-800 mt-1">
                {doctor.designation}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-teal-600" />
                  {doctor.qualifications.join(" • ")}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/appointment?doctor=${doctor.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book OPD Consultation</span>
              </Link>

              <a
                href={`tel:${hospitalData.contact.primaryPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-navy-950 font-semibold text-xs sm:text-sm border border-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call Hospital Desk</span>
              </a>
            </div>

            {/* Bio */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h3 className="font-heading font-bold text-base text-navy-950">
                About the Specialist
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Areas of Clinical Expertise */}
            <div className="space-y-3 pt-2">
              <h3 className="font-heading font-bold text-base text-navy-950">
                Areas of Clinical Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doctor.areasOfExpertise.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Schedule */}
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/60 space-y-3">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>Weekly Outpatient (OPD) Consultation Schedule</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {doctor.consultationSchedule.map((sched, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white border border-teal-100 flex justify-between items-center"
                  >
                    <span className="font-bold text-navy-950">{sched.day}:</span>
                    <span className="text-slate-600">
                      {sched.morningTimings || sched.eveningTimings}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-teal-800 italic">
                *Doctor consultation timings are subject to emergency surgical duties. Please verify availability via appointment booking.
              </p>
            </div>

            {/* Education & Qualifications */}
            <div className="space-y-3 pt-2">
              <h3 className="font-heading font-bold text-base text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-700" />
                <span>Education & Medical Training</span>
              </h3>
              <div className="space-y-2">
                {doctor.education.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-navy-950 block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Treatments */}
        {relatedTreatments.length > 0 && (
          <div className="mt-16 pt-16 border-t border-surface-border space-y-6">
            <SectionHeading
              badge="Clinical Focus"
              title="Treatments & Procedures Managed by this Specialist"
              subtitle="Learn about the procedures and recovery timelines associated with this specialist's practice."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreatments.map((tr) => (
                <div
                  key={tr.id}
                  className="p-5 rounded-2xl bg-white border border-surface-border shadow-card flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 mb-2 inline-block">
                      {tr.categoryLabel}
                    </span>
                    <h4 className="font-heading font-bold text-base text-navy-950 mb-1">
                      {tr.title}
                    </h4>
                    <p className="text-xs text-surface-muted line-clamp-2">
                      {tr.shortDescription}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <Link
                      href={`/treatments/${tr.slug}`}
                      className="text-xs font-semibold text-teal-800 hover:text-navy-950 inline-flex items-center gap-1"
                    >
                      <span>Explore Procedure Details →</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title={`Consult ${doctor.salutation} ${doctor.name}`}
            subtitle="Request an outpatient appointment at Shashwat Hospital in Nerul, Navi Mumbai."
            primaryButtonText="Book Appointment"
            primaryButtonHref={`/appointment?doctor=${doctor.id}`}
          />
        </div>
      </Container>
    </div>
  );
}
