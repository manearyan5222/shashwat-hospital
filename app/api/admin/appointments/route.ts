import { NextResponse } from "next/server";
import { getAppointments, updateAppointmentStatus } from "@/lib/supabase/service";
import { RequestStatus } from "@/types/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    const data = await getAppointments({ status, search });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    return NextResponse.json({ message: "Failed to fetch appointments." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, staff_notes } = body;

    if (!id || !status) {
      return NextResponse.json({ message: "Appointment ID and status are required." }, { status: 400 });
    }

    const validStatuses: RequestStatus[] = ["new", "contacted", "confirmed", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }

    const success = await updateAppointmentStatus(id, status, staff_notes);
    if (!success) {
      return NextResponse.json({ message: "Record not found or could not be updated." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Appointment updated successfully." });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ message: "Failed to update appointment." }, { status: 500 });
  }
}
