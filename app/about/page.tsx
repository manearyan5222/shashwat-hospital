import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { LocationCard } from "@/components/LocationCard";
import { hospitalData } from "@/data/hospital";
import { doctorsData } from "@/data/doctors";
import { facilitiesData } from "@/data/facilities";
import {
  ShieldCheck,
  Building,
  HeartPulse,
  Activity,
  Award,
  Clock,
  UserCheck,
  CheckCircle2,
  Calendar,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Patient-First Orthopaedic Care in Nerul",
  description:
    "Learn about Shashwat Hospital's clinical philosophy, orthopaedic medical team, modern laminar airflow surgical suites, and dedicated rehabilitation centre in Nerul, Navi Mumbai.",
};

export default function AboutPage() {
  return (
    <div className="py-8 space-y-16">
      <Container>
        <Breadcrumbs items={[{ label: "About Shashwat Hospital" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Established Orthopaedic Destination</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Restoring Movement with Dignity, Precision, and Compassion
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Shashwat Hospital is an established orthopaedic and surgical healthcare destination located in Nerul, Navi Mumbai. Our clinical approach is built on transparent medical indications, tissue-sparing surgical techniques, and dedicated rehabilitation.
          </p>
        </div>

        {/* Hospital Philosophy & Overview Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-950">
              Our Medical Philosophy: Conservative-First, Precision When Needed
            </h2>
            <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
              At Shashwat Hospital, we believe surgery should always be an informed, considered step—never a rush. We prioritize non-operative joint preservation, guided physical therapy, and lifestyle adaptations for early and moderate joint and spine conditions.
            </p>
            <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
              When progressive structural degeneration, ligament disruption, or acute fracture trauma requires surgical intervention, our surgeons utilize modern laminar airflow operation theatres, digital imaging, and rapid-recovery protocols to achieve optimal clinical outcomes.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Thorough clinical examinations and transparent explanation of MRI/X-ray scans",
                "Step-wise conservative protocols before recommending surgical options",
                "Advanced laminar airflow surgical environment minimizing infection risks",
                "Integrated physiotherapy initiated on day one for faster functional return",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
              alt="Shashwat Hospital Patient Consultation and Facility"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillars of Patient-Centred Care */}
        <div className="mt-16 pt-16 border-t border-surface-border">
          <SectionHeading
            badge="Our Approach"
            title="The Core Pillars of Shashwat Hospital"
            subtitle="Designed around the patient at every stage of their healthcare journey."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-950">
                Ethical & Transparent Care
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                Clear diagnoses without jargon. We provide patients and families with thorough explanations of treatment choices, anticipated recovery timelines, and transparent costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-950">
                Specialized Infrastructure
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                Equipped with modular laminar airflow theatres, high-frequency digital C-arm imaging, 24/7 casualty trauma resuscitation, and an on-site physiotherapy suite.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-950">
                Continuous Recovery Support
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                Our care doesn’t conclude upon hospital discharge. We coordinate structured home exercise regimens, ergonomic counseling, and sequential follow-up evaluations.
              </p>
            </div>
          </div>
        </div>

        {/* Medical Team Preview */}
        <div className="mt-16 pt-16 border-t border-surface-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionHeading
              badge="Our Doctors"
              title="Clinical Leadership & Medical Faculty"
              subtitle="Specialists with dedicated training in arthroplasty, arthroscopy, spine care, and trauma surgery."
              className="mb-0"
            />
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-navy-950"
            >
              <span>View Full Medical Team →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctorsData.slice(0, 3).map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white border border-surface-border shadow-card flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-900 flex items-center justify-center font-bold text-lg shrink-0">
                  {doc.name[0]}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-navy-950">
                    {doc.salutation} {doc.name}
                  </h4>
                  <p className="text-xs text-teal-800 font-medium">{doc.designation}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.qualifications.join(" • ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-16 pt-16 border-t border-surface-border">
          <LocationCard />
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CTASection />
        </div>
      </Container>
    </div>
  );
}
