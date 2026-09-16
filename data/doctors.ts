export interface Doctor {
  id: string;
  slug: string;
  name: string;
  salutation: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualifications: string[];
  registrationNumber: string;
  experienceYears: number | "VERIFY_WITH_HOSPITAL";
  languages: string[];
  imageUrl: string;
  nameVerified: boolean;
  specializationSummary: string;
  bio: string;
  areasOfExpertise: string[];
  education: {
    degree: string;
    institution: string;
    year?: string;
  }[];
  consultationSchedule: {
    day: string;
    morningTimings?: string;
    eveningTimings?: string;
    room?: string;
  }[];
  treatmentsHandled: string[];
  symptomsTreated: string[];
  status: "VERIFIED" | "VERIFY_WITH_HOSPITAL";
}

export const doctorsData: Doctor[] = [
  {
    id: "dr-consultant-ortho-joint",
    slug: "senior-joint-replacement-surgeon",
    name: "Orthopaedic Joint & Trauma Specialist",
    salutation: "Dr.",
    designation: "Senior Consultant — Joint Replacement & Trauma Surgery",
    departmentId: "joint-replacement",
    departmentName: "Joint Replacement & Arthroplasty",
    qualifications: ["MBBS", "MS (Orthopaedics)", "Fellowship in Joint Replacement"],
    registrationNumber: "VERIFY_WITH_HOSPITAL",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "VERIFY_WITH_HOSPITAL",
    nameVerified: false,
    specializationSummary: "Primary & Revision Knee & Hip Replacement, Complex Fracture Fixation, and Degenerative Joint Disorders.",
    bio: "Consultant practice focused on joint mobility restoration for patients suffering from osteoarthritis and joint trauma, emphasizing tissue-sparing techniques and rapid-recovery pathways.",
    areasOfExpertise: [
      "Total Knee Replacement (TKR)",
      "Unicompartmental (Partial) Knee Replacement",
      "Total Hip Replacement (THR)",
      "Complex Peri-articular Fracture Reconstruction",
      "Joint Preservation & Osteotomy",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College" },
      { degree: "MS (Orthopaedics)", institution: "Recognized University / Medical Council" },
      { degree: "Fellowship in Arthroplasty", institution: "Specialty Training Centre" },
    ],
    consultationSchedule: [
      { day: "Monday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Wednesday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Friday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Saturday", morningTimings: "10:00 AM – 02:00 PM" },
    ],
    treatmentsHandled: ["knee-replacement", "hip-replacement", "fracture-care-trauma"],
    symptomsTreated: ["Knee Pain", "Hip Pain", "Joint Stiffness", "Difficulty Walking", "Severe Arthritis"],
    status: "VERIFY_WITH_HOSPITAL",
  },
  {
    id: "dr-arthroscopy-sports-specialist",
    slug: "arthroscopy-sports-medicine-specialist",
    name: "Arthroscopy & Sports Medicine Specialist",
    salutation: "Dr.",
    designation: "Consultant — Arthroscopic Surgery & Sports Injuries",
    departmentId: "arthroscopy-sports-medicine",
    departmentName: "Arthroscopy & Sports Medicine",
    qualifications: ["MBBS", "DNB (Orthopaedics)", "MNAMS", "Fellowship in Arthroscopy"],
    registrationNumber: "VERIFY_WITH_HOSPITAL",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    imageUrl: "VERIFY_WITH_HOSPITAL",
    nameVerified: false,
    specializationSummary: "Keyhole Knee & Shoulder Arthroscopy, ACL/PCL Reconstruction, Meniscus Preservation, and Rotator Cuff Repairs.",
    bio: "Focuses on minimally invasive arthroscopic interventions for athletes and active individuals with ligamentous tears, shoulder instability, and cartilage damage.",
    areasOfExpertise: [
      "Arthroscopic ACL & PCL Reconstruction",
      "Meniscal Repair & Cartilage Restoration",
      "Shoulder Arthroscopy & Rotator Cuff Repair",
      "Bankart Repair for Recurrent Shoulder Dislocation",
      "Sports Injury Functional Assessment",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College" },
      { degree: "DNB (Orthopaedics)", institution: "National Board of Examinations" },
      { degree: "Fellowship in Arthroscopy", institution: "Sports Medicine Institute" },
    ],
    consultationSchedule: [
      { day: "Tuesday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Thursday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Saturday", eveningTimings: "04:00 PM – 08:00 PM" },
    ],
    treatmentsHandled: ["acl-reconstruction", "shoulder-arthroscopy"],
    symptomsTreated: ["Sports Injury", "Knee Instability", "Shoulder Dislocation", "Shoulder Pain", "Ligament Tear"],
    status: "VERIFY_WITH_HOSPITAL",
  },
  {
    id: "dr-spine-specialist",
    slug: "spine-care-specialist",
    name: "Spine & Back Pain Specialist",
    salutation: "Dr.",
    designation: "Consultant — Spine Surgery & Spinal Disorders",
    departmentId: "spine-care",
    departmentName: "Spine Care & Back Pain Unit",
    qualifications: ["MBBS", "MS (Orthopaedics)", "Fellowship in Spine Surgery"],
    registrationNumber: "VERIFY_WITH_HOSPITAL",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "VERIFY_WITH_HOSPITAL",
    nameVerified: false,
    specializationSummary: "Conservative spine therapy, microdiscectomy for slipped disc, sciatica decompression, and spinal stabilization.",
    bio: "Advocates for a step-wise conservative-first approach in treating chronic back and neck conditions, advising surgery when neurological indications or severe structural compression require decompression.",
    areasOfExpertise: [
      "Lumbar Disc Herniation & Microdiscectomy",
      "Cervical Spine Spondylosis & Radiculopathy",
      "Spinal Canal Decompression & Stenosis Relief",
      "Non-surgical Spine Care & Postural Alignment",
      "Spine Injections & Pain Interventions",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College" },
      { degree: "MS (Orthopaedics)", institution: "Recognized University" },
      { degree: "Clinical Fellowship in Spine Surgery", institution: "Spine Centre" },
    ],
    consultationSchedule: [
      { day: "Monday", eveningTimings: "06:00 PM – 08:30 PM" },
      { day: "Wednesday", eveningTimings: "06:00 PM – 08:30 PM" },
      { day: "Friday", eveningTimings: "06:00 PM – 08:30 PM" },
    ],
    treatmentsHandled: ["spine-evaluation-surgery"],
    symptomsTreated: ["Back Pain", "Neck Pain", "Sciatica", "Slip Disc", "Numbness in Legs", "Spine Stiffness"],
    status: "VERIFY_WITH_HOSPITAL",
  },
  {
    id: "dr-trauma-fracture-specialist",
    slug: "orthopaedic-trauma-surgeon",
    name: "Orthopaedic Trauma & Fracture Specialist",
    salutation: "Dr.",
    designation: "Consultant — Trauma, Fracture & Polytrauma Care",
    departmentId: "orthopaedic-trauma",
    departmentName: "Orthopaedic Trauma & Fracture Care",
    qualifications: ["MBBS", "MS (Orthopaedics)", "DNB (Orthopaedics)"],
    registrationNumber: "VERIFY_WITH_HOSPITAL",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "VERIFY_WITH_HOSPITAL",
    nameVerified: false,
    specializationSummary: "Emergency Fracture Stabilization, Complex Intra-articular Fractures, and Non-union / Malunion Correction.",
    bio: "Focuses on acute fracture stabilization, trauma triage, and multi-fragment peri-articular reconstruction for early functional mobilization.",
    areasOfExpertise: [
      "Emergency Fracture Management & Splinting",
      "Open Reduction & Internal Fixation (ORIF)",
      "Intramedullary Nailing for Long Bone Fractures",
      "Geriatric Hip Fracture Care",
      "Complex Joint Dislocation Reduction",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College" },
      { degree: "MS (Orthopaedics)", institution: "Recognized University" },
    ],
    consultationSchedule: [
      { day: "Monday to Saturday", morningTimings: "09:00 AM – 11:00 AM" },
    ],
    treatmentsHandled: ["fracture-care-trauma"],
    symptomsTreated: ["Fracture", "Severe Swelling", "Bone Deformity", "Accident Injury", "Acute Trauma"],
    status: "VERIFY_WITH_HOSPITAL",
  },
  {
    id: "lead-physiotherapist",
    slug: "chief-physiotherapist",
    name: "Rehabilitation & Physiotherapy Specialist",
    salutation: "Dr. (PT)",
    designation: "Head — Physiotherapy & Orthopaedic Rehabilitation",
    departmentId: "physiotherapy-rehabilitation",
    departmentName: "Physiotherapy & Rehabilitation",
    qualifications: ["BPTh", "MPTh (Musculoskeletal Physiotherapy)"],
    registrationNumber: "VERIFY_WITH_HOSPITAL",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "VERIFY_WITH_HOSPITAL",
    nameVerified: false,
    specializationSummary: "Post-Surgical Arthroplasty Rehab, Sports Conditioning, Gait Re-education, and Spine Core Stabilization.",
    bio: "Supervises individualized recovery pathways for patients post knee/hip replacement, ACL reconstruction, and spine surgery to restore functional range of motion and everyday mobility.",
    areasOfExpertise: [
      "Post-Total Knee Replacement Protocol",
      "Post-ACL Reconstruction Conditioning",
      "Spine Stabilization & Postural Ergonomics",
      "Geriatric Fall Prevention & Balance Training",
      "Therapeutic Modalities & Manual Mobilization",
    ],
    education: [
      { degree: "Bachelor of Physiotherapy (BPTh)", institution: "Recognized Physiotherapy College" },
      { degree: "Master of Physiotherapy (MPTh)", institution: "Recognized University" },
    ],
    consultationSchedule: [
      { day: "Monday to Saturday", morningTimings: "08:30 AM – 01:30 PM", eveningTimings: "04:00 PM – 08:00 PM" },
    ],
    treatmentsHandled: ["physiotherapy-rehabilitation"],
    symptomsTreated: ["Stiffness", "Weakness", "Difficulty Moving", "Post-Surgery Recovery", "Chronic Muscle Pain"],
    status: "VERIFY_WITH_HOSPITAL",
  },
];
