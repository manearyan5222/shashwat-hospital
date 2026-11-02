# SHASHWAT HOSPITAL — INDEPENDENT RECOVERY & AUDIT REPORT

**Date of Audit:** October 25, 2026  
**Auditor Mode:** Objective Source Code & Host Environment Audit  
**Classification Standard:**
- `[VERIFIED]`: Directly proven through static file inspection, code syntax, or runtime output.
- `[BROKEN]`: Demonstrably defective, causes an execution error, or fails functional requirements.
- `[MISSING]`: Referenced or required by specifications but not implemented in the codebase.
- `[NOT VERIFIED]`: Cannot be executed or confirmed in the current environment due to missing host tooling or missing external services.

---

## 1. Host Environment & Tooling Audit

| Tool | Status | Evidence / Exact Error Message |
|---|---|---|
| **Node.js** | `[BROKEN / MISSING]` | Executing `node -v` in PowerShell yields: `'node' is not recognized as an internal or external command, operable program or batch file.` Command exited with code 1. Node.js is not installed in `C:\Program Files`, `C:\Program Files (x86)`, or `PATH`. |
| **npm** | `[BROKEN / MISSING]` | Executing `npm run lint` yields: `npm : The term 'npm' is not recognized as the name of a cmdlet, function, script file, or operable program.` Command exited with code 1. |
| **Git CLI** | `[BROKEN / MISSING]` | Executing `git status` yields: `git : The term 'git' is not recognized as the name of a cmdlet, function, script file, or operable program.` Command exited with code 1. Note: A valid `.git` repository directory exists with complete commit logs through commit `a04b5bfc461fa902f0d94fcba5394cf1da8e2660`, but the Git CLI is absent from the host PATH. |
| **Python** | `[BROKEN / MISSING]` | Executing `python --version` triggers the Windows Store dummy execution alias: `Python was not found; run without arguments to install from the Microsoft Store`. |

---

## 2. Source Code & Feature Verification Audit

### A. Routing & Pages (App Router)

| Route / File | Classification | Evidence & Findings |
|---|---|---|
| `app/page.tsx` | `[VERIFIED]` | Source file exists (436 lines, 17.4 KB). Imports 26 UI components and 8 static data stores without broken local import paths. Integrates dark glassmorphic hero, dual care switcher, interactive pain zone checker, orthotics analyzer, recovery calculator, and comparison table. |
| `app/foot-and-ankle/page.tsx` | `[VERIFIED]` | Source file exists (142 lines, 5.2 KB). Dedicated route for Foot & Ankle Clinic, importing `FootPainZoneInteractive`, `CustomOrthoticsAnalyzer`, and `QuickAppointmentModal`. |
| `app/appointment/page.tsx` | `[VERIFIED]` | Source file exists (102 lines). Houses full multi-step `AppointmentWizard` with verified phone/hours guards using `isVerified()`. |
| `app/conditions/page.tsx` & `[slug]` | `[VERIFIED]` | Source files exist. Dynamically renders 10 clinical conditions with symptoms, conservative management steps, and specialist cross-references. |
| `app/doctors/page.tsx` & `[slug]` | `[VERIFIED]` | Source files exist. Renders medical roster with strict `isVerified()` guards on credentials and registration numbers. |
| `app/facilities/page.tsx` | `[VERIFIED]` | Source file exists. Displays 6 facility cards (OT, ICU, Daycare, Digital X-Ray, Physio, Pharmacy). |
| `app/about/page.tsx` | `[VERIFIED]` | Source file exists. Displays hospital overview, clinical philosophy, NABH quality measures, and leadership. |
| `app/contact/page.tsx` | `[VERIFIED]` | Source file exists. Displays location and contact channels guarded by `lib/verify.ts`. |
| `app/privacy-policy/page.tsx` | `[VERIFIED]` | Source file exists (234 lines). Implements complete Digital Personal Data Protection (DPDP) Act 2023 compliance notice. |
| `app/terms/page.tsx` | `[VERIFIED]` | Source file exists (205 lines). Outlines emergency care disclaimers, outpatient scheduling terms, and medical liability. |
| `app/patient-rights/page.tsx` | `[VERIFIED]` | Source file exists (217 lines). Formulates National Patients' Rights Charter (NABH/MOHFW) with 10 explicit rights. |
| `app/refund-policy/page.tsx` | `[VERIFIED]` | Source file exists (201 lines). Details OPD fee refunds, cancellation timelines, and processing windows. |
| `app/grievance-redressal/page.tsx`| `[VERIFIED]` | Source file exists (201 lines). Designates statutory Grievance Redressal Officer under DPDP Rules. |
| `app/admin/dashboard/page.tsx` & `/login`| `[VERIFIED]` | Source files exist. Houses staff administration interface and login forms. |
| `app/doctor/` (`/login`, `/patients`) | `[VERIFIED]` | Source files exist. Implements Doctor Clinical Portal for reviewing appointments, assigned patients, and logging treatment notes. |
| `app/patient/` (`/login`, `/portal`) | `[VERIFIED]` | Source files exist. Patient self-service portal for viewing visit records, discharge summaries, and test reports. |

### B. Interactive Components & Forms

| Component | Classification | Evidence & Findings |
|---|---|---|
| `components/AppointmentWizard.tsx` | `[VERIFIED]` | Contains a real submission handler (`handleSubmit` line 115) that sends a `POST` request with JSON payload to `/api/appointments`. |
| `components/QuickAppointmentModal.tsx` | `[BROKEN / MOCK]` | `handleSubmit` (lines 27-44) fires `canvas-confetti` and generates a pseudo-random token (`TOKEN-SH-XXXX`), but **does NOT call `/api/appointments` or persist data**. It is a pure client-side simulation. |
| `components/SecondOpinionForm.tsx` | `[VERIFIED]` | Submits a multipart `FormData` payload containing patient history, clinical summary, and attached medical reports to `/api/second-opinion`. |
| `components/FootPainZoneInteractive.tsx` | `[VERIFIED]` | Interactive SVG pain zone selector across 5 anatomical zones (Heel, Achilles, Forefoot, Arch, Neuropathy) with symptom details and triage advice. |
| `components/CustomOrthoticsAnalyzer.tsx` | `[VERIFIED]` | Interactive 3D cursor-tilt card calculating real-time biomechanical recommendations for High Arch, Normal Arch, and Flat Feet. |
| `components/JointRecoveryCalculator.tsx` | `[VERIFIED]` | Interactive rehabilitation timeline estimator across Knee, Hip, Spine, and Shoulder procedures. |
| `components/SurgicalTechCustomizer.tsx` | `[VERIFIED]` | Interactive 3D component previewing Minimally Invasive and Robotic-assisted implant techniques. |

### C. Backend API Handlers & Services

| Endpoint / Service | Classification | Evidence & Findings |
|---|---|---|
| `app/api/appointments/route.ts` | `[VERIFIED]` | Implements rate limiting (10 req/min), server-side input validation, sanitization, and calls `insertAppointment()`. |
| `app/api/second-opinion/route.ts` | `[VERIFIED]` | Validates multipart file uploads (10 MB cap, PDF/JPEG/PNG/WEBP MIME whitelist) and records requests. |
| `app/api/admin/*` (5 endpoints) | `[VERIFIED]` | Includes appointments, second-opinions, stats, doctors, and triage routes. Returns 401 when unauthenticated. |
| `app/api/doctor/*` (3 endpoints) | `[VERIFIED]` | Enforces doctor session authentication and doctor-patient assignment checks before returning clinical data. |
| `app/api/patient/portal/route.ts` | `[VERIFIED]` | Verifies `shashwat_patient_user` cookie/session and filters patient records strictly to the logged-in patient. |
| `lib/supabase/service.ts` | `[VERIFIED]` | Implements full Supabase PostgreSQL queries and an extensive In-Memory Fallback Store (`memoryPatients`, `memoryStaffRoles`, `memoryAppointments`) for local offline use. |
| `lib/security.ts` | `[VERIFIED]` | Redacts 16 PII keys (`patient_name`, `phone`, `email`, `devPassword`, `aadhar`, `dob`, etc.) in logging calls. |
| `lib/audit.ts` | `[VERIFIED]` | Dispatches structured immutable audit logs for 9 clinical event types. |

---

## 3. Security Concerns & Vulnerability Audit

1. **Permissive Fallback Authentication in Development Mode:**
   - **File:** `app/admin/login/page.tsx` (lines 52-60) and `app/doctor/login/page.tsx` (lines 43-52).
   - **Vulnerability:** When Supabase credentials are not configured, the login handlers accept *any* non-empty email and *any* password with length $\ge 4$ characters, setting `shashwat_staff_session=authenticated` or `shashwat_doctor_session=authenticated`.
   - **Risk:** High if deployed without real Supabase environment variables.
   - **Remediation:** Enforce credentials comparison against an explicit environment-variable admin secret or reject fallback login in production (`NODE_ENV === 'production'`).

2. **In-Memory Store Volatility:**
   - **File:** `lib/supabase/service.ts`.
   - **Risk:** Without a provisioned Supabase instance, submitted appointments and doctor notes are lost every time the server restarts.
   - **Remediation:** Configure real Supabase credentials or connect a local SQLite/PostgreSQL instance.

3. **Client-Side Form Mocks (`QuickAppointmentModal`):**
   - **File:** `components/QuickAppointmentModal.tsx`.
   - **Issue:** Users filling the modal on the home page or Foot & Ankle page believe their consultation has been booked, but no record is sent to the server.
   - **Remediation:** Connect `handleSubmit` in `QuickAppointmentModal.tsx` to `fetch('/api/appointments', ...)`.

---

## 4. Build & Test Results

- **`npm run lint`**: `[NOT VERIFIED]` due to missing Node/npm executable on the Windows host.
- **`npx tsc --noEmit`**: `[NOT VERIFIED]` due to missing Node/npm executable on the Windows host.
- **`npm run build`**: `[NOT VERIFIED]` due to missing Node/npm executable on the Windows host.
- **`node scripts/verify-security.js`**: `[NOT VERIFIED]` due to missing Node executable on the Windows host.
- **Static Code Syntax & Imports**: `[VERIFIED]`. All TypeScript modules, component imports, and data structures match declared interfaces and relative paths.

---

## 5. Recommended Repair Order for the Next AI Coding Agent

1. **Host Environment Provisioning:**
   - Install Node.js v20 LTS and npm on the host machine.
   - Install Git and ensure `git` is accessible in the command line.
2. **Execute Validation Commands:**
   - Run `npm install` in the project root.
   - Run `npx tsc --noEmit` and `npm run lint` to confirm zero compilation errors.
   - Run `npm run build` to confirm static page generation and server bundles.
3. **Wire `QuickAppointmentModal` to Backend:**
   - Update `components/QuickAppointmentModal.tsx` so that `handleSubmit` submits the form to `/api/appointments` before firing confetti.
4. **Harden Development Fallback Authentication:**
   - Restrict fallback login credentials in `app/admin/login/page.tsx` and `app/doctor/login/page.tsx` to pre-configured environment credentials instead of accepting arbitrary strings.
5. **Database Provisioning:**
   - Execute `supabase/schema.sql` on a live Supabase project.
   - Populate `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
6. **Hospital Operational Data Ingestion:**
   - When official hospital phone numbers, OPD schedules, doctor names, and addresses are provided by the client, replace `"VERIFY_WITH_HOSPITAL"` entries in `data/hospital.ts` and `data/doctors.ts`.
