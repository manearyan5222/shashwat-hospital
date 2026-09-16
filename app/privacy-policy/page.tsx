import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Shashwat Hospital Nerul",
  description:
    "Patient privacy policy and medical records data protection guidelines at Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="mt-6 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Patient Data Protection</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Privacy Policy & Health Data Protection
          </h1>

          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
            Last Updated: September 2026 • Shashwat Hospital, Nerul, Navi Mumbai
          </p>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-6 pt-4 border-t border-slate-200">
            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                1. Commitment to Patient Confidentiality
              </h2>
              <p>
                At {hospitalData.name}, protecting the privacy and security of your personal health information is a fundamental clinical duty. This policy outlines how patient contact details, appointment inquiries, and medical records are collected, stored, and protected.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                2. Information We Collect
              </h2>
              <p>
                When you interact with our website or submit appointment and second opinion requests, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal identifiers: Name, contact telephone number, and email address.</li>
                <li>Demographic data: Age and preferred consultation scheduling windows.</li>
                <li>Clinical notes: Patient-provided summary of symptoms or previous diagnoses to assist with doctor assignment.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                3. Use of Health Information
              </h2>
              <p>
                Information provided through online forms is strictly utilized for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Coordinating outpatient appointment slots with relevant orthopaedic consultants.</li>
                <li>Contacting patients regarding admission formalities, pre-operative instructions, or schedule adjustments.</li>
                <li>Hospital administrative record-keeping and statutory health reporting compliance.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                4. Medical Records Security
              </h2>
              <p>
                We do not sell, rent, or trade patient data to third parties. Sensitive medical scans, X-rays, and clinical summaries submitted for review are handled within secure hospital infrastructure and accessed only by authorized medical staff.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                5. Contacting the Hospital Privacy Desk
              </h2>
              <p>
                For questions regarding patient data records or updating your contact preferences, contact our administrative helpdesk at <a href={`mailto:${hospitalData.contact.email}`} className="text-teal-800 font-semibold underline">{hospitalData.contact.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
