import { NextResponse } from "next/server";
import { triageAppointmentToPatient } from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, doctorId, staffId } = body;

    if (!appointmentId) {
      return NextResponse.json({ message: "Appointment ID is required." }, { status: 400 });
    }

    const { patient, appointment } = await triageAppointmentToPatient(appointmentId, doctorId);

    await logAuditEvent({
      actorId: staffId || null,
      action: "triage_appointment_to_patient",
      targetTable: "patients",
      targetId: patient.id,
    });

    return NextResponse.json({
      success: true,
      message: "Appointment successfully triaged into clinical patient record.",
      patient,
      appointment,
    });
  } catch (error) {
    secureLog("error", "Failed to triage appointment", error);
    return NextResponse.json({ message: "Triage operation failed" }, { status: 500 });
  }
}
