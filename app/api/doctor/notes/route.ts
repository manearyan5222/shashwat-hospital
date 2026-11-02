import { NextResponse } from "next/server";
import { getAuthenticatedDoctor, verifyDoctorPatientAccess } from "@/lib/supabase/auth-helper";
import {
  createTreatmentNote,
  createTreatmentAmendment,
  getVisitById,
  getTreatmentNotesByVisitId,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const doctorAuth = await getAuthenticatedDoctor(request);
    if (!doctorAuth) {
      return NextResponse.json(
        { message: "Doctor authentication required to record clinical notes." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { isAmendment, originalNoteId, visitId, noteText } = body;

    if (!visitId || !noteText || typeof noteText !== "string" || noteText.trim().length < 3) {
      return NextResponse.json(
        { message: "Valid Visit ID and note content are required." },
        { status: 400 }
      );
    }

    const doctorId = doctorAuth.doctorId;
    const doctorName = doctorAuth.doctorName;

    // 1. Mandatory server-side clinical visit verification
    const visit = await getVisitById(visitId);
    if (!visit) {
      return NextResponse.json(
        { message: "Clinical visit record not found." },
        { status: 404 }
      );
    }

    // 2. Strict authorization: verify doctor is assigned to this patient or is treating doctor
    const isTreatingDoctor = visit.doctor_id === doctorId;
    const isAssignedDoctor = await verifyDoctorPatientAccess(doctorId, visit.patient_id);

    if (!isTreatingDoctor && !isAssignedDoctor) {
      secureLog(
        "warn",
        `Doctor ${doctorId} unauthorized note insertion attempt for patient ${visit.patient_id}`
      );
      return NextResponse.json(
        { message: "Access denied. You do not have assigned clinical access to treat this patient." },
        { status: 403 }
      );
    }

    // 3. For amendments, verify original note exists and belongs to this visit
    if (isAmendment && originalNoteId) {
      const visitNotes = await getTreatmentNotesByVisitId(visitId);
      const originalExists = visitNotes.some((n) => n.id === originalNoteId);
      if (!originalExists) {
        return NextResponse.json(
          { message: "Original clinical note to be amended was not found for this visit." },
          { status: 404 }
        );
      }
    }

    let result;
    if (isAmendment && originalNoteId) {
      result = await createTreatmentAmendment(
        originalNoteId,
        visitId,
        doctorId,
        doctorName,
        noteText.trim()
      );
      await logAuditEvent({
        actorId: doctorId,
        action: "create_treatment_amendment",
        targetTable: "treatment_notes",
        targetId: result.id,
      });
    } else {
      result = await createTreatmentNote({
        visit_id: visitId,
        doctor_id: doctorId,
        doctor_name: doctorName,
        note_text: noteText.trim(),
      });
      await logAuditEvent({
        actorId: doctorId,
        action: "create_treatment_note",
        targetTable: "treatment_notes",
        targetId: result.id,
      });
    }

    return NextResponse.json({
      success: true,
      message: isAmendment ? "Amendment appended successfully." : "Treatment note recorded.",
      note: result,
    });
  } catch (error) {
    secureLog("error", "Error creating treatment note", error);
    return NextResponse.json({ message: "Failed to record clinical note" }, { status: 500 });
  }
}
