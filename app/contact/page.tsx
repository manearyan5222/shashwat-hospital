import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { LocationCard } from "@/components/LocationCard";
import { CTASection } from "@/components/CTASection";
import { hospitalData } from "@/data/hospital";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Calendar,
  MessageSquare,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Shashwat Hospital | Nerul, Navi Mumbai",
  description:
    "Get in touch with Shashwat Hospital in Sector 19A, Nerul, Navi Mumbai. Phone numbers, emergency trauma hotline, email, Google Maps directions, and OPD hours.",
};

export default function ContactPage() {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Hospital Contact & Inquiries</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Reach Shashwat Hospital in Nerul
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            We are here to assist with outpatient appointments, emergency trauma admissions, specialist consultations, and insurance billing queries.
          </p>
        </div>

        {/* 4 Contact Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* OPD Appointment */}
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-navy-950">
              OPD Appointment Desk
            </h3>
            <p className="text-xs text-surface-muted">
              For scheduling doctor consultations and general inquiries.
            </p>
            <a
              href={`tel:${hospitalData.contact.primaryPhone}`}
              className="font-bold text-xs text-teal-800 hover:underline block pt-1"
            >
              {hospitalData.contact.displayPhone}
            </a>
          </div>

          {/* 24/7 Emergency */}
          <div className="p-6 rounded-3xl bg-red-50 border border-red-200 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emergency text-white flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-heading font-bold text-base text-emergency">
              24/7 Emergency & Trauma
            </h3>
            <p className="text-xs text-red-900/80">
              Immediate triage for acute fractures and accident injuries.
            </p>
            <a
              href={`tel:${hospitalData.contact.emergencyHotline}`}
              className="font-bold text-xs text-emergency hover:underline block pt-1"
            >
              {hospitalData.contact.displayEmergencyHotline}
            </a>
          </div>

          {/* Email Support */}
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-navy-950">
              Email Helpdesk
            </h3>
            <p className="text-xs text-surface-muted">
              Administrative queries, records, and general medical inquiries.
            </p>
            <a
              href={`mailto:${hospitalData.contact.email}`}
              className="font-bold text-xs text-navy-900 hover:underline block pt-1 break-all"
            >
              {hospitalData.contact.email}
            </a>
          </div>

          {/* WhatsApp Inquiries */}
          <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-navy-950">
              WhatsApp Helpdesk
            </h3>
            <p className="text-xs text-surface-muted">
              Message our coordination desk for OPD timings & appointment inquiries.
            </p>
            <a
              href={`https://wa.me/${hospitalData.contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-xs text-teal-800 hover:underline block pt-1"
            >
              {hospitalData.contact.displayWhatsappNumber}
            </a>
          </div>
        </div>

        {/* Location & Directions Map Card */}
        <div className="pt-6">
          <LocationCard />
        </div>

        {/* Insurance & TPA Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2.5 font-heading font-bold text-base text-navy-950">
            <Building className="w-5 h-5 text-teal-700" />
            <h3>Cashless Health Insurance & TPA Support Desk</h3>
          </div>
          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
            {hospitalData.insuranceAndTpa.tpaPartnersNotice}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {hospitalData.insuranceAndTpa.deskContact}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CTASection />
        </div>
      </Container>
    </div>
  );
}
