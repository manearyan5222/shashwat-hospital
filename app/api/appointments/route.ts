import { NextResponse } from "next/server";

// Simple in-memory rate limiting map for basic spam protection
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 5;

    const rateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
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
    rateLimitMap.set(ip, rateData);

    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientEmail,
      departmentId,
      doctorId,
      preferredDate,
      preferredTime,
      symptomsDescription,
    } = body;

    // Server-side validation
    if (!patientName || typeof patientName !== "string" || patientName.trim().length < 2) {
      return NextResponse.json(
        { message: "A valid patient name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const cleanedPhone = (patientPhone || "").replace(/[^0-9]/g, "");
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { message: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!departmentId) {
      return NextResponse.json(
        { message: "Department selection is required." },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      patientName: patientName.trim().slice(0, 100),
      patientPhone: cleanedPhone.slice(0, 15),
      patientEmail: (patientEmail || "").trim().slice(0, 100),
      departmentId: String(departmentId).slice(0, 50),
      doctorId: String(doctorId || "any").slice(0, 50),
      preferredDate: String(preferredDate || "").slice(0, 20),
      preferredTime: String(preferredTime || "").slice(0, 30),
      symptomsDescription: (symptomsDescription || "").trim().slice(0, 500),
      receivedAt: new Date().toISOString(),
    };

    // Return safe confirmation acknowledgment
    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been received. Hospital staff will contact you to confirm availability.",
        referenceId: `SH-${Date.now().toString().slice(-6)}`,
        data: {
          patientName: sanitizedData.patientName,
          preferredDate: sanitizedData.preferredDate,
          preferredTime: sanitizedData.preferredTime,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
