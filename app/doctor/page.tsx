"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { AppointmentRecord, PatientRecord } from "@/types/database";
import {
  Calendar,
  Users,
  Clock,
  ChevronRight,
  Phone,
  Sparkles,
  AlertCircle,
  FileText,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DoctorHomePage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDoctorData = async () => {
      try {
        const res = await fetch("/api/doctor/patients");
        if (res.ok) {
          const data = await res.json();
          setPatients(data.patients || []);
          setAppointments(data.appointments || []);
        }
      } catch (err) {
        console.error("Doctor data load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDoctorData();
  }, []);

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-800/40 p-6 rounded-3xl relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
              Clinical Workspace
            </span>
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Today&apos;s Consultation Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Review assigned patient appointments, clinical visit history, and signed diagnostic reports.
            </p>
          </div>
          <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
            <Stethoscope className="w-40 h-40 text-cyan-400" />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Slots</div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1">{appointments.length}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Patients</div>
            <div className="text-2xl font-extrabold text-teal-400 mt-1">{patients.length}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl col-span-2 sm:col-span-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Triage Status</div>
            <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPD Active</span>
            </div>
          </div>
        </div>

        {/* Appointments Queue List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Upcoming Appointments</span>
            </h2>
            <Link
              href="/doctor/patients"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View All Patients</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all shadow-md"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{apt.patient_name}</span>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          apt.status === "new" && "bg-blue-900/60 text-blue-300 border border-blue-700/60",
                          apt.status === "confirmed" && "bg-emerald-900/60 text-emerald-300 border border-emerald-700/60",
                          apt.status === "contacted" && "bg-amber-900/60 text-amber-300 border border-amber-700/60"
                        )}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {apt.preferred_date} ({apt.preferred_time})
                      </span>
                      <span>Department: {apt.department_id}</span>
                    </div>

                    {apt.symptoms_description && (
                      <p className="text-xs text-slate-400 line-clamp-1 italic pt-1">
                        &ldquo;{apt.symptoms_description}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${apt.patient_phone}`}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Call Patient"
                    >
                      <Phone className="w-4 h-4" />
                    </a>

                    {apt.patient_id ? (
                      <Link
                        href={`/doctor/patients/${apt.patient_id}`}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>Open Record</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-[11px] text-slate-500 py-2 px-3">Pending staff triage</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl text-center text-slate-400 text-xs">
                No appointments scheduled for this slot.
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
