import { NextResponse } from "next/server";
import { getAppointments, getSecondOpinions } from "@/lib/supabase/service";
import { getAuthenticatedStaff } from "@/lib/supabase/auth-helper";
import { DashboardStats } from "@/types/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const staffAuth = await getAuthenticatedStaff(["admin", "receptionist"]);
    if (!staffAuth) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const appointments = await getAppointments();
    const secondOpinions = await getSecondOpinions();

    const stats: DashboardStats = {
      totalAppointments: appointments.length,
      totalSecondOpinions: secondOpinions.length,
      newAppointments: appointments.filter((a) => a.status === "new").length,
      newSecondOpinions: secondOpinions.filter((so) => so.status === "new").length,
      contactedCount:
        appointments.filter((a) => a.status === "contacted").length +
        secondOpinions.filter((so) => so.status === "contacted").length,
      confirmedCount:
        appointments.filter((a) => a.status === "confirmed").length +
        secondOpinions.filter((so) => so.status === "confirmed").length,
      closedCount:
        appointments.filter((a) => a.status === "closed").length +
        secondOpinions.filter((so) => so.status === "closed").length,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ message: "Failed to load stats." }, { status: 500 });
  }
}
