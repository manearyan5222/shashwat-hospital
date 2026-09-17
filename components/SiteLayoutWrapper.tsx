"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { HospitalJsonLd } from "@/components/JsonLd";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 min-h-screen bg-slate-900">{children}</main>;
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
