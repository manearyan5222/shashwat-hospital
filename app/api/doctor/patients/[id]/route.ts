import { NextResponse } from "next/server";
import { getAuthenticatedDoctor, verifyDoctorPatientAccess } from "@/lib/supabase/auth-helper";
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
    // 1. Mandatory server-side doctor session authentication
    const doctorAuth = await getAuthenticatedDoctor(request);
    if (!doctorAuth) {
      secureLog("warn", "Unauthorized access attempt to doctor patient record API");
      return NextResponse.json(
        { message: "Doctor authentication required." },
        { status: 401 }
      );
    }

    const patientId = params.id;

    // 2. Strict authorization: verify doctor is assigned to this patient in doctor_patient_access
    const isAssigned = await verifyDoctorPatientAccess(doctorAuth.doctorId, patientId);
    if (!isAssigned) {
      secureLog("warn", `Doctor ${doctorAuth.doctorId} attempted unauthorized access to unassigned patient ${patientId}`);
      return NextResponse.json(
        { message: "Access denied. You do not have assigned clinical access to this patient record." },
        { status: 403 }
      );
    }

    const patient = await getPatientById(patientId);
    if (!patient) {
      return NextResponse.json({ message: "Patient record not found." }, { status: 404 });
    }

    const visits = await getVisitsByPatientId(patientId);
    const notes = await getTreatmentNotesByPatientId(patientId);
    const reports = await getPatientReports(patientId);

    // 3. Generate signed URLs for diagnostic reports
    const reportsWithSignedUrls = await Promise.all(
      reports.map(async (r) => {
        const signedUrl = await generateSignedReportUrl(r.file_url);
        return {
          ...r,
          signed_url: signedUrl,
        };
      })
    );

    // 4. Compliance audit log
    await logAuditEvent({
      actorId: doctorAuth.doctorId,
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
