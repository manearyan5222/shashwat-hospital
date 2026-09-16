export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: "Bone Health" | "Joint Health" | "Spine Health" | "Sports Injuries" | "Recovery" | "Physiotherapy" | "Preventive Care";
  summary: string;
  readingTimeMinutes: number;
  publishedDate: string;
  updatedDate: string;
  author: string;
  medicalReviewer: string | "VERIFY_WITH_HOSPITAL";
  reviewerDesignation: string;
  imageUrl: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  faqs: ArticleFAQ[];
  relatedTreatmentSlugs: string[];
  relatedDoctorIds: string[];
}

export const articlesData: HealthArticle[] = [
  {
    id: "joint-preservation-guide",
    slug: "guide-to-joint-preservation-osteoarthritis",
    title: "Joint Preservation Strategies: Protecting Your Knees & Hips Before Arthritis Advances",
    category: "Joint Health",
    summary: "Discover clinically supported lifestyle adaptations, low-impact conditioning exercises, and early clinical interventions that help slow the progression of cartilage wear.",
    readingTimeMinutes: 5,
    publishedDate: "2026-01-15",
    updatedDate: "2026-08-10",
    author: "Shashwat Hospital Orthopaedic Editorial Team",
    medicalReviewer: "Orthopaedic Joint & Trauma Specialist",
    reviewerDesignation: "Senior Consultant — Joint Replacement & Trauma",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    sections: [
      {
        heading: "Understanding the Cartilage Cushion",
        body: [
          "Healthy joints rely on smooth articular cartilage and synovial fluid to glide effortlessly. When biomechanical stress or aging accelerates cartilage breakdown, joints experience increased friction, stiffness, and discomfort.",
          "Joint preservation does not mean avoiding physical movement; on the contrary, healthy cartilage requires gentle, regular compression and decompression from movement to absorb essential nutrients from synovial fluid.",
        ],
      },
      {
        heading: "The Crucial Role of Weight Optimization",
        body: [
          "During normal level walking, the force transmitted through your knee joints equals roughly 3 to 4 times your body weight. When climbing stairs, this mechanical load increases to 5 to 7 times body weight.",
          "Shedding even a modest amount of excess weight yields substantial biomechanical relief, significantly reducing daily wear on knee and hip joints.",
        ],
      },
      {
        heading: "Choosing the Right Exercises for Arthritic Joints",
        body: [
          "High-impact pounding on concrete surfaces can exacerbate joint inflammation. Switch to joint-sparing, muscle-strengthening activities such as swimming, water aerobics, stationary cycling, and elliptical trainers.",
          "Strengthening the quadriceps and hamstring muscle groups creates an active shock absorber that stabilizes the knee during every step.",
        ],
      },
    ],
    keyTakeaways: [
      "Every kilogram of weight lost reduces 3–4 kilograms of mechanical load on your knee joints.",
      "Low-impact aerobic conditioning preserves joint range of motion and promotes cartilage lubrication.",
      "Early orthopaedic evaluation can identify alignment imbalances before severe bone-on-bone degeneration develops.",
    ],
    faqs: [
      {
        question: "Can supplements like Glucosamine cure arthritis?",
        answer: "Nutritional supplements may provide mild symptomatic comfort for some individuals, but robust clinical evidence does not show they can regrow lost cartilage. They should complement, not replace, medical advice and exercise.",
      },
    ],
    relatedTreatmentSlugs: ["knee-replacement", "physiotherapy-rehabilitation"],
    relatedDoctorIds: ["dr-consultant-ortho-joint", "lead-physiotherapist"],
  },
  {
    id: "desk-ergonomics-spine-health",
    slug: "ergonomics-and-spine-health-desk-workers",
    title: "Ergonomics & Spine Health: Preventing Chronic Back & Neck Strain at Your Desk",
    category: "Spine Health",
    summary: "Practical ergonomic guidelines, sitting posture corrections, and micro-movement breaks to safeguard your cervical and lumbar spine during long work hours.",
    readingTimeMinutes: 4,
    publishedDate: "2026-02-01",
    updatedDate: "2026-07-22",
    author: "Shashwat Hospital Orthopaedic Editorial Team",
    medicalReviewer: "Spine & Back Pain Specialist",
    reviewerDesignation: "Consultant — Spine Surgery & Spinal Disorders",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    sections: [
      {
        heading: "The Mechanics of Forward Head Posture ('Tech Neck')",
        body: [
          "An adult head weighs approximately 5 kg in neutral alignment. When tilted forward by 45 to 60 degrees to look down at a laptop or phone, the gravitational load placed on cervical vertebrae and muscles escalates to over 25 kg.",
          "Over time, chronic forward neck posture contributes to muscle spasms, tension headaches, and premature cervical disc degeneration.",
        ],
      },
      {
        heading: "Setting Up an Ergonomic Workstation",
        body: [
          "Elevate your computer monitor so the top third of the screen is at eye level. This eliminates continuous forward neck bending.",
          "Keep your elbows bent at roughly 90 degrees with forearms supported. Your lower back should rest firmly against the lumbar support of your chair, with feet flat on the floor.",
        ],
      },
      {
        heading: "The Power of the 45-Minute Micro-Break",
        body: [
          "Prolonged static sitting increases intradiscal pressure in the lumbar spine. Setting a timer to stand, stretch your chest, and perform gentle lumbar extensions every 45 minutes maintains spinal flexibility and healthy blood flow.",
        ],
      },
    ],
    keyTakeaways: [
      "Position your screen at eye level to prevent excessive cervical spine loading.",
      "Support the natural lordotic curve of your lower back with an ergonomic lumbar cushion.",
      "Take a 2-minute active standing or stretching break every 45 to 60 minutes.",
    ],
    faqs: [
      {
        question: "When should neck or back pain be evaluated by a spine specialist?",
        answer: "If pain radiates into your arm, shoulder blade, buttock, or leg, or is accompanied by numbness, tingling, or weakness, schedule an orthopaedic spine evaluation promptly.",
      },
    ],
    relatedTreatmentSlugs: ["spine-evaluation-surgery", "physiotherapy-rehabilitation"],
    relatedDoctorIds: ["dr-spine-specialist", "lead-physiotherapist"],
  },
  {
    id: "acl-recovery-what-to-expect",
    slug: "what-to-expect-after-acl-reconstruction",
    title: "Navigating ACL Recovery: A Phased Timeline from Surgery to Sports",
    category: "Sports Injuries",
    summary: "A step-by-step breakdown of biological graft healing, early mobility milestones, and return-to-sport testing after arthroscopic ACL surgery.",
    readingTimeMinutes: 6,
    publishedDate: "2026-03-10",
    updatedDate: "2026-08-18",
    author: "Shashwat Hospital Orthopaedic Editorial Team",
    medicalReviewer: "Arthroscopy & Sports Medicine Specialist",
    reviewerDesignation: "Consultant — Arthroscopic Surgery & Sports Injuries",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    sections: [
      {
        heading: "Biological Ligamentization of the Graft",
        body: [
          "When a tendon graft is fixed inside the knee to replace a torn ACL, it undergoes a biological transformation called ligamentization. Over several months, the body revascularizes the graft and incorporates it securely into bone tunnels.",
          "Because the graft undergoes a temporary phase of biological remodeling around weeks 6 to 12, progressing strictly according to your surgeon's protocol is vital to prevent graft stretching.",
        ],
      },
      {
        heading: "Early Milestones: Weeks 1 to 6",
        body: [
          "The top early priorities are achieving full knee extension (straightening) matching the opposite leg, controlling swelling through icing, and reactivating the quadriceps muscle.",
          "Crutches and a hinged knee brace are gradually phased out as quadriceps control and normal gait mechanics return.",
        ],
      },
      {
        heading: "Functional Testing Before Sports Clearance",
        body: [
          "Returning to pivoting sports requires more than just the passage of time. Objective criteria—including single-leg hop tests, quadriceps strength symmetry > 90%, and psychological confidence—are evaluated before sports clearance.",
        ],
      },
    ],
    keyTakeaways: [
      "Full knee extension within the first two weeks is a critical foundation for normal walking.",
      "Graft remodeling takes several months; avoid rushing into unprescribed running or jumping.",
      "Objective functional strength testing ensures safe return to competitive sports.",
    ],
    faqs: [
      {
        question: "Can I drive an automatic car after ACL surgery?",
        answer: "If the surgery was on your left leg and you drive an automatic vehicle, you may be cleared to drive once you are off prescription pain medications and have comfortable reaction speed (often 2–3 weeks). If surgery was on the right leg, driving usually waits until week 6.",
      },
    ],
    relatedTreatmentSlugs: ["acl-reconstruction", "physiotherapy-rehabilitation"],
    relatedDoctorIds: ["dr-arthroscopy-sports-specialist", "lead-physiotherapist"],
  },
  {
    id: "bone-density-osteoporosis-prevention",
    slug: "preventing-osteoporosis-and-fragility-fractures",
    title: "Bone Density & Osteoporosis: Safeguarding Your Skeletal Strength Across Decades",
    category: "Bone Health",
    summary: "Learn how dietary calcium, Vitamin D3, weight-bearing exercise, and timely DEXA screening prevent silent bone thinning and fragility fractures.",
    readingTimeMinutes: 5,
    publishedDate: "2026-04-05",
    updatedDate: "2026-08-01",
    author: "Shashwat Hospital Orthopaedic Editorial Team",
    medicalReviewer: "Orthopaedic Joint & Trauma Specialist",
    reviewerDesignation: "Senior Consultant — Joint Replacement & Trauma",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    sections: [
      {
        heading: "Why Osteoporosis is Called the 'Silent Disease'",
        body: [
          "Bone is living, dynamic tissue that constantly remodels. As bone resorption outpaces new bone formation—particularly after menopause or in aging seniors—bones become porous and fragile.",
          "Because bone density loss causes no symptoms on its own, many people only discover they have osteoporosis after a minor slip results in a fractured wrist, hip, or vertebra.",
        ],
      },
      {
        heading: "The Essential Pillars of Skeletal Health",
        body: [
          "Adequate dietary calcium and optimal Vitamin D3 levels are fundamental for bone mineralization. Weight-bearing exercises like brisk walking and resistance training stimulate osteoblasts to maintain bone mass.",
          "Avoiding smoking, moderating caffeine intake, and having simple home modifications (such as anti-skid bathroom mats and night lights) help prevent accidental falls.",
        ],
      },
    ],
    keyTakeaways: [
      "Osteoporosis is painless until a fracture occurs; proactive bone mineral density (DEXA) screening is recommended for at-risk individuals.",
      "Weight-bearing activities stimulate bone remodeling and muscle strength.",
      "Fall prevention at home is one of the most effective ways to avoid senior hip fractures.",
    ],
    faqs: [
      {
        question: "How is bone density tested?",
        answer: "A DEXA (Dual-energy X-ray Absorptiometry) scan is a quick, painless, low-radiation test that measures bone mineral density at the lumbar spine, hip, and forearm.",
      },
    ],
    relatedTreatmentSlugs: ["fracture-care-trauma", "physiotherapy-rehabilitation"],
    relatedDoctorIds: ["dr-trauma-fracture-specialist", "dr-consultant-ortho-joint"],
  },
];
