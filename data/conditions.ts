export interface ConditionFAQ {
  question: string;
  answer: string;
}

export interface Condition {
  id: string;
  slug: string;
  title: string;
  bodyRegion: "Knee" | "Hip" | "Shoulder" | "Spine" | "Trauma" | "General";
  shortDescription: string;
  overview: string;
  commonSymptoms: string[];
  commonCauses: string[];
  whenToConsultDoctor: string[];
  evaluationMethods: string[];
  treatmentOptions: {
    category: string;
    details: string;
  }[];
  rehabilitationGuidance: string;
  faqs: ConditionFAQ[];
  relatedDoctorIds: string[];
  relatedTreatmentSlugs: string[];
  status: "VERIFIED" | "VERIFY_WITH_HOSPITAL";
  imageUrl: string;
}

export const conditionsData: Condition[] = [
  {
    id: "knee-pain",
    slug: "knee-pain",
    title: "Knee Pain & Degeneration",
    bodyRegion: "Knee",
    shortDescription: "Understand common causes of acute and chronic knee pain, from cartilage wear to ligamentous strains, and explore evidence-based care pathways.",
    overview: "Knee pain is one of the most frequent musculoskeletal complaints affecting individuals across all age groups. Because the knee bears significant body weight and mechanical torque during walking, stair climbing, and sports, discomfort can originate from cartilage degeneration, ligament sprains, meniscus tears, or tendon inflammation.",
    commonSymptoms: [
      "Persistent ache or sharp pain around or behind the kneecap",
      "Stiffness and difficulty bending or fully straightening the knee, especially in the morning",
      "Swelling, joint warmth, or fluid accumulation (effusion)",
      "Popping, cracking, or grinding sensations (crepitus) during movement",
      "Instability or feeling that the knee is giving way while walking",
    ],
    commonCauses: [
      "Osteoarthritis (degenerative wear of articular cartilage)",
      "Meniscus tears resulting from twisting injuries or age-related degeneration",
      "Ligament injuries including ACL, PCL, and collateral ligament sprains",
      "Patellofemoral pain syndrome and runner's knee",
      "Bursitis or tendinitis around the knee tendons",
    ],
    whenToConsultDoctor: [
      "Inability to bear weight on the affected leg or severe limping",
      "Marked swelling that develops rapidly after an injury",
      "Knee joint lock where the leg cannot be straightened",
      "Visible joint deformity or severe pain that awakens you from sleep",
      "Persistent pain lasting more than 1 to 2 weeks despite rest",
    ],
    evaluationMethods: [
      "Clinical physical exam assessing range of motion, ligament stability, and joint line tenderness",
      "Standing weight-bearing digital X-rays to assess joint space narrowing",
      "High-resolution MRI to examine soft tissues, ligaments, and cartilage",
      "Blood tests if inflammatory arthritis (such as rheumatoid arthritis or gout) is suspected",
    ],
    treatmentOptions: [
      {
        category: "Conservative & Medical Care",
        details: "Activity modification, temporary rest, anti-inflammatory medications, weight management, and targeted quadriceps strengthening.",
      },
      {
        category: "Therapeutic Injections",
        details: "Intra-articular corticosteroid or viscosupplementation (hyaluronic acid) injections under clinical guidance.",
      },
      {
        category: "Minimally Invasive Arthroscopy",
        details: "Keyhole surgery to repair torn meniscus or reconstruct damaged ligaments.",
      },
      {
        category: "Joint Replacement",
        details: "Partial or Total Knee Replacement for advanced, bone-on-bone osteoarthritis with persistent pain.",
      },
    ],
    rehabilitationGuidance: "Physiotherapy focuses on strengthening the quadriceps, hamstrings, and hip abductor muscles to offload stress from the knee joint, improve patellar tracking, and enhance walking endurance.",
    faqs: [
      {
        question: "Does knee pain always mean I need surgery?",
        answer: "No. The vast majority of knee pain cases are managed successfully with structured physiotherapy, lifestyle adaptations, weight optimization, and medical therapies. Surgery is considered only when structural damage is severe or conservative care is insufficient.",
      },
      {
        question: "How can I protect my knees during daily activities?",
        answer: "Maintaining a healthy body weight, wearing supportive footwear, incorporating low-impact exercises (such as swimming or stationary cycling), and avoiding prolonged squatting on hard surfaces help preserve joint cartilage.",
      },
    ],
    relatedDoctorIds: ["dr-consultant-ortho-joint", "dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["knee-replacement", "acl-reconstruction", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "osteoarthritis",
    slug: "osteoarthritis",
    title: "Osteoarthritis (Knee & Hip)",
    bodyRegion: "General",
    shortDescription: "Degenerative joint disease involving the breakdown of protective articular cartilage, leading to pain, stiffness, and reduced joint flexibility.",
    overview: "Osteoarthritis (OA) is a progressive joint condition characterized by the gradual thinning and wear of articular cartilage. As the cartilage wears away, the underlying bone ends may rub against each other, causing bone spurs (osteophytes), joint inflammation, and progressive stiffness.",
    commonSymptoms: [
      "Joint aching that worsens after prolonged activity and eases with rest",
      "Morning stiffness lasting up to 30 minutes",
      "Crepitus (a crunchy or grinding sensation in the joint during motion)",
      "Gradual loss of joint flexibility and difficulty climbing stairs or getting up from low chairs",
      "Visible enlargement or angular bowing of the joint in advanced stages",
    ],
    commonCauses: [
      "Natural biological aging and gradual cartilage wear",
      "Excess body weight placing increased mechanical load on weight-bearing joints",
      "Previous joint trauma, past fractures, or ligament injuries",
      "Genetic predisposition and familial joint alignment traits",
      "Repetitive occupational stress on knees and hips",
    ],
    whenToConsultDoctor: [
      "Pain interferes with essential daily activities like walking or bathing",
      "Severe night pain preventing sound sleep",
      "Progressive bowing or deformity of the knees",
      "Episodes of sudden joint locking or buckling",
    ],
    evaluationMethods: [
      "Standing weight-bearing radiographs (X-rays) to grade joint space narrowing and bone spurs",
      "Functional mobility and gait analysis by an orthopaedic surgeon",
      "Laboratory markers to rule out inflammatory or rheumatoid conditions when indicated",
    ],
    treatmentOptions: [
      {
        category: "Lifestyle & Physical Conditioning",
        details: "Weight management, joint-friendly aerobic conditioning (swimming, cycling), and daily stretching.",
      },
      {
        category: "Pharmacotherapy",
        details: "Analgesics and anti-inflammatory medications prescribed under physician guidance.",
      },
      {
        category: "Intra-Articular Therapies",
        details: "Lubricating viscosupplementation or targeted anti-inflammatory injections.",
      },
      {
        category: "Arthroplasty (Joint Replacement)",
        details: "Total or partial joint replacement for end-stage joint damage to restore pain-free walking.",
      },
    ],
    rehabilitationGuidance: "Tailored physiotherapy programs strengthen stabilizing peri-articular muscles, reduce joint stiffness, and teach joint-sparing ergonomic techniques for long-term functional mobility.",
    faqs: [
      {
        question: "Can worn joint cartilage regenerate on its own?",
        answer: "Articular cartilage has very limited blood supply and cannot regrow naturally once severely worn. However, proactive conservative management can significantly relieve symptoms and slow progression.",
      },
    ],
    relatedDoctorIds: ["dr-consultant-ortho-joint", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["knee-replacement", "hip-replacement", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "acl-injury",
    slug: "acl-injury",
    title: "ACL Tears & Ligament Sprains",
    bodyRegion: "Knee",
    shortDescription: "Sprains and complete tears of the Anterior Cruciate Ligament, commonly sustained during sudden deceleration, pivoting, or athletic impact.",
    overview: "The Anterior Cruciate Ligament (ACL) is a crucial stabilizer situated inside the knee joint that prevents the tibia from sliding forward relative to the femur and provides rotational stability. ACL tears frequently occur during non-contact pivoting, rapid direction changes, or landing awkwardly from a jump.",
    commonSymptoms: [
      "A distinct 'pop' or popping sensation heard or felt at the time of injury",
      "Rapid swelling (hemarthrosis) developing within a few hours of trauma",
      "Severe acute pain and inability to continue sports or physical activity",
      "Feeling of knee instability or the knee 'giving out' under body weight",
      "Loss of full range of motion due to pain and intra-articular swelling",
    ],
    commonCauses: [
      "Sudden deceleration and pivoting while the foot is firmly planted",
      "Landing awkwardly from a jump in football, cricket, basketball, or badminton",
      "Direct blow or collision to the outer aspect of the knee",
      "Hyperextension trauma to the knee joint",
    ],
    whenToConsultDoctor: [
      "Immediate swelling and inability to put weight on the injured leg after an athletic incident",
      "Persistent knee instability during normal walking or turning",
      "Joint locking or catching suggesting concurrent meniscus injury",
    ],
    evaluationMethods: [
      "Clinical ligament testing (Lachman test, Anterior Drawer test, Pivot Shift test)",
      "High-field Knee MRI to evaluate tear grade, meniscus involvement, and bone bruising",
      "Digital X-rays to rule out avulsion fractures or associated bony trauma",
    ],
    treatmentOptions: [
      {
        category: "Acute R.I.C.E. Protocol",
        details: "Rest, Ice application, Compression bandage, and Limb Elevation for initial swelling control.",
      },
      {
        category: "Structured Pre-habilitation",
        details: "Regaining full extension and reducing swelling prior to definitive surgical intervention.",
      },
      {
        category: "Arthroscopic ACL Reconstruction",
        details: "Keyhole surgery using tendon autografts to recreate an anatomically stable ligament.",
      },
      {
        category: "Phased Sports Rehabilitation",
        details: "Post-operative strengthening, neuromuscular retraining, and return-to-sport testing.",
      },
    ],
    rehabilitationGuidance: "Rehabilitation is a multi-month progressive process progressing from range-of-motion restoration and quad activation to plyometrics, agility drills, and functional sports clearance.",
    faqs: [
      {
        question: "Is surgery always required for an ACL tear?",
        answer: "Active individuals, young patients, and those participating in sports involving cutting or pivoting generally benefit from reconstruction to prevent recurrent instability and secondary cartilage damage.",
      },
    ],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["acl-reconstruction", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-pain",
    slug: "shoulder-pain",
    title: "Shoulder Pain & Rotator Cuff Disorders",
    bodyRegion: "Shoulder",
    shortDescription: "Assessment and management for rotator cuff tears, subacromial impingement, and frozen shoulder limiting arm reach.",
    overview: "The shoulder is the most mobile ball-and-socket joint in the human body, relying on a complex network of muscles (the rotator cuff), ligaments, and the labrum for stability. Shoulder pain often stems from tendon impingement, tears, inflammation, or capsular contracture (frozen shoulder).",
    commonSymptoms: [
      "Dull ache deep inside the shoulder that worsens when lifting the arm overhead",
      "Disturbed sleep when lying on the affected shoulder",
      "Weakness when attempting to lift objects or reach behind the back",
      "Catching or clicking sensation when moving the arm",
      "Progressive stiffness and restriction in overall shoulder motion",
    ],
    commonCauses: [
      "Rotator cuff tendinitis and tears (supraspinatus tendon wear)",
      "Subacromial impingement (pinching of tendons under the bone spur)",
      "Adhesive capsulitis (frozen shoulder)",
      "Labral tears (SLAP tears or Bankart lesions) from dislocation or trauma",
    ],
    whenToConsultDoctor: [
      "Sudden weakness and inability to raise the arm following a fall or strain",
      "Shoulder pain that persists for more than 2 weeks despite rest",
      "Recurrent shoulder dislocation or sensation of looseness",
      "Severe restriction in basic tasks like combing hair or reaching a pocket",
    ],
    evaluationMethods: [
      "Shoulder physical examination testing range of motion, impingement signs, and muscle strength",
      "Digital X-rays to assess bone spurs, joint space, and acromial morphology",
      "Shoulder MRI to visualize rotator cuff tendon integrity, tear dimensions, and labrum status",
    ],
    treatmentOptions: [
      {
        category: "Conservative Therapy",
        details: "Rest, NSAIDs, therapeutic stretching, and rotator cuff strengthening exercises.",
      },
      {
        category: "Subacromial Injections",
        details: "Targeted anti-inflammatory injections under clinical guidance for acute pain relief.",
      },
      {
        category: "Arthroscopic Shoulder Surgery",
        details: "Keyhole repair of torn tendons, subacromial decompression, or capsular release.",
      },
    ],
    rehabilitationGuidance: "Physiotherapy begins with gentle passive range of motion, progressing to active-assisted movements and rotator cuff / scapular stabilizer strengthening exercises.",
    faqs: [
      {
        question: "What is frozen shoulder and how is it different from a tendon tear?",
        answer: "Frozen shoulder (adhesive capsulitis) involves widespread inflammation and thickening of the shoulder capsule, causing global stiffness in all directions. Rotator cuff tears typically involve specific muscle weakness and pain during active elevation.",
      },
    ],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["shoulder-arthroscopy", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "back-pain",
    slug: "back-pain",
    title: "Low Back Pain & Sciatica",
    bodyRegion: "Spine",
    shortDescription: "Evidence-based pathways for acute and chronic lumbar spine discomfort, muscle spasms, and radiating nerve pain.",
    overview: "Low back pain is extremely common and can range from a dull, persistent ache to sudden, sharp disabling spasms. It can originate from muscle strains, disc herniation, spinal stenosis, facet joint arthritis, or postural strain from prolonged desk work.",
    commonSymptoms: [
      "Aching or stiffness across the lower back and buttock region",
      "Sharp pain radiating down the back of the leg into the calf or foot (sciatica)",
      "Tingling, numbness, or 'pins and needles' sensation in the lower limb",
      "Difficulty standing upright or walking for extended periods",
      "Aggravation of pain with coughing, sneezing, or prolonged sitting",
    ],
    commonCauses: [
      "Lumbar disc herniation / slipped disc compressing spinal nerve roots",
      "Acute lumbar muscle strain or ligamentous sprain",
      "Degenerative disc disease and facet joint arthrosis",
      "Lumbar spinal canal stenosis causing nerve crowding",
      "Poor ergonomic posture and sedentary lifestyle",
    ],
    whenToConsultDoctor: [
      "Sudden loss of bowel or bladder control (emergency red-flag)",
      "Progressive weakness in the leg or difficulty lifting the foot (foot drop)",
      "Numbness around the saddle/groin area",
      "Back pain accompanied by unexplained fever or unintentional weight loss",
      "Severe pain that does not improve after a few days of rest and medication",
    ],
    evaluationMethods: [
      "Comprehensive neurological exam: reflexes, muscle motor testing, and straight leg raise test",
      "Lumbar Spine MRI to clearly identify disc protrusion, nerve impingement, and canal dimensions",
      "Digital X-rays in flexion/extension to evaluate spinal alignment and stability",
    ],
    treatmentOptions: [
      {
        category: "Non-Surgical Spine Management",
        details: "Short-term rest, muscle relaxants, anti-inflammatory medicines, and core strengthening physiotherapy.",
      },
      {
        category: "Spinal Interventions",
        details: "Targeted epidural steroid injections or selective nerve root blocks for stubborn radicular pain.",
      },
      {
        category: "Minimally Invasive Decompression",
        details: "Microdiscectomy or endoscopic decompression when nerve compression causes significant weakness or unresolving pain.",
      },
    ],
    rehabilitationGuidance: "Spine physiotherapy emphasizes core muscle strengthening, hamstring flexibility, pelvic tilt control, and workstation ergonomic education to protect spinal discs long term.",
    faqs: [
      {
        question: "Does bed rest cure low back pain?",
        answer: "Strict bed rest beyond 1 to 2 days is generally not recommended. Early gentle walking and guided active movement have been shown to speed recovery and prevent muscular stiffness.",
      },
    ],
    relatedDoctorIds: ["dr-spine-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["spine-evaluation-surgery", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "slip-disc",
    slug: "slip-disc",
    title: "Lumbar Herniated Disc (Slip Disc)",
    bodyRegion: "Spine",
    shortDescription: "Protrusion of intervertebral disc material irritating adjacent spinal nerves, causing severe radicular leg pain.",
    overview: "An intervertebral disc acts as a shock-absorbing cushion between spinal vertebrae. In a herniated or 'slipped' disc, the tough outer layer (annulus fibrosus) tears, allowing the soft inner gel (nucleus pulposus) to press against adjacent spinal nerve roots.",
    commonSymptoms: [
      "Electric shock-like pain traveling from the lower back through the buttock down the leg",
      "Numbness, burning, or pins-and-needles in the foot or toes",
      "Muscular weakness in the ankle or leg muscles",
      "Pain aggravated by forward bending, sitting, or coughing",
    ],
    commonCauses: [
      "Age-related disc degeneration and dehydration",
      "Improper heavy lifting with a rounded, twisting spine",
      "Sudden high-impact trauma to the back",
      "Repetitive occupational vibration or prolonged poor seated posture",
    ],
    whenToConsultDoctor: [
      "Severe radiating leg pain that makes standing or walking impossible",
      "Development of foot drop (inability to lift toes while walking)",
      "Any bladder/bowel incontinence (requires immediate emergency evaluation)",
    ],
    evaluationMethods: [
      "Detailed clinical spine and neurological exam",
      "High-resolution Lumbar Spine MRI",
    ],
    treatmentOptions: [
      {
        category: "Conservative Medical Care",
        details: "Medications for nerve pain, short rest, and spine physiotherapy.",
      },
      {
        category: "Targeted Injections",
        details: "Transforaminal epidural injections to reduce acute nerve root inflammation.",
      },
      {
        category: "Microdiscectomy",
        details: "Precision micro-surgical removal of the compressing disc fragment.",
      },
    ],
    rehabilitationGuidance: "Physiotherapy focuses on gentle nerve mobilization, lumbar stabilization, core strengthening, and safe body mechanics.",
    faqs: [
      {
        question: "Can a herniated disc shrink naturally?",
        answer: "Yes, many herniated disc fragments gradually dehydrate and resorb over time through the body's natural inflammatory and healing processes.",
      },
    ],
    relatedDoctorIds: ["dr-spine-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["spine-evaluation-surgery", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fracture",
    slug: "fracture",
    title: "Bone Fractures & Acute Orthopaedic Trauma",
    bodyRegion: "Trauma",
    shortDescription: "Complete or partial bone breaks resulting from traumatic impacts, falls, sports collisions, or underlying osteoporosis.",
    overview: "A bone fracture occurs when physical force applied to a bone exceeds its structural strength. Fractures can range from hairline stress cracks to complex displaced or open injuries requiring urgent orthopaedic surgical fixation.",
    commonSymptoms: [
      "Immediate severe localized pain at the fracture site",
      "Rapid swelling, bruising, and visible deformity of the injured limb",
      "Inability to move the limb or bear weight",
      "Bone tenderness to touch and painful crepitus",
    ],
    commonCauses: [
      "High-energy motor vehicle accidents and falls",
      "High-impact sports collisions",
      "Low-energy fragility falls in elderly individuals with osteoporosis",
      "Repetitive stress or overuse in endurance athletes",
    ],
    whenToConsultDoctor: [
      "Any suspected bone break requires immediate medical assessment",
      "Open wounds near a broken bone with visible bone exposure (emergency)",
      "Coldness, paleness, or loss of sensation in fingers or toes below the injury",
    ],
    evaluationMethods: [
      "Urgent clinical examination checking limb circulation and nerve function",
      "Multi-view digital X-rays to assess fracture pattern and displacement",
      "CT imaging for complex intra-articular fractures (pelvis, tibial plateau, calcaneus)",
    ],
    treatmentOptions: [
      {
        category: "Emergency Splinting & Immobilization",
        details: "Pain relief, temporary splinting, and soft-tissue swelling control.",
      },
      {
        category: "Non-Surgical Cast Immobilization",
        details: "Plaster cast application for undisplaced, stable fractures.",
      },
      {
        category: "Surgical Fixation (ORIF / Nailing)",
        details: "Internal fixation with titanium plates, screws, or intramedullary rods for stable union.",
      },
    ],
    rehabilitationGuidance: "Sequential rehabilitation restores joint range of motion and muscle power as bone healing progresses on serial X-rays.",
    faqs: [
      {
        question: "How long does a broken bone take to heal?",
        answer: "Most fractures require 6 to 12 weeks for solid bony union, depending on the bone involved, fracture pattern, age, and nutritional factors.",
      },
    ],
    relatedDoctorIds: ["dr-trauma-fracture-specialist", "dr-consultant-ortho-joint", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["fracture-care-trauma", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sports-injury",
    slug: "sports-injury",
    title: "Sports Injuries & Athletic Overuse",
    bodyRegion: "General",
    shortDescription: "Comprehensive diagnostic and functional care for acute athletic trauma, muscle strains, ligament tears, and chronic tendon overuse.",
    overview: "Athletic injuries occur during physical training, competitive sports, and recreational fitness. They encompass acute trauma (such as sprains, dislocations, and fractures) as well as chronic overuse syndromes (such as tendinitis and stress reactions).",
    commonSymptoms: [
      "Sudden sharp pain during acceleration, jumping, or contact",
      "Joint swelling, stiffness, and restricted movement",
      "Weakness and inability to generate athletic power or sprint",
      "Tenderness over muscle bellies or tendon insertions",
    ],
    commonCauses: [
      "Direct athletic impact, rapid direction changes, and awkward landings",
      "Inadequate warm-up or sudden increases in training volume",
      "Muscular imbalances, biomechanical flaws, and improper footwear",
    ],
    whenToConsultDoctor: [
      "Joint instability, visible deformity, or inability to walk off the field",
      "Severe swelling developing immediately after injury",
      "Pain that prevents normal training for more than a few days",
    ],
    evaluationMethods: [
      "Sports medicine clinical examination and functional movement testing",
      "Digital X-rays and high-resolution musculoskeletal MRI",
    ],
    treatmentOptions: [
      {
        category: "Acute Management",
        details: "Rest, icing, compression, elevation, and protective bracing.",
      },
      {
        category: "Specialized Sports Physiotherapy",
        details: "Progressive muscle loading, eccentric conditioning, and biomechanical correction.",
      },
      {
        category: "Minimally Invasive Surgery",
        details: "Arthroscopic repair for torn ligaments or cartilage when required.",
      },
    ],
    rehabilitationGuidance: "Structured return-to-play protocols evaluate strength, agility, symmetry, and sport-specific performance before cleared for competition.",
    faqs: [
      {
        question: "When is it safe to return to sports after an injury?",
        answer: "Return-to-play criteria require full pain-free range of motion, at least 90% limb strength symmetry compared to the uninjured side, and successful completion of sport-specific functional drills.",
      },
    ],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
    relatedTreatmentSlugs: ["acl-reconstruction", "shoulder-arthroscopy", "physiotherapy-rehabilitation"],
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  },
];
