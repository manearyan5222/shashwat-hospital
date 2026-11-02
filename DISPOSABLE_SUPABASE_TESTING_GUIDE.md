# Disposable Supabase Integration & RLS Testing Guide

**Project:** Shashwat Hospital Handover (`C:\Users\91809\Downloads\shashwat-hospital-handover`)  
**Target Runner:** `scripts/verify-supabase-live.js`  
**Security Level:** High / Clinical Isolation  
**Scope:** Direct PostgreSQL Row-Level Security (RLS), Table Grants, Foreign Key Constraints, and Storage Policies.

---

## 1. Architectural Distinction Between Test Suites

| Attribute | Offline Security Suite (`scripts/verify-security.js`) | Live Supabase Runner (`scripts/verify-supabase-live.js`) |
| :--- | :--- | :--- |
| **Execution Environment** | Offline / Local development | Live Disposable Supabase project |
| **Authentication Mechanism** | Simulated session cookies (`shashwat_staff_session`, etc.) | **Real Supabase Auth JWTs** (`signInWithPassword`) |
| **Data Layer** | In-memory JavaScript arrays (`lib/supabase/service.ts`) | **Real PostgreSQL 15+ database** with active RLS |
| **Storage Layer** | Mock signed URLs (`data:application/pdf;base64...`) | **Real Supabase Storage Engine** (`storage.objects`) |
| **Purpose** | Sanitization checks, HTTP route guards, static AST bundle scans | **Cryptographic RLS isolation, table grants, FK cascades, storage access** |

> [!IMPORTANT]
> A passing result from `scripts/verify-security.js` does NOT constitute proof of database RLS security. Live database access controls are proven only when verified directly against PostgreSQL via `scripts/verify-supabase-live.js`.

---

## 2. Safety Guardrails & Environment Containment

The live test runner implements strict internal guardrails:

1. **Explicit Test Flag Requirement:**
   The runner will immediately abort unless `SHASHWAT_DISPOSABLE_TEST="true"` is set in the environment.
2. **Production URL Block:**
   The runner inspects the target project URL. If it contains `shashwathospital.com`, `prod`, `production`, `live-hospital`, or placeholder strings (`your-project`), it immediately throws an error and exits without sending network packets.
3. **Secret Redaction:**
   The runner masks keys and passwords in console logs (e.g. `eyJh...[REDACTED]`), preventing credentials from entering CI logs, screen recordings, or terminal histories.
4. **Synthetic Identities Only:**
   All Auth users are created under `@<timestamp>.shashwathospital.local`, and all phone numbers/records use synthetic test ranges (`98200...`).
5. **Deterministic Teardown:**
   All created entities are registered in an in-memory tracker and deleted in exact reverse dependency order upon completion, regardless of test pass or fail.

---

## 3. How to Execute Preflight Mode (Zero Network / Zero Mutation)

Before configuring any database or network connection, you can verify script syntax and safety checks locally:

```powershell
# Run preflight check
node scripts/verify-supabase-live.js --preflight
```

**Expected Preflight Output:**
```
==============================================================================
SHASHWAT HOSPITAL — LIVE SUPABASE INTEGRATION & RLS VERIFICATION
==============================================================================
Target Supabase URL : [NOT SET]
Anon Key            : [NOT SET]
Service Role Key    : [NOT SET]
Mode                : PREFLIGHT (Syntax & Configuration Check)
==============================================================================

ℹ️ [PREFLIGHT CHECK RESULT]: Missing or placeholder environment variables detected:
   - A valid HTTPS Supabase project URL is required (TEST_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL).
   - A valid Supabase anon key is required (TEST_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY).
   - A valid Supabase service-role key is required (TEST_SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY).

✅ [PREFLIGHT SUCCESS] Syntax verified. Runner is structurally sound and safely refused live execution without credentials.
```

---

## 4. Manual Pre-Live Checklist (Strict Human Approval Gates)

Before running the live suite, complete the following manual checkpoints:

- [ ] **Checkpoint 1 (Project Creation):** Create a fresh, disposable project in the Supabase Dashboard (e.g. `shashwat-audit-disposable`).
- [ ] **Checkpoint 2 (Schema Deployment):** In the Supabase SQL Editor for the disposable project, paste and execute the exact contents of `supabase/schema.sql`.
- [ ] **Checkpoint 3 (Storage Bucket Verification):** In Supabase Storage, confirm that buckets `second-opinion-reports` and `patient-reports` are created and marked `private`.
- [ ] **Checkpoint 4 (Credential Injection):** In a private PowerShell session, inject the disposable project credentials:
  ```powershell
  $env:SHASHWAT_DISPOSABLE_TEST = "true"
  $env:TEST_SUPABASE_URL = "https://<your-disposable-project-ref>.supabase.co"
  $env:TEST_SUPABASE_ANON_KEY = "<your-disposable-anon-key>"
  $env:TEST_SUPABASE_SERVICE_ROLE_KEY = "<your-disposable-service-role-key>"
  ```
- [ ] **Checkpoint 5 (Run Preflight with Credentials):**
  ```powershell
  node scripts/verify-supabase-live.js --preflight
  ```
  Confirm it reports `All safety guardrails and disposable environment variables are valid.`
- [ ] **Checkpoint 6 (Execute Live Suite):**
  ```powershell
  node scripts/verify-supabase-live.js
  ```
- [ ] **Checkpoint 7 (Post-Test Project Teardown):** Delete or pause the disposable project in the Supabase Dashboard after reviewing test evidence.
