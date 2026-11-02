# SHASHWAT HOSPITAL — FILE INVENTORY & CODEBASE MAP

This inventory documents all essential source files in the handover repository, their disk locations, sizes, and operational purposes.

---

## 1. Application Entry Points & Global Configuration

| Path | Size | Purpose |
|---|---|---|
| `app/layout.tsx` | 2.5 KB | Root App Router layout. Mounts HTML shell, metadata, `Header`, `Footer`, `MobileActionBar`, and `SiteLayoutWrapper`. |
| `app/page.tsx` | 17.4 KB | Primary public landing page. Features 17 dark glassmorphic sections including Tara-inspired dual care switcher, hero, pain zone checker, and orthotics analyzer. |
| `app/globals.css` | 2.1 KB | Global styles, Tailwind directives, dark mode colors (`#0B132B`), glassmorphic panel classes (`glass-panel`), and text gradient utilities. |
| `next.config.mjs` | 332 B | Next.js runtime configuration. |
| `tailwind.config.ts` | 2.0 KB | Custom Tailwind configuration declaring clinical color palettes (`navy`, `teal`, `coral`, `surface`), font families, and container breakpoints. |
| `tsconfig.json` | 574 B | TypeScript compilation rules with path alias `@/*` mapped to `./*`. |
| `middleware.ts` | 7.1 KB | Triple-surface route guard protecting `/admin/*`, `/doctor/*`, and `/patient/*` routes with Supabase session tokens or local dev cookie fallbacks. |
| `package.json` | 830 B | Package manifests declaring dependencies (Next.js 14, React 18, Supabase, Tailwind, Lucide, Canvas Confetti). |
| `.env.example` | 950 B | Sanitized template of required environment variable names with safe placeholders. |

---

## 2. Public Pages & Clinical Routes (`app/`)

| Path | Size | Operational Purpose |
|---|---|---|
| `app/appointment/page.tsx` | 4.6 KB | OPD consultation booking page embedding the multi-step `AppointmentWizard`. |
| `app/foot-and-ankle/page.tsx` | 5.2 KB | Dedicated sub-specialty landing page for Foot & Ankle Orthopaedics and podiatric biomechanics. |
| `app/conditions/page.tsx` | 3.1 KB | Clinical conditions directory cataloging 10 orthopaedic diagnoses. |
| `app/conditions/[slug]/page.tsx` | 13.7 KB | Dynamic condition guide providing symptoms, severity grades, conservative treatments, and specialist recommendations. |
| `app/doctors/page.tsx` | 5.8 KB | Medical roster page with specialty filtering and doctor cards. |
| `app/doctors/[slug]/page.tsx` | 10.4 KB | Individual doctor profiles showing qualifications, sub-specialty focus, and OPD consultation schedules. |
| `app/treatments/page.tsx` | 3.4 KB | Surgical and non-operative procedure directory. |
| `app/treatments/[slug]/page.tsx` | 13.5 KB | Step-by-step treatment pathway guides detailing pre-op preparation, surgical approach, and recovery timeline. |
| `app/facilities/page.tsx` | 4.8 KB | Hospital infrastructure showcase (Modular OTs, Intensive Care, Digital Diagnostics). |
| `app/about/page.tsx` | 9.3 KB | Institutional background, NABH infection control standards, and hospital mission. |
| `app/contact/page.tsx` | 8.0 KB | Hospital location, verified transit routes, parking instructions, and contact form. |
| `app/privacy-policy/page.tsx` | 10.4 KB | Statutory DPDP Act 2023 data protection policy and patient consent terms. |
| `app/terms/page.tsx` | 9.8 KB | Hospital service terms, medical disclaimers, and admission guidelines. |
| `app/patient-rights/page.tsx` | 11.2 KB | National Patients' Rights Charter (NABH/MOHFW) detailing 10 fundamental patient rights. |
| `app/refund-policy/page.tsx` | 9.6 KB | OPD consultation refund, rescheduling, and cancellation policies. |
| `app/grievance-redressal/page.tsx`| 9.9 KB | Statutory Grievance Redressal Officer designation under DPDP Rules. |
| `app/sitemap.ts` | 3.1 KB | Dynamic XML sitemap generator generating URLs for all static and dynamic routes. |
| `app/robots.ts` | 280 B | SEO crawler rules permitting public indexing while disallowing `/admin/`, `/doctor/`, `/patient/`, and `/api/`. |

---

## 3. Hospital Portals (`app/admin/`, `app/doctor/`, `app/patient/`)

| Path | Size | Operational Purpose |
|---|---|---|
| `app/admin/login/page.tsx` | 7.8 KB | Staff authentication page supporting Supabase Auth and local preview fallback. |
| `app/admin/dashboard/page.tsx` | 1.4 KB | Server component wrapping `AdminDashboardClient` for staff administration. |
| `app/doctor/login/page.tsx` | 7.3 KB | Doctor portal authentication page. |
| `app/doctor/page.tsx` | 7.3 KB | Doctor home page displaying daily appointment queues and quick clinical actions. |
| `app/doctor/patients/page.tsx` | 4.7 KB | Doctor patient directory listing assigned patients and visit histories. |
| `app/doctor/patients/[id]/page.tsx`| 18.5 KB | Doctor clinical record view showing visit history, reports, and append-only treatment note creation form. |
| `app/patient/login/page.tsx` | 7.6 KB | Patient portal login supporting registered mobile number and password. |
| `app/patient/portal/page.tsx` | 12.3 KB | Patient self-service portal displaying upcoming consultations, visit history, and downloadable clinical reports. |

---

## 4. API Endpoints (`app/api/`)

| Path | Size | Method | Operational Purpose |
|---|---|---|---|
| `app/api/appointments/route.ts` | 5.0 KB | `POST` | Public appointment booking endpoint with rate limiting, input sanitization, and database insertion. |
| `app/api/second-opinion/route.ts` | 6.8 KB | `POST` | Multipart second opinion request handler supporting medical report attachments up to 10 MB. |
| `app/api/admin/appointments/route.ts`| 2.2 KB | `GET`, `PATCH` | Staff endpoint to list and update appointment statuses (`confirmed`, `completed`, `cancelled`). Protected. |
| `app/api/admin/second-opinions/route.ts`| 2.2 KB | `GET`, `PATCH`| Staff endpoint to list second opinion requests. Protected. |
| `app/api/admin/stats/route.ts` | 1.6 KB | `GET` | Dashboard KPI metrics aggregator. Protected. |
| `app/api/admin/doctors/route.ts` | 2.6 KB | `GET`, `POST` | Medical staff directory management endpoint. Protected. |
| `app/api/admin/triage/route.ts` | 1.4 KB | `POST` | Automated clinical priority assignment endpoint. Protected. |
| `app/api/doctor/patients/route.ts` | 1.2 KB | `GET` | Doctor patient roster query endpoint. Protected. |
| `app/api/doctor/patients/[id]/route.ts`| 2.7 KB | `GET` | Clinical patient record and history endpoint. Protected. |
| `app/api/doctor/notes/route.ts` | 2.2 KB | `POST` | Append-only clinical treatment note submission endpoint. Protected. |
| `app/api/patient/auth/login/route.ts`| 3.3 KB | `POST` | Patient credential validation and session cookie provisioning endpoint. |
| `app/api/patient/portal/route.ts` | 2.1 KB | `GET` | Authenticated patient records retrieval endpoint. Protected. |

---

## 5. UI Components (`components/`)

| Path | Size | Operational Purpose |
|---|---|---|
| `components/TaraHospitalHero.tsx` | 12.7 KB | Tara-inspired hero with live clinical mode switcher, ambient gradients, and rapid appointment CTA. |
| `components/TaraDualCare.tsx` | 6.3 KB | Interactive dual-care switcher between OPD Specialty Care and 24/7 Emergency Wing. |
| `components/FootPainZoneInteractive.tsx` | 9.9 KB | Mississauga Foot Clinic inspired interactive pain zone checker (5 anatomical zones). |
| `components/CustomOrthoticsAnalyzer.tsx` | 9.9 KB | 3D cursor-tilt dynamic foot arch and custom orthotics prescription simulator. |
| `components/JointRecoveryCalculator.tsx` | 9.9 KB | Interactive rehabilitation timeline estimator across 4 joint procedures. |
| `components/SurgicalTechCustomizer.tsx` | 10.7 KB | Interactive 3D previewer for Minimally Invasive and Robotic-assisted orthopaedic techniques. |
| `components/HospitalSecuritySection.tsx`| 6.8 KB | 3-pillar safety grid (NABH sterilization, Board-certified surgeons, Clear pricing). |
| `components/HospitalComparisonTable.tsx`| 5.6 KB | Clinical comparison matrix comparing Shashwat Hospital to general nursing homes and corporate chains. |
| `components/QuickAppointmentModal.tsx` | 9.3 KB | Fast-track consultation booking modal with `canvas-confetti` celebration (pure UI mock). |
| `components/AppointmentWizard.tsx` | 20.5 KB | 5-step OPD consultation booking wizard connected to `/api/appointments`. |
| `components/SecondOpinionForm.tsx` | 10.4 KB | Guided second opinion submission form with document upload support. |
| `components/DoctorCard.tsx` | 3.3 KB | Doctor roster card with credential display guarded by `isVerified()`. |
| `components/DoctorFinder.tsx` | 6.7 KB | Client-side search and specialty filtering interface for orthopaedic doctors. |
| `components/Header.tsx` | 15.8 KB | Responsive navigation bar with specialty dropdowns, mobile navigation drawer, and emergency hotline. |
| `components/Footer.tsx` | 11.0 KB | Comprehensive footer with verified hospital coordinates, clinical disclaimers, and statutory policy links. |
| `components/EmergencyBanner.tsx` | 2.4 KB | Prominent 24/7 Emergency & Trauma banner with verified phone link guards. |
| `components/MobileActionBar.tsx` | 3.2 KB | Fixed mobile bottom bar with Call, WhatsApp, Directions, and Appointment quick-action buttons. |
| `components/JsonLd.tsx` | 3.2 KB | Structured schema.org JSON-LD generators (Hospital, Physician, FAQPage, MedicalBusiness). |
| `components/LanguageSwitcher.tsx` | 2.2 KB | Multilingual UI locale selector (English, Hindi, Marathi). |
| `components/admin/AdminDashboardClient.tsx`| 34.1 KB | Client-side admin console for reviewing queues, updating statuses, and triaging patients. |
| `components/admin/AdminSidebar.tsx` | 8.3 KB | Staff navigation sidebar with badge counts and active tab indicators. |
| `components/admin/RequestDetailSlideOver.tsx`| 16.2 KB| Slide-over drawer displaying clinical request metadata and status action buttons. |
| `components/doctor/DoctorLayout.tsx` | 6.3 KB | Doctor clinical portal layout with authenticated session header. |

---

## 6. Data Stores (`data/`)

| Path | Size | Operational Purpose |
|---|---|---|
| `data/hospital.ts` | 4.8 KB | Hospital contact numbers, address, timings, and accreditations guarded with `VERIFY_WITH_HOSPITAL`. |
| `data/doctors.ts` | 10.4 KB | Roster of 4 orthopaedic specialist profiles with guarded registration numbers and schedules. |
| `data/departments.ts` | 6.4 KB | 6 orthopaedic departments (Joint Replacement, Sports Medicine, Spine, Foot & Ankle, Pediatric, Trauma). |
| `data/treatments.ts` | 31.5 KB | 12 treatment pathways (Total Knee Replacement, ACL Reconstruction, Lumbar Spine, etc.). |
| `data/conditions.ts` | 27.1 KB | 10 condition guides (Knee Osteoarthritis, ACL Tear, Sciatica, Plantar Fasciitis, etc.). |
| `data/facilities.ts` | 6.5 KB | 6 medical facility specifications. |
| `data/articles.ts` | 12.5 KB | Patient educational guides and post-operative recovery articles. |
| `data/faqs.ts` | 3.4 KB | 12 clinical and administrative FAQs. |
| `data/patientJourney.ts` | 5.1 KB | 5-stage patient care journey (Consultation -> Diagnostics -> Surgery -> Inpatient -> Rehab). |
| `data/testimonials.ts` | 3.7 KB | Case studies documenting patient functional outcomes. |

---

## 7. Business Logic, Security & Database Layers

| Path | Size | Operational Purpose |
|---|---|---|
| `lib/supabase/client.ts` | 456 B | Client-side Supabase browser client using `@supabase/ssr`. |
| `lib/supabase/server.ts` | 1.1 KB | Server-side Supabase client reading Next.js server cookies. |
| `lib/supabase/service.ts` | 27.0 KB | Complete Supabase data service with comprehensive in-memory mock fallback store for offline testing. |
| `lib/supabase/auth-helper.ts` | 6.6 KB | Session validation and staff role authorization helper functions. |
| `lib/security.ts` | 2.5 KB | PII scrubbing utility redacting 16 sensitive data patterns before logging. |
| `lib/audit.ts` | 2.0 KB | Clinical audit logging utility dispatching events to Supabase `audit_logs` or secure logs. |
| `lib/verify.ts` | 831 B | Core No-Fabrication verification guard functions `isVerified()` and `getVerifiedString()`. |
| `lib/i18n/translations.ts` | 6.5 KB | UI dictionary supporting English, Hindi, and Marathi translations. |
| `lib/notifications/email.ts` | 4.0 KB | Email notification dispatch via Resend API with safe fallbacks. |
| `lib/notifications/whatsapp.ts`| 3.2 KB | WhatsApp Cloud API message dispatcher with phone number cleaning. |
| `lib/notifications/webpush.ts` | 1.0 KB | Web push notification dispatcher. |
| `supabase/schema.sql` | 13.8 KB | Complete PostgreSQL DDL (10 tables, 3 ENUMs, 17 RLS policies, indexes, and triggers). |
| `types/database.ts` | 3.1 KB | TypeScript interfaces for all database tables and clinical data models. |
| `scripts/verify-security.js` | 5.9 KB | Automated integration test script testing API route security and unauthenticated 401 returns. |
