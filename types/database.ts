export type RequestStatus = "new" | "contacted" | "confirmed" | "closed";
export type StaffRole = "receptionist" | "admin" | "doctor";
export type UserRole = StaffRole | "patient";

export interface AppointmentRecord {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  department_id: string;
  doctor_id?: string | null;
  preferred_date: string;
  preferred_time: string;
  symptoms_description?: string | null;
  status: RequestStatus;
  patient_id?: string | null; // linked once triaged by staff
  staff_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface SecondOpinionRecord {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  condition_category: string;
  prior_diagnosis?: string | null;
  reports_summary?: string | null;
  report_file_url?: string | null;
  status: RequestStatus;
  staff_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface PatientRecord {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  auth_user_id?: string | null;
  devPassword?: string;
  created_at: string;
}

export type VisitType = "consultation" | "follow_up" | "surgery" | "physiotherapy";

export interface VisitRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor_name?: string;
  visit_date: string;
  visit_type: VisitType;
  diagnosis?: string | null;
  created_at: string;
}

export interface TreatmentNoteRecord {
  id: string;
  visit_id: string;
  doctor_id: string;
  doctor_name?: string;
  note_text: string;
  is_amendment: boolean;
  original_note_id?: string | null;
  created_at: string;
}

export interface PatientReportRecord {
  id: string;
  patient_id: string;
  visit_id?: string | null;
  file_url: string;
  signed_url?: string;
  report_type?: string | null;
  file_name?: string;
  uploaded_by?: string | null;
  uploaded_at: string;
}

export interface DoctorPatientAccessRecord {
  doctor_id: string;
  patient_id: string;
  doctor_name?: string;
  patient_name?: string;
  granted_by?: string | null;
  granted_at: string;
}

export interface StaffRoleRecord {
  user_id: string;
  role: StaffRole;
  full_name?: string | null;
  email?: string;
}

export interface AuditLogRecord {
  id: string;
  actor_id?: string | null;
  actor_name?: string | null;
  action: string;
  target_table: string;
  target_id?: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalAppointments: number;
  totalSecondOpinions: number;
  newAppointments: number;
  newSecondOpinions: number;
  contactedCount: number;
  confirmedCount: number;
  closedCount: number;
}

export interface RequestFilterParams {
  tab?: "appointments" | "second-opinions" | "doctors";
  status?: RequestStatus | "all";
  search?: string;
  departmentId?: string;
  dateRange?: "all" | "today" | "week" | "month";
  sortBy?: "created_at" | "preferred_date";
  sortOrder?: "asc" | "desc";
}
