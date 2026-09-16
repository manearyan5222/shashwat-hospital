import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldAlert,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  FileText,
} from "lucide-react";
import { hospitalData } from "@/data/hospital";
import { departmentsData } from "@/data/departments";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-navy-900">
      <Container>
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-800">
          {/* Column 1: Hospital Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white font-bold text-xl shadow-md">
                <span className="font-heading">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  SHASHWAT HOSPITAL
                </span>
                <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase">
                  Nerul, Navi Mumbai
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated orthopaedic and surgical healthcare destination providing precision joint replacement, arthroscopic sports surgery, spine evaluation, fracture trauma care, and dedicated rehabilitation.
            </p>

            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-emergency" />
                <span>24/7 Trauma & Emergency Hotline</span>
              </div>
              <p className="text-lg font-bold text-white tracking-tight">
                {hospitalData.contact.displayEmergencyHotline}
              </p>
              <p className="text-xs text-slate-400">
                Casualty Medical Officer & On-Call Orthopaedic Surgeon available round the clock.
              </p>
            </div>
          </div>

          {/* Column 2: Orthopaedic Specialties */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider border-l-2 border-teal-500 pl-2.5">
              Orthopaedic Care
            </h3>
            <ul className="space-y-2 text-xs">
              {departmentsData.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/treatments`}
                    className="hover:text-teal-300 transition-colors inline-flex items-center gap-1 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500" />
                    <span>{dept.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/orthopaedics"
                  className="text-teal-400 font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>View All Subspecialties →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Services */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider border-l-2 border-teal-500 pl-2.5">
              Patient Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/appointment" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Book an Appointment</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Find a Specialist</span>
                </Link>
              </li>
              <li>
                <Link href="/second-opinion" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Request Second Opinion</span>
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Condition Education Library</span>
                </Link>
              </li>
              <li>
                <Link href="/rehabilitation" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Rehabilitation Journey</span>
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Hospital Facilities & OT</span>
                </Link>
              </li>
              <li>
                <Link href="/health-library" className="hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Health Articles & Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider border-l-2 border-teal-500 pl-2.5">
              Hospital Location
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {hospitalData.location.addressLine1}, {hospitalData.location.addressLine2},{" "}
                  {hospitalData.location.locality}, {hospitalData.location.city},{" "}
                  {hospitalData.location.state} - {hospitalData.location.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>OPD Desk: {hospitalData.contact.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{hospitalData.contact.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{hospitalData.timings.opdHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={hospitalData.location.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800/60 hover:bg-teal-700 text-teal-100 text-xs font-semibold border border-teal-600 transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Open Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">Medical Transparency Notice: </span>
              {hospitalData.legal.medicalDisclaimer}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="mt-8 pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{hospitalData.legal.copyrightText}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-teal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-300 transition-colors">
              Terms & Medical Disclaimer
            </Link>
            <Link href="/contact" className="hover:text-teal-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
