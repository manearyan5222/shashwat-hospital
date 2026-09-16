"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doctorsData, Doctor } from "@/data/doctors";
import { isVerified } from "@/lib/verify";
import { ArrowRight, CheckCircle2, User, Calendar, Stethoscope, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const concernOptions = [
  { id: "Knee", label: "Knee Pain & Degeneration", symptomKey: "Knee Pain" },
  { id: "Hip", label: "Hip Pain & Stiffness", symptomKey: "Hip Pain" },
  { id: "Shoulder", label: "Shoulder Pain & Weakness", symptomKey: "Shoulder Pain" },
  { id: "Spine", label: "Back Pain, Neck Pain & Sciatica", symptomKey: "Back Pain" },
  { id: "Sports Injury", label: "Sports Injuries & Ligament Tears", symptomKey: "Sports Injury" },
  { id: "Fracture", label: "Fractures & Trauma Care", symptomKey: "Fracture" },
  { id: "Joint Pain", label: "General Joint Pain & Arthritis", symptomKey: "Joint Stiffness" },
  { id: "Physiotherapy", label: "Physiotherapy & Rehabilitation", symptomKey: "Post-Surgery Recovery" },
];

export function DoctorFinder() {
  const [selectedConcern, setSelectedConcern] = useState<string>("Knee");

  // Match doctors based strictly on verified configured data
  const matchingDoctors = doctorsData.filter((doc) =>
    doc.symptomsTreated.some(
      (s) =>
        s.toLowerCase().includes(selectedConcern.toLowerCase()) ||
        (selectedConcern === "Knee" && s.toLowerCase().includes("knee")) ||
        (selectedConcern === "Hip" && s.toLowerCase().includes("hip")) ||
        (selectedConcern === "Spine" && (s.toLowerCase().includes("back") || s.toLowerCase().includes("spine") || s.toLowerCase().includes("sciatica"))) ||
        (selectedConcern === "Sports Injury" && s.toLowerCase().includes("sports")) ||
        (selectedConcern === "Fracture" && (s.toLowerCase().includes("fracture") || s.toLowerCase().includes("trauma"))) ||
        (selectedConcern === "Physiotherapy" && (s.toLowerCase().includes("recovery") || s.toLowerCase().includes("stiffness") || s.toLowerCase().includes("weakness")))
    )
  );

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-elevated p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
          <Stethoscope className="w-5 h-5" />
        </div>
        <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
          Specialist Matcher
        </span>
      </div>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-950 mb-2">
        Find the Right Specialist for Your Care
      </h3>
      <p className="text-sm text-surface-muted mb-6">
        Select the area or concern you are experiencing. We will connect you directly with the appropriate clinical team.
      </p>

      {/* Symptom / Area Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {concernOptions.map((option) => {
          const isSelected = selectedConcern === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedConcern(option.id)}
              className={cn(
                "p-3 rounded-xl text-left border transition-all text-xs sm:text-sm font-medium flex flex-col justify-between h-20",
                isSelected
                  ? "bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-teal-500/50"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              )}
            >
              <span>{option.label}</span>
              <div className="flex items-center justify-between text-[11px] opacity-80 pt-1">
                <span>Select</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recommended Specialists Based on Central Data */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recommended Consultants for: <span className="text-navy-950 font-bold">{selectedConcern}</span>
          </div>
          <span className="text-xs text-slate-400">
            {matchingDoctors.length} {matchingDoctors.length === 1 ? "Specialist" : "Specialists"} Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-surface-border bg-surface-bg/50 hover:bg-white hover:border-teal-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold text-lg shrink-0 border border-navy-200">
                  <User className="w-6 h-6 text-navy-700" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-navy-950">
                    {doc.salutation} {doc.name}
                  </h4>
                  <p className="text-xs text-teal-800 font-medium">{doc.designation}</p>
                  {doc.qualifications.filter(isVerified).length > 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      {doc.qualifications.filter(isVerified).join(" • ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-xs">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="font-semibold text-navy-900 hover:text-teal-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={`/appointment?doctor=${doc.id}`}
                  className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-white font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book OPD</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
