import { NextResponse } from "next/server";
import { triageAppointmentToPatient, toPublicPatient } from "@/lib/supabase/service";
import { getAuthenticatedStaff } from "@/lib/supabase/auth-helper";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const staffAuth = await getAuthenticatedStaff(["admin"]);
    if (!staffAuth) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const body = await request.json();
    const { appointmentId, doctorId } = body;

    if (!appointmentId) {
      return NextResponse.json({ message: "Appointment ID is required." }, { status: 400 });
    }

    const { patient, appointment } = await triageAppointmentToPatient(appointmentId, doctorId);

    await logAuditEvent({
      actorId: staffAuth.staffId,
      action: "triage_appointment_to_patient",
      targetTable: "patients",
      targetId: patient.id,
    });

    return NextResponse.json({
      success: true,
      message: "Appointment successfully triaged into clinical patient record.",
      patient: toPublicPatient(patient),
      appointment,
    });
  } catch (error) {
    secureLog("error", "Failed to triage appointment", error);
    return NextResponse.json({ message: "Triage operation failed" }, { status: 500 });
  }
}
