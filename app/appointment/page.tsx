import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AppointmentWizard } from "@/components/AppointmentWizard";
import { hospitalData } from "@/data/hospital";
import { Phone, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment | Orthopaedic OPD in Nerul",
  description:
    "Request an outpatient consultation with orthopaedic specialists at Shashwat Hospital in Nerul, Navi Mumbai. Simple guided scheduling process.",
};

export default function AppointmentPage({
  searchParams,
}: {
  searchParams: { doctor?: string; department?: string; treatment?: string; condition?: string };
}) {
  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Book Appointment" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Outpatient Scheduling</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Book an Orthopaedic Consultation
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Select your clinical department, preferred specialist, and desired date. Our hospital desk will contact you promptly to confirm schedule availability.
          </p>
        </div>

        {/* Quick Contact & Timings Helper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-surface-border shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">Direct OPD Hotline</span>
              <a
                href={`tel:${hospitalData.contact.appointmentDesk}`}
                className="text-teal-800 font-semibold hover:underline"
              >
                {hospitalData.contact.primaryPhone}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-surface-border shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">OPD Working Hours</span>
              <span className="text-slate-600">09:00 AM – 08:00 PM (Mon–Sat)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-surface-border shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">Hospital Location</span>
              <span className="text-slate-600">Sector 19A, Nerul, Navi Mumbai</span>
            </div>
          </div>
        </div>

        {/* Multi-Step Appointment Wizard */}
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading appointment wizard...</div>}>
            <AppointmentWizard
              initialDoctorId={searchParams.doctor}
              initialDepartmentId={searchParams.department}
            />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
