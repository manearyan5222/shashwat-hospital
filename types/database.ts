export type RequestStatus = "new" | "contacted" | "confirmed" | "closed";

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
  tab?: "appointments" | "second-opinions";
  status?: RequestStatus | "all";
  search?: string;
  departmentId?: string;
  dateRange?: "all" | "today" | "week" | "month";
  sortBy?: "created_at" | "preferred_date";
  sortOrder?: "asc" | "desc";
}
