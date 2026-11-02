# SHASHWAT HOSPITAL — PROJECT HANDOVER MANUAL

## 1. Project Overview & Verified Architecture

- **Project Name:** Shashwat Hospital Web Platform (`shashwat-hospital`)
- **Framework:** Next.js 14.2.15 (App Router with React Server Components and Client Components)
- **Frontend Architecture:** React 18.3.1, TailwindCSS 3.4.14, Lucide React 0.453.0, Canvas Confetti 1.9.4
- **Styling Architecture:** Custom dark glassmorphic design system (`#0B132B` background, `#0B172A` / `#0B2545` panels, `glass-panel` backdrop filters, and `gradient-text-teal` linear gradients)
- **Backend / Persistence:** Supabase PostgreSQL (`@supabase/supabase-js` 2.116.0, `@supabase/ssr` 0.12.7) with an automatic In-Memory Mock Fallback store in `lib/supabase/service.ts` when credentials are not configured.
- **Security & PII:** In-memory PII redactor (`lib/security.ts`), immutable append-only treatment notes architecture, and triple-surface cookie/session middleware (`middleware.ts`).
- **Data Integrity Protocol:** Strict No-Fabrication Policy via `lib/verify.ts` and `VERIFY_WITH_HOSPITAL` sentinels preventing rendering of unverified phone numbers, addresses, or doctor identities.

---

## 2. Directory Structure

```
shashwat-hospital-handover/
├── app/                              # Next.js 14 App Router routes & layouts
│   ├── layout.tsx                    # Root layout with Header, Footer, MobileActionBar, SiteLayoutWrapper
│   ├── page.tsx                      # Modern dark glassmorphic home page (17 interactive sections)
│   ├── globals.css                   # Tailwind directives, CSS variables, glassmorphism utilities
│   ├── sitemap.ts & robots.ts        # Dynamic XML sitemap and robots.txt SEO endpoints
│   ├── about/                        # Hospital overview & clinical leadership
│   ├── appointment/                  # Patient OPD consultation booking wizard
│   ├── conditions/ & conditions/[slug] # Orthopaedic condition clinical guides
│   ├── contact/                      # Hospital location, verified transit, and inquiries
│   ├── doctors/ & doctors/[slug]     # Orthopaedic medical directory
│   ├── facilities/                   # Modular OT, ICU, Digital X-Ray, Physio
│   ├── foot-and-ankle/               # Dedicated Foot & Ankle Clinic page
│   ├── privacy-policy/               # DPDP Act 2023 compliant data protection charter
│   ├── terms/                        # Clinical care terms, consent & medical disclaimers
│   ├── patient-rights/               # National Patients' Rights Charter (NABH/MOHFW)
│   ├── refund-policy/                # OPD & cancellation statutory policy
│   ├── grievance-redressal/          # Statutory Grievance Redressal Officer notice
│   ├── admin/                        # Hospital staff management portal (/admin/dashboard, /admin/login)
│   ├── doctor/                       # Doctor Clinical Portal (/doctor, /doctor/patients, /doctor/login)
│   ├── patient/                      # Patient Portal (/patient/portal, /patient/login)
│   └── api/                          # Server-side Route Handlers (11 REST endpoints)
├── components/                       # 37 React components (UI widgets, calculators, modal dialogs)
│   ├── admin/                        # Admin dashboard client, sidebar, and request slide-overs
│   ├── doctor/                       # Doctor clinical layout and patient treatment note drawer
│   └── (33 shared UI components)     # Hero, Orthotics analyzer, pain zone checker, wizard, etc.
├── data/                             # 10 centralized static data stores (~112 KB total)
│   ├── hospital.ts                   # Core hospital configuration with VERIFY_WITH_HOSPITAL guards
│   ├── doctors.ts                    # Orthopaedic doctor roster (placeholders guarded by verification)
│   ├── departments.ts                # 6 clinical orthopaedic sub-specialties
│   ├── treatments.ts                 # 12 surgical and conservative procedure pathways
│   ├── conditions.ts                 # 10 clinical conditions with symptoms and stages
│   ├── facilities.ts                 # Diagnostic & surgical infrastructure
│   ├── articles.ts                   # Patient educational articles & post-op rehab guides
│   ├── faqs.ts                       # Clinical & operational FAQs
│   ├── patientJourney.ts             # 5-stage patient journey roadmap
│   └── testimonials.ts               # Functional recovery case studies
├── lib/                              # Core utilities, services & business logic
│   ├── audit.ts                      # Immutable compliance audit log dispatch
│   ├── security.ts                   # PII sanitization (16 patterns redacted)
│   ├── site.ts                       # Canonical metadata configuration
│   ├── utils.ts                      # Tailwind cn() merger
│   ├── verify.ts                     # isVerified() and getVerifiedString() guards
│   ├── i18n/                         # Multilingual translations (English, Hindi, Marathi)
│   ├── notifications/                # Multi-channel alerts (Email via Resend, WhatsApp via Meta, WebPush)
│   └── supabase/                     # client.ts, server.ts, service.ts, auth-helper.ts
├── public/                           # Static assets & PWA manifest.json
├── scripts/                          # verify-security.js API security test runner
├── supabase/                         # schema.sql (10 tables, 17 RLS policies, triggers)
├── types/                            # database.ts TypeScript type definitions
├── .env.example                      # Safe template of environment variable names
├── .eslintrc.json & tsconfig.json    # TypeScript and ESLint configs
├── next.config.mjs                   # Next.js configuration
├── package.json & package-lock.json  # NPM dependency declarations
└── .git/                             # Original Git repository history
```

---

## 3. Required Environment Variables

Place these in `.env.local` for development and production. See `.env.example` for the full placeholder file.

| Variable Name | Purpose | Required For |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemaps, OpenGraph, and OAuth redirects | Production & SEO |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API endpoint (`https://<project-id>.supabase.co`) | Real Database & Auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anonymous API key | Client-side queries & Auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase elevated service-role key | Admin API & server queries |
| `RESEND_API_KEY` | Resend API key for appointment notification emails | Transactional Email |
| `HOSPITAL_ALERT_EMAIL` | Desk inbox receiving instant appointment alerts | Staff Notifications |
| `HOSPITAL_FROM_EMAIL` | Verified sending domain email address | Outbound Patient Emails |
| `WHATSAPP_ACCESS_TOKEN` | Meta Graph API access token for WhatsApp messages | WhatsApp Notifications |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp Cloud API registered Phone Number ID | WhatsApp Outbound |
| `WHATSAPP_TEMPLATE_NAME` | Pre-approved WhatsApp template name | WhatsApp Outbound |
| `TEST_BASE_URL` | Target URL for automated integration scripts (default: `http://localhost:3000`) | Security Test Runner |

*Note: If Supabase variables are omitted or retain placeholder values (`your-project`), the application automatically activates its in-memory fallback store in `lib/supabase/service.ts` allowing local UI testing without external database dependencies.*

---

## 4. Setup & Run Instructions

### Prerequisites
- **Node.js**: Version 18.17.0 or higher (v20.x LTS strongly recommended).
- **npm**: Version 9.x or higher (or pnpm / yarn).
- **Git**: Installed and added to system PATH.

### Installation
```bash
# Navigate to the project root
cd shashwat-hospital-handover

# Install exact declared dependencies
npm install
```

### Development Server
```bash
# Start Next.js development server
npm run dev
# The application will be accessible at http://localhost:3000
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### Linting & Type Checking
```bash
# Run ESLint validation
npm run lint

# Run standalone TypeScript type-check
npx tsc --noEmit
```

### Running the API Security Suite
```bash
# 1. Start the server in another terminal (npm run dev or npm run start)
# 2. Execute the verification script:
node scripts/verify-security.js
```

---

## 5. Database Setup & Migration Instructions

The project uses Supabase PostgreSQL. All database DDL is centralized in `supabase/schema.sql`.

### To provision a fresh Supabase database:
1. Log into your [Supabase Dashboard](https://supabase.com).
2. Create a new PostgreSQL project.
3. Open the **SQL Editor** in your Supabase dashboard.
4. Copy the entire contents of `supabase/schema.sql` and run it in the SQL Editor.
5. This script creates:
   - 3 Custom ENUMs (`appointment_status`, `triage_level`, `user_role`).
   - 10 Tables (`staff_roles`, `patients`, `appointments`, `second_opinions`, `doctor_patient_access`, `visits`, `treatment_notes`, `patient_reports`, `triage_records`, `audit_logs`).
   - 12 Performance indexes on foreign keys and date lookups.
   - 17 Row Level Security (RLS) policies enforcing multi-tenant isolation between admin, doctors, and patients.
   - Database triggers for `updated_at` automation and an audit log insertion trigger.
   - Strict append-only constraints (`REVOKE UPDATE, DELETE ON treatment_notes`) protecting medical records.
6. Retrieve your Project URL, Anon Key, and Service Role Key from **Project Settings > API**, and paste them into `.env.local`.

---

## 6. Known Architectural Limitations & Critical Notes

1. **Development Host Limitations:**
   The development host machine does not have Node.js, npm, or Git installed in its system PATH. All dependencies and build steps must be executed in an environment with Node.js 18+ installed.

2. **In-Memory Fallback Volatility:**
   Without Supabase credentials, the app operates using an in-memory mock store. Any appointments submitted or patient records modified in fallback mode are stored in Node process memory and are lost whenever the server process restarts.

3. **Fallback Authentication Permissiveness:**
   In fallback mode (when Supabase credentials are not supplied), `/admin/login` and `/doctor/login` accept any email and password with length $\ge 4$ characters to facilitate local UI inspection. This must never be exposed to production without setting real Supabase environment variables.

4. **QuickAppointmentModal Submission:**
   The `QuickAppointmentModal` component renders a simulated appointment booking flow (fires confetti and outputs a mock queue token) without invoking `/api/appointments`. The full booking workflow is implemented in `components/AppointmentWizard.tsx` and `app/appointment/page.tsx`.

5. **No-Fabrication Policy:**
   All unverified hospital contact details, registration numbers, doctor photographs, and GPS coordinates remain set to `"VERIFY_WITH_HOSPITAL"`. The UI intentionally hides or protects these fields with `isVerified()`. Do not replace them with fictional numbers or fake addresses.
