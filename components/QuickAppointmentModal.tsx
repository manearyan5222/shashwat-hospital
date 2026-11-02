"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Calendar, Phone, Stethoscope, User, Copy, Check, AlertCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface QuickAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartment?: string;
}

export const QuickAppointmentModal: React.FC<QuickAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultDepartment = "orthopaedics",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState(defaultDepartment);
  const [preferredDate, setPreferredDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceToken, setReferenceToken] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter a valid patient name (minimum 2 characters).");
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: name.trim(),
          patientPhone: cleanPhone,
          departmentId: department,
          preferredDate: preferredDate || new Date().toISOString().split("T")[0],
          preferredTime: "Morning OPD (10:00 AM – 1:00 PM)",
          symptomsDescription: "Booked via Quick Priority OPD Modal",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const token = data.referenceId || `SH-${(data.id || "CONFIRMED").slice(0, 8).toUpperCase()}`;
        setReferenceToken(token);
        setIsSubmitted(true);

        // Fire confetti celebration on verified server confirmation
        try {
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#2DD4BF", "#0E7490", "#38BDF8", "#F59E0B"],
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        setErrorMessage(data.message || "Unable to reserve slot. Please call the hospital appointment desk directly.");
      }
    } catch {
      setErrorMessage("Network error connecting to booking service. Please verify your connection or call the hospital directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToken = () => {
    if (!referenceToken) return;
    navigator.clipboard.writeText(referenceToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    setErrorMessage("");
    setReferenceToken("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-teal-500/30 bg-[#0B172A]/95 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Instant Priority OPD Slot
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Consult a Specialist Surgeon
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Reserve your consultation slot at Shashwat Hospital, Nerul. Zero registration delay on arrival.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" />
                  <span>Patient Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Phone Number (10 Digits)</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9820123456"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                    <span>Specialty</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="orthopaedics">Joint & Orthopaedics</option>
                    <option value="arthroscopy">Sports & Arthroscopy</option>
                    <option value="spine">Spine & Back Care</option>
                    <option value="trauma">Fracture & Trauma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-xs text-slate-400">
                  Instant SMS confirmation sent. Emergency intake available 24/7.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-base hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Reserving Consultation Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Priority OPD Booking</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
                PRIORITY TOKEN #{referenceToken || "CONFIRMED"}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">
                Appointment Scheduled!
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                Thank you <strong className="text-white">{name}</strong>. Your priority consultation token for <strong className="text-teal-300 uppercase">{department}</strong> is locked in for <strong className="text-white">{preferredDate || "Upcoming OPD"}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-slate-300 truncate">
                CONFIRMATION TOKEN: {referenceToken || "SH-PENDING"}
              </span>
              <button
                onClick={copyToken}
                className="px-3 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 hover:bg-teal-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Save Token"}</span>
              </button>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
