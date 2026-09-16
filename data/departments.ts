export interface Department {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  keyConditions: string[];
  keyProcedures: string[];
  status: "VERIFIED" | "VERIFY_WITH_HOSPITAL";
  featured: boolean;
}

export const departmentsData: Department[] = [
  {
    id: "joint-replacement",
    slug: "joint-replacement",
    title: "Joint Replacement & Arthroplasty",
    shortDescription: "Advanced total and partial replacement for severely arthritic or injured knee, hip, and shoulder joints.",
    fullDescription: "Our Joint Replacement unit focuses on precision surgical interventions for advanced degenerative joint diseases, severe osteoarthritis, and rheumatoid arthritis. Using modern instrumentation and tissue-sparing techniques, the goal is long-term joint function and accelerated rehabilitation.",
    iconName: "Bone",
    keyConditions: ["Osteoarthritis of the Knee", "Hip Avascular Necrosis (AVN)", "Severe Joint Stiffness", "Rheumatoid Arthritis"],
    keyProcedures: ["Total Knee Replacement (TKR)", "Partial Knee Replacement", "Total Hip Replacement (THR)", "Reverse Shoulder Replacement"],
    status: "VERIFIED",
    featured: true,
  },
  {
    id: "arthroscopy-sports-medicine",
    slug: "arthroscopy-sports-medicine",
    title: "Arthroscopy & Sports Medicine",
    shortDescription: "Minimally invasive keyhole procedures for ligament tears, cartilage repair, and athletic injuries.",
    fullDescription: "Dedicated to athletes and active individuals of all ages. Keyhole arthroscopic techniques allow surgeons to repair complex ligament tears, rotator cuff tears, and labral damage with minimal soft-tissue disruption and prompt return to sport.",
    iconName: "Activity",
    keyConditions: ["ACL & PCL Tears", "Meniscus Tears", "Rotator Cuff Tears", "Shoulder Instability / Dislocation"],
    keyProcedures: ["ACL Reconstruction", "Meniscal Repair / Meniscectomy", "Shoulder Arthroscopy & Labral Repair", "Cartilage Preservation"],
    status: "VERIFIED",
    featured: true,
  },
  {
    id: "orthopaedic-trauma",
    slug: "orthopaedic-trauma",
    title: "Orthopaedic Trauma & Fracture Care",
    shortDescription: "24/7 urgent care for simple, complex, and polytrauma fractures with immediate surgical stabilisation.",
    fullDescription: "The Trauma unit operates around the clock to manage acute fractures, joint dislocations, compound injuries, and high-energy road traffic accidents. Equipped with digital imaging and dedicated trauma theatres for rapid stabilization.",
    iconName: "ShieldAlert",
    keyConditions: ["Compound & Closed Fractures", "Pelvic & Acetabular Fractures", "Periprosthetic Fractures", "Non-union / Malunion"],
    keyProcedures: ["Open Reduction Internal Fixation (ORIF)", "Intramedullary Nailing", "External Fixation", "Complex Deformity Correction"],
    status: "VERIFIED",
    featured: true,
  },
  {
    id: "spine-care",
    slug: "spine-care",
    title: "Spine Care & Back Pain Unit",
    shortDescription: "Comprehensive assessment and non-surgical & surgical management for disc herniation, sciatica, and spinal degeneration.",
    fullDescription: "Focused on conservative-first protocols for back and neck pain, followed by targeted surgical decompression or stabilization when neurological deficits or severe structural instability require intervention.",
    iconName: "AlignVerticalJustifyCenter",
    keyConditions: ["Lumbar Slipped / Herniated Disc", "Sciatica & Radiculopathy", "Cervical Spondylosis", "Spinal Stenosis"],
    keyProcedures: ["Microdiscectomy", "Spinal Decompression", "Lumbar Fusion (TLIF/PLIF)", "Epidural Steroid Injections"],
    status: "VERIFIED",
    featured: true,
  },
  {
    id: "physiotherapy-rehabilitation",
    slug: "physiotherapy-rehabilitation",
    title: "Physiotherapy & Rehabilitation",
    shortDescription: "Structured recovery protocols, joint mobilization, gait retraining, and sports functional conditioning.",
    fullDescription: "Rehabilitation is an integral pillar of every orthopaedic outcome. Our physiotherapy team delivers individualized pre-operative conditioning and post-surgical recovery pathways to restore strength, range of motion, and everyday independence.",
    iconName: "HeartPulse",
    keyConditions: ["Post-Surgical Joint Stiffness", "Muscle Imbalances & Weakness", "Chronic Back & Neck Pain", "Gait & Balance Issues"],
    keyProcedures: ["Post-Operative Rehabilitation", "Targeted Exercise Therapy", "Manual Therapy & Mobilization", "Gait Training & Ergonomics"],
    status: "VERIFIED",
    featured: true,
  },
  {
    id: "pain-management",
    slug: "pain-management",
    title: "Orthopaedic Pain Management",
    shortDescription: "Non-operative multimodal pain relief strategies for chronic arthritis, nerve irritation, and tendonitis.",
    fullDescription: "Tailored multimodal pain management strategies incorporating pharmacological guidance, targeted joint injections, viscosupplementation, and lifestyle modifications for patients with persistent musculoskeletal discomfort.",
    iconName: "Stethoscope",
    keyConditions: ["Chronic Osteoarthritis Pain", "Facet Joint Arthropathy", "Bursitis & Tendinitis", "Plantar Fasciitis"],
    keyProcedures: ["Intra-articular Injections", "Trigger Point Therapy", "Viscosupplementation", "Multimodal Pain Protocols"],
    status: "VERIFIED",
    featured: false,
  },
  {
    id: "paediatric-orthopaedics",
    slug: "paediatric-orthopaedics",
    title: "Paediatric Orthopaedics",
    shortDescription: "Specialized assessment for growing bones, congenital limb differences, and childhood growth plate injuries.",
    fullDescription: "Children's bones heal differently and require specialized attention to growth plates and developmental alignment. We provide compassionate evaluations for childhood fractures, limb deformities, and congenital orthopaedic conditions.",
    iconName: "Baby",
    keyConditions: ["Paediatric Fractures & Growth Plate Injuries", "Clubfoot (CTEV)", "Developmental Dysplasia of the Hip (DDH)", "Genu Varum / Valgum (Bowlegs/Knock-knees)"],
    keyProcedures: ["Growth Plate Fracture Management", "Ponseti Method for Clubfoot", "Corrective Osteotomies", "Deformity Assessment"],
    status: "VERIFY_WITH_HOSPITAL",
    featured: false,
  },
];
