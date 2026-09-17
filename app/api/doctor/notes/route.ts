import { NextResponse } from "next/server";
import {
  createTreatmentNote,
  createTreatmentAmendment,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isAmendment, originalNoteId, visitId, doctorId, doctorName, noteText } = body;

    if (!visitId || !doctorId || !noteText || typeof noteText !== "string" || noteText.trim().length < 3) {
      return NextResponse.json(
        { message: "Visit ID, Doctor ID, and valid note text are required." },
        { status: 400 }
      );
    }

    let result;
    if (isAmendment && originalNoteId) {
      result = await createTreatmentAmendment(
        originalNoteId,
        visitId,
        doctorId,
        doctorName || "Treating Consultant",
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
        doctor_name: doctorName || "Treating Consultant",
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
