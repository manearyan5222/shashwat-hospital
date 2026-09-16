import React from "react";
import { PhoneCall, Navigation } from "lucide-react";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { Container } from "./Container";

interface EmergencyBannerProps {
  phoneNumber?: string;
}

export function EmergencyBanner({
  phoneNumber = hospitalData.contact.emergencyHotline,
}: EmergencyBannerProps) {
  // If phone number is unverified, do not render banner per Section C.4
  if (!isVerified(phoneNumber)) {
    return null;
  }

  const hasMaps = isVerified(hospitalData.location.googleMapsLink);
  const displayPhone = hospitalData.contact.displayEmergencyHotline || phoneNumber;

  return (
    <aside
      aria-label="Medical Emergency Alert"
      className="hidden md:block bg-[#DC2626] text-[#FFFFFF] py-3 border-y border-red-700 shadow-sm sticky top-[73px] z-40"
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-white animate-pulse shrink-0" />
            <span className="text-sm font-medium">
              Medical Emergency? Call{" "}
              <strong className="font-bold underline tracking-wide">
                {displayPhone}
              </strong>{" "}
              now for immediate casualty and trauma intake.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white text-[#DC2626] font-bold text-xs hover:bg-red-50 transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
            {hasMaps && (
              <a
                href={hospitalData.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-red-800 text-white font-medium text-xs hover:bg-red-900 border border-red-400/40 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </aside>
  );
}
