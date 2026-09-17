import { NextResponse } from "next/server";
import { insertAppointment } from "@/lib/supabase/service";
import { sendStaffEmailNotification } from "@/lib/notifications/email";
import { sendWhatsAppNotification } from "@/lib/notifications/whatsapp";
import { secureLog } from "@/lib/security";

// Simple in-memory rate limiting map for basic spam protection
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 10;

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
      patient_name: patientName.trim().slice(0, 100),
      patient_phone: cleanedPhone.slice(0, 15),
      patient_email: (patientEmail || "").trim().slice(0, 100) || null,
      department_id: String(departmentId).slice(0, 50),
      doctor_id: doctorId && doctorId !== "any-available" ? String(doctorId).slice(0, 50) : null,
      preferred_date: String(preferredDate || "").slice(0, 20),
      preferred_time: String(preferredTime || "").slice(0, 30),
      symptoms_description: (symptomsDescription || "").trim().slice(0, 500) || null,
      status: "new" as const,
      patient_id: null,
      staff_notes: null,
    };

    // Insert into Supabase / persistent data layer
    const savedRecord = await insertAppointment(sanitizedData);
    const referenceId = `SH-${savedRecord.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`;

    // Trigger Notifications asynchronously
    try {
      // 1. WhatsApp notification to patient / staff desk
      await sendWhatsAppNotification({
        recipientPhone: sanitizedData.patient_phone,
        patientName: sanitizedData.patient_name,
        departmentName: sanitizedData.department_id,
        preferredDate: sanitizedData.preferred_date || "Upcoming OPD",
        referenceId,
      });

      // 2. Email alert to hospital triage team
      await sendStaffEmailNotification({
        to: process.env.HOSPITAL_ALERT_EMAIL || "appointments@shashwathospital.com",
        subject: `New Appointment Request — ${referenceId} (${sanitizedData.department_id})`,
        patientName: sanitizedData.patient_name,
        departmentName: sanitizedData.department_id,
        doctorName: sanitizedData.doctor_id || "Any Available Specialist",
        details: `Requested Date: ${sanitizedData.preferred_date} (${sanitizedData.preferred_time}). Patient Contact: ${sanitizedData.patient_phone}. Symptoms: ${sanitizedData.symptoms_description || "None specified"}.`,
        actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://shashwathospital.com"}/admin/dashboard`,
      });
    } catch (notifErr) {
      secureLog("warn", "Non-blocking notification dispatch issue", notifErr);
    }

    // Return safe confirmation acknowledgment with record ID
    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been received. Hospital staff will contact you to confirm availability.",
        referenceId,
        id: savedRecord.id,
        data: {
          patientName: savedRecord.patient_name,
          preferredDate: savedRecord.preferred_date,
          preferredTime: savedRecord.preferred_time,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    secureLog("error", "Appointment submission error", error);
    return NextResponse.json(
      { message: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
