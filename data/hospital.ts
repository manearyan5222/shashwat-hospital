/**
 * Centralized Verified Hospital Information Configuration
 * 
 * STRICT NO-FABRICATION POLICY:
 * In accordance with project policy, any hospital information not officially
 * verified with Shashwat Hospital is marked with the literal string "VERIFY_WITH_HOSPITAL"
 * or sentinel zero coordinates { lat: 0, lng: 0 }.
 * 
 * UI components must use isVerified() from "@/lib/verify" to guard rendering
 * and NEVER output placeholder strings or dead/fake tel/email links to users.
 */

export interface HospitalConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  brandPromise: string;
  location: {
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
    nearbyTransit: {
      railwayStation: string;
      busStop: string;
      highwayAccess: string;
      parkingInfo: string;
    };
  };
  contact: {
    primaryPhone: string;
    displayPhone: string;
    emergencyHotline: string;
    displayEmergencyHotline: string;
    appointmentDesk: string;
    displayAppointmentDesk: string;
    whatsappNumber: string;
    displayWhatsappNumber: string;
    email: string;
    emergencyEmail: string;
  };
  timings: {
    opdHours: string;
    emergencyHours: string;
    visitingHours: string;
    pharmacyHours: string;
    radiologyHours: string;
  };
  accreditations: {
    title: string;
    status: string;
    isVerified: boolean;
  }[];
  insuranceAndTpa: {
    tpaPartnersNotice: string;
    cashlessFacilityNotice: string;
    deskContact: string;
  };
  legal: {
    medicalDisclaimer: string;
    copyrightText: string;
  };
}

export const hospitalData: HospitalConfig = {
  name: "Shashwat Hospital",
  tagline: "Move Better. Live Better.",
  shortDescription: "Orthopaedic and surgical healthcare in Nerul, Navi Mumbai — focused on diagnosis, treatment, and functional recovery.",
  fullDescription: "Shashwat Hospital is an orthopaedic and surgical healthcare destination in Nerul, Navi Mumbai. Our clinical focus centres around patient care, orthopaedic diagnostics, evidence-based joint and spine interventions, and structured rehabilitation.",
  brandPromise: "Orthopaedic care focused on helping you return to the life you love.",
  
  location: {
    addressLine1: "VERIFY_WITH_HOSPITAL",
    addressLine2: "VERIFY_WITH_HOSPITAL",
    landmark: "VERIFY_WITH_HOSPITAL",
    locality: "Nerul",
    city: "Navi Mumbai",
    state: "Maharashtra",
    postalCode: "VERIFY_WITH_HOSPITAL",
    country: "India",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    googleMapsEmbedUrl: "VERIFY_WITH_HOSPITAL",
    googleMapsLink: "VERIFY_WITH_HOSPITAL",
    nearbyTransit: {
      railwayStation: "VERIFY_WITH_HOSPITAL",
      busStop: "VERIFY_WITH_HOSPITAL",
      highwayAccess: "VERIFY_WITH_HOSPITAL",
      parkingInfo: "VERIFY_WITH_HOSPITAL",
    },
  },

  contact: {
    primaryPhone: "VERIFY_WITH_HOSPITAL",
    displayPhone: "VERIFY_WITH_HOSPITAL",
    emergencyHotline: "VERIFY_WITH_HOSPITAL",
    displayEmergencyHotline: "VERIFY_WITH_HOSPITAL",
    appointmentDesk: "VERIFY_WITH_HOSPITAL",
    displayAppointmentDesk: "VERIFY_WITH_HOSPITAL",
    whatsappNumber: "VERIFY_WITH_HOSPITAL",
    displayWhatsappNumber: "VERIFY_WITH_HOSPITAL",
    email: "VERIFY_WITH_HOSPITAL",
    emergencyEmail: "VERIFY_WITH_HOSPITAL",
  },

  timings: {
    opdHours: "VERIFY_WITH_HOSPITAL",
    emergencyHours: "VERIFY_WITH_HOSPITAL",
    visitingHours: "VERIFY_WITH_HOSPITAL",
    pharmacyHours: "VERIFY_WITH_HOSPITAL",
    radiologyHours: "VERIFY_WITH_HOSPITAL",
  },

  accreditations: [
    {
      title: "NABH Accreditation / Compliance",
      status: "VERIFY_WITH_HOSPITAL",
      isVerified: false,
    },
    {
      title: "State Health Authority Registration",
      status: "VERIFY_WITH_HOSPITAL",
      isVerified: false,
    },
    {
      title: "Biomedical Waste & Radiation Safety Certified",
      status: "VERIFY_WITH_HOSPITAL",
      isVerified: false,
    },
  ],

  insuranceAndTpa: {
    tpaPartnersNotice: "VERIFY_WITH_HOSPITAL",
    cashlessFacilityNotice: "VERIFY_WITH_HOSPITAL",
    deskContact: "VERIFY_WITH_HOSPITAL",
  },

  legal: {
    medicalDisclaimer: "Medical Disclaimer: The content provided on this website is for educational and general informational purposes only and does not constitute formal medical diagnosis, treatment advice, or a doctor-patient relationship. Always consult a qualified orthopaedic surgeon or medical professional for personalized evaluation.",
    copyrightText: `© ${new Date().getFullYear()} Shashwat Hospital, Nerul, Navi Mumbai. All rights reserved.`,
  },
};
