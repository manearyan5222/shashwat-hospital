-- ==============================================================================
-- SHASHWAT HOSPITAL — FULL CLINICAL OPERATIONS DATABASE SCHEMA
-- PostgreSQL schema for Appointments, Second Opinions, Patients, Visits,
-- Append-Only Treatment Notes, Patient Reports, Access Control, and Audit Logging
-- ==============================================================================

-- 1. Custom Types
DO $$ BEGIN
    CREATE TYPE request_status AS ENUM ('new', 'contacted', 'confirmed', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE staff_role_type AS ENUM ('receptionist', 'admin', 'doctor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE visit_type_enum AS ENUM ('consultation', 'follow_up', 'surgery', 'physiotherapy');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Staff Roles Assignment Table
CREATE TABLE IF NOT EXISTS public.staff_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role staff_role_type NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Core Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    date_of_birth DATE,
    gender TEXT,
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL, -- Links to Patient Portal Login
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Appointments Intake Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    department_id TEXT NOT NULL,
    doctor_id TEXT DEFAULT 'any',
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    symptoms_description TEXT,
    status request_status DEFAULT 'new' NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL, -- Linked once triaged by staff
    staff_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Second Opinion Requests Intake Table
CREATE TABLE IF NOT EXISTS public.second_opinion_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    condition_category TEXT NOT NULL,
    prior_diagnosis TEXT,
    reports_summary TEXT,
    report_file_url TEXT, -- Private storage path, never public
    status request_status DEFAULT 'new' NOT NULL,
    staff_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Clinical Visits Table
CREATE TABLE IF NOT EXISTS public.visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES auth.users(id),
    visit_date DATE NOT NULL,
    visit_type visit_type_enum DEFAULT 'consultation',
    diagnosis TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Treatment Notes Table (Strictly Append-Only)
CREATE TABLE IF NOT EXISTS public.treatment_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_id UUID NOT NULL REFERENCES public.visits(id) ON DELETE RESTRICT, -- Protects clinical notes against accidental or cascade deletion
    doctor_id UUID NOT NULL REFERENCES auth.users(id),
    note_text TEXT NOT NULL,
    is_amendment BOOLEAN NOT NULL DEFAULT false,
    original_note_id UUID REFERENCES public.treatment_notes(id) ON DELETE SET NULL, -- Set if amendment
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Patient Reports / Medical Scans Table (Private Storage Path)
CREATE TABLE IF NOT EXISTS public.patient_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    visit_id UUID REFERENCES public.visits(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL, -- Private bucket path, signed URL generated on demand
    report_type TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    uploaded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Doctor-Patient Access Junction Table
CREATE TABLE IF NOT EXISTS public.doctor_patient_access (
    doctor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    granted_by UUID REFERENCES auth.users(id),
    granted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (doctor_id, patient_id)
);

-- 10. Audit Log Table (Mandatory Compliance Log)
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g. 'read_patient_reports', 'create_treatment_note', 'view_patient_history'
    target_table TEXT NOT NULL,
    target_id UUID,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON public.appointments(patient_phone);
CREATE INDEX IF NOT EXISTS idx_second_opinion_status ON public.second_opinion_requests(status);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON public.patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_auth_user ON public.patients(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient ON public.visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_doctor ON public.visits(doctor_id);
CREATE INDEX IF NOT EXISTS idx_notes_visit ON public.treatment_notes(visit_id);
CREATE INDEX IF NOT EXISTS idx_reports_patient ON public.patient_reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_reports_file_url ON public.patient_reports(file_url);
CREATE INDEX IF NOT EXISTS idx_doctor_access_doc ON public.doctor_patient_access(doctor_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.audit_log(created_at DESC);

-- 12. Helper Functions for Role Resolution in RLS
-- Defined with explicit SET search_path = '' to prevent search_path hijacking
CREATE OR REPLACE FUNCTION public.get_auth_staff_role()
RETURNS public.staff_role_type
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT role FROM public.staff_roles WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_staff_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.staff_roles 
        WHERE user_id = auth.uid() AND role = 'admin'::public.staff_role_type
    );
$$;

CREATE OR REPLACE FUNCTION public.is_staff_receptionist_or_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.staff_roles 
        WHERE user_id = auth.uid() AND role IN ('admin'::public.staff_role_type, 'receptionist'::public.staff_role_type)
    );
$$;

CREATE OR REPLACE FUNCTION public.is_doctor_assigned_to_patient(p_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.doctor_patient_access 
        WHERE doctor_id = auth.uid() AND patient_id = p_id
    );
$$;

-- Revoke default public execution privileges on security definer helper functions
REVOKE EXECUTE ON FUNCTION public.get_auth_staff_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_auth_staff_role() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_staff_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_staff_receptionist_or_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff_receptionist_or_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_doctor_assigned_to_patient(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_doctor_assigned_to_patient(uuid) TO authenticated, service_role;

-- 13. Revoke UPDATE and DELETE on treatment_notes (Append-Only Enforcement)
REVOKE UPDATE, DELETE ON public.treatment_notes FROM PUBLIC, authenticated, anon;

-- 14. Row Level Security (RLS) Configuration

ALTER TABLE public.staff_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.second_opinion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_patient_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Staff Roles RLS
DROP POLICY IF EXISTS "Admins can manage staff roles" ON public.staff_roles;
CREATE POLICY "Admins can manage staff roles" ON public.staff_roles
    FOR ALL TO authenticated
    USING (public.is_staff_admin())
    WITH CHECK (public.is_staff_admin());

DROP POLICY IF EXISTS "Users can read own staff role" ON public.staff_roles;
CREATE POLICY "Users can read own staff role" ON public.staff_roles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Appointments & Second Opinions RLS
DROP POLICY IF EXISTS "Public can submit appointments" ON public.appointments;
CREATE POLICY "Public can submit appointments" ON public.appointments
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view appointments" ON public.appointments;
CREATE POLICY "Staff can view appointments" ON public.appointments
    FOR SELECT TO authenticated
    USING (public.is_staff_receptionist_or_admin());

DROP POLICY IF EXISTS "Staff can update appointments" ON public.appointments;
CREATE POLICY "Staff can update appointments" ON public.appointments
    FOR UPDATE TO authenticated
    USING (public.is_staff_receptionist_or_admin())
    WITH CHECK (public.is_staff_receptionist_or_admin());

DROP POLICY IF EXISTS "Public can submit second opinions" ON public.second_opinion_requests;
CREATE POLICY "Public can submit second opinions" ON public.second_opinion_requests
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view second opinions" ON public.second_opinion_requests;
CREATE POLICY "Staff can view second opinions" ON public.second_opinion_requests
    FOR SELECT TO authenticated
    USING (public.is_staff_receptionist_or_admin());

DROP POLICY IF EXISTS "Staff can update second opinions" ON public.second_opinion_requests;
CREATE POLICY "Staff can update second opinions" ON public.second_opinion_requests
    FOR UPDATE TO authenticated
    USING (public.is_staff_receptionist_or_admin())
    WITH CHECK (public.is_staff_receptionist_or_admin());

-- Patients RLS
DROP POLICY IF EXISTS "Admins can manage patients" ON public.patients;
CREATE POLICY "Admins can manage patients" ON public.patients
    FOR ALL TO authenticated
    USING (public.is_staff_admin())
    WITH CHECK (public.is_staff_admin());

DROP POLICY IF EXISTS "Doctors can view assigned patients" ON public.patients;
CREATE POLICY "Doctors can view assigned patients" ON public.patients
    FOR SELECT TO authenticated
    USING (public.is_doctor_assigned_to_patient(id));

DROP POLICY IF EXISTS "Patients can view own record" ON public.patients;
CREATE POLICY "Patients can view own record" ON public.patients
    FOR SELECT TO authenticated
    USING (auth_user_id = auth.uid());

-- Visits RLS
DROP POLICY IF EXISTS "Admins can manage visits" ON public.visits;
CREATE POLICY "Admins can manage visits" ON public.visits
    FOR ALL TO authenticated
    USING (public.is_staff_admin())
    WITH CHECK (public.is_staff_admin());

DROP POLICY IF EXISTS "Doctors can manage visits for assigned patients" ON public.visits;
DROP POLICY IF EXISTS "Doctors can view visits for assigned patients" ON public.visits;
CREATE POLICY "Doctors can view visits for assigned patients" ON public.visits
    FOR SELECT TO authenticated
    USING (doctor_id = auth.uid() OR public.is_doctor_assigned_to_patient(patient_id));

DROP POLICY IF EXISTS "Doctors can insert visits for assigned patients" ON public.visits;
CREATE POLICY "Doctors can insert visits for assigned patients" ON public.visits
    FOR INSERT TO authenticated
    WITH CHECK (doctor_id = auth.uid() AND public.is_doctor_assigned_to_patient(patient_id));

DROP POLICY IF EXISTS "Doctors can update visits for assigned patients" ON public.visits;
CREATE POLICY "Doctors can update visits for assigned patients" ON public.visits
    FOR UPDATE TO authenticated
    USING (doctor_id = auth.uid() OR public.is_doctor_assigned_to_patient(patient_id))
    WITH CHECK (doctor_id = auth.uid());

DROP POLICY IF EXISTS "Patients can view own visits" ON public.visits;
CREATE POLICY "Patients can view own visits" ON public.visits
    FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.patients WHERE patients.id = visits.patient_id AND patients.auth_user_id = auth.uid()));

-- Treatment Notes RLS (INSERT and SELECT only)
DROP POLICY IF EXISTS "Admins can view treatment notes" ON public.treatment_notes;
CREATE POLICY "Admins can view treatment notes" ON public.treatment_notes
    FOR SELECT TO authenticated
    USING (public.is_staff_admin());

DROP POLICY IF EXISTS "Doctors can view notes for assigned patients" ON public.treatment_notes;
CREATE POLICY "Doctors can view notes for assigned patients" ON public.treatment_notes
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.visits v 
        WHERE v.id = treatment_notes.visit_id 
        AND (v.doctor_id = auth.uid() OR public.is_doctor_assigned_to_patient(v.patient_id))
    ));

DROP POLICY IF EXISTS "Doctors can insert notes" ON public.treatment_notes;
CREATE POLICY "Doctors can insert notes" ON public.treatment_notes
    FOR INSERT TO authenticated
    WITH CHECK (
        doctor_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.visits v 
            WHERE v.id = treatment_notes.visit_id 
            AND (v.doctor_id = auth.uid() OR public.is_doctor_assigned_to_patient(v.patient_id))
        )
    );

DROP POLICY IF EXISTS "Patients can view own treatment notes" ON public.treatment_notes;
CREATE POLICY "Patients can view own treatment notes" ON public.treatment_notes
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.visits v 
        JOIN public.patients p ON p.id = v.patient_id
        WHERE v.id = treatment_notes.visit_id AND p.auth_user_id = auth.uid()
    ));

-- Patient Reports RLS
DROP POLICY IF EXISTS "Admins can manage reports" ON public.patient_reports;
CREATE POLICY "Admins can manage reports" ON public.patient_reports
    FOR ALL TO authenticated
    USING (public.is_staff_admin())
    WITH CHECK (public.is_staff_admin());

DROP POLICY IF EXISTS "Doctors can view reports for assigned patients" ON public.patient_reports;
CREATE POLICY "Doctors can view reports for assigned patients" ON public.patient_reports
    FOR SELECT TO authenticated
    USING (public.is_doctor_assigned_to_patient(patient_id));

DROP POLICY IF EXISTS "Doctors can upload reports for assigned patients" ON public.patient_reports;
CREATE POLICY "Doctors can upload reports for assigned patients" ON public.patient_reports
    FOR INSERT TO authenticated
    WITH CHECK (public.is_doctor_assigned_to_patient(patient_id));

DROP POLICY IF EXISTS "Patients can view own reports" ON public.patient_reports;
CREATE POLICY "Patients can view own reports" ON public.patient_reports
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.patients WHERE patients.id = patient_reports.patient_id AND patients.auth_user_id = auth.uid()
    ));

-- Doctor-Patient Access Junction RLS
DROP POLICY IF EXISTS "Admins can manage doctor access" ON public.doctor_patient_access;
CREATE POLICY "Admins can manage doctor access" ON public.doctor_patient_access
    FOR ALL TO authenticated
    USING (public.is_staff_admin())
    WITH CHECK (public.is_staff_admin());

DROP POLICY IF EXISTS "Doctors can view own access grants" ON public.doctor_patient_access;
CREATE POLICY "Doctors can view own access grants" ON public.doctor_patient_access
    FOR SELECT TO authenticated
    USING (doctor_id = auth.uid());

-- Audit Log RLS (Append-only insert, Admins can view)
DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON public.audit_log;
CREATE POLICY "Authenticated users can insert audit logs" ON public.audit_log
    FOR INSERT TO authenticated
    WITH CHECK (actor_id = auth.uid() OR actor_id IS NULL);

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_log;
CREATE POLICY "Admins can view audit logs" ON public.audit_log
    FOR SELECT TO authenticated
    USING (public.is_staff_admin());

-- 15. Storage Buckets Configuration
INSERT INTO storage.buckets (id, name, public)
VALUES ('second-opinion-reports', 'second-opinion-reports', false),
       ('patient-reports', 'patient-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS (Strict Least-Privilege & Scoped Authorization)
-- Note: Anonymous direct uploads to storage are denied. Public second-opinion uploads
-- are mediated server-side by /api/second-opinion via the service role key with strict MIME & size validation.

DROP POLICY IF EXISTS "Public can upload intake scans" ON storage.objects;
DROP POLICY IF EXISTS "Staff and assigned doctors can access scans" ON storage.objects;
DROP POLICY IF EXISTS "Staff can view second opinion reports" ON storage.objects;
DROP POLICY IF EXISTS "Doctors and staff can upload patient reports" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view patient reports in storage" ON storage.objects;
DROP POLICY IF EXISTS "Doctors can view assigned patient reports" ON storage.objects;
DROP POLICY IF EXISTS "Patients can view own reports in storage" ON storage.objects;

-- 15.1 Second Opinion Storage (Internal Staff Access Only)
CREATE POLICY "Staff can view second opinion reports" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'second-opinion-reports' AND
        public.is_staff_receptionist_or_admin()
    );

-- 15.2 Patient Diagnostic Reports (Staff Admins & Authorized Doctors Upload)
CREATE POLICY "Doctors and staff can upload patient reports" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'patient-reports' AND
        (public.is_staff_admin() OR public.get_auth_staff_role() = 'doctor')
    );

-- 15.3 Patient Diagnostic Reports (Admin Read Access)
CREATE POLICY "Admins can view patient reports in storage" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'patient-reports' AND
        public.is_staff_admin()
    );

-- 15.4 Patient Diagnostic Reports (Assigned Doctor Read Access)
CREATE POLICY "Doctors can view assigned patient reports" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'patient-reports' AND
        public.get_auth_staff_role() = 'doctor' AND
        EXISTS (
            SELECT 1 FROM public.patient_reports pr
            WHERE pr.file_url = ('patient-reports/' || storage.objects.name)
            AND public.is_doctor_assigned_to_patient(pr.patient_id)
        )
    );

-- 15.5 Patient Diagnostic Reports (Patient Self-Read Access)
CREATE POLICY "Patients can view own reports in storage" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'patient-reports' AND
        EXISTS (
            SELECT 1 FROM public.patient_reports pr
            JOIN public.patients p ON p.id = pr.patient_id
            WHERE pr.file_url = ('patient-reports/' || storage.objects.name)
            AND p.auth_user_id = auth.uid()
        )
    );

