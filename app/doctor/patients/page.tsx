"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { PatientRecord } from "@/types/database";
import { Users, Search, Phone, ChevronRight, Calendar, UserCheck } from "lucide-react";

export default function DoctorPatientsDirectoryPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/doctor/patients");
        if (res.ok) {
          const data = await res.json();
          setPatients(data.patients || []);
        }
      } catch (err) {
        console.error("Patients load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    return (
      !searchQuery ||
      p.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
    );
  });

  return (
    <DoctorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">
            Assigned Clinical Patients
          </h1>
          <p className="text-xs text-slate-400">
            Patients assigned to your consultation care and surgical oversight.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search assigned patient by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                href={`/doctor/patients/${patient.id}`}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-3xl space-y-3 transition-all group shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-base">
                      {patient.full_name[0]?.toUpperCase() || "P"}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {patient.full_name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">{patient.phone}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80 text-slate-400">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Gender / DOB</span>
                    <span className="text-slate-300 font-medium">
                      {patient.gender || "Not specified"} · {patient.date_of_birth || "DOB n/a"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Access Granted</span>
                    <span className="text-teal-400 font-medium flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 bg-slate-900/60 border border-slate-800 p-12 rounded-3xl text-center text-slate-400 text-sm">
              No patients found matching your search.
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
}
