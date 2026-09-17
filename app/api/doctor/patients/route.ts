import { NextResponse } from "next/server";
import { getAssignedPatientsForDoctor, getAppointments } from "@/lib/supabase/service";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId") || "doc-joint-1"; // Default to logged in doctor

    const patients = await getAssignedPatientsForDoctor(doctorId);
    const appointments = await getAppointments();
    const doctorAppointments = appointments.filter((a) => a.doctor_id === doctorId || !a.doctor_id);

    return NextResponse.json({
      success: true,
      patients,
      appointments: doctorAppointments,
    });
  } catch (error) {
    secureLog("error", "Failed to fetch doctor patients", error);
    return NextResponse.json({ message: "Failed to fetch patients" }, { status: 500 });
  }
}
