import { NextResponse } from "next/server";
import { insertSecondOpinion, getServiceSupabase } from "@/lib/supabase/service";
import { sendStaffEmailNotification } from "@/lib/notifications/email";
import { sendWhatsAppNotification } from "@/lib/notifications/whatsapp";
import { secureLog } from "@/lib/security";

const secondOpinionRateMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 10;

    const rateData = secondOpinionRateMap.get(ip) || { count: 0, timestamp: now };
    if (now - rateData.timestamp < windowMs) {
      if (rateData.count >= maxRequests) {
        return NextResponse.json(
          { message: "Too many requests. Please wait a minute before submitting again." },
          { status: 429 }
        );
      }
      rateData.count++;
    } else {
      rateData.count = 1;
      rateData.timestamp = now;
    }
    secondOpinionRateMap.set(ip, rateData);

    const contentType = request.headers.get("content-type") || "";
    let patientName = "";
    let patientPhone = "";
    let patientEmail = "";
    let conditionCategory = "";
    let priorDiagnosis = "";
    let reportsSummary = "";
    let reportFileUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      patientName = (formData.get("patientName") as string) || "";
      patientPhone = (formData.get("patientPhone") as string) || "";
      patientEmail = (formData.get("patientEmail") as string) || "";
      conditionCategory = (formData.get("conditionCategory") as string) || "";
      priorDiagnosis = (formData.get("priorDiagnosis") as string) || "";
      reportsSummary = (formData.get("reportsSummary") as string) || "";

      const file = formData.get("reportFile") as File | null;
      if (file && file.size > 0) {
        // Validate 10MB limit
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { message: "File size exceeds the 10MB limit. Please upload a smaller scan or PDF." },
            { status: 400 }
          );
        }

        // Validate MIME type: PDF or Images only
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { message: "Invalid file type. Only PDF and medical image files (JPEG, PNG, WebP) are accepted." },
            { status: 400 }
          );
        }

        // Upload to private Supabase Storage bucket
        const supabase = getServiceSupabase();
        const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const filePath = `second-opinion-intake/${safeFileName}`;

        if (supabase) {
          const fileBuffer = await file.arrayBuffer();
          const { error: uploadError } = await supabase.storage
            .from("second-opinion-reports")
            .upload(filePath, fileBuffer, {
              contentType: file.type,
              upsert: false,
            });

          if (!uploadError) {
            reportFileUrl = `second-opinion-reports/${filePath}`;
          } else {
            secureLog("error", "Failed uploading report to private storage", uploadError);
          }
        } else {
          // Dev fallback storage path
          reportFileUrl = `patient-reports/intake/${safeFileName}`;
        }
      }
    } else {
      const body = await request.json();
      patientName = body.patientName;
      patientPhone = body.patientPhone;
      patientEmail = body.patientEmail;
      conditionCategory = body.conditionCategory;
      priorDiagnosis = body.priorDiagnosis;
      reportsSummary = body.reportsSummary;
      reportFileUrl = body.reportFileUrl || null;
    }

    if (!patientName || typeof patientName !== "string" || patientName.trim().length < 2) {
      return NextResponse.json(
        { message: "Patient name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const cleanedPhone = (patientPhone || "").replace(/[^0-9]/g, "");
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { message: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    const sanitized = {
      patient_name: patientName.trim().slice(0, 100),
      patient_phone: cleanedPhone.slice(0, 15),
      patient_email: (patientEmail || "").trim().slice(0, 100) || null,
      condition_category: String(conditionCategory || "Orthopaedic Second Opinion").slice(0, 50),
      prior_diagnosis: (priorDiagnosis || "").trim().slice(0, 300) || null,
      reports_summary: (reportsSummary || "").trim().slice(0, 500) || null,
      report_file_url: reportFileUrl ? String(reportFileUrl).slice(0, 500) : null,
      status: "new" as const,
      staff_notes: null,
    };

    const savedRecord = await insertSecondOpinion(sanitized);
    const referenceId = `SO-${savedRecord.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`;

    // Trigger Notifications
    try {
      await sendWhatsAppNotification({
        recipientPhone: sanitized.patient_phone,
        patientName: sanitized.patient_name,
        departmentName: `Second Opinion: ${sanitized.condition_category}`,
        preferredDate: "Senior Case Review",
        referenceId,
      });

      await sendStaffEmailNotification({
        to: process.env.HOSPITAL_ALERT_EMAIL || "secondopinions@shashwathospital.com",
        subject: `New Second-Opinion Review Request — ${referenceId}`,
        patientName: sanitized.patient_name,
        departmentName: sanitized.condition_category,
        details: `Prior Diagnosis: ${sanitized.prior_diagnosis || "Not provided"}. Report Summary: ${sanitized.reports_summary || "None"}. Attachment: ${reportFileUrl ? "Yes (Stored in private bucket)" : "None"}. Contact: ${sanitized.patient_phone}.`,
        actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://shashwathospital.com"}/admin/dashboard?tab=second-opinions`,
      });
    } catch (notifErr) {
      secureLog("warn", "Non-blocking notification dispatch issue", notifErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your second opinion request has been received. Our senior clinical coordinator will review your history and contact you.",
        referenceId,
        id: savedRecord.id,
      },
      { status: 200 }
    );
  } catch (error) {
    secureLog("error", "Second opinion submission error", error);
    return NextResponse.json(
      { message: "Unable to submit second opinion request." },
      { status: 500 }
    );
  }
}
