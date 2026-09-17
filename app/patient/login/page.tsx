"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Phone, ArrowRight, AlertCircle, HeartPulse } from "lucide-react";

function PatientLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/patient/dashboard";

  const [phone, setPhone] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const cleanedPhone = phone.replace(/[^0-9]/g, "");
      if (cleanedPhone.length < 10) {
        setErrorMessage("Please enter a valid 10-digit mobile number.");
        setIsLoading(false);
        return;
      }

      // Patient session setup
      document.cookie = `shashwat_patient_session=authenticated; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      localStorage.setItem(
        "shashwat_patient_user",
        JSON.stringify({
          phone: cleanedPhone,
          name: patientName.trim() || "Ramesh M. Patil",
          patientId: "pat-1001",
        })
      );
      router.push(redirectTarget);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to access patient portal.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fillSamplePatient = () => {
    setPhone("9820123456");
    setPatientName("Ramesh M. Patil");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-900/10">
            <HeartPulse className="w-9 h-9 text-teal-100" />
          </div>
        </div>

        <div className="mt-5 text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Patient Portal
          </h1>
          <p className="text-base text-slate-600">
            View your consultation notes, visit history, and medical reports.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-slate-200 py-8 px-6 sm:px-10 rounded-3xl shadow-xl space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Registered Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98201 23456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-slate-900 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Patient Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Ramesh M. Patil"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-slate-900 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-all shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base shadow-lg shadow-teal-900/10 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Accessing Records...</span>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={fillSamplePatient}
              className="text-sm font-semibold text-teal-700 hover:text-teal-800 hover:underline"
            >
              Fill Sample Patient Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 text-sm">
          Loading Patient Portal...
        </div>
      }
    >
      <PatientLoginForm />
    </Suspense>
  );
}
