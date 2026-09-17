"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Calendar,
  FileText,
  LogOut,
  ShieldCheck,
  Building,
  UserCheck,
  Users,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StaffRole } from "@/types/database";

interface AdminSidebarProps {
  activeTab: "appointments" | "second-opinions" | "doctors";
  onTabChange: (tab: "appointments" | "second-opinions" | "doctors") => void;
  newAppointmentsCount?: number;
  newSecondOpinionsCount?: number;
  staffEmail?: string;
  userRole?: StaffRole;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  newAppointmentsCount = 0,
  newSecondOpinionsCount = 0,
  staffEmail = "staff@shashwathospital.com",
  userRole = "admin",
}: AdminSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      document.cookie = "shashwat_staff_session=; path=/; max-age=0";
      localStorage.removeItem("shashwat_staff_user");
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 min-h-screen select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            S
          </div>
          <div>
            <div className="font-heading font-bold text-base text-white tracking-tight leading-none">
              SHASHWAT
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-teal-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>{userRole === "admin" ? "Hospital Admin" : "Receptionist Portal"}</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Request Triage
          </div>

          <button
            type="button"
            onClick={() => onTabChange("appointments")}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left",
              activeTab === "appointments"
                ? "bg-teal-600/20 text-teal-300 border border-teal-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Appointments</span>
            </div>
            {newAppointmentsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white animate-pulse">
                {newAppointmentsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange("second-opinions")}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left",
              activeTab === "second-opinions"
                ? "bg-teal-600/20 text-teal-300 border border-teal-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            )}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Second Opinions</span>
            </div>
            {newSecondOpinionsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white animate-pulse">
                {newSecondOpinionsCount}
              </span>
            )}
          </button>

          {/* Doctor Management Tab - Admin Only */}
          {userRole === "admin" && (
            <>
              <div className="px-3 pt-5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Staff & Operations
              </div>

              <button
                type="button"
                onClick={() => onTabChange("doctors")}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left",
                  activeTab === "doctors"
                    ? "bg-teal-600/20 text-teal-300 border border-teal-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>Doctor Management</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Admin
                </span>
              </button>
            </>
          )}

          <div className="px-3 pt-5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Portals & Links
          </div>

          <Link
            href="/doctor"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Doctor PWA</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </Link>

          <Link
            href="/patient"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Building className="w-4 h-4 text-teal-400" />
              <span>Patient Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </Link>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Public Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
          </Link>
        </nav>
      </div>

      {/* Staff Profile & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
            {staffEmail[0]?.toUpperCase() || "S"}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{staffEmail}</div>
            <div className="text-[10px] text-teal-400 font-semibold uppercase">{userRole}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-950/50 hover:text-red-300 text-slate-400 text-xs font-semibold border border-slate-700/80 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
