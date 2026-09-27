import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use & Medical Disclaimer | Shashwat Hospital Nerul",
  description:
    "Terms of website use, legal disclaimers, emergency warnings, and liability limitations for Shashwat Hospital in Nerul, Navi Mumbai.",
};

export default function TermsPage() {
  const hasEmergency = isVerified(hospitalData.contact.emergencyHotline);

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Terms of Use & Medical Disclaimer" }]} />

        <div className="mt-6 max-w-4xl space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-teal-600" />
              <span>Legal Terms & Liability Limitations</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Terms of Use & Medical Disclaimer
            </h1>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Effective Date: September 2026 • Shashwat Hospital, Nerul, Navi Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Emergency Red Warning Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-950 flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="font-bold text-red-950">CRITICAL MEDICAL EMERGENCY WARNING</h2>
              <p className="leading-relaxed">
                This website, its online forms, appointment request tools, and second-opinion request portals are <strong>NOT intended for emergency medical communications or acute trauma triage</strong>. If you or someone in your care is experiencing a life-threatening emergency, severe trauma, joint dislocation, open fracture, chest pain, or sudden loss of sensation:
              </p>
              <p className="font-bold pt-1 text-red-900">
                {hasEmergency ? (
                  <>Call our 24/7 Casualty Emergency Hotline immediately at <a href={`tel:${hospitalData.contact.emergencyHotline}`} className="underline font-extrabold">{hospitalData.contact.displayEmergencyHotline}</a> or report directly to the Casualty Room of the nearest hospital.</>
                ) : (
                  <>Report directly to the Casualty Emergency Room of the nearest hospital or call national emergency response services immediately.</>
                )}
              </p>
            </div>
          </div>

          {/* Detailed Legal Sections */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-surface-muted space-y-8 pt-4 border-t border-slate-200">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                1. Acceptance of Terms & User Responsibilities
              </h2>
              <p className="leading-relaxed">
                By accessing, browsing, or utilizing any feature of the {hospitalData.name} website, patient self-portal, online appointment booking wizard, or second-opinion portal, you explicitly agree to be bound by these Terms of Use, our <Link href="/privacy-policy" className="text-teal-800 font-semibold underline">Privacy Policy</Link>, and all applicable laws of India. If you do not agree to these terms, you must refrain from using this website.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                2. Educational & Informational Nature of Content
              </h2>
              <p className="leading-relaxed">
                All materials, articles, condition guides, surgical procedure explanations, joint health advice, and FAQs published on this website are provided strictly for general educational, academic, and informational awareness.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>No Medical Diagnosis:</strong> Website content does not constitute formal medical diagnosis, clinical evaluation, or treatment plans.</li>
                <li><strong>No Doctor-Patient Relationship:</strong> Accessing information on this website or submitting an online inquiry form does <strong>NOT establish a formal doctor-patient relationship</strong>. A valid doctor-patient relationship is created solely upon an in-person physical consultation or formal clinical intake by an authorized medical practitioner at our hospital.</li>
                <li><strong>Always Seek Professional Advice:</strong> Always seek the direct advice of a qualified orthopaedic surgeon or medical practitioner regarding any medical condition or symptom. Never disregard professional medical advice or delay seeking treatment because of content read on this website.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                3. Online Appointment & Second-Opinion Requests
              </h2>
              <p className="leading-relaxed">
                Submitting an appointment request or second-opinion form through our website indicates your preferred schedule and clinical interest:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Confirmation Required:</strong> Online submission does <strong>not guarantee an immediate appointment slot</strong>. Appointments are confirmed only when validated by our hospital outpatient reception desk via telephone call or SMS/WhatsApp message.</li>
                <li><strong>Accuracy of Information:</strong> You are responsible for providing accurate contact numbers and medical background details. {hospitalData.name} is not liable for delayed communications resulting from inaccurate patient contact details.</li>
                <li><strong>Second Opinion Review:</strong> Second-opinion evaluations provided digitally are preliminary recommendations based strictly on patient-uploaded reports. They cannot replace an in-person physical examination or fresh diagnostic imaging performed by treating surgeons.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                4. No Guarantees of Clinical Surgical Outcomes
              </h2>
              <p className="leading-relaxed">
                Orthopaedic treatments, joint replacement surgeries, arthroscopic procedures, and rehabilitation outcomes vary significantly between individual patients depending on age, joint degradation, bone density, pre-existing health conditions, and post-operative physiotherapy compliance.
              </p>
              <p className="leading-relaxed font-semibold text-navy-950">
                {hospitalData.name} and its medical staff explicitly disclaim any representation, warranty, or guarantee regarding specific surgical outcomes, 100% pain elimination, or uniform recovery speed. Clinical expectations are discussed individually during direct doctor consultation.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                5. Intellectual Property & Copyright Protection
              </h2>
              <p className="leading-relaxed">
                All editorial content, health guides, graphic illustrations, logos, visual layouts, branding marks, software scripts, and design elements published on this website are the intellectual property of {hospitalData.name}, Nerul, Navi Mumbai, protected under Indian Copyright and Intellectual Property laws.
              </p>
              <p className="leading-relaxed">
                You may print or download copies of patient education materials for personal, non-commercial use only. Any unauthorized reproduction, commercial distribution, modification, or republication without explicit written authorization is strictly prohibited.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                6. Limitation of Liability & Indemnification
              </h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by applicable law in India:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>{hospitalData.name}, its management, doctors, officers, employees, or technical contractors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use this website or reliance on information presented herein.</li>
                <li>You agree to indemnify, defend, and hold harmless {hospitalData.name} against any claims, losses, liabilities, or legal expenses resulting from your violation of these Terms of Use or misuse of online patient services.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                7. Governing Law & Judicial Jurisdiction
              </h2>
              <p className="leading-relaxed">
                These Terms of Use, privacy policies, and all website transactions are governed by and construed in accordance with the laws of the Republic of India. Any legal action, dispute, or proceeding arising under or relating to this website shall be subject to the exclusive jurisdiction of the competent courts in Navi Mumbai / Thane District, Maharashtra, India.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-navy-950">
                8. Updates & Modifications to Terms
              </h2>
              <p className="leading-relaxed">
                {hospitalData.name} reserves the right to modify, amend, or update these Terms of Use at any time without prior individual notice. Your continued use of the website following published updates constitutes your acceptance of the revised terms.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
