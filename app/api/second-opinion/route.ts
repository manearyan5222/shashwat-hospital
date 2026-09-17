import { NextResponse } from "next/server";
import { insertSecondOpinion } from "@/lib/supabase/service";

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

    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientEmail,
      conditionCategory,
      priorDiagnosis,
      reportsSummary,
      reportFileUrl,
    } = body;

    if (!patientName || typeof patientName !== "string" || patientName.trim().length < 2) {
      return NextResponse.json(
        { message: "Patient name is required." },
        { status: 400 }
      );
    }

    const cleanedPhone = (patientPhone || "").replace(/[^0-9]/g, "");
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { message: "A valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    const sanitized = {
      patient_name: patientName.trim().slice(0, 100),
      patient_phone: cleanedPhone.slice(0, 15),
      patient_email: (patientEmail || "").trim().slice(0, 100) || null,
      condition_category: String(conditionCategory || "General").slice(0, 50),
      prior_diagnosis: (priorDiagnosis || "").trim().slice(0, 300) || null,
      reports_summary: (reportsSummary || "").trim().slice(0, 500) || null,
      report_file_url: reportFileUrl ? String(reportFileUrl).slice(0, 500) : null,
      status: "new" as const,
      staff_notes: null,
    };

    const savedRecord = await insertSecondOpinion(sanitized);

    return NextResponse.json(
      {
        success: true,
        message: "Your second opinion request has been received. Our clinical coordinator will contact you.",
        referenceId: `SO-${savedRecord.id.slice(-6).toUpperCase()}`,
        id: savedRecord.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Second opinion submission error:", error);
    return NextResponse.json(
      { message: "Unable to submit second opinion request." },
      { status: 500 }
    );
  }
}
