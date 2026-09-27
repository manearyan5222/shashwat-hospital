import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { RefreshCw, CreditCard, Clock, AlertCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Shashwat Hospital Nerul",
  description:
    "Appointment cancellation, OPD fee refund, rescheduling guidelines, and advance deposit terms for Shashwat Hospital, Nerul, Navi Mumbai.",
};

export default function RefundPolicyPage() {
  const hasEmail = isVerified(hospitalData.contact.email);
  const hasPhone = isVerified(hospitalData.contact.primaryPhone);

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Refund & Cancellation Policy" }]} />

        <div className="mt-6 max-w-4xl space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
              <span>Financial & Cancellation Transparency</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Refund & Cancellation Policy
            </h1>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Effective Date: September 2026 • Shashwat Hospital, Nerul, Navi Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-teal-900/5 border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2 font-bold text-navy-950 text-sm sm:text-base">
              <CreditCard className="w-4 h-4 text-teal-700" />
              <span>Clear Payment & Cancellation Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              At {hospitalData.name}, we prioritize transparent financial policies for all OPD consultations, online booking deposits, diagnostic services, and surgical admissions. This policy outlines cancellation windows, refund eligibility criteria, and processing timelines.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-8 pt-4 border-t border-slate-200">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                1. Outpatient (OPD) Appointment Cancellation & Rescheduling
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Cancellation Window:</strong> Patients may cancel or reschedule a pre-booked OPD consultation up to <strong>2 hours prior</strong> to the scheduled time slot without any penalty.</li>
                <li><strong>Refund Eligibility:</strong> If an OPD registration fee was prepaid online and cancelled at least 2 hours in advance, a 100% refund of the consultation fee will be processed to the original payment source.</li>
                <li><strong>Doctor Unavailability:</strong> If a scheduled doctor becomes unavailable due to emergency surgeries or hospital trauma duty, patients will be offered an immediate alternate slot or a full 100% refund.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                2. Non-Refundable Services
              </h2>
              <p className="leading-relaxed">
                The following hospital services are strictly non-refundable once initiated or completed:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Completed Consultations:</strong> OPD consultation fees once the doctor examination has taken place.</li>
                <li><strong>Executed Diagnostics:</strong> X-ray imaging, MRI scans, CT scans, blood laboratory tests, or ECG procedures that have already been conducted.</li>
                <li><strong>Casualty & Emergency Triage:</strong> Emergency room trauma care, casualty medical officer triage, and emergency stabilization procedures.</li>
                <li><strong>Dispensed Medicines & Implants:</strong> Pharmacy medications or surgical consumables that have been unsealed, dispensed, or utilized.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                3. Surgery Advance Deposit Refund Policy
              </h2>
              <p className="leading-relaxed">
                For elective joint replacement, arthroscopic, or spine surgeries requiring an advance hospital admission deposit:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Cancellation 24+ Hours Before Admission:</strong> Eligible for 100% deposit refund, minus any prior diagnostic tests already performed.</li>
                <li><strong>Medical Deferral by Surgeon:</strong> If pre-operative medical workup indicates the surgery must be postponed for patient safety (e.g. uncontrolled blood pressure or infection), the full deposit remains valid for the rescheduled date or is fully refundable upon request.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                4. Refund Processing Window & Payment Method
              </h2>
              <p className="leading-relaxed">
                Approved refunds are credited strictly back to the original source payment method (Bank Account, Credit/Debit Card, UPI, or Net Banking) within <strong>5 to 7 business days</strong> following approval by hospital accounts. Cash deposits paid at the billing counter will be refunded in cash or bank transfer upon production of the original receipt and valid photo ID.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                5. How to Request a Refund
              </h2>
              <p className="leading-relaxed">
                To submit a refund request or clarify a billing query, please contact our hospital accounts helpdesk:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                <p><strong>Billing & Refund Helpdesk</strong></p>
                <p>{hospitalData.name}, {hospitalData.location.locality}, {hospitalData.location.city}, {hospitalData.location.state}, India.</p>
                {hasPhone && <p><strong>Telephone:</strong> {hospitalData.contact.primaryPhone}</p>}
                {hasEmail && <p><strong>Email:</strong> <a href={`mailto:${hospitalData.contact.email}`} className="text-teal-800 font-semibold underline">{hospitalData.contact.email}</a></p>}
                <p className="text-slate-600 pt-1">Please quote your Patient ID, Appointment Booking Reference Number, and payment receipt details.</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
