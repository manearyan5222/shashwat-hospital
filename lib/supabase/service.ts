import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  AppointmentRecord,
  SecondOpinionRecord,
  RequestStatus,
  PatientRecord,
  VisitRecord,
  TreatmentNoteRecord,
  PatientReportRecord,
  DoctorPatientAccessRecord,
  StaffRoleRecord,
  StaffRole,
} from "@/types/database";
import { secureLog } from "@/lib/security";

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

export const memoryStaffRoles: StaffRoleRecord[] = [
  { user_id: "user-admin-1", role: "admin", full_name: "Dr. Admin Medical Director", email: "admin@shashwathospital.com" },
  { user_id: "user-recep-1", role: "receptionist", full_name: "Staff Reception Desk", email: "reception@shashwathospital.com" },
  { user_id: "doc-joint-1", role: "doctor", full_name: "Dr. Senior Joint Replacement Surgeon", email: "dr.joint@shashwathospital.com" },
  { user_id: "doc-sports-1", role: "doctor", full_name: "Dr. Arthroscopy & Sports Specialist", email: "dr.sports@shashwathospital.com" },
  { user_id: "doc-spine-1", role: "doctor", full_name: "Dr. Spine Care Specialist", email: "dr.spine@shashwathospital.com" },
];

export const memoryPatients: PatientRecord[] = [
  {
    id: "pat-1001",
    full_name: "Ramesh M. Patil",
    phone: "9820123456",
    email: "ramesh.patil@example.com",
    date_of_birth: "1968-04-12",
    gender: "Male",
    auth_user_id: "patient-user-1001",
    devPassword: "PatientPass2026!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "pat-1002",
    full_name: "Sneha G. Kulkarni",
    phone: "9819987654",
    email: "sneha.k@example.com",
    date_of_birth: "1994-08-22",
    gender: "Female",
    auth_user_id: "patient-user-1002",
    devPassword: "SnehaPatient2026!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "pat-1003",
    full_name: "Vijay Deshmukh",
    phone: "9867012345",
    email: "vijay.desh@example.com",
    date_of_birth: "1982-11-05",
    gender: "Male",
    auth_user_id: "patient-user-1003",
    devPassword: "VijayPatient2026!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

export const memoryAppointments: AppointmentRecord[] = [
  {
    id: "apt-101",
    patient_name: "Ramesh M. Patil",
    patient_phone: "9820123456",
    patient_email: "ramesh.patil@example.com",
    department_id: "joint-replacement",
    doctor_id: "doc-joint-1",
    preferred_date: "2026-09-20",
    preferred_time: "10:30 AM – 11:30 AM",
    symptoms_description: "Severe bilateral knee pain while climbing stairs for past 6 months. Prior X-rays show grade 3 osteoarthritis.",
    status: "new",
    patient_id: "pat-1001",
    staff_notes: null,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "apt-102",
    patient_name: "Sneha G. Kulkarni",
    patient_phone: "9819987654",
    patient_email: "sneha.k@example.com",
    department_id: "arthroscopy-sports-medicine",
    doctor_id: "doc-sports-1",
    preferred_date: "2026-09-21",
    preferred_time: "05:30 PM – 06:30 PM",
    symptoms_description: "Twisted right knee playing badminton. Sharp pain and popping sensation, mild swelling.",
    status: "contacted",
    patient_id: "pat-1002",
    staff_notes: "Called patient at 11:30 AM. Advised to bring recent MRI report. Confirmed arrival for Tuesday evening.",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "apt-103",
    patient_name: "Vijay Deshmukh",
    patient_phone: "9867012345",
    patient_email: "vijay.desh@example.com",
    department_id: "spine-care",
    doctor_id: "doc-spine-1",
    preferred_date: "2026-09-22",
    preferred_time: "06:00 PM – 07:00 PM",
    symptoms_description: "Lower back pain radiating down left calf (sciatica). Difficulty sitting for long work hours.",
    status: "confirmed",
    patient_id: "pat-1003",
    staff_notes: "OPD Slot booked with Dr. Spine Specialist. SMS confirmation sent.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const memorySecondOpinions: SecondOpinionRecord[] = [
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
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export const memoryVisits: VisitRecord[] = [
  {
    id: "vis-3001",
    patient_id: "pat-1001",
    doctor_id: "doc-joint-1",
    doctor_name: "Dr. Senior Joint Replacement Surgeon",
    visit_date: "2026-08-25",
    visit_type: "consultation",
    diagnosis: "Bilateral Primary Osteoarthritis Knee (Grade 3)",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(),
  },
  {
    id: "vis-3002",
    patient_id: "pat-1002",
    doctor_id: "doc-sports-1",
    doctor_name: "Dr. Arthroscopy & Sports Specialist",
    visit_date: "2026-09-10",
    visit_type: "consultation",
    diagnosis: "Right Knee Anterior Cruciate Ligament (ACL) Complete Tear",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const memoryTreatmentNotes: TreatmentNoteRecord[] = [
  {
    id: "not-4001",
    visit_id: "vis-3001",
    doctor_id: "doc-joint-1",
    doctor_name: "Dr. Senior Joint Replacement Surgeon",
    note_text: "Patient examined. Restricted flexion past 95 degrees with crepitus. Recommended trial of intra-articular hyaluronic acid injection, quadriceps strengthening physiotherapy, and weight reduction before considering robotic total knee arthroplasty.",
    is_amendment: false,
    original_note_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(),
  },
  {
    id: "not-4002",
    visit_id: "vis-3001",
    doctor_id: "doc-joint-1",
    doctor_name: "Dr. Senior Joint Replacement Surgeon",
    note_text: "[AMENDMENT] Patient reported NSAID allergy (Diclofenac). Switched pain management protocol strictly to Paracetamol.",
    is_amendment: true,
    original_note_id: "not-4001",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: "not-4003",
    visit_id: "vis-3002",
    doctor_id: "doc-sports-1",
    doctor_name: "Dr. Arthroscopy & Sports Specialist",
    note_text: "Lachman test positive (Grade 2+), Pivot shift test positive. MRI confirms mid-substance ACL disruption with bone contusion of lateral femoral condyle. Discussed arthroscopic anatomical ACL reconstruction using quadrupled hamstring autograft.",
    is_amendment: false,
    original_note_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const memoryPatientReports: PatientReportRecord[] = [
  {
    id: "rep-5001",
    patient_id: "pat-1001",
    visit_id: "vis-3001",
    file_url: "patient-reports/pat-1001/knee_standing_xray_aug2026.pdf",
    signed_url: "/sample-reports/knee_standing_xray.pdf",
    report_type: "Digital X-Ray Bilateral Knees (Weight Bearing)",
    file_name: "knee_standing_xray_aug2026.pdf",
    uploaded_by: "doc-joint-1",
    uploaded_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(),
  },
  {
    id: "rep-5002",
    patient_id: "pat-1002",
    visit_id: "vis-3002",
    file_url: "patient-reports/pat-1002/mri_right_knee_sep2026.pdf",
    signed_url: "/sample-reports/mri_right_knee.pdf",
    report_type: "High-Resolution 3.0T MRI Right Knee",
    file_name: "mri_right_knee_sep2026.pdf",
    uploaded_by: "doc-sports-1",
    uploaded_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const memoryDoctorPatientAccess: DoctorPatientAccessRecord[] = [
  {
    doctor_id: "doc-joint-1",
    patient_id: "pat-1001",
    doctor_name: "Dr. Senior Joint Replacement Surgeon",
    patient_name: "Ramesh M. Patil",
    granted_by: "user-admin-1",
    granted_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    doctor_id: "doc-sports-1",
    patient_id: "pat-1002",
    doctor_name: "Dr. Arthroscopy & Sports Specialist",
    patient_name: "Sneha G. Kulkarni",
    granted_by: "user-admin-1",
    granted_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    doctor_id: "doc-spine-1",
    patient_id: "pat-1003",
    doctor_name: "Dr. Spine Care Specialist",
    patient_name: "Vijay Deshmukh",
    granted_by: "user-admin-1",
    granted_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
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

// ---------------------------------------------------------------------------
// Patients Management & Sanitization
// ---------------------------------------------------------------------------

/**
 * Strips internal and sensitive credential fields (such as devPassword) from patient records
 * before sending them in any API response.
 */
export function toPublicPatient(patient: PatientRecord): Omit<PatientRecord, "devPassword"> {
  const { devPassword, ...safe } = patient;
  return safe;
}

export async function getPatients(): Promise<PatientRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
    if (!error && data) return data as PatientRecord[];
  }
  return memoryPatients;
}

export async function getPatientById(id: string): Promise<PatientRecord | null> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("patients").select("*").eq("id", id).single();
    if (!error && data) return data as PatientRecord;
  }
  return memoryPatients.find((p) => p.id === id) || null;
}

export async function getPatientByAuthUserId(authUserId: string): Promise<PatientRecord | null> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("patients").select("*").eq("auth_user_id", authUserId).single();
    if (!error && data) return data as PatientRecord;
  }
  return memoryPatients.find((p) => p.auth_user_id === authUserId) || null;
}

export async function createPatient(patientData: Omit<PatientRecord, "id" | "created_at">): Promise<PatientRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("patients").insert([patientData]).select().single();
    if (!error && data) return data as PatientRecord;
  }
  const newPatient: PatientRecord = {
    ...patientData,
    id: `pat-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
  };
  memoryPatients.unshift(newPatient);
  return newPatient;
}

export async function triageAppointmentToPatient(appointmentId: string, doctorId?: string): Promise<{ patient: PatientRecord; appointment: AppointmentRecord }> {
  const apt = memoryAppointments.find((a) => a.id === appointmentId);
  if (!apt) throw new Error("Appointment not found");

  // Check if patient already exists by phone
  let patient = memoryPatients.find((p) => p.phone === apt.patient_phone);
  if (!patient) {
    patient = await createPatient({
      full_name: apt.patient_name,
      phone: apt.patient_phone,
      email: apt.patient_email || null,
      gender: null,
      date_of_birth: null,
      auth_user_id: null,
    });
  }

  apt.patient_id = patient.id;
  apt.status = "confirmed";

  // Assign doctor access if doctor provided
  if (doctorId) {
    await assignDoctorPatientAccess(doctorId, patient.id);
  }

  return { patient, appointment: apt };
}

// ---------------------------------------------------------------------------
// Visits & Append-Only Treatment Notes
// ---------------------------------------------------------------------------

export async function getVisitsByPatientId(patientId: string): Promise<VisitRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("visits").select("*").eq("patient_id", patientId).order("visit_date", { ascending: false });
    if (!error && data) return data as VisitRecord[];
  }
  return memoryVisits.filter((v) => v.patient_id === patientId);
}

export async function createVisit(visitData: Omit<VisitRecord, "id" | "created_at">): Promise<VisitRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("visits").insert([visitData]).select().single();
    if (!error && data) return data as VisitRecord;
  }
  const newVisit: VisitRecord = {
    ...visitData,
    id: `vis-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
  };
  memoryVisits.unshift(newVisit);
  return newVisit;
}

export async function getTreatmentNotesByVisitId(visitId: string): Promise<TreatmentNoteRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("treatment_notes").select("*").eq("visit_id", visitId).order("created_at", { ascending: true });
    if (!error && data) return data as TreatmentNoteRecord[];
  }
  return memoryTreatmentNotes.filter((n) => n.visit_id === visitId);
}

export async function getTreatmentNotesByPatientId(patientId: string): Promise<TreatmentNoteRecord[]> {
  const patientVisits = await getVisitsByPatientId(patientId);
  const visitIds = new Set(patientVisits.map((v) => v.id));
  return memoryTreatmentNotes.filter((n) => visitIds.has(n.visit_id));
}

/**
 * Append-only treatment note creation (no UPDATE/DELETE allowed)
 */
export async function createTreatmentNote(noteData: Omit<TreatmentNoteRecord, "id" | "created_at" | "is_amendment" | "original_note_id">): Promise<TreatmentNoteRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("treatment_notes")
      .insert([{ ...noteData, is_amendment: false, original_note_id: null }])
      .select()
      .single();
    if (!error && data) return data as TreatmentNoteRecord;
  }
  const newNote: TreatmentNoteRecord = {
    ...noteData,
    id: `not-${Date.now().toString().slice(-6)}`,
    is_amendment: false,
    original_note_id: null,
    created_at: new Date().toISOString(),
  };
  memoryTreatmentNotes.push(newNote);
  return newNote;
}

/**
 * Append-only amendment to an existing treatment note
 */
export async function createTreatmentAmendment(
  originalNoteId: string,
  visitId: string,
  doctorId: string,
  doctorName: string,
  amendmentText: string
): Promise<TreatmentNoteRecord> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("treatment_notes")
      .insert([{
        visit_id: visitId,
        doctor_id: doctorId,
        doctor_name: doctorName,
        note_text: `[AMENDMENT] ${amendmentText}`,
        is_amendment: true,
        original_note_id: originalNoteId,
      }])
      .select()
      .single();
    if (!error && data) return data as TreatmentNoteRecord;
  }
  const newAmendment: TreatmentNoteRecord = {
    id: `not-${Date.now().toString().slice(-6)}`,
    visit_id: visitId,
    doctor_id: doctorId,
    doctor_name: doctorName,
    note_text: `[AMENDMENT] ${amendmentText}`,
    is_amendment: true,
    original_note_id: originalNoteId,
    created_at: new Date().toISOString(),
  };
  memoryTreatmentNotes.push(newAmendment);
  return newAmendment;
}

// ---------------------------------------------------------------------------
// Patient Reports & Secure Signed URLs
// ---------------------------------------------------------------------------

export async function getPatientReports(patientId: string): Promise<PatientReportRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("patient_reports").select("*").eq("patient_id", patientId).order("uploaded_at", { ascending: false });
    if (!error && data) return data as PatientReportRecord[];
  }
  return memoryPatientReports.filter((r) => r.patient_id === patientId);
}

export async function generateSignedReportUrl(fileUrl: string): Promise<string> {
  const supabase = getServiceSupabase();
  if (supabase && fileUrl.startsWith("patient-reports/")) {
    const filePath = fileUrl.replace("patient-reports/", "");
    const { data, error } = await supabase.storage.from("patient-reports").createSignedUrl(filePath, 60 * 60); // 1 hour
    if (!error && data?.signedUrl) {
      return data.signedUrl;
    }
  }
  // Safe sample placeholder for offline / dev preview
  return `data:application/pdf;base64,JVBERi0xLjQKJSDi48...`;
}

// ---------------------------------------------------------------------------
// Doctor-Patient Access & Staff Roles
// ---------------------------------------------------------------------------

export async function getStaffRole(userId: string): Promise<StaffRole | null> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("staff_roles").select("role").eq("user_id", userId).single();
    if (!error && data) return data.role as StaffRole;
  }
  const match = memoryStaffRoles.find((s) => s.user_id === userId);
  return match ? match.role : null;
}

export async function getStaffList(): Promise<StaffRoleRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("staff_roles").select("*").order("full_name");
    if (!error && data) return data as StaffRoleRecord[];
  }
  return memoryStaffRoles;
}

export async function getDoctorsList(): Promise<StaffRoleRecord[]> {
  const list = await getStaffList();
  return list.filter((s) => s.role === "doctor");
}

export async function getAssignedPatientsForDoctor(doctorId: string): Promise<PatientRecord[]> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("doctor_patient_access")
      .select("patient_id, patients(*)")
      .eq("doctor_id", doctorId);
    if (!error && data) {
      return data.map((d: { patients: unknown }) => d.patients) as PatientRecord[];
    }
  }

  const accessList = memoryDoctorPatientAccess.filter((a) => a.doctor_id === doctorId);
  const patientIds = new Set(accessList.map((a) => a.patient_id));
  return memoryPatients.filter((p) => patientIds.has(p.id));
}

export async function assignDoctorPatientAccess(doctorId: string, patientId: string, grantedBy?: string): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { error } = await supabase.from("doctor_patient_access").insert([
      { doctor_id: doctorId, patient_id: patientId, granted_by: grantedBy || null },
    ]);
    if (!error) return true;
  }

  const exists = memoryDoctorPatientAccess.some((a) => a.doctor_id === doctorId && a.patient_id === patientId);
  if (!exists) {
    const doc = memoryStaffRoles.find((s) => s.user_id === doctorId);
    const pat = memoryPatients.find((p) => p.id === patientId);
    memoryDoctorPatientAccess.push({
      doctor_id: doctorId,
      patient_id: patientId,
      doctor_name: doc?.full_name || "Assigned Consultant",
      patient_name: pat?.full_name || "Patient",
      granted_by: grantedBy || null,
      granted_at: new Date().toISOString(),
    });
  }
  return true;
}

export async function revokeDoctorPatientAccess(doctorId: string, patientId: string): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { error } = await supabase.from("doctor_patient_access").delete().eq("doctor_id", doctorId).eq("patient_id", patientId);
    if (!error) return true;
  }

  const idx = memoryDoctorPatientAccess.findIndex((a) => a.doctor_id === doctorId && a.patient_id === patientId);
  if (idx !== -1) {
    memoryDoctorPatientAccess.splice(idx, 1);
    return true;
  }
  return false;
}
