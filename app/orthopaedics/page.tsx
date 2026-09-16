import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { departmentsData } from "@/data/departments";
import { treatmentsData } from "@/data/treatments";
import { conditionsData } from "@/data/conditions";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Orthopaedic Subspecialties & Departments | Shashwat Hospital Nerul",
  description:
    "Explore our specialized orthopaedic units in Nerul, Navi Mumbai: Joint Replacement, Keyhole Arthroscopy, Sports Medicine, Spine Care, Trauma & Fracture Fixation, and Rehabilitation.",
};

export default function OrthopaedicsOverviewPage() {
  return (
    <div className="py-8 space-y-16">
      <Container>
        <Breadcrumbs items={[{ label: "Orthopaedic Specialties" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Specialized Orthopaedic Care</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Comprehensive Orthopaedic Subspecialties in Nerul
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Musculoskeletal disorders require focused, specialized expertise. Our clinical departments cover the entire spectrum of bone, joint, ligament, and spine care under one roof.
          </p>
        </div>

        {/* Subspecialties Cards */}
        <div className="mt-12 space-y-8">
          {departmentsData.map((dept, index) => {
            const relatedTreatments = treatmentsData.filter(
              (t) => t.departmentId === dept.id
            );

            return (
              <div
                key={dept.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-surface-border shadow-card hover:shadow-hover transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy-950">
                        {dept.title}
                      </h2>
                      <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                        {dept.status === "VERIFIED" ? "Active Clinical Unit" : "Hospital Coordination Required"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
                    {dept.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Conditions Evaluated:
                      </span>
                      <ul className="space-y-1">
                        {dept.keyConditions.map((c, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Procedures & Therapies:
                      </span>
                      <ul className="space-y-1">
                        {dept.keyProcedures.map((p, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 lg:border-l lg:border-slate-100 lg:pl-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Dedicated Treatments:
                    </span>
                    <div className="space-y-2">
                      {relatedTreatments.length > 0 ? (
                        relatedTreatments.map((tr) => (
                          <Link
                            key={tr.id}
                            href={`/treatments/${tr.slug}`}
                            className="block p-3 rounded-xl bg-surface-bg hover:bg-teal-50 hover:border-teal-300 border border-surface-border text-xs font-semibold text-navy-950 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span>{tr.title}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-teal-700" />
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-500 italic">
                          Consultation available via general orthopaedic OPD schedule.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/appointment?department=${dept.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      <Calendar className="w-4 h-4 text-teal-300" />
                      <span>Book Department OPD</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <CTASection />
        </div>
      </Container>
    </div>
  );
}
