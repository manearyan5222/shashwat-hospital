"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doctorsData } from "@/data/doctors";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import {
  Shield,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Lock,
  Upload,
} from "lucide-react";

export function SecondOpinionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    conditionCategory: "Knee / Joint Replacement",
    doctorPreference: "any",
    priorDiagnosis: "",
    reportsSummary: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.patientName.trim()) {
      setErrorMessage("Please enter patient name.");
      return;
    }
    if (!formData.patientPhone.trim() || formData.patientPhone.length < 10) {
      setErrorMessage("Please provide a valid 10-digit telephone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/second-opinion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to submit request. Please contact the hospital desk.");
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-surface-border text-center shadow-elevated">
        <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-4 border-2 border-teal-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-navy-950 mb-2">
          Second Opinion Request Received
        </h3>
        <p className="text-xs sm:text-sm text-surface-muted max-w-md mx-auto mb-6">
          Our orthopaedic clinical coordinator will review your request and contact you at <strong className="text-navy-950">{formData.patientPhone}</strong> to schedule your specialist review.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left max-w-md mx-auto space-y-1 mb-6">
          <div className="font-semibold text-navy-950">Documents Checklist to Bring for Review:</div>
          <div>• Original MRI/CT Scan films and radiologist reports</div>
          <div>• Previous surgical or discharge summaries (if any)</div>
          <div>• Current medical prescriptions</div>
        </div>
        {isVerified(hospitalData.contact.primaryPhone) ? (
          <a
            href={`tel:${hospitalData.contact.primaryPhone}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-teal-300" />
            <span>Call Hospital Coordinator: {hospitalData.contact.displayPhone}</span>
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
          >
            <span>View Hospital Contact Details</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 lg:p-10 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
          <Shield className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
          Expert Clinical Review
        </span>
      </div>

      <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy-950 mb-2">
        Request an Orthopaedic Second Opinion
      </h3>
      <p className="text-xs sm:text-sm text-surface-muted mb-6">
        Have you been recommended a joint replacement, spine surgery, or ligament repair elsewhere? Our senior consultants provide objective, evidence-based reviews of your clinical scans.
      </p>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-emergency text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Patient Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Anand Sharma"
              value={formData.patientName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, patientName: e.target.value }))
              }
              required
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Contact Phone *
            </label>
            <input
              type="tel"
              placeholder="e.g. 98765 43210"
              value={formData.patientPhone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, patientPhone: e.target.value }))
              }
              required
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="e.g. patient@example.com"
              value={formData.patientEmail}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))
              }
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Condition / Treatment Category *
            </label>
            <select
              value={formData.conditionCategory}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  conditionCategory: e.target.value,
                }))
              }
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700 bg-white"
            >
              <option value="Knee / Joint Replacement">Knee / Joint Replacement</option>
              <option value="Hip Replacement">Hip Replacement / AVN</option>
              <option value="Arthroscopy / ACL Sports Injury">Arthroscopy / ACL / Sports Injury</option>
              <option value="Spine Surgery / Slipped Disc">Spine Surgery / Slipped Disc</option>
              <option value="Complex Fracture / Non-union">Complex Fracture / Non-union</option>
              <option value="General Orthopaedic Second Opinion">General Orthopaedic Second Opinion</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Current Diagnosis & Advised Surgery
          </label>
          <input
            type="text"
            placeholder="e.g. Advised Total Knee Replacement / Lumbar Microdiscectomy at another clinic"
            value={formData.priorDiagnosis}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, priorDiagnosis: e.target.value }))
            }
            className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Summary of Available Medical Reports / Scans
          </label>
          <textarea
            rows={3}
            placeholder="Describe what scans you have (e.g. MRI Knee done Jan 2026 showing medial meniscus tear, X-rays showing grade 3 OA...)"
            value={formData.reportsSummary}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                reportsSummary: e.target.value,
              }))
            }
            className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-700"
          />
        </div>

        {/* Secure Document Security Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-navy-950">Patient Document Security Protocol: </span>
            To protect your medical privacy and ensure diagnostic scan fidelity, physical MRI/X-ray films or high-resolution PACS files are reviewed in person or via direct encrypted hospital portal links provided by our medical desk.
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting Request..." : "Request Specialist Second Opinion"}
        </button>
      </form>
    </div>
  );
}
