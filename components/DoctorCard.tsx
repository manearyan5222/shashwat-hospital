import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Doctor } from "@/data/doctors";
import { User } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const hasVerifiedPhoto =
    doctor.imageUrl &&
    doctor.imageUrl !== "VERIFY_WITH_HOSPITAL" &&
    doctor.imageUrl.trim() !== "";

  const hasVerifiedExp =
    typeof doctor.experienceYears === "number" &&
    doctor.experienceYears > 0;

  const qualificationsStr = doctor.qualifications.filter(
    (q) => q !== "VERIFY_WITH_HOSPITAL"
  ).join(", ");

  return (
    <div className="group bg-white rounded-[10px] border border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:shadow-[0_2px_8px_rgba(11,37,69,0.06)] flex flex-col justify-between">
      {/* Photo Top 1:1 Aspect Ratio */}
      <div className="relative aspect-square w-full bg-[#F1F5F9] overflow-hidden rounded-t-[10px]">
        {hasVerifiedPhoto ? (
          <Image
            src={doctor.imageUrl}
            alt={`${doctor.salutation} ${doctor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-[#F1F5F9]">
            <User className="w-16 h-16 opacity-40" strokeWidth={1.5} />
            <span className="text-xs text-slate-400 mt-2 font-medium">Orthopaedic Specialist</span>
          </div>
        )}
      </div>

      {/* Content Area with 20px padding */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-[18px] font-semibold text-[#0F172A] leading-snug">
            {doctor.salutation} {doctor.name}
          </h3>

          <div className="text-[14px] text-[#64748B] space-y-0.5">
            {qualificationsStr && <p className="font-medium">{qualificationsStr}</p>}
            <p>{doctor.specializationSummary || doctor.departmentName}</p>
          </div>

          {/* Experience line: only render if verified number */}
          {hasVerifiedExp && (
            <p className="text-[13px] font-medium text-[#0E7490] pt-1">
              {doctor.experienceYears} years experience
            </p>
          )}
        </div>

        {/* Buttons: stacked on mobile / side-by-side on desktop */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="w-full py-2.5 px-3 rounded-[8px] border-[1.5px] border-[#0B2545] text-[#0B2545] text-xs font-semibold text-center hover:bg-[#0B2545]/[0.06] transition-colors flex items-center justify-center"
          >
            View Profile
          </Link>
          <Link
            href={`/appointment?doctor=${doctor.id}`}
            className="w-full py-2.5 px-3 rounded-[8px] bg-[#0B2545] text-white text-xs font-semibold text-center hover:bg-[#07192f] transition-colors flex items-center justify-center shadow-sm"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
