"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { HospitalJsonLd } from "@/components/JsonLd";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInternalPortal =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/doctor") ||
    pathname?.startsWith("/patient");

  if (isInternalPortal) {
    return <main className="flex-1 min-h-screen">{children}</main>;
  }

  return (
    <>
      <HospitalJsonLd />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
