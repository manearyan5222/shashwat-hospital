"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PatientRecord,
  VisitRecord,
  TreatmentNoteRecord,
  PatientReportRecord,
} from "@/types/database";
import {
  HeartPulse,
  Calendar,
  FileText,
  Download,
  LogOut,
  User,
  ShieldCheck,
  Building,
  Phone,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function PatientDashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [notes, setNotes] = useState<TreatmentNoteRecord[]>([]);
  const [reports, setReports] = useState<PatientReportRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatientPortalData = async () => {
      try {
        const stored = localStorage.getItem("shashwat_patient_user");
        let patientId = "pat-1001";
        if (stored) {
          const userObj = JSON.parse(stored);
          if (userObj.patientId) patientId = userObj.patientId;
        }

        const res = await fetch(`/api/patient/portal?patientId=${patientId}`);
        if (res.ok) {
          const data = await res.json();
          setPatient(data.patient);
          setVisits(data.visits || []);
          setNotes(data.notes || []);
          setReports(data.reports || []);
        }
      } catch (err) {
        console.error("Patient portal load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPatientPortalData();
  }, []);

  const handleLogout = () => {
    document.cookie = "shashwat_patient_session=; path=/; max-age=0";
    localStorage.removeItem("shashwat_patient_user");
    router.push("/patient/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Patient Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md">
              <HeartPulse className="w-7 h-7 text-teal-100" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-teal-700">
                Shashwat Hospital · Patient Portal
              </div>
              <div className="text-xl font-heading font-bold text-slate-900">
                My Health Records
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-bold text-slate-900">{patient?.full_name || "Patient"}</div>
              <div className="text-xs text-slate-500 font-mono">{patient?.phone}</div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold text-xs border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Patient Greeting & Status Banner */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Personal Healthcare Record
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Welcome, {patient?.full_name || "Patient"}
            </h1>
            <p className="text-sm text-slate-600 max-w-xl">
              Here you can review summaries of your consultations at Shashwat Hospital, view doctor notes, and access official diagnostic test reports.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-xs space-y-1 sm:w-64 shrink-0">
            <div className="font-bold text-teal-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Verified Hospital Record</span>
            </div>
            <div className="text-slate-600">Patient ID: <span className="font-mono font-bold">{patient?.id.slice(-6).toUpperCase()}</span></div>
            <div className="text-slate-600">Total Visits on File: <span className="font-bold text-teal-900">{visits.length}</span></div>
          </div>
        </div>

        {/* Section 1: Clinical Consultations & Treatment History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-700" />
              <span>Consultations & Visit History</span>
            </h2>
          </div>

          <div className="space-y-4">
            {visits.length > 0 ? (
              visits.map((visit) => {
                const visitNotes = notes.filter((n) => n.visit_id === visit.id);
                return (
                  <div
                    key={visit.id}
                    className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                          {visit.visit_type} · {visit.visit_date}
                        </div>
                        <div className="text-lg font-bold text-slate-900 mt-0.5">
                          {visit.diagnosis || "Orthopaedic Consultation"}
                        </div>
                      </div>

                      <div className="text-xs text-slate-500">
                        Treating Consultant: <span className="font-bold text-slate-800">{visit.doctor_name || "Specialist Surgeon"}</span>
                      </div>
                    </div>

                    {/* Doctor Advice & Notes */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Doctor&apos;s Treatment Advice & Plan
                      </div>

                      {visitNotes.length > 0 ? (
                        visitNotes.map((note) => (
                          <div
                            key={note.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed"
                          >
                            <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">
                              <span className="font-semibold text-teal-800">{note.doctor_name}</span>
                              <span>{new Date(note.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                            </div>
                            <p className="whitespace-pre-wrap">{note.note_text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500 italic">No notes attached to this consultation.</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center text-slate-500 text-sm">
                No past consultations recorded on this account yet.
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Medical Reports & Digital Scans */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-700" />
            <span>Diagnostic Scans & Medical Reports</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reports.length > 0 ? (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">
                      {rep.report_type || rep.file_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Uploaded on {new Date(rep.uploaded_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </div>
                  </div>

                  <a
                    href={rep.signed_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white border border-slate-200 p-8 rounded-3xl text-center text-slate-500 text-sm">
                No digital scans or lab reports available.
              </div>
            )}
          </div>
        </div>

        {/* Hospital Contact Info Footer */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">Shashwat Hospital · Nerul, Navi Mumbai</p>
          <p>For urgent questions regarding your records or appointment schedule, contact the hospital desk.</p>
        </div>
      </main>
    </div>
  );
}
