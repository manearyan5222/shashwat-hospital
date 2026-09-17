"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import {
  PatientRecord,
  VisitRecord,
  TreatmentNoteRecord,
  PatientReportRecord,
} from "@/types/database";
import {
  User,
  Phone,
  Calendar,
  FileText,
  PlusCircle,
  Clock,
  ChevronLeft,
  Download,
  AlertCircle,
  CheckCircle2,
  Lock,
  ExternalLink,
  ShieldCheck,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DoctorPatientRecordDetailPage() {
  const params = useParams();
  const patientId = params?.id as string;

  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [notes, setNotes] = useState<TreatmentNoteRecord[]>([]);
  const [reports, setReports] = useState<PatientReportRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Note Modal state
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [isAmendment, setIsAmendment] = useState(false);
  const [originalNoteId, setOriginalNoteId] = useState<string | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string>("");
  const [newNoteText, setNewNoteText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchRecord = async () => {
    if (!patientId) return;
    try {
      const res = await fetch(`/api/doctor/patients/${patientId}`);
      if (res.ok) {
        const data = await res.json();
        setPatient(data.patient);
        setVisits(data.visits || []);
        setNotes(data.notes || []);
        setReports(data.reports || []);
        if (data.visits && data.visits.length > 0) {
          setSelectedVisitId(data.visits[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load patient record:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [patientId]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedVisitId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/doctor/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAmendment,
          originalNoteId,
          visitId: selectedVisitId,
          doctorId: "doc-joint-1",
          doctorName: "Dr. Senior Joint Specialist",
          noteText: newNoteText.trim(),
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setNewNoteText("");
        setIsAmendment(false);
        setOriginalNoteId(null);
        setTimeout(() => {
          setSubmitSuccess(false);
          setNoteModalOpen(false);
        }, 1200);
        fetchRecord();
      }
    } catch (err) {
      console.error("Failed to append note:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAmendmentModal = (note: TreatmentNoteRecord) => {
    setIsAmendment(true);
    setOriginalNoteId(note.id);
    setSelectedVisitId(note.visit_id);
    setNewNoteText("");
    setNoteModalOpen(true);
  };

  if (isLoading) {
    return (
      <DoctorLayout>
        <div className="py-20 text-center text-slate-400 text-sm">
          Loading clinical timeline...
        </div>
      </DoctorLayout>
    );
  }

  if (!patient) {
    return (
      <DoctorLayout>
        <div className="py-20 text-center space-y-3">
          <p className="text-slate-400 text-sm">Patient record not found or access expired.</p>
          <Link href="/doctor/patients" className="text-cyan-400 font-bold text-xs hover:underline">
            Back to Patients Directory
          </Link>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/doctor/patients"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Assigned Patients</span>
        </Link>

        {/* Patient Profile Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-700 flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-lg">
                {patient.full_name[0]?.toUpperCase() || "P"}
              </div>
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-white">
                  {patient.full_name}
                </h1>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                  <span>DOB: {patient.date_of_birth || "Not specified"}</span>
                  <span>•</span>
                  <span>Gender: {patient.gender || "Not specified"}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-mono font-semibold">ID: #{patient.id.slice(-6).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${patient.phone}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Patient ({patient.phone})</span>
            </a>
          </div>
        </div>

        {/* Clinical Tabs: Visits & Treatment Notes Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Consultation History & Treatment Notes</span>
            </h2>

            <button
              type="button"
              onClick={() => {
                setIsAmendment(false);
                setOriginalNoteId(null);
                setNewNoteText("");
                setNoteModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Clinical Note</span>
            </button>
          </div>

          <div className="space-y-4">
            {visits.length > 0 ? (
              visits.map((visit) => {
                const visitNotes = notes.filter((n) => n.visit_id === visit.id);
                return (
                  <div
                    key={visit.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                            {visit.visit_type}
                          </span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs font-semibold text-slate-300">
                            {visit.visit_date}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white">
                          Diagnosis: {visit.diagnosis || "Consultation in Progress"}
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        Physician: {visit.doctor_name || "Treating Consultant"}
                      </div>
                    </div>

                    {/* Notes under this visit */}
                    <div className="space-y-3">
                      {visitNotes.length > 0 ? (
                        visitNotes.map((note) => (
                          <div
                            key={note.id}
                            className={cn(
                              "p-4 rounded-2xl text-xs space-y-2",
                              note.is_amendment
                                ? "bg-amber-950/30 border border-amber-800/40 text-amber-200"
                                : "bg-slate-950/80 border border-slate-800 text-slate-200"
                            )}
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="font-semibold text-slate-300">
                                {note.is_amendment ? "⚠️ Official Amendment" : "Clinical Note"} · {note.doctor_name}
                              </span>
                              <span>
                                {new Date(note.created_at).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })}
                              </span>
                            </div>

                            <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs">
                              {note.note_text}
                            </p>

                            {!note.is_amendment && (
                              <div className="pt-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => openAmendmentModal(note)}
                                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 hover:underline"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Append Amendment</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-500 italic">No notes recorded for this visit yet.</div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl text-center text-slate-400 text-xs">
                No past visit records found. Click &ldquo;Add Clinical Note&rdquo; to record your consultation.
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Reports Section (Signed URLs) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Diagnostic Scans & Lab Reports</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reports.length > 0 ? (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-white text-xs truncate">
                      {rep.report_type || rep.file_name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Uploaded: {new Date(rep.uploaded_at).toLocaleDateString("en-IN")}
                    </div>
                  </div>

                  <a
                    href={rep.signed_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-900/60 text-cyan-300 border border-slate-700 transition-colors shrink-0 flex items-center gap-1 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View</span>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center text-slate-400 text-xs">
                No lab scans or radiological reports attached.
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Action for Mobile */}
        <div className="sm:hidden fixed bottom-16 inset-x-4 z-30">
          <button
            type="button"
            onClick={() => {
              setIsAmendment(false);
              setOriginalNoteId(null);
              setNewNoteText("");
              setNoteModalOpen(true);
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-2xl flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Clinical Note / Amendment</span>
          </button>
        </div>

        {/* Append-Only Note / Amendment Modal */}
        {noteModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                  {isAmendment ? "Append Amendment" : "New Clinical Entry"}
                </span>
                <h3 className="text-lg font-heading font-bold text-white">
                  {isAmendment ? "Add Official Note Amendment" : "Record Treatment Note"}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isAmendment
                    ? "Clinical notes are immutable. Amendments are permanently appended as addenda."
                    : "Notes are permanently recorded and cannot be altered or deleted once submitted."}
                </p>
              </div>

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Clinical note recorded successfully.</span>
                </div>
              )}

              <form onSubmit={handleCreateNote} className="space-y-4 text-xs">
                {!isAmendment && (
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
                      Associate with Visit
                    </label>
                    <select
                      required
                      value={selectedVisitId}
                      onChange={(e) => setSelectedVisitId(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500"
                    >
                      {visits.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.visit_date} — {v.diagnosis || v.visit_type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
                    {isAmendment ? "Amendment Text & Clinical Reason" : "Treatment Plan & Clinical Notes"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={
                      isAmendment
                        ? "State the medical amendment and rationale (e.g. 'Switched medication due to allergy...')"
                        : "Enter physical examination findings, joint range of motion, recommended surgical/physio protocol..."
                    }
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-cyan-500 placeholder-slate-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNoteModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? "Recording..." : isAmendment ? "Save Amendment" : "Commit Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}
