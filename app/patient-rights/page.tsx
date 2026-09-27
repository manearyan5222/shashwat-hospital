import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { UserCheck, ShieldCheck, HeartHandshake, CheckCircle2, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Rights & Responsibilities | Shashwat Hospital Nerul",
  description:
    "Charter of Patient Rights and Responsibilities at Shashwat Hospital, Nerul, Navi Mumbai. Clinical transparency, consent, and patient dignity.",
};

export default function PatientRightsPage() {
  const hasEmail = isVerified(hospitalData.contact.email);
  const hasPhone = isVerified(hospitalData.contact.primaryPhone);

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Patient Rights & Responsibilities" }]} />

        <div className="mt-6 max-w-4xl space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
              <span>MoHFW & NHRC Clinical Patient Charter</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Patient Rights & Responsibilities Policy
            </h1>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Shashwat Hospital, Nerul, Navi Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Policy Overview Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-teal-900/5 border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2 font-bold text-navy-950 text-sm sm:text-base">
              <UserCheck className="w-4 h-4 text-teal-700" />
              <span>Patient Dignity & Ethical Healthcare Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              At {hospitalData.name}, we believe ethical healthcare is built upon mutual trust, clinical transparency, patient dignity, and informed decision-making. In alignment with national healthcare standards and the Charter of Patient Rights, we uphold these fundamental rights and responsibilities for every patient under our care.
            </p>
          </div>

          {/* Policy Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-8 pt-4 border-t border-slate-200">
            {/* Section 1: Patient Rights */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950 border-b border-slate-200 pb-2">
                1. Charter of Patient Rights
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to Adequate Clinical Information</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Patients have the right to receive clear, understandable information about their diagnosis, proposed orthopaedic procedures, potential risks, expected outcomes, and alternative treatment options.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to Informed Consent</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prior to any surgical operation, anesthesia administration, or high-risk procedure, patients (or legal guardians) have the right to give explicit, voluntary informed consent after full disclosure.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to Privacy & Confidentiality</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All medical examinations, treatment records, diagnostic scans, and personal consultation discussions are strictly confidential and protected under hospital privacy standards.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to a Second Opinion</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Patients have the right to seek an independent second medical opinion from another specialist, and receive copies of their diagnostic records and clinical summaries for evaluation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to Transparent Itemized Billing</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Patients have the right to request an itemized billing breakdown of outpatient fees, surgical estimates, implant costs, ward charges, and pharmacy billing prior to discharge.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Right to Non-Discrimination & Dignity</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every patient is entitled to respectful, compassionate clinical care free from discrimination based on gender, race, religion, caste, language, age, or socio-economic background.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Patient Responsibilities */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950 border-b border-slate-200 pb-2">
                2. Patient & Caregiver Responsibilities
              </h2>

              <p className="leading-relaxed">
                To help our medical team provide safe and effective healthcare, patients and family caregivers are expected to fulfill the following responsibilities:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Honest Medical History:</strong> Provide complete and accurate information about past medical conditions, allergies, current medications, surgical history, and lifestyle habits.</li>
                <li><strong>Compliance with Treatment Protocols:</strong> Follow agreed-upon medical advice, surgical pre-operative guidelines, medication dosages, and post-discharge physiotherapy recommendations.</li>
                <li><strong>Respect for Healthcare Personnel:</strong> Maintain polite, respectful conduct towards doctors, nurses, paramedics, and hospital administrative staff. Zero tolerance is enforced for verbal or physical abuse.</li>
                <li><strong>Adherence to Hospital Rules:</strong> Respect visiting hours, hygiene protocols, quiet zone guidelines, and safety directives within hospital premises.</li>
                <li><strong>Financial Obligations:</strong> Fulfill agreed financial commitments and settlement of hospital bills promptly in accordance with hospital billing policies.</li>
              </ul>
            </section>

            {/* Section 3: Contact */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                3. Patient Relationship & Helpdesk Assistance
              </h2>
              <p className="leading-relaxed">
                If you have feedback, questions regarding your patient rights, or require helpdesk assistance during your consultation or hospital stay, please connect with our Patient Relations Officer at the hospital desk in Nerul, Navi Mumbai.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
