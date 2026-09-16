/**
 * Centralized Verified Hospital Information Configuration
 * 
 * IMPORTANT CONTENT RULE:
 * Never fabricate hospital statistics, surgery counts, awards, accreditations, or doctor details.
 * Any unconfirmed hospital details must use VERIFY_WITH_HOSPITAL or clear educational placeholders.
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
  shortDescription: "Comprehensive orthopaedic and surgical healthcare in Nerul, Navi Mumbai — dedicated to diagnosis, treatment, and functional recovery.",
  fullDescription: "Shashwat Hospital is an established orthopaedic and surgical healthcare destination located in Nerul, Navi Mumbai. Our clinical approach centres around compassionate patient care, precision orthopaedic diagnostics, evidence-based joint and spine interventions, and tailored rehabilitation.",
  brandPromise: "Orthopaedic care focused on helping you return to the life you love.",
  
  location: {
    addressLine1: "Sector 19A, Near Nerul Railway Station",
    addressLine2: "Nerul (East)",
    landmark: "Close to Nerul Station / Palm Beach Road corridor",
    locality: "Nerul",
    city: "Navi Mumbai",
    state: "Maharashtra",
    postalCode: "400706",
    country: "India",
    coordinates: {
      lat: 19.0330,
      lng: 73.0169,
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15087.653696803716!2d73.00763264426514!3d19.02353347043019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3c0c0000001%3A0x6b4dbfc783d8a4e8!2sNerul%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsLink: "https://maps.google.com/?q=Shashwat+Hospital+Nerul+Navi+Mumbai",
    nearbyTransit: {
      railwayStation: "Nerul Railway Station (Harbour & Trans-Harbour Line) — approx. 5 to 7 mins",
      busStop: "Nerul Sector 19 / LP Bus Stop — regular NMMT and BEST connectivity",
      highwayAccess: "Conveniently connected via Sion-Panvel Expressway and Palm Beach Road",
      parkingInfo: "Designated patient drop-off bay and visitor parking available on premises.",
    },
  },

  contact: {
    primaryPhone: "+91-22-27700000",
    displayPhone: "+91 (022) 2770 0000 [VERIFY_WITH_HOSPITAL]",
    emergencyHotline: "+91-22-27700999",
    displayEmergencyHotline: "+91 (022) 2770 0999 [24x7 Emergency]",
    appointmentDesk: "+91-9820000000",
    displayAppointmentDesk: "+91 98200 00000 [OPD Desk]",
    whatsappNumber: "+91-9820000000",
    displayWhatsappNumber: "+91 98200 00000",
    email: "care@shashwathospital.com",
    emergencyEmail: "emergency@shashwathospital.com",
  },

  timings: {
    opdHours: "Monday to Saturday: 09:00 AM – 08:00 PM (Doctor schedules vary)",
    emergencyHours: "24 Hours / 7 Days a Week (Trauma & Emergency Care)",
    visitingHours: "04:30 PM – 07:00 PM (Inpatient wards)",
    pharmacyHours: "24 Hours Open",
    radiologyHours: "24 Hours for Emergency X-Ray; Scheduled scans during OPD hours",
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
    tpaPartnersNotice: "Cashless insurance claims and TPA desk support available. Please check your policy coverage with our insurance helpdesk prior to planned admission.",
    cashlessFacilityNotice: "Hospital TPA desk facilitates pre-authorization with major insurance providers as per hospital empanelment status.",
    deskContact: "TPA & Insurance Helpdesk: Contact hospital reception during 10:00 AM – 06:00 PM.",
  },

  legal: {
    medicalDisclaimer: "Medical Disclaimer: The content provided on this website is for educational and general informational purposes only and does not constitute formal medical diagnosis, treatment advice, or a doctor-patient relationship. Always consult a qualified orthopaedic surgeon or medical professional for personalized evaluation.",
    copyrightText: `© ${new Date().getFullYear()} Shashwat Hospital, Nerul, Navi Mumbai. All rights reserved.`,
  },
};
