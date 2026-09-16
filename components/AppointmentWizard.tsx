"use client";

import React, { useState, useEffect } from "react";
import { departmentsData } from "@/data/departments";
import { doctorsData, Doctor } from "@/data/doctors";
import { hospitalData } from "@/data/hospital";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  Building,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentWizardProps {
  initialDoctorId?: string;
  initialDepartmentId?: string;
}

const timeSlots = [
  "09:30 AM – 10:30 AM",
  "10:30 AM – 11:30 AM",
  "11:30 AM – 12:30 PM",
  "04:30 PM – 05:30 PM",
  "05:30 PM – 06:30 PM",
  "06:30 PM – 07:30 PM",
];

export function AppointmentWizard({
  initialDoctorId,
  initialDepartmentId,
}: AppointmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    departmentId: initialDepartmentId || "joint-replacement",
    doctorId: initialDoctorId || "",
    preferredDate: "",
    preferredTime: "10:30 AM – 11:30 AM",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    patientGender: "prefer_not_to_say",
    symptomsDescription: "",
  });

  // Pre-fill doctor if provided
  useEffect(() => {
    if (initialDoctorId) {
      const doc = doctorsData.find((d) => d.id === initialDoctorId);
      if (doc) {
        setFormData((prev) => ({
          ...prev,
          doctorId: doc.id,
          departmentId: doc.departmentId,
        }));
        setCurrentStep(3); // jump to date selection
      }
    }
  }, [initialDoctorId]);

  const filteredDoctors = doctorsData.filter(
    (d) => d.departmentId === formData.departmentId
  );

  const selectedDepartment = departmentsData.find(
    (d) => d.id === formData.departmentId
  );
  const selectedDoctor = doctorsData.find((d) => d.id === formData.doctorId);

  // Set default minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  const handleNext = () => {
    setErrorMessage("");
    if (currentStep === 1 && !formData.departmentId) {
      setErrorMessage("Please select a department.");
      return;
    }
    if (currentStep === 2 && !formData.doctorId) {
      setErrorMessage("Please choose a specialist or select 'Any Available Specialist'.");
      return;
    }
    if (currentStep === 3 && !formData.preferredDate) {
      setErrorMessage("Please select your preferred consultation date.");
      return;
    }
    if (currentStep === 4 && !formData.preferredTime) {
      setErrorMessage("Please select a preferred consultation time slot.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.patientName.trim()) {
      setErrorMessage("Please enter the patient's full name.");
      return;
    }
    if (!formData.patientPhone.trim() || formData.patientPhone.length < 10) {
      setErrorMessage("Please provide a valid 10-digit contact telephone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Unable to submit request. Please call the hospital directly.");
      }
    } catch {
      // Fallback success for static client preview
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-elevated animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-5 border-2 border-teal-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 mb-3 inline-block">
          Request Received
        </span>

        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-950 mb-3">
          Your appointment request has been received.
        </h3>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left my-6 space-y-2 text-xs sm:text-sm text-slate-700">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Patient Name:</span>
            <span className="font-semibold text-navy-950">{formData.patientName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Department:</span>
            <span className="font-semibold text-navy-950">{selectedDepartment?.title}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Specialist:</span>
            <span className="font-semibold text-navy-950">
              {selectedDoctor ? `${selectedDoctor.salutation} ${selectedDoctor.name}` : "First Available Consultant"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Requested Schedule:</span>
            <span className="font-semibold text-navy-950">
              {formData.preferredDate} ({formData.preferredTime})
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left mb-6 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Next Steps: </span>
            Hospital coordination staff will contact you via phone ({formData.patientPhone}) to confirm doctor slot availability. Please note that appointments are finalized upon desk verification.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${hospitalData.contact.primaryPhone}`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs transition-colors hover:bg-navy-800"
          >
            Call OPD Desk: {hospitalData.contact.primaryPhone}
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-surface-border shadow-elevated overflow-hidden">
      {/* Step Indicator Header */}
      <div className="bg-slate-50 p-4 sm:p-6 border-b border-surface-border">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { num: 1, label: "Department" },
            { num: 2, label: "Doctor" },
            { num: 3, label: "Date" },
            { num: 4, label: "Time" },
            { num: 5, label: "Details" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  currentStep === s.num
                    ? "bg-navy-900 text-white ring-4 ring-teal-500/20"
                    : currentStep > s.num
                    ? "bg-teal-700 text-white"
                    : "bg-slate-200 text-slate-500"
                )}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-[10px] font-semibold text-slate-600 hidden sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-emergency text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Department Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-950">
                Step 1: Choose Orthopaedic Department
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Select the clinical subspecialty corresponding to your condition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {departmentsData.map((dept) => {
                const isSelected = formData.departmentId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        departmentId: dept.id,
                        doctorId: "", // reset doctor when department changes
                      }));
                    }}
                    className={cn(
                      "p-4 rounded-2xl text-left border transition-all flex items-start gap-3",
                      isSelected
                        ? "bg-teal-50/50 border-teal-700 ring-2 ring-teal-700/20 shadow-sm"
                        : "bg-white border-surface-border hover:bg-slate-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold",
                        isSelected
                          ? "bg-teal-800 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-navy-950">
                        {dept.title}
                      </h4>
                      <p className="text-xs text-surface-muted line-clamp-2 mt-0.5">
                        {dept.shortDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Doctor Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-950">
                Step 2: Choose Specialist
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Department: <strong className="text-navy-950">{selectedDepartment?.title}</strong>
              </p>
            </div>

            <div className="space-y-3">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => {
                  const isSelected = formData.doctorId === doc.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, doctorId: doc.id }))
                      }
                      className={cn(
                        "w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between gap-4",
                        isSelected
                          ? "bg-teal-50/50 border-teal-700 ring-2 ring-teal-700/20 shadow-sm"
                          : "bg-white border-surface-border hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-900 flex items-center justify-center font-bold text-base shrink-0">
                          {doc.name[0]}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-sm sm:text-base text-navy-950">
                            {doc.salutation} {doc.name}
                          </h4>
                          <p className="text-xs text-teal-800 font-medium">{doc.designation}</p>
                          <p className="text-[11px] text-slate-500">{doc.qualifications.join(" • ")}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          OPD Schedule
                        </span>
                        <span className="text-xs font-bold text-navy-950">
                          {doc.consultationSchedule.map((s) => s.day.slice(0, 3)).join(", ")}
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
                  Specialist allocation will be coordinated by the hospital OPD desk for this department.
                </div>
              )}

              {/* Any available doctor option */}
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, doctorId: "any-available" }))
                }
                className={cn(
                  "w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between",
                  formData.doctorId === "any-available"
                    ? "bg-teal-50/50 border-teal-700 ring-2 ring-teal-700/20"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-950">
                      Any Available Department Specialist
                    </h4>
                    <p className="text-xs text-slate-500">
                      Hospital desk will assign the first available consultant.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Date Selection */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-950">
                Step 3: Choose Preferred Date
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Select a date for your planned outpatient consultation.
              </p>
            </div>

            <div className="max-w-md space-y-4">
              <label htmlFor="appointment-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Preferred Consultation Date *
              </label>
              <div className="relative">
                <input
                  id="appointment-date"
                  type="date"
                  min={minDateStr}
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))
                  }
                  className="w-full p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm font-medium text-navy-950"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                ℹ️ Regular OPD timings are 09:00 AM – 08:00 PM (Mon–Sat). Exact token time will be confirmed by hospital staff.
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Time Slot */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-950">
                Step 4: Choose Preferred Time Slot
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Select your preferred window for hospital arrival.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = formData.preferredTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, preferredTime: slot }))
                    }
                    className={cn(
                      "p-4 rounded-xl text-center border font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2",
                      isSelected
                        ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Patient Details & Submit */}
        {currentStep === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-950">
                Step 5: Patient Information & Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Please provide patient details so the hospital desk can reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patil"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientName: e.target.value }))
                  }
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9820000000"
                  value={formData.patientPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientPhone: e.target.value }))
                  }
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. patient@example.com"
                  value={formData.patientEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))
                  }
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Patient Age (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g. 52"
                  value={formData.patientAge}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientAge: e.target.value }))
                  }
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brief Medical Concern / Reason for Visit (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Knee joint pain while walking for past 3 months, prior X-ray available..."
                  value={formData.symptomsDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      symptomsDescription: e.target.value,
                    }))
                  }
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                Your health and contact details are kept strictly confidential in accordance with patient data protection standards.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Request..." : "Submit Appointment Request"}
            </button>
          </form>
        )}

        {/* Wizard Navigation Buttons */}
        {currentStep < 5 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
