import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Medical Disclaimer | Shashwat Hospital Nerul",
  description:
    "Terms of website use, educational notices, and medical disclaimer for Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function TermsPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Terms & Medical Disclaimer" }]} />

        <div className="mt-6 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Medical Safety & Legal Notice</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Terms of Use & Medical Disclaimer
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Important Medical Warning: </strong>
              If you are experiencing a life-threatening medical emergency or severe acute trauma, call our 24/7 emergency hotline ({hospitalData.contact.displayEmergencyHotline}) immediately or report to the nearest hospital casualty emergency room.
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-6 pt-4 border-t border-slate-200">
            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                1. Educational Nature of Website Content
              </h2>
              <p>
                All information, clinical articles, condition descriptions, treatment pathways, and FAQs published on the {hospitalData.name} website are provided strictly for general educational and informational awareness. None of the content on this website constitutes formal medical advice, clinical diagnosis, or a doctor-patient relationship.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                2. No Individual Medical Warranties or Guarantees
              </h2>
              <p>
                Orthopaedic outcomes, surgical recovery timelines, and rehabilitation milestones vary for each patient depending on age, bone density, severity of joint pathology, co-morbidities, and adherence to post-operative physiotherapy. {hospitalData.name} makes no unsupported guarantees of specific surgical cures or 100% outcomes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                3. Online Appointment Requests
              </h2>
              <p>
                Submitting an appointment request through our online wizard indicates a preferred schedule. It does not constitute a guaranteed slot until confirmed by our hospital outpatient desk staff via telephone or SMS.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-navy-950">
                4. Intellectual Property
              </h2>
              <p>
                All editorial guides, branding elements, layouts, and graphics on this website are the property of {hospitalData.name}, Nerul, Navi Mumbai. Unauthorized commercial reproduction without explicit written consent is prohibited.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
