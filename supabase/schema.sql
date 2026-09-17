-- ==============================================================================
-- SHASHWAT HOSPITAL — DATABASE SCHEMA
-- PostgreSQL schema for Appointments & Second-Opinion Patient Requests
-- ==============================================================================

-- 1. Status enum for request lifecycle triage
DO $$ BEGIN
    CREATE TYPE request_status AS ENUM ('new', 'contacted', 'confirmed', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Appointments Table
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
    staff_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Second Opinion Requests Table
CREATE TABLE IF NOT EXISTS public.second_opinion_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    condition_category TEXT NOT NULL,
    prior_diagnosis TEXT,
    reports_summary TEXT,
    report_file_url TEXT,
    status request_status DEFAULT 'new' NOT NULL,
    staff_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Indexes for fast dashboard query, search & filtering
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON public.appointments(patient_phone);
CREATE INDEX IF NOT EXISTS idx_appointments_department ON public.appointments(department_id);

CREATE INDEX IF NOT EXISTS idx_second_opinion_status ON public.second_opinion_requests(status);
CREATE INDEX IF NOT EXISTS idx_second_opinion_created_at ON public.second_opinion_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_second_opinion_phone ON public.second_opinion_requests(patient_phone);

-- 5. Auto-update timestamp triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_appointments_updated_at ON public.appointments;
CREATE TRIGGER set_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_second_opinion_updated_at ON public.second_opinion_requests;
CREATE TRIGGER set_second_opinion_updated_at
    BEFORE UPDATE ON public.second_opinion_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 6. Row Level Security (RLS) Policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.second_opinion_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public submissions (patients booking online)
DROP POLICY IF EXISTS "Public can submit appointment requests" ON public.appointments;
CREATE POLICY "Public can submit appointment requests"
    ON public.appointments
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit second opinion requests" ON public.second_opinion_requests;
CREATE POLICY "Public can submit second opinion requests"
    ON public.second_opinion_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated hospital staff full read/write access
DROP POLICY IF EXISTS "Staff can view appointments" ON public.appointments;
CREATE POLICY "Staff can view appointments"
    ON public.appointments
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Staff can update appointments" ON public.appointments;
CREATE POLICY "Staff can update appointments"
    ON public.appointments
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view second opinion requests" ON public.second_opinion_requests;
CREATE POLICY "Staff can view second opinion requests"
    ON public.second_opinion_requests
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Staff can update second opinion requests" ON public.second_opinion_requests;
CREATE POLICY "Staff can update second opinion requests"
    ON public.second_opinion_requests
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 7. Private Storage Bucket for Medical Reports (if files attached)
INSERT INTO storage.buckets (id, name, public)
VALUES ('second-opinion-reports', 'second-opinion-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can upload patient reports, authenticated staff can view/download
DROP POLICY IF EXISTS "Patients can upload medical scans" ON storage.objects;
CREATE POLICY "Patients can upload medical scans"
    ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'second-opinion-reports');

DROP POLICY IF EXISTS "Staff can access medical scans" ON storage.objects;
CREATE POLICY "Staff can access medical scans"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'second-opinion-reports');
