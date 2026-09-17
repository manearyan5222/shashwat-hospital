import { NextResponse } from "next/server";
import { getAuthenticatedPatient } from "@/lib/supabase/auth-helper";
import {
  getVisitsByPatientId,
  getTreatmentNotesByPatientId,
  getPatientReports,
  generateSignedReportUrl,
  toPublicPatient,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. Mandatory server-side patient session authentication
    const authSession = await getAuthenticatedPatient(request);
    if (!authSession) {
      secureLog("warn", "Unauthorized access attempt to patient portal API");
      return NextResponse.json(
        { message: "Authentication required. Please sign in to view your health records." },
        { status: 401 }
      );
    }

    // 2. Data source of truth is strictly the authenticated patient's profile
    const patient = authSession.patient;
    const patientId = patient.id;

    // 3. Retrieve clinical encounters, treatment notes, and medical reports
    const visits = await getVisitsByPatientId(patientId);
    const notes = await getTreatmentNotesByPatientId(patientId);
    const reports = await getPatientReports(patientId);

    // 4. Generate signed report download URLs
    const reportsWithSignedUrls = await Promise.all(
      reports.map(async (r) => {
        const signedUrl = await generateSignedReportUrl(r.file_url);
        return {
          ...r,
          signed_url: signedUrl,
        };
      })
    );

    // 5. Compliance Audit Log
    await logAuditEvent({
      actorId: authSession.userId,
      action: "read_treatment_notes",
      targetTable: "patients",
      targetId: patientId,
    });

    return NextResponse.json({
      success: true,
      patient: toPublicPatient(patient),
      visits,
      notes,
      reports: reportsWithSignedUrls,
    });
  } catch (error) {
    secureLog("error", "Error in patient portal API", error);
    return NextResponse.json({ message: "Failed to load patient portal records" }, { status: 500 });
  }
}
