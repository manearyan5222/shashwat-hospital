import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foot & Ankle Orthopaedic Centre | Shashwat Hospital Nerul",
  description:
    "Specialized foot and ankle orthopaedics in Nerul, Navi Mumbai. Evidence-based care for plantar fasciitis, heel spurs, flat feet, Achilles tendonitis, and custom orthotics.",
  keywords: [
    "Foot and Ankle Specialist Nerul",
    "Plantar Fasciitis Treatment Navi Mumbai",
    "Custom Orthotics Nerul",
    "Achilles Tendonitis Navi Mumbai",
    "Podiatric Biomechanics Nerul",
    "Foot Pain Clinic Navi Mumbai",
  ],
  alternates: {
    canonical: "/foot-and-ankle",
  },
  openGraph: {
    title: "Foot & Ankle Orthopaedic Centre | Shashwat Hospital Nerul",
    description:
      "Advanced biomechanical analysis, custom orthotics, and specialized foot & ankle orthopaedic care in Nerul, Navi Mumbai.",
    url: "/foot-and-ankle",
    type: "website",
  },
};

export default function FootAndAnkleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
