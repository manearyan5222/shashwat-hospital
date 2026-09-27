import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { ShieldCheck, Lock, FileText, UserCheck, Eye, Database, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Patient Data Protection | Shashwat Hospital Nerul",
  description:
    "Comprehensive patient data protection, privacy guidelines, and DPDP Act compliance policy for Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function PrivacyPolicyPage() {
  const hasEmail = isVerified(hospitalData.contact.email);
  const hasPhone = isVerified(hospitalData.contact.primaryPhone);

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Privacy Policy & Data Protection" }]} />

        <div className="mt-6 max-w-4xl space-y-8">
          {/* Header Badge */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>DPDP Act 2023 & IT Act Compliant</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Privacy Policy & Health Data Protection
            </h1>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Effective Date: September 2026 • Shashwat Hospital, Nerul, Navi Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-teal-900/5 border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2 font-bold text-navy-950 text-sm sm:text-base">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>Patient Data Privacy Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              At {hospitalData.name}, protecting your personal health information is a fundamental clinical and statutory duty. We do not sell, rent, trade, or monetize patient data. All medical records, consultation forms, and diagnostic reports submitted to our platform are stored securely and accessed strictly on a need-to-know basis by authorized clinical and administrative personnel.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-8 pt-4 border-t border-slate-200">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950 flex items-center gap-2">
                <span>1. Regulatory Scope & Compliance Framework</span>
              </h2>
              <p className="leading-relaxed">
                This Privacy Policy governs the collection, processing, storage, and security of personal and medical data collected through the {hospitalData.name} website, patient self-portal, online appointment booking tools, second-opinion request forms, and digital clinical systems.
              </p>
              <p className="leading-relaxed">
                This policy is formulated in strict compliance with applicable laws in India, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>The Digital Personal Data Protection Act, 2023 (DPDP Act).</li>
                <li>The Information Technology Act, 2000 and IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
                <li>Telemedicine Practice Guidelines released by the Board of Governors (in supersession of Medical Council of India).</li>
                <li>The Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                2. Categories of Information We Collect
              </h2>
              <p className="leading-relaxed">
                Depending on your interaction with our hospital platform, we may collect the following categories of data:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm">A. Personal Identifiers</h3>
                  <p className="text-xs text-slate-600">Full name, mobile telephone number, email address, age, gender, residential locality, and appointment scheduling preferences.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm">B. Clinical & Health Data</h3>
                  <p className="text-xs text-slate-600">Symptom descriptions, joint pain history, prior medical diagnoses, diagnostic X-ray/MRI reports, doctor consultation notes, and treatment histories.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm">C. Technical & Usage Data</h3>
                  <p className="text-xs text-slate-600">IP address, browser specification, operating system, session cookies, page access timestamps, and audit trail logs for clinical security.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm">D. Portal Authentication Data</h3>
                  <p className="text-xs text-slate-600">Encrypted authentication tokens, session verification cookies, and account access logs for patient and doctor dashboards.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                3. Purpose of Data Processing & Lawful Basis
              </h2>
              <p className="leading-relaxed">
                We process your personal and health data strictly for legitimate clinical and administrative purposes under voluntary consent:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Outpatient & Clinical Scheduling:</strong> Coordinating appointment slots with appropriate orthopaedic, joint replacement, spine, or sports medicine consultants.</li>
                <li><strong>Medical Evaluation & Triage:</strong> Reviewing clinical intake summaries and second-opinion reports prior to consultation to ensure patient safety.</li>
                <li><strong>Patient Portal Access:</strong> Providing patients with secure digital access to their own treatment history, doctor consultation notes, and uploaded diagnostic reports.</li>
                <li><strong>Communication & Reminders:</strong> Sending appointment confirmations, pre-op instructions, hospital desk updates, or SMS/WhatsApp reminders.</li>
                <li><strong>Statutory & Legal Obligations:</strong> Complying with hospital registration laws, medical record maintenance mandates, public health reporting, and court orders.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                4. Data Protection, Encryption & Storage Practices
              </h2>
              <p className="leading-relaxed">
                We implement robust technical and organizational measures to safeguard your information against unauthorized access, loss, alteration, or disclosure:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Encryption Standards:</strong> All data transmitted between your browser and our server is encrypted using TLS 1.3 / SSL. Stored medical files and database records are protected with industry-standard encryption at rest.</li>
                <li><strong>Row-Level Security (RLS) & Access Control:</strong> Database tables use strict Row-Level Security policies ensuring patients can only view their own records, and doctors can only access records of patients assigned to their care.</li>
                <li><strong>Audit Logging:</strong> Every request to access or amend clinical records is captured in immutable server audit logs for accountability.</li>
                <li><strong>Credential Sanitization:</strong> Authentication endpoints enforce strict password comparison and strip sensitive credentials prior to JSON response serialization.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                5. Third-Party Data Disclosure & Safeguards
              </h2>
              <p className="leading-relaxed">
                We maintain a strict zero-monetization policy for patient data. Information is disclosed only under the following limited conditions:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Treating Medical Consultants:</strong> Authorized doctors, surgeons, and clinical staff involved in your care pathway.</li>
                <li><strong>Insurance & TPA Partners:</strong> Upon explicit patient authorization for processing cashless hospitalization claims or pre-authorization approvals.</li>
                <li><strong>Infrastructure Service Providers:</strong> Encrypted cloud hosting and database infrastructure providers operating under strict data processing agreements.</li>
                <li><strong>Legal Requirements:</strong> Statutory government health authorities or law enforcement agencies when mandated by applicable law or judicial subpoena.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                6. Patient Rights Under DPDP Act 2023
              </h2>
              <p className="leading-relaxed">
                As a data principal under Indian law, you possess the following statutory rights regarding your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Right to Summary of Data:</strong> Obtain confirmation on whether your personal data is being processed and receive a summary of processed health records.</li>
                <li><strong>Right to Correction & Erasure:</strong> Request correction of inaccurate personal details or deletion of non-statutory personal data.</li>
                <li><strong>Right to Withdraw Consent:</strong> Revoke consent for digital communications or optional data processing at any time by contacting our privacy desk.</li>
                <li><strong>Right of Grievance Redressal:</strong> Submit grievances regarding data handling to our designated Privacy Grievance Officer.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                7. Data Retention & Destruction Policy
              </h2>
              <p className="leading-relaxed">
                In compliance with Indian Medical Council guidelines, inpatient and outpatient medical records are retained for mandatory statutory periods (minimum 3 years for OPD records; 5 years for indoor patient charts). Non-statutory web inquiry submissions are periodically pruned once administrative coordination is complete.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                8. Contacting the Hospital Privacy & Grievance Desk
              </h2>
              <p className="leading-relaxed">
                If you have questions regarding this Privacy Policy, wish to exercise your data principal rights, or need to report a privacy concern, please contact our administrative desk:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                <p><strong>Hospital Privacy & Data Protection Desk</strong></p>
                <p>{hospitalData.name}, {hospitalData.location.locality}, {hospitalData.location.city}, {hospitalData.location.state}, India.</p>
                {hasEmail && <p><strong>Email:</strong> <a href={`mailto:${hospitalData.contact.email}`} className="text-teal-800 font-semibold underline">{hospitalData.contact.email}</a></p>}
                {hasPhone && <p><strong>Phone:</strong> {hospitalData.contact.primaryPhone}</p>}
                <p className="pt-1 text-slate-600">For formal statutory grievances, visit our <Link href="/grievance-redressal" className="text-teal-800 font-semibold underline">Grievance Redressal Portal</Link>.</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
