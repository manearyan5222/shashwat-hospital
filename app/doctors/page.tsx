"use client";

import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { DoctorCard } from "@/components/DoctorCard";
import { DoctorFinder } from "@/components/DoctorFinder";
import { CTASection } from "@/components/CTASection";
import { doctorsData, Doctor } from "@/data/doctors";
import { departmentsData } from "@/data/departments";
import { Search, Filter, Stethoscope, UserCheck, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.areasOfExpertise.some((e) =>
        e.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDept =
      selectedDepartment === "ALL" || doc.departmentId === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumbs items={[{ label: "Doctors & Specialists" }]} />

        {/* Hero */}
        <div className="mt-6 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Specialist Medical Team</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Meet Our Orthopaedic Specialists in Nerul
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            Our team comprises experienced orthopaedic surgeons, sports medicine consultants, spine specialists, and rehabilitation experts dedicated to patient-first care.
          </p>
        </div>

        {/* Search & Department Filter Toolbar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty (e.g. Knee, Spine, ACL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 text-navy-950"
              />
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-5 relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white text-navy-950"
              >
                <option value="ALL">All Clinical Subspecialties</option>
                {departmentsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? "Specialist" : "Specialists"}
            </span>
            {(searchQuery || selectedDepartment !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDepartment("ALL");
                }}
                className="text-teal-800 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <Stethoscope className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-navy-950">
              No specialists match your search criteria.
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or contact our hospital OPD desk directly for appointment assistance.
            </p>
          </div>
        )}

        {/* Interactive Doctor Finder Component */}
        <div className="pt-8">
          <DoctorFinder />
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Book an Outpatient Consultation"
            subtitle="Connect with our orthopaedic consultants in Nerul, Navi Mumbai for personalized joint and spine assessment."
          />
        </div>
      </Container>
    </div>
  );
}
