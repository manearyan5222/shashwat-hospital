"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Building2,
  CheckCircle2,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/admin/dashboard";

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
        // Authenticate via Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setErrorMessage(error.message || "Invalid staff credentials.");
          setIsLoading(false);
          return;
        }

        if (data.user) {
          router.push(redirectTarget);
          return;
        }
      } else {
        // Fallback staff authentication for preview / local development mode
        if (email.trim() && password.length >= 4) {
          // Set cookie for middleware access
          document.cookie = `shashwat_staff_session=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          localStorage.setItem("shashwat_staff_user", JSON.stringify({ email: email.trim() }));
          router.push(redirectTarget);
          return;
        } else {
          setErrorMessage("Please enter your staff email and password.");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoStaff = () => {
    setEmail("staff@shashwathospital.com");
    setPassword("HospitalStaff2026!");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0E7490_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-600/20 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#0E7490] border-2 border-teal-400/40 flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-xl shadow-teal-950/50">
            S
          </div>
        </div>

        <div className="mt-4 text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Staff Triage Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Shashwat Hospital · Nerul, Navi Mumbai
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 py-8 px-6 sm:px-10 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Authorized hospital personnel access only.</span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/60 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="e.g. staff@shashwathospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Staff...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="pt-4 border-t border-slate-700/60 text-center space-y-2">
            <p className="text-[11px] text-slate-400">
              Staff accounts are created in the Supabase Dashboard.
            </p>
            <button
              type="button"
              onClick={fillDemoStaff}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 hover:underline"
            >
              Fill Sample Staff Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 text-sm">
          Loading Staff Portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
