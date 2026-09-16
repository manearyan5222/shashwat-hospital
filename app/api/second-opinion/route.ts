import { NextResponse } from "next/server";

const secondOpinionRateMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 5;

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
      patientName: patientName.trim().slice(0, 100),
      patientPhone: cleanedPhone.slice(0, 15),
      patientEmail: (patientEmail || "").trim().slice(0, 100),
      conditionCategory: String(conditionCategory || "General").slice(0, 50),
      priorDiagnosis: (priorDiagnosis || "").trim().slice(0, 300),
      reportsSummary: (reportsSummary || "").trim().slice(0, 500),
      submittedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Your second opinion request has been received. Our clinical coordinator will contact you.",
        referenceId: `SO-${Date.now().toString().slice(-6)}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to submit second opinion request." },
      { status: 500 }
    );
  }
}
