import React from "react";
import Link from "next/link";
import { Calendar, PhoneCall, Shield, ArrowRight } from "lucide-react";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { Container } from "./Container";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTASection({
  title = "Start Your Journey to Pain-Free Mobility",
  subtitle = "Our orthopaedic team in Nerul is here to guide you with clear evaluations, transparent treatment plans, and dedicated rehabilitation.",
  primaryButtonText = "Book an Appointment",
  primaryButtonHref = "/appointment",
  secondaryButtonText = "Find a Specialist",
  secondaryButtonHref = "/doctors",
}: CTASectionProps) {
  const hasPhone = isVerified(hospitalData.contact.primaryPhone);

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 text-white relative overflow-hidden rounded-3xl my-8">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Shield className="w-3.5 h-3.5 text-teal-300" />
            <span>Patient-Centred Orthopaedic Care</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href={primaryButtonHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{primaryButtonText}</span>
            </Link>

            <Link
              href={secondaryButtonHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all"
            >
              <span>{secondaryButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {hasPhone && (
              <a
                href={`tel:${hospitalData.contact.primaryPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Call: {hospitalData.contact.displayPhone || hospitalData.contact.primaryPhone}</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
