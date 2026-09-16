export interface Facility {
  id: string;
  slug: string;
  title: string;
  category: "SURGICAL" | "INPATIENT" | "EMERGENCY" | "REHAB" | "DIAGNOSTIC" | "AMENITY";
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
  status: "VERIFIED" | "VERIFY_WITH_HOSPITAL";
}

export const facilitiesData: Facility[] = [
  {
    id: "operation-theatres",
    slug: "operation-theatres",
    title: "Modular Laminar Airflow Operation Theatres",
    category: "SURGICAL",
    shortDescription: "Ultra-clean surgical suites equipped with HEPA filtration, modern anaesthesia workstations, and high-definition C-arm imaging for sterile joint and spine surgery.",
    fullDescription: "Our surgical suites are engineered specifically for high-precision orthopaedic procedures. Featuring vertical laminar airflow with positive pressure and HEPA filters to minimize surgical site infection risk, integrated high-definition arthroscopy towers, and digital C-arm fluoroscopy.",
    features: [
      "Laminar Airflow with HEPA filtration for ultra-clean sterile environment",
      "High-Definition Arthroscopy & Endoscopic Visualization Towers",
      "Digital C-Arm Fluoroscopy for real-time surgical imaging",
      "Advanced Anaesthesia Workstations with continuous hemodynamic monitoring",
    ],
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
  {
    id: "emergency-trauma-suite",
    slug: "emergency-trauma-suite",
    title: "24/7 Orthopaedic Trauma & Emergency Unit",
    category: "EMERGENCY",
    shortDescription: "Round-the-clock emergency triage, acute fracture reduction, wound debridement, and rapid surgical resuscitation for accident victims.",
    fullDescription: "Equipped to handle acute musculoskeletal trauma, vehicular accidents, dislocations, and severe fragility fractures. Staffed by trained casualty medical officers and supported 24/7 by on-call orthopaedic surgeons and anaesthesiologists.",
    features: [
      "Dedicated trauma resuscitation bay with multiparameter monitors",
      "Direct access for emergency ambulances and wheelchair transfers",
      "Immediate digital X-ray and emergency splinting facilities",
      "Round-the-clock on-call orthopaedic and anaesthetic cover",
    ],
    imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
  {
    id: "physiotherapy-centre",
    slug: "physiotherapy-rehab-centre",
    title: "Physiotherapy & Orthopaedic Rehabilitation Gym",
    category: "REHAB",
    shortDescription: "Dedicated therapeutic rehabilitation area equipped with electrotherapy modalities, gait training aids, resistance bands, and functional movement stations.",
    fullDescription: "Our rehabilitation centre provides a safe, supportive space for post-surgical mobilization and non-operative therapy. Guided by experienced physiotherapists, patients practice walking, balance drills, and joint-specific strengthening.",
    features: [
      "Parallel walking bars and gait retraining mirrors",
      "Therapeutic modalities (IFT, TENS, Ultrasound therapy)",
      "Exercise stations for quadriceps, hamstrings, and rotator cuff strengthening",
      "Ergonomic postural education and spine core stability tools",
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
  {
    id: "inpatient-rooms",
    slug: "inpatient-patient-rooms",
    title: "Patient Rooms & Recovery Suites",
    category: "INPATIENT",
    shortDescription: "Thoughtfully designed inpatient rooms with orthopaedic-friendly motorized beds, barrier-free en-suite bathrooms, and nurse call systems.",
    fullDescription: "Comfortable inpatient accommodations tailored for post-orthopaedic surgical recovery. Features include electric adjustable beds, grab bars in bathrooms, dedicated attendant seating, and continuous nursing care.",
    features: [
      "Motorized adjustable orthopaedic beds with side safety rails",
      "Barrier-free bathrooms equipped with safety grab bars",
      "Instant nurse call buttons at bedside and in bathrooms",
      "Air-conditioned private, semi-private, and day-care options",
    ],
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
  {
    id: "digital-diagnostics",
    slug: "digital-diagnostics-xray",
    title: "Digital Radiography & Diagnostics",
    category: "DIAGNOSTIC",
    shortDescription: "Low-radiation high-resolution digital X-ray suite for swift musculoskeletal assessment, pre-op planning, and trauma evaluation.",
    fullDescription: "Provides rapid, high-clarity bone and joint imaging. Digital images are immediately available on our clinical network for surgeon review, pre-operative templating, and fracture assessment.",
    features: [
      "High-frequency digital X-ray system with minimal radiation exposure",
      "Specialized weight-bearing views for joint alignment assessment",
      "Instant PACS-enabled digital image viewing in consultation rooms",
      "Routine pathology and pre-surgical blood screening tie-ups",
    ],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
  {
    id: "waiting-amenities",
    slug: "patient-waiting-amenities",
    title: "Comfortable Patient & Family Lounge",
    category: "AMENITY",
    shortDescription: "Spacious, wheelchair-accessible reception and waiting lounge designed for smooth patient check-in and family comfort.",
    fullDescription: "We understand hospital visits can be stressful. Our reception and waiting areas provide comfortable seating, wheelchair assistance from entry, clear signage, and a dedicated help desk for billing, insurance, and appointment queries.",
    features: [
      "Wheelchair assistance and barrier-free ramp access at entry",
      "Dedicated help desk for TPA insurance and admission counseling",
      "Clean drinking water, sanitized restrooms, and Wi-Fi connectivity",
      "Clear informational signage and prompt token assistance",
    ],
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
  },
];
