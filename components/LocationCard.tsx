import React from "react";
import Link from "next/link";
import { hospitalData } from "@/data/hospital";
import {
  MapPin,
  Phone,
  Calendar,
  Navigation,
  Train,
  Bus,
  Car,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function LocationCard() {
  return (
    <div className="bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Location Details & Directions */}
      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/50 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nerul, Navi Mumbai Location</span>
          </div>

          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mb-2">
            Reach Shashwat Hospital
          </h3>
          <p className="text-sm text-surface-muted leading-relaxed mb-6">
            Located in the heart of Nerul, Navi Mumbai with swift transit access via Nerul Railway Station, Palm Beach Road, and the Sion-Panvel Expressway.
          </p>

          {/* Address & Timings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-navy-950 text-sm">
                  {hospitalData.name}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {hospitalData.location.addressLine1}, {hospitalData.location.addressLine2}, {hospitalData.location.locality}, {hospitalData.location.city}, {hospitalData.location.state} - {hospitalData.location.postalCode}
                </p>
                <p className="text-xs text-teal-800 font-medium mt-1">
                  Landmark: {hospitalData.location.landmark}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{hospitalData.timings.opdHours}</span>
            </div>
          </div>

          {/* Transit and Parking Guide */}
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <Train className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-navy-900">By Train:</strong> {hospitalData.location.nearbyTransit.railwayStation}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Bus className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-navy-900">By Bus:</strong> {hospitalData.location.nearbyTransit.busStop}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Car className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-navy-900">Road & Parking:</strong> {hospitalData.location.nearbyTransit.parkingInfo}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <a
            href={hospitalData.location.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
          <a
            href={`tel:${hospitalData.contact.primaryPhone}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-navy-900 text-navy-950 font-semibold text-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-teal-700" />
            <span>Call Hospital</span>
          </a>
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-300" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      {/* Map Embed Container */}
      <div className="lg:col-span-5 bg-slate-100 min-h-[320px] relative border-t lg:border-t-0 lg:border-l border-surface-border">
        <iframe
          src={hospitalData.location.googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "360px" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Shashwat Hospital Nerul Google Maps Location"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-lg border border-surface-border shadow-md text-[11px] text-navy-950 font-semibold">
          📍 Nerul, Navi Mumbai
        </div>
      </div>
    </div>
  );
}
