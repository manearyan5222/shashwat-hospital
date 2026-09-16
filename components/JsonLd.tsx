import React from "react";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { SITE_URL } from "@/lib/site";

export function HospitalJsonLd() {
  const hasVerifiedAddress = isVerified(hospitalData.location.addressLine1);
  const hasVerifiedPhone = isVerified(hospitalData.contact.primaryPhone);
  const hasVerifiedEmergency = isVerified(hospitalData.contact.emergencyHotline);
  const hasVerifiedEmail = isVerified(hospitalData.contact.email);
  const hasVerifiedCoords =
    hospitalData.location.coordinates.lat !== 0 &&
    hospitalData.location.coordinates.lng !== 0;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "MedicalClinic"],
    name: hospitalData.name,
    description: hospitalData.fullDescription,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: hasVerifiedAddress
        ? `${hospitalData.location.addressLine1}, ${hospitalData.location.addressLine2}`
        : undefined,
      addressLocality: hospitalData.location.locality,
      addressRegion: hospitalData.location.state,
      postalCode: isVerified(hospitalData.location.postalCode)
        ? hospitalData.location.postalCode
        : undefined,
      addressCountry: "IN",
    },
    medicalSpecialty: [
      "Orthopedics",
      "Surgical",
      "JointReplacement",
      "SportsMedicine",
      "SpineSurgery",
      "Physiotherapy",
    ],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Total Knee Replacement",
      },
      {
        "@type": "MedicalProcedure",
        name: "Total Hip Replacement",
      },
      {
        "@type": "MedicalProcedure",
        name: "Arthroscopic ACL Reconstruction",
      },
      {
        "@type": "MedicalProcedure",
        name: "Spine Microdiscectomy",
      },
      {
        "@type": "MedicalProcedure",
        name: "Orthopaedic Trauma & Fracture Fixation",
      },
      {
        "@type": "MedicalProcedure",
        name: "Physiotherapy & Rehabilitation",
      },
    ],
  };

  if (hasVerifiedPhone) {
    schema.telephone = hospitalData.contact.primaryPhone;
  }
  if (hasVerifiedEmergency) {
    schema.emergencyTelephone = hospitalData.contact.emergencyHotline;
  }
  if (hasVerifiedEmail) {
    schema.email = hospitalData.contact.email;
  }
  if (hasVerifiedCoords) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: hospitalData.location.coordinates.lat,
      longitude: hospitalData.location.coordinates.lng,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
