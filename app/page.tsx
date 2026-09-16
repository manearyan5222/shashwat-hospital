import React from "react";
import Image from "next/image";
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
  Calendar,
  Stethoscope,
  Phone,
  ShieldCheck,
  Building,
  Clock,
  ArrowRight,
} from "lucide-react";

// Section B: 8 Concern Cards
const concernItems = [
  { icon: Bone, label: "Knee Pain", href: "/conditions/knee-pain" },
  { icon: Activity, label: "Joint Pain", href: "/conditions/osteoarthritis" },
  { icon: AlignVerticalJustifyCenter, label: "Back & Spine", href: "/conditions/back-pain" },
  { icon: Zap, label: "Sports Injury", href: "/conditions/sports-injury" },
  { icon: ShieldAlert, label: "Fracture & Trauma", href: "/emergency" },
  { icon: RotateCw, label: "Shoulder Problems", href: "/conditions/shoulder-pain" },
  { icon: Footprints, label: "Mobility Issues", href: "/conditions/knee-pain" },
  { icon: HeartPulse, label: "Recovery & Rehabilitation", href: "/rehabilitation" },
];

export default function HomePage() {
  const featuredTreatments = treatmentsData.slice(0, 4);
  const featuredDoctors = doctorsData.slice(0, 3);
  const featuredFacilities = facilitiesData.slice(0, 3);
  const homeFaqs = faqsData.slice(0, 6);

  // 6-step universal clinical journey
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

      {/* SECTION A: HERO SECTION (55% / 45% Asymmetric Desktop Split) */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#F8FAFC] overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            {/* Left Column: 55% width on desktop */}
            <div className="w-full lg:w-[55%] text-left space-y-0 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500">
              {/* Eyebrow Label */}
              <p className="text-[14px] font-medium tracking-[0.02em] text-[#0E7490] mb-4">
                Shashwat Hospital · Nerul
              </p>

              {/* H1 Heading */}
              <h1 className="font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#0B2545] leading-[1.1] max-w-[14ch] mb-5">
                Move Better. Live Better.
              </h1>

              {/* Subhead */}
              <p className="text-[16px] sm:text-[18px] font-normal text-[#64748B] leading-[1.6] max-w-[480px] mb-8">
                Patient-focused orthopaedic and surgical care designed around your journey — from consultation and treatment to recovery.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3.5">
                {/* Primary CTA */}
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center px-[28px] py-[14px] rounded-[8px] bg-[#0B2545] text-[#FFFFFF] text-sm font-semibold hover:bg-[#07192f] transition-all shadow-sm active:scale-95"
                >
                  Book an Appointment
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center px-[28px] py-[14px] rounded-[8px] bg-transparent text-[#0B2545] text-sm font-semibold border-[1.5px] border-[#0B2545] hover:bg-[#0B2545]/[0.06] transition-all active:scale-95"
                >
                  Find a Doctor
                </Link>

                {/* Tertiary / Emergency CTA */}
                <Link
                  href="/emergency"
                  className="inline-flex items-center justify-center px-[28px] py-[14px] rounded-[8px] bg-[#DC2626] text-[#FFFFFF] text-sm font-semibold hover:bg-red-700 transition-all shadow-sm active:scale-95"
                >
                  Emergency Care
                </Link>
              </div>
            </div>

            {/* Right Column: 45% width on desktop */}
            <div className="w-full lg:w-[45%] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-100">
              <div className="relative aspect-[16/9] lg:aspect-[4/5] w-full rounded-[16px] border border-[#E2E8F0] overflow-hidden shadow-card bg-gradient-to-br from-slate-100 to-teal-50/50 flex flex-col justify-end p-6">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80"
                  alt="Shashwat Hospital Orthopaedic Consultation"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/20 to-transparent" />

                {/* Subtle verified overlay panel */}
                <div className="relative z-10 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-teal-900/80 backdrop-blur-sm border border-teal-500/30 text-teal-200 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>Orthopaedic Centre of Excellence</span>
                  </div>
                  <p className="text-xs text-slate-200 pt-0.5">
                    Sector 19A, Nerul · Navi Mumbai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* EMERGENCY STRIP (Sticky on desktop, hidden on mobile per C.4) */}
      <EmergencyBanner />

      {/* QUICK ACTIONS SECTION */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#E2E8F0]">
        <Container>
          <QuickActionGrid />
        </Container>
      </section>

      {/* SECTION B: "WHAT BRINGS YOU HERE?" (8 Concern Cards, 4-col desktop, 2-col tablet, 1-col mobile) */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <Container>
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-[32px] sm:text-[40px] font-bold text-[#0B2545] leading-tight">
              What brings you here?
            </h2>
            <p className="mt-2 text-[16px] text-[#64748B]">
              Tell us what&apos;s bothering you — we&apos;ll point you to the right information and the right specialist.
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

      {/* ORTHOPAEDIC SPECIALTIES */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Clinical Excellence"
              title="Orthopaedic Care Across Every Stage of Recovery"
              subtitle="From minimally invasive arthroscopic preservation to advanced joint replacement and complex fracture trauma care."
              className="mb-0"
            />
            <Link
              href="/orthopaedics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:text-[#0B2545] shrink-0"
            >
              <span>View All Subspecialties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.map((dept) => (
              <div
                key={dept.id}
                className="p-6 rounded-[10px] bg-white border border-[#E2E8F0] hover:border-[#0E7490]/50 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-teal-50 text-[#0E7490] flex items-center justify-center font-bold mb-4 border border-teal-200/50">
                    <Activity className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0B2545] mb-2">
                    {dept.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                    {dept.shortDescription}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Common Focus:
                    </span>
                    {dept.keyConditions.slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="w-1 h-1 rounded-full bg-[#0E7490]" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/treatments`}
                    className="font-bold text-[#0B2545] hover:text-[#0E7490] inline-flex items-center gap-1"
                  >
                    <span>Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/appointment?department=${dept.id}`}
                    className="text-[#0E7490] font-semibold hover:underline"
                  >
                    Book OPD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED TREATMENTS */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Evidence-Based Care"
              title="Featured Orthopaedic Treatments"
              subtitle="Precision surgical and therapeutic interventions delivered by experienced orthopaedic consultants."
              className="mb-0"
            />
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:text-[#0B2545] shrink-0"
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

      {/* MEET OUR SPECIALISTS & DOCTOR FINDER */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E2E8F0]">
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
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
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
      <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Modern Infrastructure"
              title="Designed Around Patient Comfort & Safety"
              subtitle="Laminar airflow operation theatres, 24/7 trauma intake, digital radiography, and dedicated rehabilitation gym in Nerul."
              className="mb-0"
            />
            <Link
              href="/facilities"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:text-[#0B2545] shrink-0"
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
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Recovery Milestones"
              title="Patient Care Case Studies"
              subtitle="Real-world clinical pathways and functional recovery milestones achieved under our multidisciplinary orthopaedic team."
              className="mb-0"
            />
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:text-[#0B2545] shrink-0"
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
      <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="Patient Education"
              title="From Our Health & Recovery Library"
              subtitle="Evidence-based articles on joint preservation, spine ergonomics, sports injury rehabilitation, and bone health."
              className="mb-0"
            />
            <Link
              href="/health-library"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:text-[#0B2545] shrink-0"
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
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
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
      <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
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
    </>
  );
}
