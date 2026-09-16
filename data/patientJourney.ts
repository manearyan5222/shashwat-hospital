export interface ProblemCard {
  id: string;
  title: string;
  subtitle: string;
  bodyRegion: string;
  description: string;
  targetLink: string;
  iconName: string;
  urgencyLevel: "ROUTINE" | "URGENT" | "SPECIALIST";
}

export const problemNavigationData: ProblemCard[] = [
  {
    id: "knee-pain",
    title: "Knee Pain",
    subtitle: "Stiffness, grinding, swelling or difficulty walking",
    bodyRegion: "Knee",
    description: "Understand possible causes, cartilage wear, ligament sprains, and personalized treatment pathways.",
    targetLink: "/conditions/knee-pain",
    iconName: "Bone",
    urgencyLevel: "ROUTINE",
  },
  {
    id: "joint-pain",
    title: "Joint Pain & Arthritis",
    subtitle: "Hip, shoulder, or generalized joint stiffness",
    bodyRegion: "General",
    description: "Explore evaluation methods, conservative joint preservation, and replacement options.",
    targetLink: "/conditions/osteoarthritis",
    iconName: "Activity",
    urgencyLevel: "ROUTINE",
  },
  {
    id: "back-spine",
    title: "Back & Spine Problems",
    subtitle: "Persistent low back ache, neck stiffness or sciatica",
    bodyRegion: "Spine",
    description: "Learn about spinal disc care, nerve decompression, and posture-based recovery.",
    targetLink: "/conditions/back-pain",
    iconName: "AlignVerticalJustifyCenter",
    urgencyLevel: "ROUTINE",
  },
  {
    id: "sports-injuries",
    title: "Sports Injuries",
    subtitle: "Ligament tears, sudden twisting, sprains or pops",
    bodyRegion: "Knee / Shoulder",
    description: "Explore clinical assessment, arthroscopic repair, and phased athletic conditioning.",
    targetLink: "/conditions/acl-injury",
    iconName: "Zap",
    urgencyLevel: "SPECIALIST",
  },
  {
    id: "fractures-trauma",
    title: "Fractures & Trauma",
    subtitle: "Sudden fall, accident, severe swelling or bone break",
    bodyRegion: "Trauma",
    description: "Access immediate 24/7 emergency orthopaedic triage, digital imaging, and fixation.",
    targetLink: "/emergency",
    iconName: "ShieldAlert",
    urgencyLevel: "URGENT",
  },
  {
    id: "difficulty-moving",
    title: "Difficulty Moving & Stiffness",
    subtitle: "Post-injury stiffness, muscle weakness or gait issues",
    bodyRegion: "Rehab",
    description: "Explore structured physiotherapy, joint mobilization, and mobility restoration.",
    targetLink: "/rehabilitation",
    iconName: "HeartPulse",
    urgencyLevel: "ROUTINE",
  },
];

export interface RehabStage {
  step: number;
  stageName: string;
  focusArea: string;
  details: string;
  keyGoals: string[];
}

export const rehabPathwayStages: RehabStage[] = [
  {
    step: 1,
    stageName: "Accurate Clinical Diagnosis",
    focusArea: "Comprehensive Assessment",
    details: "In-depth physical exam, joint range of motion measurement, and diagnostic imaging (X-ray / MRI) to pinpoint the underlying pathology.",
    keyGoals: ["Identifying structural damage", "Assessing pre-injury functional baseline", "Formulating a step-wise treatment pathway"],
  },
  {
    step: 2,
    stageName: "Targeted Medical or Surgical Treatment",
    focusArea: "Precision Intervention",
    details: "Whether through conservative medications, joint injections, arthroscopic keyhole repair, or joint replacement, the acute structural problem is stabilized.",
    keyGoals: ["Relieving acute joint pain", "Stabilizing bone or ligament anatomy", "Minimizing surgical tissue trauma"],
  },
  {
    step: 3,
    stageName: "Early Bedside Physiotherapy",
    focusArea: "Immediate Post-Op Mobilization",
    details: "Controlled movement starts within 24 hours under the guidance of our hospital physiotherapy team to prevent joint stiffness and circulatory stasis.",
    keyGoals: ["Safe transfers and assisted standing", "Gentle range of motion restoration", "Swelling control and cryotherapy"],
  },
  {
    step: 4,
    stageName: "Progressive Muscular Strengthening",
    focusArea: "Rebuilding Power & Stability",
    details: "Targeted resistance exercises re-educate stabilizing muscles (e.g., quadriceps, rotator cuff, core) to protect the healing joint.",
    keyGoals: ["Correcting muscle imbalances", "Strengthening dynamic joint stabilizers", "Transitioning off walking aids"],
  },
  {
    step: 5,
    stageName: "Mobility & Functional Gait Retraining",
    focusArea: "Everyday Movement Mechanics",
    details: "Gait analysis, balance drills, stair climbing practice, and ergonomic posture retraining to restore natural movement rhythm.",
    keyGoals: ["Smooth symmetrical walking", "Confident navigation of stairs and uneven surfaces", "Restoring balance and fall prevention"],
  },
  {
    step: 6,
    stageName: "Return to Daily Life & Active Independence",
    focusArea: "Lifelong Joint Health",
    details: "Empowerment with customized home exercise routines, lifestyle guidance, and regular follow-up reviews to maintain long-term mobility.",
    keyGoals: ["Resuming work, hobbies, and family activities", "Preventive joint conditioning", "Sustainable long-term health"],
  },
];
