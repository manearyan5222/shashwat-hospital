import React from "react";
import { hospitalData } from "@/data/hospital";

export function HospitalJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "MedicalClinic"],
    name: hospitalData.name,
    description: hospitalData.fullDescription,
    url: "https://shashwathospital.com",
    telephone: hospitalData.contact.primaryPhone,
    emergencyTelephone: hospitalData.contact.emergencyHotline,
    email: hospitalData.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${hospitalData.location.addressLine1}, ${hospitalData.location.addressLine2}`,
      addressLocality: hospitalData.location.locality,
      addressRegion: hospitalData.location.state,
      postalCode: hospitalData.location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hospitalData.location.coordinates.lat,
      longitude: hospitalData.location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 Emergency Trauma Intake",
      },
    ],
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
