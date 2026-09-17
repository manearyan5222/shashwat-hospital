import { NextResponse } from "next/server";
import {
  getPatientById,
  getVisitsByPatientId,
  getTreatmentNotesByPatientId,
  getPatientReports,
  generateSignedReportUrl,
} from "@/lib/supabase/service";
import { logAuditEvent } from "@/lib/audit";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    const patient = await getPatientById(patientId);
    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    const visits = await getVisitsByPatientId(patientId);
    const notes = await getTreatmentNotesByPatientId(patientId);
    const reports = await getPatientReports(patientId);

    // Generate signed download URLs for reports
    const reportsWithSignedUrls = await Promise.all(
      reports.map(async (r) => {
        const signedUrl = await generateSignedReportUrl(r.file_url);
        return {
          ...r,
          signed_url: signedUrl,
        };
      })
    );

    // Record audit event for reading clinical history and reports
    await logAuditEvent({
      actorId: doctorId || null,
      action: "view_patient_history",
      targetTable: "patients",
      targetId: patientId,
    });

    return NextResponse.json({
      success: true,
      patient,
      visits,
      notes,
      reports: reportsWithSignedUrls,
    });
  } catch (error) {
    secureLog("error", "Error fetching patient clinical record", error);
    return NextResponse.json({ message: "Failed to fetch patient records" }, { status: 500 });
  }
}
