import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { HospitalJsonLd } from "@/components/JsonLd";
import { hospitalData } from "@/data/hospital";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shashwat Hospital | Orthopaedic & Surgical Care in Nerul, Navi Mumbai",
    template: "%s | Shashwat Hospital Nerul",
  },
  description:
    "Shashwat Hospital is an orthopaedic healthcare destination in Nerul, Navi Mumbai offering joint replacement, sports arthroscopy, spine care, trauma care, and rehabilitation.",
  keywords: [
    "Orthopaedic Hospital in Nerul",
    "Orthopaedic Doctor in Nerul",
    "Joint Replacement Navi Mumbai",
    "Knee Replacement Nerul",
    "Hip Replacement Navi Mumbai",
    "Arthroscopy Specialist Navi Mumbai",
    "Spine Specialist Nerul",
    "Trauma Fracture Care Nerul",
    "Physiotherapy Rehabilitation Navi Mumbai",
    "Shashwat Hospital",
  ],
  authors: [{ name: "Shashwat Hospital Medical Editorial Board" }],
  creator: "Shashwat Hospital, Nerul",
  publisher: "Shashwat Hospital",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "Shashwat Hospital | Orthopaedic & Surgical Care in Nerul",
    description:
      "Patient-first orthopaedic care: joint replacement, sports injuries, spine care, fracture trauma, and rehabilitation in Nerul, Navi Mumbai.",
    url: SITE_URL,
    siteName: "Shashwat Hospital",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashwat Hospital | Orthopaedic & Surgical Care in Nerul",
    description:
      "Specialized joint replacement, keyhole arthroscopy, spine care, and fracture care in Nerul, Navi Mumbai.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-surface-bg text-surface-text">
        <HospitalJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
