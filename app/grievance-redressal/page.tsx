import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { ShieldCheck, Scale, FileText, Clock, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance Redressal & Statutory Notice | Shashwat Hospital Nerul",
  description:
    "Statutory Grievance Redressal Mechanism, IT Rules 2021 & DPDP Act compliance officer contact for Shashwat Hospital, Nerul, Navi Mumbai.",
};

export default function GrievanceRedressalPage() {
  const hasEmail = isVerified(hospitalData.contact.email);
  const hasPhone = isVerified(hospitalData.contact.primaryPhone);

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Grievance Redressal & Legal Notice" }]} />

        <div className="mt-6 max-w-4xl space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-teal-600" />
              <span>Statutory Compliance Mechanism</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Grievance Redressal Officer & Legal Notice
            </h1>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              In Compliance with Rule 3(2) of IT Rules 2021 & DPDP Act 2023 • Shashwat Hospital, Nerul, Navi Mumbai
            </p>
          </div>

          {/* Officer Details Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-md">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span>Designated Grievance Redressal Officer</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Designation</p>
                <p className="font-bold text-white text-base pt-0.5">Grievance Redressal & Legal Officer</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Organization</p>
                <p className="font-bold text-white text-base pt-0.5">{hospitalData.name}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{hospitalData.location.locality}, {hospitalData.location.city}, {hospitalData.location.state}, India</span>
              </div>
              {hasEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <a href={`mailto:${hospitalData.contact.email}`} className="text-teal-300 font-semibold underline">{hospitalData.contact.email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Policy Sections */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-8 pt-4 border-t border-slate-200">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                1. Statutory Scope of Grievance Redressal
              </h2>
              <p className="leading-relaxed">
                In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Digital Personal Data Protection Act, 2023, and patient safety protocols, {hospitalData.name} has instituted a formal statutory grievance redressal mechanism.
              </p>
              <p className="leading-relaxed">
                Patients, website visitors, or data principals may file a formal grievance regarding:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Digital data privacy, unauthorized record disclosure, or DPDP Act compliance issues.</li>
                <li>Website content accuracy, digital service errors, or accessibility concerns.</li>
                <li>Hospital administrative service feedback or billing discrepancy disputes.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                2. Formal Grievance Submission Procedure
              </h2>
              <p className="leading-relaxed">
                To ensure lawful registration and investigation, formal statutory grievances must be submitted in writing via registered post or email to the Grievance Officer, containing:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Full Name, contact telephone number, and postal/email address of the complainant.</li>
                <li>Patient Registration ID or Appointment Reference Number (if applicable).</li>
                <li>Clear description of the grievance, date of occurrence, and specific relief sought.</li>
                <li>Copies of relevant supporting documents or receipts.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                3. Statutory Resolution Timelines
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Acknowledgement Window</span>
                  </h3>
                  <p className="text-xs text-slate-600">Every written grievance will be acknowledged with a unique ticket reference number within <strong>48 hours</strong> of receipt.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Statutory Resolution Window</span>
                  </h3>
                  <p className="text-xs text-slate-600">The Grievance Officer will investigate and issue a formal written resolution within <strong>15 to 30 days</strong> in accordance with statutory rules.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                4. Escalation & Legal Contacts
              </h2>
              <p className="leading-relaxed">
                If a complainant is unsatisfied with the resolution provided by the Grievance Officer, the matter may be escalated to the Executive Hospital Management Desk at Nerul, Navi Mumbai, or appealed before statutory regulatory bodies established under the DPDP Act 2023 or Consumer Protection Act.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
