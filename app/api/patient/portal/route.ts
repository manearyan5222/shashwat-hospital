import { NextResponse } from "next/server";
import {
  getPatientByAuthUserId,
  getPatientById,
  getVisitsByPatientId,
  getTreatmentNotesByPatientId,
  getPatientReports,
  generateSignedReportUrl,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authUserId = searchParams.get("authUserId");
    const patientId = searchParams.get("patientId") || "pat-1001"; // Fallback to sample patient in dev

    let patient = null;
    if (authUserId) {
      patient = await getPatientByAuthUserId(authUserId);
    }
    if (!patient && patientId) {
      patient = await getPatientById(patientId);
    }

    if (!patient) {
      return NextResponse.json({ message: "Patient profile not found" }, { status: 404 });
    }

    const visits = await getVisitsByPatientId(patient.id);
    const notes = await getTreatmentNotesByPatientId(patient.id);
    const reports = await getPatientReports(patient.id);

    const reportsWithSignedUrls = await Promise.all(
      reports.map(async (r) => {
        const signedUrl = await generateSignedReportUrl(r.file_url);
        return {
          ...r,
          signed_url: signedUrl,
        };
      })
    );

    // Audit log read by patient
    await logAuditEvent({
      actorId: authUserId || patient.id,
      action: "read_treatment_notes",
      targetTable: "patients",
      targetId: patient.id,
    });

    return NextResponse.json({
      success: true,
      patient,
      visits,
      notes,
      reports: reportsWithSignedUrls,
    });
  } catch (error) {
    secureLog("error", "Error in patient portal API", error);
    return NextResponse.json({ message: "Failed to load patient portal records" }, { status: 500 });
  }
}
