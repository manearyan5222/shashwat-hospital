import { NextResponse } from "next/server";
import {
  getDoctorsList,
  assignDoctorPatientAccess,
  revokeDoctorPatientAccess,
  getPatients,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export async function GET() {
  try {
    const doctors = await getDoctorsList();
    const patients = await getPatients();

    return NextResponse.json({
      success: true,
      doctors,
      patients,
    });
  } catch (error) {
    secureLog("error", "Failed to fetch doctors list", error);
    return NextResponse.json({ message: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, doctorId, patientId, adminId } = body;

    if (!doctorId || !patientId) {
      return NextResponse.json({ message: "Doctor ID and Patient ID are required." }, { status: 400 });
    }

    if (action === "assign") {
      await assignDoctorPatientAccess(doctorId, patientId, adminId);
      await logAuditEvent({
        actorId: adminId || null,
        action: "assign_doctor_access",
        targetTable: "doctor_patient_access",
        targetId: patientId,
      });
      return NextResponse.json({ success: true, message: "Doctor assigned successfully." });
    } else if (action === "revoke") {
      await revokeDoctorPatientAccess(doctorId, patientId);
      await logAuditEvent({
        actorId: adminId || null,
        action: "revoke_doctor_access",
        targetTable: "doctor_patient_access",
        targetId: patientId,
      });
      return NextResponse.json({ success: true, message: "Doctor access revoked." });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    secureLog("error", "Doctor patient access update failed", error);
    return NextResponse.json({ message: "Operation failed" }, { status: 500 });
  }
}
