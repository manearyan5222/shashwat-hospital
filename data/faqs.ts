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
    answer: "You can submit an online appointment request through our website wizard, select your preferred doctor, date, and time, or call our OPD appointment desk directly at +91 98200 00000 [VERIFY_WITH_HOSPITAL]. Our coordination desk will verify doctor schedule availability and contact you promptly with confirmation.",
  },
  {
    id: "faq-specialist-choice",
    category: "Appointments",
    question: "Which doctor should I see for my specific joint or spine condition?",
    answer: "You can use our interactive 'Find a Doctor' tool to select the affected body region (such as knee, hip, shoulder, spine, or acute fracture). The tool recommends the relevant consultant based on their clinical subspecialty. Alternatively, our appointment desk can guide you during working hours.",
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
    question: "Where is Shashwat Hospital located in Nerul, Navi Mumbai?",
    answer: "Shashwat Hospital is conveniently located in Sector 19A, Nerul (East), Navi Mumbai, Maharashtra 400706 — easily accessible from Nerul Railway Station (Harbour & Trans-Harbour Line), the Sion-Panvel Expressway, and Palm Beach Road.",
  },
  {
    id: "faq-emergency",
    category: "Emergency",
    question: "Does Shashwat Hospital provide 24/7 emergency orthopaedic and trauma care?",
    answer: "Yes. Our emergency trauma unit operates 24 hours a day, 7 days a week for acute bone fractures, joint dislocations, road traffic injuries, and severe orthopaedic emergencies, with on-call orthopaedic surgeons and immediate digital imaging access.",
  },
  {
    id: "faq-cashless",
    category: "Insurance & Billing",
    question: "Is cashless health insurance / TPA facility available?",
    answer: "Our hospital has a dedicated TPA and Insurance Helpdesk to assist patients with cashless pre-authorization and reimbursement documentation. Please consult with the desk at the time of admission or planned surgery with your policy details.",
  },
  {
    id: "faq-second-opinion",
    category: "Orthopaedics",
    question: "Can I request a second opinion on an advised surgery or MRI scan?",
    answer: "Yes. Patients are welcome to request a specialist second opinion by scheduling an OPD consultation or submitting their diagnostic reports through our Second Opinion page. Our specialists review the clinical indications and discuss evidence-based options.",
  },
  {
    id: "faq-rehab",
    category: "Rehabilitation",
    question: "How is physical rehabilitation managed after surgery?",
    answer: "Rehabilitation begins in the hospital under the direct supervision of our physiotherapy department. A customized, phased recovery protocol is designed in coordination with your operating surgeon, focusing on safe mobilization, joint range of motion, and muscle strengthening.",
  },
];
