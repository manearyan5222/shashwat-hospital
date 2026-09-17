"use client";

import React, { useState, useEffect } from "react";
import { AppointmentRecord, SecondOpinionRecord, RequestStatus } from "@/types/database";
import { departmentsData } from "@/data/departments";
import { doctorsData } from "@/data/doctors";
import {
  X,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building,
  FileText,
  CheckCircle2,
  AlertCircle,
  Save,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestDetailSlideOverProps {
  request: (AppointmentRecord & { type: "appointment" }) | (SecondOpinionRecord & { type: "second-opinion" }) | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, type: "appointment" | "second-opinion", newStatus: RequestStatus, notes?: string) => Promise<void>;
}

export function RequestDetailSlideOver({
  request,
  isOpen,
  onClose,
  onUpdateStatus,
}: RequestDetailSlideOverProps) {
  const [currentStatus, setCurrentStatus] = useState<RequestStatus>("new");
  const [staffNotes, setStaffNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (request) {
      setCurrentStatus(request.status);
      setStaffNotes(request.staff_notes || "");
      setSaveSuccess(false);
    }
  }, [request]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !request) return null;

  const isAppointment = request.type === "appointment";
  const apt = isAppointment ? (request as AppointmentRecord) : null;
  const so = !isAppointment ? (request as SecondOpinionRecord) : null;

  const department = apt ? departmentsData.find((d) => d.id === apt.department_id) : null;
  const doctor = apt && apt.doctor_id ? doctorsData.find((d) => d.id === apt.doctor_id) : null;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onUpdateStatus(request.id, request.type, currentStatus, staffNotes);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const whatsappMessage = isAppointment
    ? `Hello ${request.patient_name}, this is Shashwat Hospital regarding your orthopaedic appointment request for ${apt?.preferred_date} (${apt?.preferred_time}). We are reaching out to verify your slot.`
    : `Hello ${request.patient_name}, this is the Clinical Coordination Desk at Shashwat Hospital regarding your orthopaedic second opinion request.`;

  const whatsappUrl = `https://wa.me/91${request.patient_phone.replace(/[^0-9]/g, "").slice(-10)}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                  {isAppointment ? "Appointment Booking" : "Second Opinion Request"}
                </span>
                <span className="text-xs text-slate-400 font-mono">#{request.id.slice(-6).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-heading font-bold text-navy-950">
                {request.patient_name}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close detail panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
            {/* Quick Contact & Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${request.patient_phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Call Patient ({request.patient_phone})</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Message</span>
              </a>
            </div>

            {/* Patient Contact Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Patient Contact Information
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Phone Number</span>
                  <span className="font-bold text-navy-950">{request.patient_phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  <span className="font-bold text-navy-950">{request.patient_email || "Not Provided"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Submission Date</span>
                  <span className="font-medium text-slate-700">
                    {new Date(request.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Request Clinical Details */}
            {isAppointment && apt && (
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>Requested Appointment Slot</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Preferred Date</span>
                    <span className="font-bold text-navy-950">{apt.preferred_date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Time Window</span>
                    <span className="font-bold text-navy-950">{apt.preferred_time}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Department</span>
                    <span className="font-semibold text-teal-900">{department?.title || apt.department_id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Specialist</span>
                    <span className="font-semibold text-navy-950">
                      {doctor ? `${doctor.salutation} ${doctor.name}` : "Any Available Consultant"}
                    </span>
                  </div>
                </div>

                {apt.symptoms_description && (
                  <div className="pt-2 border-t border-teal-200/60">
                    <span className="text-xs font-bold text-navy-950 block mb-1">
                      Patient Symptoms & Visit Reason:
                    </span>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-teal-100 leading-relaxed">
                      {apt.symptoms_description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!isAppointment && so && (
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>Second Opinion Clinical Profile</span>
                </div>

                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-slate-500 block">Condition / Surgical Category:</span>
                    <span className="font-bold text-navy-950">{so.condition_category}</span>
                  </div>

                  {so.prior_diagnosis && (
                    <div>
                      <span className="text-slate-500 block">Prior Advised Surgery / Diagnosis:</span>
                      <p className="font-semibold text-navy-950 bg-white p-2.5 rounded-xl border border-teal-100 mt-0.5">
                        {so.prior_diagnosis}
                      </p>
                    </div>
                  )}

                  {so.reports_summary && (
                    <div>
                      <span className="text-slate-500 block">Available Reports Summary:</span>
                      <p className="text-slate-700 bg-white p-3 rounded-xl border border-teal-100 mt-0.5 leading-relaxed">
                        {so.reports_summary}
                      </p>
                    </div>
                  )}

                  {so.report_file_url && (
                    <div>
                      <span className="text-slate-500 block">Attached Patient Scan/File:</span>
                      <a
                        href={so.report_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-800 font-bold hover:underline mt-1"
                      >
                        <span>View Attached Medical Document</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Status & Staff Triage Workflow */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Triage Status
                </label>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border",
                    currentStatus === "new" && "bg-blue-50 text-blue-700 border-blue-200",
                    currentStatus === "contacted" && "bg-amber-50 text-amber-700 border-amber-200",
                    currentStatus === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                    currentStatus === "closed" && "bg-slate-100 text-slate-700 border-slate-200"
                  )}
                >
                  {currentStatus}
                </span>
              </div>

              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as RequestStatus)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-teal-700"
              >
                <option value="new">🔵 New (Needs Review / Initial Intake)</option>
                <option value="contacted">🟡 Contacted (Staff reached out to patient)</option>
                <option value="confirmed">🟢 Confirmed (Slot confirmed & scheduled in OPD)</option>
                <option value="closed">⚪ Closed (Completed or Cancelled)</option>
              </select>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Staff Internal Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Record patient interaction, doctor OPD slot allocation, or follow-up notes..."
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-700 bg-white"
                />
              </div>

              {saveSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Changes saved successfully.</span>
                </div>
              )}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back to List
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Triage Notes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
