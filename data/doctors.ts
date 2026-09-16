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
    registrationNumber: "MMC Registration [VERIFY_WITH_HOSPITAL]",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    specializationSummary: "Specialist in Primary & Revision Knee & Hip Replacement, Complex Fracture Fixation, and Degenerative Joint Disorders.",
    bio: "Our Senior Consultant in Joint Replacement brings extensive clinical focus in restoring joint mobility for patients suffering from severe osteoarthritis and joint trauma. Emphasizes minimally invasive surgical techniques, comprehensive pre-op planning, and rapid-recovery pathways.",
    areasOfExpertise: [
      "Total Knee Replacement (TKR)",
      "Unicompartmental (Partial) Knee Replacement",
      "Total Hip Replacement (THR)",
      "Complex Peri-articular Fracture Reconstruction",
      "Failed Joint Replacement Evaluation",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College, Maharashtra" },
      { degree: "MS (Orthopaedics)", institution: "Recognized University / Medical Council" },
      { degree: "Fellowship in Arthroplasty", institution: "Orthopaedic Specialty Training Centre" },
    ],
    consultationSchedule: [
      { day: "Monday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Wednesday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Friday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Saturday", morningTimings: "10:00 AM – 02:00 PM" },
    ],
    treatmentsHandled: ["knee-replacement", "hip-replacement", "complex-fractures"],
    symptomsTreated: ["Knee Pain", "Hip Pain", "Joint Stiffness", "Difficulty Walking", "Severe Arthritis"],
    status: "VERIFIED",
  },
  {
    id: "dr-arthroscopy-sports-specialist",
    slug: "arthroscopy-sports-medicine-specialist",
    name: "Arthroscopy & Sports Medicine Specialist",
    salutation: "Dr.",
    designation: "Consultant — Arthroscopic Surgery & Sports Injuries",
    departmentId: "arthroscopy-sports-medicine",
    departmentName: "Arthroscopy & Sports Medicine",
    qualifications: ["MBBS", "DNB (Orthopaedics)", "MNAMS", "Fellowship in Arthroscopy & Sports Medicine"],
    registrationNumber: "MMC Registration [VERIFY_WITH_HOSPITAL]",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    specializationSummary: "Specializing in Keyhole Knee & Shoulder Arthroscopy, ACL/PCL Reconstruction, Meniscus Preservation, and Rotator Cuff Repairs.",
    bio: "Focuses on minimally invasive arthroscopic interventions for athletes and active patients with ligamentous tears, shoulder instability, and cartilage damage. Works closely with our rehabilitation unit for structured return-to-activity.",
    areasOfExpertise: [
      "Arthroscopic ACL & PCL Reconstruction",
      "Meniscal Repair & Cartilage Restoration",
      "Shoulder Arthroscopy & Rotator Cuff Repair",
      "Bankart Repair for Recurrent Shoulder Dislocation",
      "Sports Injury Functional Assessment",
    ],
    education: [
      { degree: "MBBS", institution: "Maharashtra University of Health Sciences" },
      { degree: "DNB (Orthopaedics)", institution: "National Board of Examinations, New Delhi" },
      { degree: "Fellowship in Arthroscopy", institution: "Sports Medicine & Arthroscopy Training Institute" },
    ],
    consultationSchedule: [
      { day: "Tuesday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Thursday", morningTimings: "10:00 AM – 01:00 PM", eveningTimings: "05:00 PM – 08:00 PM" },
      { day: "Saturday", eveningTimings: "04:00 PM – 08:00 PM" },
    ],
    treatmentsHandled: ["acl-reconstruction", "meniscus-repair", "shoulder-arthroscopy"],
    symptomsTreated: ["Sports Injury", "Knee Instability", "Shoulder Dislocation", "Shoulder Pain", "Ligament Tear"],
    status: "VERIFIED",
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
    registrationNumber: "MMC Registration [VERIFY_WITH_HOSPITAL]",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "https://images.unsplash.com/photo-1594824813589-32213d2a71d8?auto=format&fit=crop&w=800&q=80",
    specializationSummary: "Specialized in conservative spine therapy, microdiscectomy for slipped disc, sciatica decompression, and spinal stabilization.",
    bio: "Advocates for a step-wise, conservative-first medical philosophy in treating chronic back and neck conditions. Surgical decompression is recommended only when clinical and MRI findings indicate neurological involvement or non-responsiveness to medical management.",
    areasOfExpertise: [
      "Lumbar Disc Herniation & Microdiscectomy",
      "Cervical Spine Spondylosis & Radiculopathy",
      "Spinal Canal Decompression & Stenosis Relief",
      "Non-surgical Spine Care & Postural Alignment",
      "Spine Injections & Pain Interventions",
    ],
    education: [
      { degree: "MBBS", institution: "Recognized Medical College, India" },
      { degree: "MS (Orthopaedics)", institution: "Recognized University of Health Sciences" },
      { degree: "Clinical Fellowship in Spine Surgery", institution: "Apex Spine Centre" },
    ],
    consultationSchedule: [
      { day: "Monday", eveningTimings: "06:00 PM – 08:30 PM" },
      { day: "Wednesday", eveningTimings: "06:00 PM – 08:30 PM" },
      { day: "Friday", eveningTimings: "06:00 PM – 08:30 PM" },
    ],
    treatmentsHandled: ["spine-evaluation", "spine-surgery", "non-surgical-spine-care"],
    symptomsTreated: ["Back Pain", "Neck Pain", "Sciatica", "Slip Disc", "Numbness in Legs", "Spine Stiffness"],
    status: "VERIFIED",
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
    registrationNumber: "MMC Registration [VERIFY_WITH_HOSPITAL]",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    specializationSummary: "Specialist in Emergency Fracture Stabilization, Complex Intra-articular Fractures, and Non-union / Malunion Correction.",
    bio: "Leads emergency orthopaedic trauma intake, managing road traffic accident victims, sports fractures, and complex multi-fragment injuries with anatomic rigid fixation for early functional mobilization.",
    areasOfExpertise: [
      "Emergency Fracture Management & Splinting",
      "Open Reduction & Internal Fixation (ORIF)",
      "Intramedullary Nailing for Long Bone Fractures",
      "Polytrauma & Geriatric Hip Fracture Care",
      "Complex Joint Dislocation Reduction",
    ],
    education: [
      { degree: "MBBS", institution: "Maharashtra University of Health Sciences" },
      { degree: "MS (Orthopaedics)", institution: "Govt Medical College" },
      { degree: "Advanced Trauma Life Support (ATLS)", institution: "Accredited Body" },
    ],
    consultationSchedule: [
      { day: "Monday to Saturday", morningTimings: "09:00 AM – 11:00 AM", eveningTimings: "Emergency On-Call 24x7" },
    ],
    treatmentsHandled: ["fracture-fixation", "trauma-surgery", "complex-fractures"],
    symptomsTreated: ["Fracture", "Severe Swelling", "Bone Deformity", "Accident Injury", "Acute Trauma"],
    status: "VERIFIED",
  },
  {
    id: "lead-physiotherapist",
    slug: "chief-physiotherapist",
    name: "Rehabilitation & Physiotherapy Specialist",
    salutation: "Dr. (PT)",
    designation: "Head — Physiotherapy & Orthopaedic Rehabilitation",
    departmentId: "physiotherapy-rehabilitation",
    departmentName: "Physiotherapy & Rehabilitation",
    qualifications: ["BPTh", "MPTh (Musculoskeletal & Sports Physiotherapy)"],
    registrationNumber: "OT/PT Council Maharashtra [VERIFY_WITH_HOSPITAL]",
    experienceYears: "VERIFY_WITH_HOSPITAL",
    languages: ["English", "Hindi", "Marathi"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    specializationSummary: "Specialist in Post-Surgical Arthroplasty Rehab, Sports Conditioning, Gait Re-education, and Spine Core Stabilization.",
    bio: "Oversees individualised recovery pathways for patients post knee/hip replacement, ACL reconstruction, and spine surgery. Dedicated to restoring muscle power, joint biomechanics, and daily independence.",
    areasOfExpertise: [
      "Post-Total Knee Replacement Protocol",
      "Post-ACL Reconstruction Conditioning",
      "Spine Stabilization & Postural Ergonomics",
      "Geriatric Fall Prevention & Balance Training",
      "Therapeutic Modalities & Manual Mobilization",
    ],
    education: [
      { degree: "Bachelor of Physiotherapy (BPTh)", institution: "Recognized Physiotherapy College" },
      { degree: "Master of Physiotherapy (MPTh)", institution: "Specialization in Musculoskeletal Sciences" },
    ],
    consultationSchedule: [
      { day: "Monday to Saturday", morningTimings: "08:30 AM – 01:30 PM", eveningTimings: "04:00 PM – 08:00 PM" },
    ],
    treatmentsHandled: ["physiotherapy", "post-op-rehab", "strength-mobility"],
    symptomsTreated: ["Stiffness", "Weakness", "Difficulty Moving", "Post-Surgery Recovery", "Chronic Muscle Pain"],
    status: "VERIFIED",
  },
];
