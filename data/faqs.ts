import { hospitalData } from "./hospital";
import { isVerified } from "@/lib/verify";

export interface FAQItem {
  id: string;
  category: "General" | "Appointments" | "Orthopaedics" | "Emergency" | "Insurance & Billing" | "Rehabilitation";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-booking",
    category: "Appointments",
    question: "How do I book an appointment with an orthopaedic specialist?",
    answer: "You can submit an online appointment request through our website wizard by selecting your preferred department, specialist, and date. Our hospital desk will verify schedule availability and contact you directly with confirmation.",
  },
  {
    id: "faq-specialist-choice",
    category: "Appointments",
    question: "Which doctor should I see for my specific joint or spine condition?",
    answer: "You can use our interactive 'Find a Doctor' tool to select the affected body region (such as knee, hip, shoulder, spine, or acute fracture). The tool guides you to the relevant clinical department. Alternatively, our appointment desk can assist you.",
  },
  {
    id: "faq-first-visit",
    category: "Appointments",
    question: "What should I bring to my first orthopaedic consultation?",
    answer: "Please bring any prior X-rays, MRI or CT scans, previous doctor consultation notes, current medication lists, and valid identification. Having your past imaging and medical history helps the consultant make a precise evaluation.",
  },
  {
    id: "faq-location",
    category: "General",
    question: "Where is Shashwat Hospital located?",
    answer: `Shashwat Hospital is located in ${hospitalData.location.locality}, ${hospitalData.location.city}, ${hospitalData.location.state}, ${hospitalData.location.country}. Please check the Contact and Location section for updated address and directions.`,
  },
  {
    id: "faq-emergency",
    category: "Emergency",
    question: "Does Shashwat Hospital provide emergency orthopaedic and trauma care?",
    answer: "Yes. Our trauma care services provide triage and management for acute bone fractures, joint dislocations, and orthopaedic injuries with on-call orthopaedic surgeons and digital imaging access.",
  },
  {
    id: "faq-cashless",
    category: "Insurance & Billing",
    question: "Is cashless health insurance / TPA facility available?",
    answer: "Our hospital provides insurance and TPA support to assist patients with pre-authorization and documentation. Please consult with the hospital helpdesk at the time of admission with your policy details.",
  },
  {
    id: "faq-second-opinion",
    category: "Orthopaedics",
    question: "Can I request a second opinion on an advised surgery or MRI scan?",
    answer: "Yes. Patients are welcome to request a specialist second opinion by scheduling an OPD consultation or submitting their inquiry through our Second Opinion page. Our specialists review clinical indications and discuss evidence-based options.",
  },
  {
    id: "faq-rehab",
    category: "Rehabilitation",
    question: "How is physical rehabilitation managed after surgery?",
    answer: "Rehabilitation begins in the hospital under the direct supervision of our physiotherapy department. A customized, phased recovery protocol is designed in coordination with your treating surgeon, focusing on safe mobilization and strength rebuilding.",
  },
];
