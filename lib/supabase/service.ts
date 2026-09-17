import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { AppointmentRecord, SecondOpinionRecord, RequestStatus } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return !!(
    supabaseUrl &&
    supabaseServiceKey &&
    !supabaseUrl.includes("your-project") &&
    supabaseUrl.startsWith("http")
  );
};

export function getServiceSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createSupabaseClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ---------------------------------------------------------------------------
// In-Memory Fallback Store for Local Development & Offline Preview
// ---------------------------------------------------------------------------
const memoryAppointments: AppointmentRecord[] = [
  {
    id: "apt-101",
    patient_name: "Ramesh M. Patil",
    patient_phone: "9820123456",
    patient_email: "ramesh.patil@example.com",
    department_id: "joint-replacement",
    doctor_id: "dr-consultant-ortho-joint",
    preferred_date: "2026-09-20",
    preferred_time: "10:30 AM – 11:30 AM",
    symptoms_description: "Severe bilateral knee pain while climbing stairs for past 6 months. Prior X-rays show grade 3 osteoarthritis.",
    status: "new",
    staff_notes: null,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45m ago
  },
  {
    id: "apt-102",
    patient_name: "Sneha G. Kulkarni",
    patient_phone: "9819987654",
    patient_email: "sneha.k@example.com",
    department_id: "arthroscopy-sports-medicine",
    doctor_id: "dr-arthroscopy-sports-specialist",
    preferred_date: "2026-09-21",
    preferred_time: "05:30 PM – 06:30 PM",
    symptoms_description: "Twisted right knee playing badminton. Sharp pain and popping sensation, mild swelling.",
    status: "contacted",
    staff_notes: "Called patient at 11:30 AM. Advised to bring recent MRI report. Confirmed arrival for Tuesday evening.",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3h ago
  },
  {
    id: "apt-103",
    patient_name: "Vijay Deshmukh",
    patient_phone: "9867012345",
    patient_email: "vijay.desh@example.com",
    department_id: "spine-care",
    doctor_id: "dr-spine-specialist",
    preferred_date: "2026-09-22",
    preferred_time: "06:00 PM – 07:00 PM",
    symptoms_description: "Lower back pain radiating down left calf (sciatica). Difficulty sitting for long work hours.",
    status: "confirmed",
    staff_notes: "OPD Slot booked with Dr. Spine Specialist. SMS confirmation sent.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

const memorySecondOpinions: SecondOpinionRecord[] = [
  {
    id: "so-201",
    patient_name: "Anand R. Sharma",
    patient_phone: "9833445566",
    patient_email: "anand.sharma@example.com",
    condition_category: "Knee / Joint Replacement",
    prior_diagnosis: "Advised immediate Total Knee Replacement by private clinic in Vashi.",
    reports_summary: "MRI done Aug 2026 showing medial meniscus tear & cartilage thinning. Patient wants evaluation if joint preservation / arthroscopy is possible first.",
    report_file_url: null,
    status: "new",
    staff_notes: null,
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5h ago
  },
  {
    id: "so-202",
    patient_name: "Meenakshi Sundaram",
    patient_phone: "9820556677",
    patient_email: "meenakshi.s@example.com",
    condition_category: "Spine Surgery / Slipped Disc",
    prior_diagnosis: "Advised L4-L5 fusion surgery.",
    reports_summary: "Lumbar spine MRI film and neuro report available. Looking for conservative spine therapy opinion.",
    report_file_url: null,
    status: "contacted",
    staff_notes: "Left voice message and WhatsApp inquiry message requesting scan uploads.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6h ago
  },
];

// ---------------------------------------------------------------------------
// Unified DB Access Methods
// ---------------------------------------------------------------------------

export async function insertAppointment(record: Omit<AppointmentRecord, "id" | "created_at">): Promise<AppointmentRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .insert([record])
      .select()
      .single();

    if (!error && data) {
      return data as AppointmentRecord;
    }
    console.error("Supabase insert error, falling back to memory:", error);
  }

  const fallbackRecord: AppointmentRecord = {
    ...record,
    id: `apt-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
  };
  memoryAppointments.unshift(fallbackRecord);
  return fallbackRecord;
}

export async function insertSecondOpinion(record: Omit<SecondOpinionRecord, "id" | "created_at">): Promise<SecondOpinionRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("second_opinion_requests")
      .insert([record])
      .select()
      .single();

    if (!error && data) {
      return data as SecondOpinionRecord;
    }
    console.error("Supabase insert error, falling back to memory:", error);
  }

  const fallbackRecord: SecondOpinionRecord = {
    ...record,
    id: `so-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
  };
  memorySecondOpinions.unshift(fallbackRecord);
  return fallbackRecord;
}

export async function getAppointments(filter?: { status?: string; search?: string }): Promise<AppointmentRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    let query = supabase.from("appointments").select("*").order("created_at", { ascending: false });

    if (filter?.status && filter.status !== "all") {
      query = query.eq("status", filter.status);
    }
    if (filter?.search) {
      query = query.or(`patient_name.ilike.%${filter.search}%,patient_phone.ilike.%${filter.search}%`);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data as AppointmentRecord[];
    }
  }

  // Memory fallback filtering
  return memoryAppointments.filter((item) => {
    const matchesStatus = !filter?.status || filter.status === "all" || item.status === filter.status;
    const matchesSearch =
      !filter?.search ||
      item.patient_name.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.patient_phone.includes(filter.search) ||
      (item.patient_email && item.patient_email.toLowerCase().includes(filter.search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });
}

export async function getSecondOpinions(filter?: { status?: string; search?: string }): Promise<SecondOpinionRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    let query = supabase.from("second_opinion_requests").select("*").order("created_at", { ascending: false });

    if (filter?.status && filter.status !== "all") {
      query = query.eq("status", filter.status);
    }
    if (filter?.search) {
      query = query.or(`patient_name.ilike.%${filter.search}%,patient_phone.ilike.%${filter.search}%`);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data as SecondOpinionRecord[];
    }
  }

  return memorySecondOpinions.filter((item) => {
    const matchesStatus = !filter?.status || filter.status === "all" || item.status === filter.status;
    const matchesSearch =
      !filter?.search ||
      item.patient_name.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.patient_phone.includes(filter.search) ||
      (item.patient_email && item.patient_email.toLowerCase().includes(filter.search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });
}

export async function updateAppointmentStatus(id: string, status: RequestStatus, staff_notes?: string): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const updatePayload: Record<string, unknown> = { status };
    if (staff_notes !== undefined) {
      updatePayload.staff_notes = staff_notes;
    }
    const { error } = await supabase
      .from("appointments")
      .update(updatePayload)
      .eq("id", id);
    if (!error) return true;
  }

  const idx = memoryAppointments.findIndex((a) => a.id === id);
  if (idx !== -1) {
    memoryAppointments[idx].status = status;
    if (staff_notes !== undefined) {
      memoryAppointments[idx].staff_notes = staff_notes;
    }
    return true;
  }
  return false;
}

export async function updateSecondOpinionStatus(id: string, status: RequestStatus, staff_notes?: string): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const updatePayload: Record<string, unknown> = { status };
    if (staff_notes !== undefined) {
      updatePayload.staff_notes = staff_notes;
    }
    const { error } = await supabase
      .from("second_opinion_requests")
      .update(updatePayload)
      .eq("id", id);
    if (!error) return true;
  }

  const idx = memorySecondOpinions.findIndex((so) => so.id === id);
  if (idx !== -1) {
    memorySecondOpinions[idx].status = status;
    if (staff_notes !== undefined) {
      memorySecondOpinions[idx].staff_notes = staff_notes;
    }
    return true;
  }
  return false;
}
