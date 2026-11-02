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
    priceRange: "$$",
    isAcceptingNewPatients: true,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Nerul, Navi Mumbai, Maharashtra, India",
    },
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
        description: "Outpatient Department (OPD) Consultations",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 Emergency & Acute Trauma Admissions",
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
        procedureType: "SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Total Hip Replacement",
        procedureType: "SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Arthroscopic ACL Reconstruction",
        procedureType: "SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Spine Microdiscectomy",
        procedureType: "SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Custom Foot Orthotics & Biomechanics Analysis",
        procedureType: "NoninvasiveProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Orthopaedic Trauma & Fracture Fixation",
        procedureType: "SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Physiotherapy & Musculoskeletal Rehabilitation",
        procedureType: "NoninvasiveProcedure",
      },
    ],
    department: [
      {
        "@type": "MedicalClinic",
        name: "Centre for Joint Replacement",
        medicalSpecialty: "JointReplacement",
      },
      {
        "@type": "MedicalClinic",
        name: "Sports Medicine & Arthroscopy Unit",
        medicalSpecialty: "SportsMedicine",
      },
      {
        "@type": "MedicalClinic",
        name: "Spine Care & Disc Interventions",
        medicalSpecialty: "SpineSurgery",
      },
      {
        "@type": "MedicalClinic",
        name: "Foot & Ankle Orthopaedic Centre",
        medicalSpecialty: "Orthopedics",
      },
      {
        "@type": "MedicalClinic",
        name: "24/7 Trauma & Fracture Care Service",
        medicalSpecialty: "Orthopedics",
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

export function BreadcrumbJsonLd({ items }: { items: { name: string; item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${SITE_URL}${it.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalProcedureJsonLd({
  name,
  description,
  procedureType = "SurgicalProcedure",
  bodyLocation,
  url,
}: {
  name: string;
  description: string;
  procedureType?: string;
  bodyLocation?: string;
  url?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    procedureType,
    url: url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : undefined,
    hospitalAffiliation: {
      "@type": "Hospital",
      name: hospitalData.name,
      url: SITE_URL,
    },
  };

  if (bodyLocation) {
    schema.bodyLocation = bodyLocation;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalConditionJsonLd({
  name,
  description,
  possibleTreatment,
  url,
}: {
  name: string;
  description: string;
  possibleTreatment?: string[];
  url?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name,
    description,
    url: url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : undefined,
  };

  if (possibleTreatment && possibleTreatment.length > 0) {
    schema.possibleTreatment = possibleTreatment.map((t) => ({
      "@type": "MedicalTherapy",
      name: t,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PhysicianJsonLd({
  name,
  designation,
  medicalSpecialty,
  description,
  url,
  registrationNumber,
}: {
  name: string;
  designation: string;
  medicalSpecialty: string;
  description?: string;
  url?: string;
  registrationNumber?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    jobTitle: designation,
    medicalSpecialty,
    description,
    url: url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : undefined,
    hospitalAffiliation: {
      "@type": "Hospital",
      name: hospitalData.name,
      url: SITE_URL,
    },
  };

  if (isVerified(registrationNumber)) {
    schema.identifier = registrationNumber;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
