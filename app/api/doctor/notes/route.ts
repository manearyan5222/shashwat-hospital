import { NextResponse } from "next/server";
import { getAuthenticatedDoctor } from "@/lib/supabase/auth-helper";
import {
  createTreatmentNote,
  createTreatmentAmendment,
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
