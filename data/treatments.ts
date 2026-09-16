export interface TreatmentJourneyStep {
  stepNumber: number;
  title: string;
  description: string;
  timeline?: string;
}

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: "JOINT_REPLACEMENT" | "ARTHROSCOPY" | "SPINE" | "TRAUMA" | "REHABILITATION";
  categoryLabel: string;
  departmentId: string;
  departmentName: string;
  shortDescription: string;
  heroHeadline: string;
  overview: string;
  whenConsidered: string[];
  clinicalObjectives: string[];
  journeySteps: TreatmentJourneyStep[];
  recoveryOverview: string;
  recoveryMilestones: {
    period: string;
    description: string;
  }[];
  faqs: TreatmentFAQ[];
  relatedDoctorIds: string[];
  relatedConditionSlugs: string[];
  status: "VERIFIED" | "VERIFY_WITH_HOSPITAL";
  imageUrl: string;
}

export const treatmentsData: Treatment[] = [
  {
    id: "knee-replacement",
    slug: "knee-replacement",
    title: "Knee Replacement Surgery (TKR & PKR)",
    category: "JOINT_REPLACEMENT",
    categoryLabel: "Joint Replacement",
    departmentId: "joint-replacement",
    departmentName: "Joint Replacement & Arthroplasty",
    shortDescription: "Surgical resurfacing of severely damaged knee joint surfaces with durable biocompatible prosthetic implants to relieve chronic pain and restore walking mobility.",
    heroHeadline: "Restore Pain-Free Walking and Daily Mobility",
    overview: "Knee arthroplasty (knee replacement) is a surgical procedure in which the worn or damaged weight-bearing surfaces of the knee joint are resurfaced with precision metal and medical-grade polyethylene components. Depending on the extent of cartilage loss, your surgeon may recommend either a Unicompartmental (Partial) Knee Replacement or a Total Knee Replacement (TKR).",
    whenConsidered: [
      "Severe end-stage osteoarthritis or rheumatoid arthritis affecting joint cartilage",
      "Persistent knee pain that limits walking, climbing stairs, or standing for normal daily tasks",
      "Chronic knee stiffness and angular deformity (such as severe bowleggedness or knock-knees)",
      "Inadequate pain relief from oral medications, physiotherapy, and joint injections",
      "Significant nighttime pain that disturbs regular sleep patterns",
    ],
    clinicalObjectives: [
      "Relief of debilitating arthritic joint pain",
      "Correction of mechanical limb alignment",
      "Restoration of joint stability and functional range of movement",
      "Facilitation of independent, active daily living",
    ],
    journeySteps: [
      {
        stepNumber: 1,
        title: "Clinical Consultation",
        description: "Comprehensive review of your pain history, functional limitations, prior medical interventions, and medical fitness.",
        timeline: "Day 1",
      },
      {
        stepNumber: 2,
        title: "Orthopaedic Evaluation & Imaging",
        description: "Weight-bearing digital X-rays, mechanical limb alignment analysis, blood investigations, and pre-anaesthesia evaluation.",
        timeline: "Pre-admission",
      },
      {
        stepNumber: 3,
        title: "Individualized Treatment Plan",
        description: "Patient counseling regarding implant selection (Total vs. Partial), expected milestones, and home rehabilitation preparation.",
        timeline: "Pre-surgery",
      },
      {
        stepNumber: 4,
        title: "Procedure in Laminar Airflow OT",
        description: "Precision surgical bone preparation, alignment balancing, implant placement, and multi-modal pain management protocols.",
        timeline: "Surgery Day",
      },
      {
        stepNumber: 5,
        title: "In-Hospital Recovery & Mobilization",
        description: "Supervised assisted walking starting within 24 hours under dedicated physiotherapy guidance, pain control, and wound monitoring.",
        timeline: "Days 1 to 3",
      },
      {
        stepNumber: 6,
        title: "Supervised Follow-Up & Rehabilitation",
        description: "Stitch removal check, progressive strengthening exercises, functional gait assessment, and gradual return to normal activity.",
        timeline: "Weeks 2 to 12",
      },
    ],
    recoveryOverview: "Recovery begins on day one with gentle bedside movements and assisted standing. Most patients transition to walking with a walker within 24-48 hours, advance to a walking stick within a few weeks, and achieve independent daily walking as muscle strength improves.",
    recoveryMilestones: [
      { period: "Days 1–3", description: "Bedside mobility, assisted standing and short hallway walking with a walker." },
      { period: "Weeks 2–3", description: "Suture removal, transition to walking stick, dedicated home exercise program." },
      { period: "Weeks 4–8", description: "Independent walking indoors, stationary cycling, progressive quadriceps strengthening." },
      { period: "Months 3–6", description: "Return to low-impact recreational activities, extended walking, and long-term joint conditioning." },
    ],
    faqs: [
      {
        question: "How long do modern knee replacement implants typically last?",
        answer: "Modern knee prostheses constructed from cobalt-chromium alloys, titanium, and highly cross-linked polyethylene are engineered for durability. Many studies report longevity of 15 to 20+ years, depending on patient activity levels, weight management, and adherence to joint health advice.",
      },
      {
        question: "How soon after knee replacement surgery can I start walking?",
        answer: "Under modern multimodal pain and enhanced recovery protocols, supervised standing and assisted walking with a support frame typically begin on the first post-operative day.",
      },
      {
        question: "Is knee replacement suitable for both knees at the same time?",
        answer: "Bilateral (both knees) replacement may be evaluated for suitable candidates without severe cardiopulmonary comorbidities. Your surgeon and anaesthesia team evaluate cardiac fitness and overall risk before advising simultaneous or staged surgery.",
      },
    ],
    relatedDoctorIds: ["dr-consultant-ortho-joint", "dr-trauma-fracture-specialist", "lead-physiotherapist"],
    relatedConditionSlugs: ["knee-pain", "osteoarthritis"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hip-replacement",
    slug: "hip-replacement",
    title: "Hip Replacement Surgery (THR)",
    category: "JOINT_REPLACEMENT",
    categoryLabel: "Joint Replacement",
    departmentId: "joint-replacement",
    departmentName: "Joint Replacement & Arthroplasty",
    shortDescription: "Replacement of the damaged femoral head and pelvic acetabular socket to eliminate groin pain, correct leg length discrepancy, and restore fluid hip movement.",
    heroHeadline: "Overcome Chronic Hip Stiffness and Groin Pain",
    overview: "Total Hip Replacement (THR) is one of the most successful interventions in modern orthopaedics. During the procedure, the damaged ball (femoral head) and socket (acetabulum) are replaced with biocompatible prosthetics to restore smooth, unhindered hip mechanics.",
    whenConsidered: [
      "Avascular Necrosis (AVN) of the femoral head leading to bone collapse",
      "Advanced hip osteoarthritis causing severe groin and thigh pain",
      "Secondary arthritis following childhood hip disorders or past fractures",
      "Ankylosing spondylitis with severe bilateral hip stiffness",
      "Pain while putting on shoes, sitting cross-legged, or walking short distances",
    ],
    clinicalObjectives: [
      "Elimination of deep groin, thigh, and buttock pain",
      "Correction of functional leg length discrepancies",
      "Restoration of smooth hip flexion, extension, and rotation",
      "Safe resumption of walking and everyday social activities",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Initial Clinical Assessment", description: "Evaluation of gait, hip range of motion, leg length, and imaging.", timeline: "Day 1" },
      { stepNumber: 2, title: "Diagnostic Radiographs & MRI", description: "Pelvic radiographs, digital sizing, and MRI where early AVN staging is required.", timeline: "Pre-admission" },
      { stepNumber: 3, title: "Surgical Planning", description: "Selection between cemented, uncemented, or hybrid components tailored to bone density.", timeline: "Pre-surgery" },
      { stepNumber: 4, title: "Procedure", description: "Careful exposure, precise acetabular reaming, femoral preparation, and secure implant seating.", timeline: "Surgery Day" },
      { stepNumber: 5, title: "Supervised Rehabilitation", description: "Hip precaution guidance, weight-bearing protocol, and muscle activation.", timeline: "Days 1 to 3" },
      { stepNumber: 6, title: "Follow-Up & Functional Recovery", description: "Wound assessment, progressive hip abductor strengthening, and return to work guidance.", timeline: "Weeks 2 to 12" },
    ],
    recoveryOverview: "Patients begin assisted walking under physiotherapy guidance within 24 hours. Adherence to hip precautions (avoiding extreme twisting or improper sitting angles during the initial healing phase) ensures safe integration of the implant.",
    recoveryMilestones: [
      { period: "Days 1–3", description: "Early mobilization, bed transfers, and walking with support." },
      { period: "Weeks 2–4", description: "Stitch removal, improved gait rhythm, discontinuation of heavy support." },
      { period: "Weeks 6–12", description: "Full weight bearing, return to sedentary work and light driving with surgeon's clearance." },
    ],
    faqs: [
      {
        question: "What is Avascular Necrosis (AVN) of the hip?",
        answer: "AVN occurs when the blood supply to the femoral head is temporarily or permanently disrupted, causing bone cells to die. Total hip replacement provides an effective solution when the femoral head has structurally collapsed.",
      },
      {
        question: "What precautions should I follow after hip replacement?",
        answer: "During the first 6 to 8 weeks, patients are instructed on avoiding extreme hip flexion past 90 degrees, avoiding crossing legs, and using elevated seating to protect healing joint capsule tissues.",
      },
    ],
    relatedDoctorIds: ["dr-consultant-ortho-joint", "lead-physiotherapist"],
    relatedConditionSlugs: ["joint-pain"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "acl-reconstruction",
    slug: "acl-reconstruction",
    title: "Arthroscopic ACL Reconstruction",
    category: "ARTHROSCOPY",
    categoryLabel: "Arthroscopy & Sports",
    departmentId: "arthroscopy-sports-medicine",
    departmentName: "Arthroscopy & Sports Medicine",
    shortDescription: "Minimally invasive keyhole reconstruction of the torn Anterior Cruciate Ligament using an autograft tendon to restore rotational knee stability.",
    heroHeadline: "Rebuild Knee Stability and Athletic Confidence",
    overview: "ACL Reconstruction is an arthroscopic keyhole procedure performed to replace a torn anterior cruciate ligament. Through small incisions, an optical camera and micro-instruments guide the placement of a tendon graft (typically hamstring or bone-patellar tendon) into anatomical bone tunnels.",
    whenConsidered: [
      "Complete ACL rupture confirmed on clinical Lachman test and MRI imaging",
      "Episodes of knee giving way, bucking, or rotational instability during pivoting motions",
      "Young, active athletes desiring return to sports requiring cutting and jumping",
      "Combined ligamentous injury involving the meniscus or collateral ligaments",
    ],
    clinicalObjectives: [
      "Restoration of anterior-posterior and rotational knee stability",
      "Protection of the articular cartilage and meniscus from future wear",
      "Structured return to athletic activities and high-demand work",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Sports Injury Consultation", description: "Physical stability testing (Lachman, Pivot Shift) and assessment of injury mechanism.", timeline: "Day 1" },
      { stepNumber: 2, title: "High-Resolution MRI", description: "Detailed imaging to evaluate ACL tear grade, meniscus integrity, and bone bruising.", timeline: "Diagnostic" },
      { stepNumber: 3, title: "Pre-hab & Swelling Control", description: "Pre-operative physiotherapy to regain full knee extension and reduce joint effusion.", timeline: "Pre-surgery" },
      { stepNumber: 4, title: "Arthroscopic Reconstruction", description: "Keyhole graft harvesting, anatomical tunnel placement, and secure bioscrew/button fixation.", timeline: "Surgery Day" },
      { stepNumber: 5, title: "Post-op Bracing & Motion", description: "Controlled range of motion brace, cryotherapy, and quad-activation drills.", timeline: "Days 1 to 14" },
      { stepNumber: 6, title: "Phased Sports Rehabilitation", description: "Strengthening, plyometrics, agility training, and sports-specific return testing.", timeline: "Months 1 to 9" },
    ],
    recoveryOverview: "ACL recovery is a structured, phased biological process. While basic walking and office work resume within a few weeks, graft incorporation and neuromuscular retraining require 6 to 9 months before full-contact sports.",
    recoveryMilestones: [
      { period: "Weeks 1–2", description: "Full extension restoration, quadriceps activation, crutch-assisted walking." },
      { period: "Weeks 3–6", description: "Full range of motion, normal gait without crutches, stationary cycling." },
      { period: "Months 3–5", description: "Jogging in straight lines, resistance gym training, balance/proprioception drills." },
      { period: "Months 6–9", description: "Agility drills, sport-specific movements, functional sports clearance testing." },
    ],
    faqs: [
      {
        question: "Can an ACL tear heal without surgery?",
        answer: "Due to the intra-articular environment and poor vascular supply of the ligament, a complete ACL tear typically does not heal on its own. While non-operative rehab may suit sedentary individuals, active persons often require reconstruction to prevent recurrent instability.",
      },
      {
        question: "What type of graft is used for ACL reconstruction?",
        answer: "The most common autografts are the hamstring tendon or bone-patellar tendon-bone (BPTB). Your surgeon discusses graft choices based on your anatomy and athletic demands.",
      },
    ],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedConditionSlugs: ["acl-injury", "sports-injury", "knee-pain"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-arthroscopy",
    slug: "shoulder-arthroscopy",
    title: "Shoulder Arthroscopy & Rotator Cuff Repair",
    category: "ARTHROSCOPY",
    categoryLabel: "Arthroscopy & Sports",
    departmentId: "arthroscopy-sports-medicine",
    departmentName: "Arthroscopy & Sports Medicine",
    shortDescription: "Keyhole surgery to repair torn rotator cuff tendons, re-anchor detached labrums (Bankart repair), and decompress subacromial impingement.",
    heroHeadline: "Relieve Shoulder Pain and Restore Overhead Reach",
    overview: "Shoulder arthroscopy utilizes a pencil-sized camera and specialized suture anchors to repair torn tendons and stabilize the glenohumeral joint without large muscle incisions. This technique preserves the deltoid muscle, minimizes post-operative discomfort, and promotes faster tendon-to-bone healing.",
    whenConsidered: [
      "Rotator cuff tears (Supraspinatus/Infraspinatus) causing weakness and nighttime shoulder ache",
      "Recurrent shoulder dislocation or subluxation (Bankart / Labral tears)",
      "Subacromial impingement that fails to respond to physical therapy and subacromial injections",
      "Severe shoulder stiffness or frozen shoulder refractory to conservative measures",
    ],
    clinicalObjectives: [
      "Anatomic re-fixation of torn tendons to the humeral footprint",
      "Stabilization of the shoulder joint to prevent recurrent dislocations",
      "Restoration of overhead arm elevation, reach, and rotational power",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Specialist Shoulder Exam", description: "Impingement and rotator cuff strength testing (Neer, Hawkins, Jobe test).", timeline: "Day 1" },
      { stepNumber: 2, title: "Shoulder MRI / MR-Arthrogram", description: "Assessment of tear size, tendon retraction, fatty infiltration, and labral damage.", timeline: "Diagnostic" },
      { stepNumber: 3, title: "Surgical Planning", description: "Review of anchor requirements, sling immobilizer fitting, and post-op protocol.", timeline: "Pre-surgery" },
      { stepNumber: 4, title: "Arthroscopic Repair", description: "Debridement, subacromial decompression, and suture-anchor tendon refixation.", timeline: "Surgery Day" },
      { stepNumber: 5, title: "Protected Sling Phase", description: "Immobilization to protect tendon-to-bone biological healing with gentle pendulum swings.", timeline: "Weeks 1 to 4" },
      { stepNumber: 6, title: "Active Shoulder Rehab", description: "Gradual passive-to-active motion, rotator cuff strengthening, and functional return.", timeline: "Weeks 6 to 24" },
    ],
    recoveryOverview: "Biological tendon-to-bone healing requires approximately 6 to 12 weeks. Patients wear a protective sling initially, followed by guided physiotherapy to restore shoulder range of motion and rotator cuff strength safely.",
    recoveryMilestones: [
      { period: "Weeks 1–4", description: "Arm in protective sling; gentle elbow/wrist movements and pendulum swings." },
      { period: "Weeks 5–8", description: "Sling weaned off; active-assisted range of motion under therapist guidance." },
      { period: "Weeks 9–16", description: "Progressive resistive band exercises and overhead reaching." },
      { period: "Months 4–6", description: "Full strength recovery and return to athletic overhead sports." },
    ],
    faqs: [
      {
        question: "Why is a sling necessary after rotator cuff repair?",
        answer: "The sling protects the delicate suture anchors and biological healing zone from sudden stretching or accidental weight bearing while the tendon heals back to bone.",
      },
      {
        question: "Can I sleep comfortably after shoulder surgery?",
        answer: "Many patients find sleeping in a semi-reclined position (using extra pillows or a recliner chair) significantly more comfortable during the first few weeks.",
      },
    ],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedConditionSlugs: ["shoulder-pain", "rotator-cuff-injury"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spine-care-decompression",
    slug: "spine-evaluation-surgery",
    title: "Spine Evaluation & Minimally Invasive Spine Care",
    category: "SPINE",
    categoryLabel: "Spine Care",
    departmentId: "spine-care",
    departmentName: "Spine Care & Back Pain Unit",
    shortDescription: "Comprehensive diagnostic assessment and targeted treatment for lumbar disc herniation, sciatica, and cervical spondylosis.",
    heroHeadline: "Targeted Solutions for Spine and Nerve Root Health",
    overview: "Our spine care protocol emphasizes thorough neurological evaluation, postural biomechanical assessment, and step-wise management. For patients with progressive nerve compression or unresolving sciatica, microdiscectomy and targeted decompression alleviate pressure on compressed spinal nerves.",
    whenConsidered: [
      "Sciatica (sharp, radiating shooting pain down the leg into the foot)",
      "Lumbar herniated disc causing motor weakness (e.g., foot drop) or sensory loss",
      "Cervical disc degeneration causing radiating arm numbness or hand weakness",
      "Severe spinal canal stenosis limiting walking distance due to neurogenic claudication",
      "Back pain unresponsive to 6-8 weeks of structured medical and physiotherapy care",
    ],
    clinicalObjectives: [
      "Relief of pinched nerve irritation and radicular leg/arm pain",
      "Prevention of irreversible motor and sensory neurological deficits",
      "Restoration of spinal stability, posture, and core muscular support",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Neurological & Spine Evaluation", description: "Reflex testing, straight leg raise test, dermatomal sensory mapping.", timeline: "Day 1" },
      { stepNumber: 2, title: "Spine MRI & Dynamic X-rays", description: "Assessment of disc herniation level, canal diameter, and spinal segment stability.", timeline: "Diagnostic" },
      { stepNumber: 3, title: "Step-wise Treatment Selection", description: "Medical management, targeted physiotherapy, spinal injections, or decompression.", timeline: "Planning" },
      { stepNumber: 4, title: "Micro-Surgical Decompression", description: "Targeted removal of herniated disc fragment with preservation of spinal facet joints.", timeline: "If indicated" },
      { stepNumber: 5, title: "Early Mobilization", description: "Walking on the same or next day with spine ergonomics and core education.", timeline: "Post-procedure" },
      { stepNumber: 6, title: "Core & Posture Conditioning", description: "Structured spinal rehabilitation to strengthen back extensor and abdominal core muscles.", timeline: "Weeks 2 to 12" },
    ],
    recoveryOverview: "Patients undergoing microdiscectomy typically stand and walk within 24 hours. Emphasis is placed on proper spinal ergonomics (no heavy bending or twisting) and active core muscle conditioning.",
    recoveryMilestones: [
      { period: "Days 1–3", description: "Assisted walking, sitting for short durations, gentle nerve glides." },
      { period: "Weeks 2–4", description: "Wound healing, return to desk work, light walking daily." },
      { period: "Weeks 6–12", description: "Structured core strengthening and progressive resumption of physical tasks." },
    ],
    faqs: [
      {
        question: "Does every slipped disc require spine surgery?",
        answer: "No. Over 85% of disc herniations improve with non-surgical management, including anti-inflammatory medications, physiotherapy, and lifestyle modifications. Surgery is reserved for severe nerve compression, intractable pain, or progressive neurological deficit.",
      },
      {
        question: "What are red-flag symptoms requiring emergency spine evaluation?",
        answer: "Sudden loss of bowel or bladder control, progressive leg weakness (foot drop), or numbness around the saddle area require immediate emergency medical attention.",
      },
    ],
    relatedDoctorIds: ["dr-spine-specialist", "lead-physiotherapist"],
    relatedConditionSlugs: ["back-pain", "slip-disc"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fracture-trauma-care",
    slug: "fracture-care-trauma",
    title: "Complex Fracture Care & Trauma Surgery",
    category: "TRAUMA",
    categoryLabel: "Trauma & Fractures",
    departmentId: "orthopaedic-trauma",
    departmentName: "Orthopaedic Trauma & Fracture Care",
    shortDescription: "24/7 urgent reduction, casting, and advanced internal fixation for simple, compound, and complex joint fractures.",
    heroHeadline: "Rapid, Precise Stabilization for Bone Fractures and Trauma",
    overview: "Our 24/7 Orthopaedic Trauma unit provides swift triage, digital radiographic evaluation, and surgical fixation for bone fractures. We utilize anatomic locking plates, intramedullary nails, and minimally invasive percutaneous techniques to stabilize broken bones for rapid union and functional recovery.",
    whenConsidered: [
      "Acute bone fractures resulting from falls, sports, or vehicular accidents",
      "Displaced intra-articular fractures involving knee, ankle, hip, wrist, or shoulder",
      "Open (compound) fractures requiring emergent debridement and stabilization",
      "Non-union or malunion where past fractures failed to heal in proper alignment",
    ],
    clinicalObjectives: [
      "Anatomic restoration of bone alignment and articular surfaces",
      "Stable internal fixation allowing early joint motion without prolonged casting",
      "Prevention of infection, joint stiffness, and muscle wasting",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Emergency Triage & Splinting", description: "Rapid assessment, limb neurovascular check, pain relief, and temporary stabilization.", timeline: "Immediate" },
      { stepNumber: 2, title: "Digital Radiography / CT Scan", description: "Multi-angle imaging and 3D CT reconstruction for complex articular fractures.", timeline: "Urgent" },
      { stepNumber: 3, title: "Surgical Fixation Strategy", description: "Selection of anatomic locking plates, intramedullary nails, or external fixators.", timeline: "Pre-surgery" },
      { stepNumber: 4, title: "Precision Surgery", description: "Reduction and rigid fixation under image intensifier (C-arm) guidance in sterile OT.", timeline: "OT Procedure" },
      { stepNumber: 5, title: "Wound Care & Early Mobility", description: "Elevation, swelling management, and early adjacent joint motion.", timeline: "In-hospital" },
      { stepNumber: 6, title: "Bone Union & Rehab", description: "Sequential follow-up X-rays to assess callus formation and guided weight bearing.", timeline: "Weeks 4 to 16" },
    ],
    recoveryOverview: "Bone healing typically takes 6 to 12 weeks depending on fracture location, age, and biological factors. Modern fixation aims to eliminate prolonged heavy plaster casts so joints stay supple.",
    recoveryMilestones: [
      { period: "Weeks 1–2", description: "Soft tissue healing, swelling reduction, active finger/toe movements." },
      { period: "Weeks 4–6", description: "Initial callus visible on X-ray, partial weight bearing as advised." },
      { period: "Weeks 8–12", description: "Solid bony union, progressive resistance training, full weight bearing." },
    ],
    faqs: [
      {
        question: "Do bone plates and screws need to be removed after healing?",
        answer: "Titanium or medical-grade steel implants generally do not require routine removal unless they cause local irritation, prominent friction, or upon specific clinical indication.",
      },
      {
        question: "How do I know if my bone has fully healed?",
        answer: "Bone union is confirmed through clinical examination (absence of tenderness and pain on stress) and serial follow-up X-rays showing bridging bone callus.",
      },
    ],
    relatedDoctorIds: ["dr-trauma-fracture-specialist", "dr-consultant-ortho-joint", "lead-physiotherapist"],
    relatedConditionSlugs: ["fracture", "sports-injury"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "physiotherapy-regimens",
    slug: "physiotherapy-rehabilitation",
    title: "Physiotherapy & Post-Operative Rehabilitation",
    category: "REHABILITATION",
    categoryLabel: "Rehabilitation",
    departmentId: "physiotherapy-rehabilitation",
    departmentName: "Physiotherapy & Rehabilitation",
    shortDescription: "Tailored physical therapy protocols to restore muscle strength, joint range of motion, balance, and functional independence.",
    heroHeadline: "Restore Functional Strength, Mobility and Confidence",
    overview: "Rehabilitation is essential to long-term orthopaedic success. Our physiotherapy specialists utilize evidence-based exercise therapies, manual joint mobilizations, therapeutic modalities, and neuromuscular retraining to support your recovery every step of the way.",
    whenConsidered: [
      "Post-operative recovery following joint replacement, ACL reconstruction, or fracture fixation",
      "Non-operative management of osteoarthritis, frozen shoulder, and chronic back pain",
      "Sports injury recovery and functional return-to-play training",
      "Postural correction, neck strain, and ergonomic workstation conditioning",
    ],
    clinicalObjectives: [
      "Restoration of optimal joint range of motion",
      "Progressive muscular strengthening and stabilization",
      "Gait retraining and balance enhancement to prevent falls",
      "Empowerment with sustainable home exercise routines",
    ],
    journeySteps: [
      { stepNumber: 1, title: "Functional Assessment", description: "Detailed measurement of joint angles, muscle power, posture, and movement patterns.", timeline: "Day 1" },
      { stepNumber: 2, title: "Goal Setting & Protocol", description: "Collaboration with your treating surgeon to design phased rehabilitation milestones.", timeline: "Planning" },
      { stepNumber: 3, title: "Phase 1: Pain & Motion", description: "Gentle passive and active-assisted range of motion, swelling control, and activation.", timeline: "Initial weeks" },
      { stepNumber: 4, title: "Phase 2: Strength & Load", description: "Progressive resistance exercises, closed-chain movements, and muscle rebuilding.", timeline: "Middle phase" },
      { stepNumber: 5, title: "Phase 3: Functional Integration", description: "Gait re-education, stair climbing, balance, and proprioceptive drills.", timeline: "Advanced phase" },
      { stepNumber: 6, title: "Maintenance & Prevention", description: "Personalized home program to maintain lifelong bone and joint fitness.", timeline: "Long-term" },
    ],
    recoveryOverview: "Therapy begins gently and builds progressively in intensity. Patient consistency with home exercises is the key driver of long-term joint health and strength.",
    recoveryMilestones: [
      { period: "Sessions 1–5", description: "Pain reduction, swelling management, safe mobility technique." },
      { period: "Sessions 6–15", description: "Measurable gains in joint flexion/extension and basic muscle strength." },
      { period: "Ongoing", description: "Independent performance of customized home exercise protocol." },
    ],
    faqs: [
      {
        question: "How frequently will I need physiotherapy sessions?",
        answer: "Frequency depends on your procedure and condition. Many post-operative protocols start with 2 to 3 sessions per week combined with daily prescribed home exercises.",
      },
      {
        question: "Will physiotherapy be painful?",
        answer: "Therapists prioritize gentle, progressive mobilization within comfortable pain thresholds. Mild muscular fatigue is normal, but sharp pain is avoided through controlled techniques.",
      },
    ],
    relatedDoctorIds: ["lead-physiotherapist", "dr-consultant-ortho-joint", "dr-arthroscopy-sports-specialist"],
    relatedConditionSlugs: ["knee-pain", "joint-pain", "back-pain", "sports-injury"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
];
