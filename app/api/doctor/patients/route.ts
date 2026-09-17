import { NextResponse } from "next/server";
import { getAuthenticatedDoctor } from "@/lib/supabase/auth-helper";
import { getAssignedPatientsForDoctor, getAppointments } from "@/lib/supabase/service";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const doctorAuth = await getAuthenticatedDoctor(request);
    if (!doctorAuth) {
      return NextResponse.json(
        { message: "Doctor authentication required." },
        { status: 401 }
      );
    }

    const doctorId = doctorAuth.doctorId;
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
