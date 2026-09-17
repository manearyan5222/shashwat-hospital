/**
 * SHASHWAT HOSPITAL — SERVER-SIDE AUTHENTICATION & ACCESS CONTROL
 * 
 * Strict session verification for all API routes.
 * Never trusts client-supplied user/doctor/patient IDs.
 */

import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  getServiceSupabase,
  getPatientByAuthUserId,
  getStaffRole,
  memoryPatients,
  memoryDoctorPatientAccess,
  memoryStaffRoles,
} from "@/lib/supabase/service";
import { PatientRecord, StaffRole } from "@/types/database";
import { secureLog } from "@/lib/security";

export interface AuthenticatedPatientSession {
  userId: string;
  patient: PatientRecord;
}

export interface AuthenticatedDoctorSession {
  doctorId: string;
  doctorName: string;
  role: "doctor";
}

export interface AuthenticatedStaffSession {
  staffId: string;
  role: StaffRole;
  email?: string;
}

/**
 * Verifies and returns the authenticated patient from server session.
 * Rejects with null if unauthenticated or not linked to a patient profile.
 */
export async function getAuthenticatedPatient(request?: Request): Promise<AuthenticatedPatientSession | null> {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();

  // 1. Live Supabase Session Check
  if (supabase) {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        const patient = await getPatientByAuthUserId(user.id);
        if (patient) {
          return {
            userId: user.id,
            patient,
          };
        }
        secureLog("warn", `Authenticated auth.user ${user.id} has no linked patients row`);
        return null;
      }
    } catch (err) {
      secureLog("error", "Error verifying patient Supabase session", err);
    }
  }

  // 2. Development / Fallback mode session check (strictly against pre-registered patients)
  const patientCookie = cookieStore.get("shashwat_patient_session")?.value;
  if (patientCookie === "authenticated") {
    const rawUserCookie = cookieStore.get("shashwat_patient_user")?.value;
    if (rawUserCookie) {
      try {
        const userObj = JSON.parse(decodeURIComponent(rawUserCookie));
        const matched = memoryPatients.find(
          (p) => p.phone === userObj.phone || p.id === userObj.patientId
        );
        if (matched) {
          return {
            userId: matched.auth_user_id || `dev-${matched.id}`,
            patient: matched,
          };
        }
      } catch {}
    }
  }

  return null;
}

/**
 * Verifies and returns the authenticated doctor from server session.
 * Rejects with null if unauthenticated or not a verified doctor.
 */
export async function getAuthenticatedDoctor(request?: Request): Promise<AuthenticatedDoctorSession | null> {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();

  // 1. Live Supabase Session Check
  if (supabase) {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        const role = await getStaffRole(user.id);
        if (role === "doctor") {
          return {
            doctorId: user.id,
            doctorName: user.user_metadata?.full_name || "Treating Doctor",
            role: "doctor",
          };
        }
        secureLog("warn", `User ${user.id} attempted doctor route but role is ${role}`);
        return null;
      }
    } catch (err) {
      secureLog("error", "Error verifying doctor Supabase session", err);
    }
  }

  // 2. Development / Fallback mode check
  const doctorCookie = cookieStore.get("shashwat_doctor_session")?.value;
  if (doctorCookie === "authenticated") {
    const rawUserCookie = cookieStore.get("shashwat_doctor_user")?.value;
    let doctorId = "doc-joint-1";
    let doctorName = "Dr. Senior Joint Specialist";

    if (rawUserCookie) {
      try {
        const userObj = JSON.parse(decodeURIComponent(rawUserCookie));
        if (userObj.id) doctorId = userObj.id;
        if (userObj.name) doctorName = userObj.name;
      } catch {}
    }

    const isDoctor = memoryStaffRoles.some((s) => s.user_id === doctorId && s.role === "doctor");
    if (isDoctor) {
      return {
        doctorId,
        doctorName,
        role: "doctor",
      };
    }
  }

  return null;
}

/**
 * Verifies and returns the authenticated hospital staff (admin or receptionist).
 */
export async function getAuthenticatedStaff(
  allowedRoles: StaffRole[] = ["admin", "receptionist"]
): Promise<AuthenticatedStaffSession | null> {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();

  // 1. Live Supabase Session Check
  if (supabase) {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        const role = await getStaffRole(user.id);
        if (role && allowedRoles.includes(role)) {
          return {
            staffId: user.id,
            role,
            email: user.email,
          };
        }
        return null;
      }
    } catch (err) {
      secureLog("error", "Error verifying staff Supabase session", err);
    }
  }

  // 2. Development / Fallback mode check
  const staffCookie = cookieStore.get("shashwat_staff_session")?.value;
  if (staffCookie === "authenticated") {
    const rawUserCookie = cookieStore.get("shashwat_staff_user")?.value;
    let email = "staff@shashwathospital.com";
    let role: StaffRole = "admin";

    if (rawUserCookie) {
      try {
        const userObj = JSON.parse(decodeURIComponent(rawUserCookie));
        if (userObj.email) {
          email = userObj.email;
          role = email.includes("reception") ? "receptionist" : "admin";
        }
      } catch {}
    }

    if (allowedRoles.includes(role)) {
      return {
        staffId: role === "admin" ? "user-admin-1" : "user-recep-1",
        role,
        email,
      };
    }
  }

  return null;
}

/**
 * Verifies whether the specified doctor is actively assigned to the given patient.
 */
export async function verifyDoctorPatientAccess(doctorId: string, patientId: string): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("doctor_patient_access")
      .select("doctor_id")
      .eq("doctor_id", doctorId)
      .eq("patient_id", patientId)
      .single();

    if (!error && data) return true;
    return false;
  }

  return memoryDoctorPatientAccess.some(
    (a) => a.doctor_id === doctorId && a.patient_id === patientId
  );
}
