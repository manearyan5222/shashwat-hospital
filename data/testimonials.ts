export interface PatientStory {
  id: string;
  patientInitials: string;
  ageGroup: string;
  locality: string;
  conditionTreated: string;
  procedurePerformed: string;
  summary: string;
  storyDetails: string;
  recoveryMilestone: string;
  treatingSpecialistDesignation: string;
  verificationStatus: "VERIFIED_WITH_PATIENT_CONSENT" | "VERIFY_WITH_HOSPITAL";
  isVerified: boolean;
}

export const patientStoriesData: PatientStory[] = [
  {
    id: "story-tkr-recovery",
    patientInitials: "Mrs. K. S.",
    ageGroup: "60s",
    locality: "Nerul, Navi Mumbai",
    conditionTreated: "Severe Bilateral Knee Osteoarthritis",
    procedurePerformed: "Total Knee Replacement",
    summary: "Regained active daily walking and pain-free independence after years of progressive knee stiffness.",
    storyDetails: "Before seeking consultation at Shashwat Hospital, severe joint space loss in both knees made everyday climbing of stairs and visiting local markets extremely painful. Following a thorough clinical evaluation and guided pre-operative counseling, she underwent unilateral knee replacement. With continuous bedside physiotherapy starting on day one, she was able to walk comfortably with support within 48 hours and resumed independent routine activities in 6 weeks.",
    recoveryMilestone: "Resumed independent 2 km morning walks at 12 weeks post-surgery.",
    treatingSpecialistDesignation: "Senior Consultant — Joint Replacement & Trauma",
    verificationStatus: "VERIFY_WITH_HOSPITAL",
    isVerified: false,
  },
  {
    id: "story-acl-sports",
    patientInitials: "Mr. R. M.",
    ageGroup: "20s",
    locality: "Navi Mumbai",
    conditionTreated: "Complete ACL Tear & Medial Meniscus Tear",
    procedurePerformed: "Arthroscopic ACL Reconstruction & Meniscal Repair",
    summary: "Successfully completed structured 9-month athletic rehabilitation following a football injury.",
    storyDetails: "Sustaining a twisting knee injury during a weekend football tournament led to acute joint swelling and severe instability. High-resolution MRI confirmed an ACL rupture alongside a meniscus tear. Arthroscopic keyhole reconstruction preserved the meniscus and rebuilt joint stability. Under structured phased sports physiotherapy at Shashwat Hospital, he regained full extension in two weeks, began running at four months, and passed sports clearance testing at nine months.",
    recoveryMilestone: "Cleared for competitive sports after meeting full strength symmetry benchmarks.",
    treatingSpecialistDesignation: "Consultant — Arthroscopic Surgery & Sports Injuries",
    verificationStatus: "VERIFY_WITH_HOSPITAL",
    isVerified: false,
  },
  {
    id: "story-spine-microdiscectomy",
    patientInitials: "Mr. A. P.",
    ageGroup: "40s",
    locality: "Navi Mumbai",
    conditionTreated: "L4-L5 Lumbar Disc Herniation with Severe Sciatica",
    procedurePerformed: "Microdiscectomy & Core Physical Therapy",
    summary: "Relief from sharp radiating leg pain after targeted nerve root decompression.",
    storyDetails: "Severe radiating sciatica down the left leg made sitting and working at an IT desk impossible. After conservative medical therapy failed to relieve progressive nerve pain, a precision microdiscectomy was performed through a minimal incision. The acute radiating pain subsided immediately post-surgery, and guided core stabilization exercises helped him return to professional work with proper ergonomic posture.",
    recoveryMilestone: "Returned to desk work and ergonomic driving within 3 weeks.",
    treatingSpecialistDesignation: "Consultant — Spine Surgery & Spinal Disorders",
    verificationStatus: "VERIFY_WITH_HOSPITAL",
    isVerified: false,
  },
];
