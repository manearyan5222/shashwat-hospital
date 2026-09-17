"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Stethoscope, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

function DoctorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/doctor";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message || "Invalid doctor credentials.");
          setIsLoading(false);
          return;
        }

        if (data.user) {
          router.push(redirectTarget);
          return;
        }
      } else {
        // Fallback doctor session for development / preview mode
        if (email.trim() && password.length >= 4) {
          document.cookie = `shashwat_doctor_session=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          localStorage.setItem("shashwat_doctor_user", JSON.stringify({ email: email.trim(), id: "doc-joint-1", name: "Dr. Senior Joint Specialist" }));
          router.push(redirectTarget);
          return;
        } else {
          setErrorMessage("Please enter your doctor email and password.");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fillSampleDoctor = () => {
    setEmail("dr.joint@shashwathospital.com");
    setPassword("DoctorPass2026!");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0E7490_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#0E7490] border-2 border-cyan-400/40 flex items-center justify-center text-white shadow-xl shadow-cyan-950/50">
            <Stethoscope className="w-7 h-7 text-cyan-300" />
          </div>
        </div>

        <div className="mt-4 text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Doctor Clinical PWA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Shashwat Hospital · Assigned Patient Timeline & Notes
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Encrypted clinical portal for treating consultants only.</span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/60 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Doctor Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="e.g. dr.joint@shashwathospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Open Doctor Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <button
              type="button"
              onClick={fillSampleDoctor}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Fill Sample Doctor Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Loading Doctor Portal...
        </div>
      }
    >
      <DoctorLoginForm />
    </Suspense>
  );
}
