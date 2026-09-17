"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Stethoscope,
  Users,
  Calendar,
  LogOut,
  Download,
  Info,
  X,
  Bell,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export function DoctorLayout({ children }: DoctorLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [doctorName, setDoctorName] = useState("Dr. Joint Specialist");
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shashwat_doctor_user");
      if (stored) {
        const userObj = JSON.parse(stored);
        if (userObj.name) setDoctorName(userObj.name);
      }
    } catch {}
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      document.cookie = "shashwat_doctor_session=; path=/; max-age=0";
      localStorage.removeItem("shashwat_doctor_user");
      router.push("/doctor/login");
    } catch {
      router.push("/doctor/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased pb-20 md:pb-0">
      {/* PWA Install Banner */}
      {showInstallPrompt && (
        <div className="bg-gradient-to-r from-teal-900 to-cyan-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-cyan-800/60 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>
              <strong>Install Doctor PWA:</strong> Tap Share <span className="font-mono">&ldquo;Add to Home Screen&rdquo;</span> for instant offline mobile access (iOS 16.4+ / Android).
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowInstallPrompt(false)}
            className="p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="h-16 px-4 md:px-8 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B2545] to-[#0E7490] border border-cyan-400/40 flex items-center justify-center text-white font-bold shadow-md">
            <Stethoscope className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-cyan-400 leading-none">
              Shashwat Hospital
            </div>
            <div className="font-heading font-bold text-sm text-white mt-0.5">
              Doctor Clinical Portal
            </div>
          </div>
        </div>

        {/* Desktop Top Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
          <Link
            href="/doctor"
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              pathname === "/doctor" ? "bg-cyan-600 text-white shadow" : "text-slate-400 hover:text-white"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today&apos;s OPD</span>
          </Link>

          <Link
            href="/doctor/patients"
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              pathname?.startsWith("/doctor/patients") ? "bg-cyan-600 text-white shadow" : "text-slate-400 hover:text-white"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Assigned Patients</span>
          </Link>
        </nav>

        {/* Doctor Profile & Sign Out */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-xs font-bold text-white">{doctorName}</div>
            <div className="text-[10px] text-cyan-400">Treating Consultant</div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-400 border border-slate-700 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 md:p-8">
        {children}
      </main>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-6 flex items-center justify-around z-40">
        <Link
          href="/doctor"
          className={cn(
            "flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors",
            pathname === "/doctor" ? "text-cyan-400 font-bold" : "text-slate-400"
          )}
        >
          <Calendar className="w-5 h-5" />
          <span>Today</span>
        </Link>

        <Link
          href="/doctor/patients"
          className={cn(
            "flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors",
            pathname?.startsWith("/doctor/patients") ? "text-cyan-400 font-bold" : "text-slate-400"
          )}
        >
          <Users className="w-5 h-5" />
          <span>Patients</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
