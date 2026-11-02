"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { QuickActionGrid } from "@/components/QuickActionGrid";
import { ConcernCard } from "@/components/ConcernCard";
import { DoctorFinder } from "@/components/DoctorFinder";
import { DoctorCard } from "@/components/DoctorCard";
import { TreatmentCard } from "@/components/TreatmentCard";
import { FacilityCard } from "@/components/FacilityCard";
import { TreatmentJourney } from "@/components/TreatmentJourney";
import { RecoveryJourney } from "@/components/RecoveryJourney";
import { PatientStoryCard } from "@/components/PatientStoryCard";
import { ArticleCard } from "@/components/ArticleCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocationCard } from "@/components/LocationCard";
import { CTASection } from "@/components/CTASection";
import { FAQJsonLd } from "@/components/JsonLd";

import { TaraHospitalHero } from "@/components/TaraHospitalHero";
import { TaraDualCare } from "@/components/TaraDualCare";
import { FootPainZoneInteractive } from "@/components/FootPainZoneInteractive";
import { CustomOrthoticsAnalyzer } from "@/components/CustomOrthoticsAnalyzer";
import { JointRecoveryCalculator } from "@/components/JointRecoveryCalculator";
import { SurgicalTechCustomizer } from "@/components/SurgicalTechCustomizer";
import { HospitalSecuritySection } from "@/components/HospitalSecuritySection";
import { HospitalComparisonTable } from "@/components/HospitalComparisonTable";
import { QuickAppointmentModal } from "@/components/QuickAppointmentModal";

import { hospitalData } from "@/data/hospital";
import { departmentsData } from "@/data/departments";
import { doctorsData } from "@/data/doctors";
import { treatmentsData } from "@/data/treatments";
import { facilitiesData } from "@/data/facilities";
import { articlesData } from "@/data/articles";
import { faqsData } from "@/data/faqs";
import { patientStoriesData } from "@/data/testimonials";

import {
  Activity,
  Bone,
  AlignVerticalJustifyCenter,
  Zap,
  ShieldAlert,
  RotateCw,
  Footprints,
  HeartPulse,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

// Concern Cards
const concernItems = [
  { icon: Bone, label: "Knee Pain", href: "/conditions/knee-pain" },
  { icon: Footprints, label: "Foot & Heel Pain", href: "/foot-and-ankle" },
  { icon: Activity, label: "Joint Pain", href: "/conditions/osteoarthritis" },
  { icon: AlignVerticalJustifyCenter, label: "Back & Spine", href: "/conditions/back-pain" },
  { icon: Zap, label: "Sports Injury", href: "/conditions/sports-injury" },
  { icon: ShieldAlert, label: "Fracture & Trauma", href: "/emergency" },
  { icon: RotateCw, label: "Shoulder Problems", href: "/conditions/shoulder-pain" },
  { icon: HeartPulse, label: "Recovery & Rehab", href: "/rehabilitation" },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = () => setIsModalOpen(true);
  const handleCloseBooking = () => setIsModalOpen(false);

  const featuredTreatments = treatmentsData.slice(0, 4);
  const featuredDoctors = doctorsData.slice(0, 3);
  const featuredFacilities = facilitiesData.slice(0, 3);
  const homeFaqs = faqsData.slice(0, 6);

  // Universal Care Journey
  const universalJourney = [
    {
      stepNumber: 1,
      title: "Consultation & Clinical Exam",
      description: "Thorough review of joint symptoms, mechanical pain triggers, and medical history with your orthopaedic specialist.",
      timeline: "Step 1",
    },
    {
      stepNumber: 2,
      title: "Precision Imaging & Evaluation",
      description: "Digital X-rays, high-resolution MRI, or blood work to objectively grade joint wear, ligament tears, or fractures.",
      timeline: "Step 2",
    },
    {
      stepNumber: 3,
      title: "Personalized Treatment Plan",
      description: "Collaborative discussion of non-surgical options, targeted injections, or advanced surgical interventions.",
      timeline: "Step 3",
    },
    {
      stepNumber: 4,
      title: "Targeted Procedure / Therapy",
      description: "Sterile surgical execution in laminar airflow theatres or structured non-operative therapeutic intervention.",
      timeline: "Step 4",
    },
    {
      stepNumber: 5,
      title: "In-Hospital Recovery & Mobilization",
      description: "Multimodal pain relief and bedside physiotherapy initiated on day one to encourage safe joint movement.",
      timeline: "Step 5",
    },
    {
      stepNumber: 6,
      title: "Guided Follow-Up & Rehabilitation",
      description: "Sequential progress checks, progressive muscle strengthening, and lifelong joint health guidance.",
      timeline: "Step 6",
    },
  ];

  return (
    <>
      <FAQJsonLd faqs={homeFaqs} />

      {/* TARA & GOOGLE STITCH INSPIRED HERO SECTION */}
      <TaraHospitalHero onOpenBooking={handleOpenBooking} />

      {/* EMERGENCY STRIP */}
      <EmergencyBanner />

      {/* QUICK ACTIONS SECTION */}
      <section className="py-8 sm:py-12 bg-[#0F172A] border-b border-white/10">
        <Container>
          <QuickActionGrid />
        </Container>
      </section>

      {/* TARA DUAL-CARE ARCHITECTURE */}
      <TaraDualCare onOpenBooking={handleOpenBooking} />

      {/* MISSISSAUGA FOOT CLINIC INSPIRED INTERACTIVE PAIN ZONE CHECKER */}
      <FootPainZoneInteractive onOpenBooking={handleOpenBooking} />

      {/* WHAT BRINGS YOU HERE? */}
      <section className="py-16 sm:py-20 bg-[#0B132B]">
        <Container>
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white leading-tight">
              What brings you here?
            </h2>
            <p className="mt-2 text-[16px] text-slate-400">
              Tell us what&apos;s bothering you — we&apos;ll point you to the right information and specialist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {concernItems.map((item) => (
              <ConcernCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 3D CUSTOM ORTHOTICS & GAIT ANALYZER */}
      <CustomOrthoticsAnalyzer onOpenBooking={handleOpenBooking} />

      {/* ACCELERATED JOINT MOBILITY & RECOVERY CALCULATOR */}
      <JointRecoveryCalculator onOpenBooking={handleOpenBooking} />

      {/* ORTHOPAEDIC SPECIALTIES */}
      <section className="py-16 sm:py-20 bg-[#0B172A] border-y border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Clinical Excellence"
              title="Orthopaedic Care Across Every Stage of Recovery"
              subtitle="From minimally invasive arthroscopic preservation to advanced joint replacement and complex fracture trauma care."
              className="mb-0 text-white"
            />
            <Link
              href="/orthopaedics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white shrink-0"
            >
              <span>View All Subspecialties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.map((dept) => (
              <div
                key={dept.id}
                className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-teal-500/40 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold mb-4 border border-teal-500/30">
                    <Activity className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {dept.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {dept.shortDescription}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-white/10 text-xs text-slate-300">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      Key Focus:
                    </span>
                    {dept.keyConditions.slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link
                    href={`/treatments`}
                    className="font-bold text-white hover:text-teal-400 inline-flex items-center gap-1"
                  >
                    <span>Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={handleOpenBooking}
                    className="text-teal-400 font-bold hover:underline"
                  >
                    Book OPD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SURGICAL TECHNOLOGY & IMPLANT CUSTOMIZER */}
      <SurgicalTechCustomizer onOpenBooking={handleOpenBooking} />

      {/* FEATURED TREATMENTS */}
      <section className="py-16 sm:py-20 bg-[#0B132B]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Evidence-Based Care"
              title="Featured Orthopaedic Treatments"
              subtitle="Precision surgical and therapeutic interventions delivered by experienced orthopaedic consultants."
              className="mb-0 text-white"
            />
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white shrink-0"
            >
              <span>Explore All Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredTreatments.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </Container>
      </section>

      {/* HOSPITAL SAFETY & ZERO INFECTION PROTOCOL */}
      <HospitalSecuritySection />

      {/* HOSPITAL COMPARISON TABLE */}
      <HospitalComparisonTable />

      {/* MEET OUR SPECIALISTS & DOCTOR FINDER */}
      <section className="py-16 sm:py-24 bg-[#0F172A] border-y border-white/10">
        <Container>
          <SectionHeading
            badge="Medical Faculty"
            title="Meet Our Orthopaedic Specialists"
            subtitle="Qualified orthopaedic surgeons, sports medicine consultants, and rehabilitation experts in Nerul."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {/* Interactive Doctor Finder Tool */}
          <DoctorFinder />
        </Container>
      </section>

      {/* 6-STEP TREATMENT JOURNEY */}
      <section className="py-16 sm:py-20 bg-[#0B132B]">
        <Container>
          <SectionHeading
            badge="Patient Pathway"
            title="What to Expect on Your Care Journey"
            subtitle="From your initial consultation and diagnostic imaging to surgery and long-term functional recovery."
            centered
          />

          <TreatmentJourney steps={universalJourney} title="" />
        </Container>
      </section>

      {/* FACILITIES & INFRASTRUCTURE */}
      <section className="py-16 sm:py-20 bg-[#0F172A] border-y border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Modern Infrastructure"
              title="Designed Around Patient Comfort & Safety"
              subtitle="Laminar airflow operation theatres, 24/7 trauma intake, digital radiography, and dedicated rehabilitation gym in Nerul."
              className="mb-0 text-white"
            />
            <Link
              href="/facilities"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white shrink-0"
            >
              <span>View All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </Container>
      </section>

      {/* REHABILITATION JOURNEY */}
      <RecoveryJourney />

      {/* CASE REVIEWS */}
      <section className="py-16 sm:py-20 bg-[#0B132B]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Recovery Milestones"
              title="Patient Care Case Studies"
              subtitle="Real-world clinical pathways and functional recovery milestones achieved under our multidisciplinary orthopaedic team."
              className="mb-0 text-white"
            />
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white shrink-0"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientStoriesData.map((story) => (
              <PatientStoryCard key={story.id} story={story} />
            ))}
          </div>
        </Container>
      </section>

      {/* HEALTH LIBRARY */}
      <section className="py-16 sm:py-20 bg-[#0F172A] border-y border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Patient Education"
              title="From Our Health & Recovery Library"
              subtitle="Evidence-based articles on joint preservation, spine ergonomics, sports injury rehabilitation, and bone health."
              className="mb-0 text-white"
            />
            <Link
              href="/health-library"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white shrink-0"
            >
              <span>Explore Health Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </Container>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 bg-[#0B132B]">
        <Container>
          <SectionHeading
            badge="Patient Guide"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding appointments, orthopaedic consultations, emergency care, and hospital facilities."
            centered
          />

          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={homeFaqs} />
          </div>
        </Container>
      </section>

      {/* LOCATION & DIRECTIONS */}
      <section className="py-16 sm:py-20 bg-[#0F172A] border-y border-white/10">
        <Container>
          <LocationCard />
        </Container>
      </section>

      {/* HIGH-IMPACT APPOINTMENT CTA */}
      <Container className="py-8">
        <CTASection
          title="Ready to Consult an Orthopaedic Specialist?"
          subtitle="Request an outpatient consultation at Shashwat Hospital in Nerul, Navi Mumbai. Our coordination desk will assist you with convenient slot scheduling."
          primaryButtonText="Book an Appointment"
          primaryButtonHref="/appointment"
        />
      </Container>

      {/* PRIORITY OPD APPOINTMENT MODAL */}
      <QuickAppointmentModal isOpen={isModalOpen} onClose={handleCloseBooking} />
    </>
  );
}
