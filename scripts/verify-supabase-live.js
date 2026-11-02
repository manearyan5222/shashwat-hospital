/**
 * ==============================================================================
 * SHASHWAT HOSPITAL — DISPOSABLE SUPABASE LIVE INTEGRATION & RLS RUNNER
 * ==============================================================================
 * 
 * PURPOSE:
 * Directly tests Row Level Security (RLS), Table Grants, Foreign Key Constraints,
 * and Supabase Storage Policies against an isolated, disposable Supabase project.
 * 
 * IMPORTANT ARCHITECTURAL DISTINCTION:
 * - `scripts/verify-security.js` is the offline HTTP/mock test suite. It uses
 *   in-memory mock stores and mock cookies and CANNOT verify live PostgreSQL RLS.
 * - This runner (`scripts/verify-supabase-live.js`) uses real Supabase Auth
 *   sessions and JWT tokens to verify live database access controls.
 * 
 * SAFETY CONTROLS & ENVIRONMENT GUARD:
 * - Requires explicit `SHASHWAT_DISPOSABLE_TEST="true"` in the environment.
 * - Refuses execution if URL points to a production domain or contains placeholder values.
 * - Never prints or leaks secrets, API keys, or JWT tokens in console output.
 * - Uses strictly synthetic identities (`@shashwathospital.local`) and dummy files.
 * - Cleans up all created entities in reverse dependency order without touching the project.
 * ==============================================================================
 */

const { createClient } = require("@supabase/supabase-js");

// ------------------------------------------------------------------------------
// 1. Safety & Environment Guardrails
// ------------------------------------------------------------------------------

const isExplicitTestMode = process.env.SHASHWAT_DISPOSABLE_TEST === "true";
const isPreflightOnly = process.argv.includes("--preflight");
const isCleanupOnly = process.argv.includes("--cleanup-only");

const supabaseUrl = process.env.TEST_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.TEST_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const appBaseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

function maskSecret(val) {
  if (!val || typeof val !== "string") return "[NOT SET]";
  if (val.length < 12) return "[REDACTED]";
  return `${val.slice(0, 6)}...${val.slice(-4)}`;
}

function validateEnvironment() {
  const issues = [];

  if (!isExplicitTestMode && !isPreflightOnly) {
    issues.push("SHASHWAT_DISPOSABLE_TEST must be set to 'true' to execute live tests.");
  }

  if (!supabaseUrl || !supabaseUrl.startsWith("https://")) {
    issues.push("A valid HTTPS Supabase project URL is required (TEST_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL).");
  }

  if (supabaseUrl && (supabaseUrl.includes("your-project") || supabaseUrl.includes("placeholder"))) {
    issues.push("Supabase URL contains placeholder text. Configure a real disposable project URL.");
  }

  // Safety check against production URLs
  const forbiddenProductionTokens = [
    "shashwathospital.com",
    "prod",
    "production",
    "live-hospital",
  ];
  if (supabaseUrl && forbiddenProductionTokens.some((tok) => supabaseUrl.toLowerCase().includes(tok))) {
    issues.push(`Target URL matches forbidden production identifier (${supabaseUrl}). Aborting to protect live environment.`);
  }

  if (!supabaseAnonKey || supabaseAnonKey.includes("placeholder")) {
    issues.push("A valid Supabase anon key is required (TEST_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY).");
  }

  if (!supabaseServiceKey || supabaseServiceKey.includes("placeholder")) {
    issues.push("A valid Supabase service-role key is required (TEST_SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY).");
  }

  return issues;
}

// ------------------------------------------------------------------------------
// 2. State & Entity Tracker for Deterministic Teardown
// ------------------------------------------------------------------------------

const trackedEntities = {
  authUsers: [], // Array of user UUIDs
  treatmentNotes: [], // Array of note UUIDs
  patientReports: [], // Array of report UUIDs
  storageObjects: [], // Array of { bucket: string, path: string }
  visits: [], // Array of visit UUIDs
  doctorAccess: [], // Array of { doctorId: string, patientId: string }
  patients: [], // Array of patient UUIDs
  staffRoles: [], // Array of user UUIDs
  secondOpinions: [], // Array of second opinion request UUIDs
  appointments: [], // Array of appointment intake UUIDs
};

// ------------------------------------------------------------------------------
// 3. Test Runner Implementation
// ------------------------------------------------------------------------------

async function runLiveSecurityVerification() {
  console.log("==============================================================================");
  console.log("SHASHWAT HOSPITAL — LIVE SUPABASE INTEGRATION & RLS VERIFICATION");
  console.log("==============================================================================");
  console.log(`Target Supabase URL : ${supabaseUrl ? supabaseUrl.replace(/https:\/\/(.{4}).*(\..*)/, "https://$1***$2") : "[NOT SET]"}`);
  console.log(`Anon Key            : ${maskSecret(supabaseAnonKey)}`);
  console.log(`Service Role Key    : ${maskSecret(supabaseServiceKey)}`);
  console.log(`Mode                : ${isPreflightOnly ? "PREFLIGHT (Syntax & Configuration Check)" : "LIVE TEST"}`);
  console.log("==============================================================================\n");

  const envIssues = validateEnvironment();

  if (isPreflightOnly) {
    if (envIssues.length > 0) {
      console.log("ℹ️ [PREFLIGHT CHECK RESULT]: Missing or placeholder environment variables detected:");
      envIssues.forEach((issue) => console.log(`   - ${issue}`));
      console.log("\n✅ [PREFLIGHT SUCCESS] Syntax verified. Runner is structurally sound and safely refused live execution without credentials.");
      process.exit(0);
    } else {
      console.log("✅ [PREFLIGHT SUCCESS] All safety guardrails and disposable environment variables are valid.");
      console.log("Ready to execute live suite when authorized with explicit confirmation.");
      process.exit(0);
    }
  }

  if (envIssues.length > 0) {
    console.error("❌ [FATAL PRE-CHECK ERROR] Live execution blocked by safety checks:");
    envIssues.forEach((issue) => console.error(`   - ${issue}`));
    console.error("\nAborting without network calls or database modifications.");
    process.exit(1);
  }

  // Initialize Admin Service Role Client (strictly for setup, privileged verification, and teardown)
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const runId = Date.now().toString().slice(-6);
  const syntheticDomain = `test-run-${runId}.shashwathospital.local`;
  const defaultUserPassword = `TestSecret_${runId}_!2026`;

  let totalPassed = 0;
  let totalFailed = 0;

  function assertResult(testId, persona, operation, expected, actual, isPass, errorCode = null) {
    const statusIcon = isPass ? "✅ [PASS]" : "❌ [FAIL]";
    const codeTag = errorCode ? ` (Code: ${errorCode})` : "";
    console.log(`${statusIcon} ${testId} | ${persona} | ${operation}`);
    console.log(`       Expected: ${expected}`);
    console.log(`       Actual  : ${actual}${codeTag}`);
    if (isPass) {
      totalPassed++;
    } else {
      totalFailed++;
    }
  }

  // Helper to create an isolated user in auth.users and record for teardown
  async function createSyntheticUser(emailPrefix) {
    const email = `${emailPrefix}-${runId}@${syntheticDomain}`;
    const { data, error } = await serviceClient.auth.admin.createUser({
      email,
      password: defaultUserPassword,
      email_confirm: true,
    });
    if (error || !data?.user) {
      throw new Error(`Failed provisioning synthetic auth user ${email}: ${error?.message || "Unknown error"}`);
    }
    trackedEntities.authUsers.push(data.user.id);
    return { id: data.user.id, email, password: defaultUserPassword };
  }

  // Helper to authenticate a persona and return a client session
  async function createAuthenticatedClient(userCredentials) {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client.auth.signInWithPassword({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    if (error || !data?.session) {
      throw new Error(`Failed signing in persona ${userCredentials.email}: ${error?.message || "Unknown error"}`);
    }
    return client;
  }

  try {
    console.log("--- STAGE 1: SYNTHETIC AUTHENTICATION PROVISIONING ---");
    const userAdmin = await createSyntheticUser("admin");
    const userRecep = await createSyntheticUser("reception");
    const userDocAssigned = await createSyntheticUser("dr-assigned");
    const userDocUnassigned = await createSyntheticUser("dr-unassigned");
    const userPatientA = await createSyntheticUser("pat-a");
    const userPatientB = await createSyntheticUser("pat-b");
    console.log(`✅ Provisioned 6 synthetic Auth users in auth.users under @${syntheticDomain}\n`);

    console.log("--- STAGE 2: SEEDING RELATIONAL DATA (STRICT DEPENDENCY ORDER) ---");
    // 2.1 Staff Roles
    const { error: staffRolesErr } = await serviceClient.from("staff_roles").insert([
      { user_id: userAdmin.id, role: "admin", full_name: "Synthetic Test Admin" },
      { user_id: userRecep.id, role: "receptionist", full_name: "Synthetic Test Receptionist" },
      { user_id: userDocAssigned.id, role: "doctor", full_name: "Synthetic Dr. Assigned Specialist" },
      { user_id: userDocUnassigned.id, role: "doctor", full_name: "Synthetic Dr. Unassigned Specialist" },
    ]);
    if (staffRolesErr) throw staffRolesErr;
    trackedEntities.staffRoles.push(userAdmin.id, userRecep.id, userDocAssigned.id, userDocUnassigned.id);

    // 2.2 Core Patients
    const { data: patientAData, error: patAErr } = await serviceClient.from("patients").insert({
      full_name: "Synthetic Patient Alpha",
      phone: `98200${runId.slice(0, 5)}`,
      auth_user_id: userPatientA.id,
    }).select().single();
    if (patAErr) throw patAErr;
    trackedEntities.patients.push(patientAData.id);

    const { data: patientBData, error: patBErr } = await serviceClient.from("patients").insert({
      full_name: "Synthetic Patient Beta",
      phone: `98201${runId.slice(0, 5)}`,
      auth_user_id: userPatientB.id,
    }).select().single();
    if (patBErr) throw patBErr;
    trackedEntities.patients.push(patientBData.id);

    // 2.3 Doctor-Patient Access Junction (Assign Doctor 1 to Patient A only)
    const { error: accessErr } = await serviceClient.from("doctor_patient_access").insert({
      doctor_id: userDocAssigned.id,
      patient_id: patientAData.id,
      granted_by: userAdmin.id,
    });
    if (accessErr) throw accessErr;
    trackedEntities.doctorAccess.push({ doctorId: userDocAssigned.id, patientId: patientAData.id });

    // 2.4 Clinical Visits (Mandatory visit_date included)
    const { data: visitAData, error: visAErr } = await serviceClient.from("visits").insert({
      patient_id: patientAData.id,
      doctor_id: userDocAssigned.id,
      visit_date: "2026-11-01",
      visit_type: "consultation",
      diagnosis: "Synthetic Arthroscopic Evaluation",
    }).select().single();
    if (visAErr) throw visAErr;
    trackedEntities.visits.push(visitAData.id);

    const { data: visitBData, error: visBErr } = await serviceClient.from("visits").insert({
      patient_id: patientBData.id,
      doctor_id: userDocUnassigned.id,
      visit_date: "2026-11-02",
      visit_type: "consultation",
      diagnosis: "Synthetic Spine Consultation",
    }).select().single();
    if (visBErr) throw visBErr;
    trackedEntities.visits.push(visitBData.id);

    // 2.5 Treatment Notes (Append-only on visit A)
    const { data: noteData, error: noteErr } = await serviceClient.from("treatment_notes").insert({
      visit_id: visitAData.id,
      doctor_id: userDocAssigned.id,
      note_text: "Synthetic initial clinical assessment note. Strict append-only record.",
    }).select().single();
    if (noteErr) throw noteErr;
    trackedEntities.treatmentNotes.push(noteData.id);

    // 2.6 Storage Dummy Upload & Patient Report Record
    const dummyScanBuffer = Buffer.from("%PDF-1.4 Synthetic Scan Data Test Run", "utf-8");
    const scanStoragePath = `pat-a/scan_${runId}.pdf`;
    const fullReportFileUrl = `patient-reports/${scanStoragePath}`;

    const { error: storeUpErr } = await serviceClient.storage
      .from("patient-reports")
      .upload(scanStoragePath, dummyScanBuffer, { contentType: "application/pdf" });
    if (storeUpErr) throw storeUpErr;
    trackedEntities.storageObjects.push({ bucket: "patient-reports", path: scanStoragePath });

    const { data: reportData, error: repErr } = await serviceClient.from("patient_reports").insert({
      patient_id: patientAData.id,
      visit_id: visitAData.id,
      file_url: fullReportFileUrl,
      report_type: "X-Ray",
      uploaded_by: userDocAssigned.id,
    }).select().single();
    if (repErr) throw repErr;
    trackedEntities.patientReports.push(reportData.id);

    // 2.7 Second-Opinion Intake Storage File
    const soStoragePath = `second-opinion-intake/so_case_${runId}.pdf`;
    const fullSoUrl = `second-opinion-reports/${soStoragePath}`;
    const { error: soStoreErr } = await serviceClient.storage
      .from("second-opinion-reports")
      .upload(soStoragePath, dummyScanBuffer, { contentType: "application/pdf" });
    if (soStoreErr) throw soStoreErr;
    trackedEntities.storageObjects.push({ bucket: "second-opinion-reports", path: soStoragePath });

    const { data: soData, error: soErr } = await serviceClient.from("second_opinion_requests").insert({
      patient_name: "Synthetic Second Opinion Applicant",
      patient_phone: `98202${runId.slice(0, 5)}`,
      condition_category: "Orthopaedic",
      report_file_url: fullSoUrl,
    }).select().single();
    if (soErr) throw soErr;
    trackedEntities.secondOpinions.push(soData.id);

    console.log("✅ Seed records successfully populated across all relational tables and storage.\n");

    console.log("--- STAGE 3: ESTABLISHING PERSONA CLIENT SESSIONS ---");
    const anonClient = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
    const clientAdmin = await createAuthenticatedClient(userAdmin);
    const clientRecep = await createAuthenticatedClient(userRecep);
    const clientDocAssigned = await createAuthenticatedClient(userDocAssigned);
    const clientDocUnassigned = await createAuthenticatedClient(userDocUnassigned);
    const clientPatA = await createAuthenticatedClient(userPatientA);
    const clientPatB = await createAuthenticatedClient(userPatientB);
    console.log("✅ All 6 persona JWT client sessions authenticated successfully.\n");

    console.log("--- STAGE 4: EXECUTING LIVE RLS & STORAGE TEST SUITE ---");

    // -------------------------------------------------------------------------
    // Test 1: Anonymous Access Denial
    // -------------------------------------------------------------------------
    const { data: t1Data } = await anonClient.from("patients").select("*");
    assertResult("T01", "anon", "SELECT from public.patients", "0 rows (Filtered by RLS)", `${t1Data?.length || 0} rows`, t1Data?.length === 0);

    const { data: t2Data } = await anonClient.from("visits").select("*");
    assertResult("T02", "anon", "SELECT from public.visits", "0 rows (Filtered by RLS)", `${t2Data?.length || 0} rows`, t2Data?.length === 0);

    // -------------------------------------------------------------------------
    // Test 2: Public Appointment Intake Permitted
    // -------------------------------------------------------------------------
    const { data: t3Data, error: t3Err } = await anonClient.from("appointments").insert({
      patient_name: "Public Booking Test",
      patient_phone: `98203${runId.slice(0, 5)}`,
      department_id: "orthopaedics",
      preferred_date: "2026-11-10",
      preferred_time: "Morning",
    }).select().single();
    if (t3Data) trackedEntities.appointments.push(t3Data.id);
    assertResult("T03", "anon", "INSERT into public.appointments (Public Intake)", "Success (Row inserted)", t3Data ? "Row Inserted" : t3Err?.message, !t3Err && !!t3Data);

    // -------------------------------------------------------------------------
    // Test 3: Patient Record Isolation (IDOR Protection)
    // -------------------------------------------------------------------------
    const { data: t4Data } = await clientPatA.from("patients").select("*");
    const patAOwnCheck = t4Data?.length === 1 && t4Data[0].id === patientAData.id;
    assertResult("T04", "Patient A", "SELECT from public.patients", "Exactly 1 row (Patient A own record)", `${t4Data?.length || 0} rows`, patAOwnCheck);

    const { data: t5Data } = await clientPatA.from("patients").select("*").eq("id", patientBData.id);
    assertResult("T05", "Patient A", "SELECT Patient B record by ID (IDOR Attempt)", "0 rows (Silent RLS filter)", `${t5Data?.length || 0} rows`, t5Data?.length === 0);

    // -------------------------------------------------------------------------
    // Test 4: Patient Treatment Notes Visibility
    // -------------------------------------------------------------------------
    const { data: t6Data } = await clientPatA.from("treatment_notes").select("*");
    assertResult("T06", "Patient A", "SELECT own treatment notes", "Notes for Visit A returned", `${t6Data?.length || 0} rows`, (t6Data?.length || 0) >= 1);

    const { data: t7Data } = await clientPatB.from("treatment_notes").select("*");
    assertResult("T07", "Patient B", "SELECT Patient A treatment notes", "0 rows (Filtered by RLS)", `${t7Data?.length || 0} rows`, t7Data?.length === 0);

    // -------------------------------------------------------------------------
    // Test 5: Doctor Authorization Boundaries (Assigned vs Unassigned)
    // -------------------------------------------------------------------------
    const { data: t8Data } = await clientDocAssigned.from("patients").select("*").eq("id", patientAData.id);
    assertResult("T08", "Assigned Doctor", "SELECT assigned Patient A", "1 row returned", `${t8Data?.length || 0} rows`, t8Data?.length === 1);

    const { data: t9Data } = await clientDocAssigned.from("patients").select("*").eq("id", patientBData.id);
    assertResult("T09", "Assigned Doctor", "SELECT unassigned Patient B", "0 rows (Filtered by RLS)", `${t9Data?.length || 0} rows`, t9Data?.length === 0);

    const { data: t10Data } = await clientDocUnassigned.from("patients").select("*").eq("id", patientAData.id);
    assertResult("T10", "Unassigned Doctor", "SELECT Patient A", "0 rows (Filtered by RLS)", `${t10Data?.length || 0} rows`, t10Data?.length === 0);

    // -------------------------------------------------------------------------
    // Test 6: Treatment Note Immutability (Append-Only Enforcement)
    // -------------------------------------------------------------------------
    const { error: t11Err } = await clientDocAssigned.from("treatment_notes")
      .update({ note_text: "Malicious modification attempt" })
      .eq("id", noteData.id);
    const isUpdateDenied = t11Err && (t11Err.code === "42501" || t11Err.message?.includes("permission denied"));
    assertResult("T11", "Assigned Doctor", "UPDATE public.treatment_notes", "Permission Denied (Code 42501)", t11Err?.message || "Allowed", isUpdateDenied, t11Err?.code);

    const { error: t12Err } = await clientDocAssigned.from("treatment_notes")
      .delete()
      .eq("id", noteData.id);
    const isDeleteDenied = t12Err && (t12Err.code === "42501" || t12Err.message?.includes("permission denied"));
    assertResult("T12", "Assigned Doctor", "DELETE public.treatment_notes", "Permission Denied (Code 42501)", t12Err?.message || "Allowed", isDeleteDenied, t12Err?.code);

    // -------------------------------------------------------------------------
    // Test 7: Doctor Visit Deletion Protection (No DELETE Policy)
    // -------------------------------------------------------------------------
    const { data: t13Data, error: t13Err } = await clientDocAssigned.from("visits")
      .delete()
      .eq("id", visitAData.id)
      .select();
    const isDocVisitDelBlocked = (!t13Err && (!t13Data || t13Data.length === 0)) || (t13Err && t13Err.code === "42501");
    assertResult("T13", "Assigned Doctor", "DELETE public.visits", "0 rows modified / RLS Denial", `${t13Data?.length || 0} rows modified`, isDocVisitDelBlocked, t13Err?.code);

    // -------------------------------------------------------------------------
    // Test 8: Foreign Key Preservation (ON DELETE RESTRICT on visits)
    // -------------------------------------------------------------------------
    const { error: t14Err } = await clientAdmin.from("visits")
      .delete()
      .eq("id", visitAData.id);
    const isFkRestrictEnforced = t14Err && (t14Err.code === "23503" || t14Err.message?.includes("violates foreign key constraint"));
    assertResult("T14", "Admin", "DELETE visit having attached notes (ON DELETE RESTRICT)", "Foreign Key Violation (Code 23503)", t14Err?.message || "Visit deleted", isFkRestrictEnforced, t14Err?.code);

    // -------------------------------------------------------------------------
    // Test 9: Storage Permissions — Patient Diagnostic Scans
    // -------------------------------------------------------------------------
    const { data: t15Data, error: t15Err } = await clientPatA.storage
      .from("patient-reports")
      .download(scanStoragePath);
    assertResult("T15", "Patient A", "Download own scan from patient-reports", "200 Success (Binary stream)", t15Data ? "Success (Blob received)" : t15Err?.message, !t15Err && !!t15Data);

    const { data: t16Data, error: t16Err } = await clientPatB.storage
      .from("patient-reports")
      .download(scanStoragePath);
    const isPatBCrossStorageBlocked = t16Err && (
      t16Err.statusCode === 403 || t16Err.statusCode === "403" ||
      t16Err.statusCode === 404 || t16Err.statusCode === "404" ||
      t16Err.message?.includes("Access Denied") || t16Err.message?.includes("not found")
    );
    assertResult("T16", "Patient B", "Download Patient A scan from patient-reports", "403 Access Denied", t16Err?.message || "File downloaded", isPatBCrossStorageBlocked, t16Err?.statusCode);

    const { data: t17Data, error: t17Err } = await clientDocAssigned.storage
      .from("patient-reports")
      .download(scanStoragePath);
    assertResult("T17", "Assigned Doctor", "Download assigned Patient A scan", "200 Success", t17Data ? "Success" : t17Err?.message, !t17Err && !!t17Data);

    const { data: t18Data, error: t18Err } = await clientDocUnassigned.storage
      .from("patient-reports")
      .download(scanStoragePath);
    const isUnassignedDocStorageBlocked = t18Err && (
      t18Err.statusCode === 403 || t18Err.statusCode === "403" ||
      t18Err.statusCode === 404 || t18Err.statusCode === "404" ||
      t18Err.message?.includes("Access Denied") || t18Err.message?.includes("not found")
    );
    assertResult("T18", "Unassigned Doctor", "Download Patient A scan", "403 Access Denied", t18Err?.message || "File downloaded", isUnassignedDocStorageBlocked, t18Err?.statusCode);

    // -------------------------------------------------------------------------
    // Test 10: Storage Anonymous Direct Upload Denied
    // -------------------------------------------------------------------------
    const { data: t19Data, error: t19Err } = await anonClient.storage
      .from("patient-reports")
      .upload(`unauthorized_${runId}.pdf`, dummyScanBuffer);
    const isAnonUploadBlocked = t19Err && (
      t19Err.statusCode === 403 || t19Err.statusCode === "403" ||
      t19Err.statusCode === 404 || t19Err.statusCode === "404" ||
      t19Err.message?.includes("Access Denied") || t19Err.message?.includes("not found")
    );
    assertResult("T19", "anon", "Direct upload to patient-reports", "403 Access Denied", t19Err?.message || "Uploaded", isAnonUploadBlocked, t19Err?.statusCode);

    // -------------------------------------------------------------------------
    // Test 11: Second Opinion Storage Privacy
    // -------------------------------------------------------------------------
    const { data: t20Data, error: t20Err } = await clientPatA.storage
      .from("second-opinion-reports")
      .download(soStoragePath);
    const isPatSoDownloadBlocked = t20Err && (
      t20Err.statusCode === 403 || t20Err.statusCode === "403" ||
      t20Err.statusCode === 404 || t20Err.statusCode === "404" ||
      t20Err.message?.includes("Access Denied") || t20Err.message?.includes("not found")
    );
    assertResult("T20", "Patient A", "Download from second-opinion-reports", "403 Access Denied", t20Err?.message || "File downloaded", isPatSoDownloadBlocked, t20Err?.statusCode);

    const { data: t21Data, error: t21Err } = await clientRecep.storage
      .from("second-opinion-reports")
      .download(soStoragePath);
    assertResult("T21", "Receptionist", "Download from second-opinion-reports", "200 Success (Staff permission)", t21Data ? "Success" : t21Err?.message, !t21Err && !!t21Data);

    // -------------------------------------------------------------------------
    // Test 12: Second Opinion JSON Route File URL Nullification
    // -------------------------------------------------------------------------
    try {
      const endpointRes = await fetch(`${appBaseUrl}/api/second-opinion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: "Synthetic URL Injection Test",
          patientPhone: `98204${runId.slice(0, 5)}`,
          conditionCategory: "Joint Assessment",
          reportFileUrl: "https://attacker.site/malicious_payload.pdf",
        }),
      });

      if (endpointRes.ok) {
        const jsonBody = await endpointRes.json();
        // Privileged inspection using service client (never prints secrets)
        const { data: checkSoRow } = await serviceClient
          .from("second_opinion_requests")
          .select("id, report_file_url")
          .eq("id", jsonBody.id)
          .single();

        if (checkSoRow) trackedEntities.secondOpinions.push(checkSoRow.id);
        const isUrlNullified = checkSoRow && checkSoRow.report_file_url === null;
        assertResult("T22", "Client HTTP POST", "/api/second-opinion JSON with reportFileUrl", "report_file_url: null (Nullified in database)", checkSoRow?.report_file_url === null ? "null" : checkSoRow?.report_file_url, isUrlNullified);
      } else {
        assertResult("T22", "Client HTTP POST", "/api/second-opinion JSON with reportFileUrl", "HTTP 200", `HTTP ${endpointRes.status}`, false);
      }
    } catch (httpErr) {
      assertResult("T22", "Client HTTP POST", "/api/second-opinion JSON with reportFileUrl", "HTTP 200 from local Next.js server", `Server unreachable: ${httpErr.message}`, false);
      console.error(`       [ACTION REQUIRED] Start the local Next.js server ('npm run start') on ${appBaseUrl} before running live verification.`);
    }

  } catch (err) {
    console.error(`\n❌ [FATAL EXECUTION EXCEPTION]: ${err.message}`);
    totalFailed++;
  } finally {
    console.log("\n--- STAGE 5: DETERMINISTIC TEARDOWN (REVERSE DEPENDENCY CLEANUP) ---");
    await performCleanup(serviceClient);

    console.log("\n==============================================================================");
    console.log(`LIVE INTEGRATION VERIFICATION SUMMARY: ${totalPassed} PASSED, ${totalFailed} FAILED (Total Planned: 22)`);
    console.log("==============================================================================");

    if (totalFailed > 0 || totalPassed !== 22) {
      console.error("❌ [VERIFICATION INCOMPLETE OR FAILED] Security assertions cannot be confirmed until all 22 tests pass.");
      process.exit(1);
    } else {
      console.log("✅ ALL 22 LIVE RLS, ENGINE CONSTRAINT, AND STORAGE TESTS PASSED SUCCESSFULLY.");
      process.exit(0);
    }
  }
}

// ------------------------------------------------------------------------------
// 4. Teardown & Cleanup Function
// ------------------------------------------------------------------------------

async function performCleanup(client) {
  if (!client) return;
  console.log("Cleaning up created synthetic records in reverse dependency order...");

  // 1. Treatment notes
  for (const noteId of trackedEntities.treatmentNotes) {
    try {
      await client.from("treatment_notes").delete().eq("id", noteId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting treatment note ${noteId}: ${e.message}`);
    }
  }

  // 2. Patient reports & storage objects
  for (const reportId of trackedEntities.patientReports) {
    try {
      await client.from("patient_reports").delete().eq("id", reportId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting patient report ${reportId}: ${e.message}`);
    }
  }
  for (const obj of trackedEntities.storageObjects) {
    try {
      await client.storage.from(obj.bucket).remove([obj.path]);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed removing storage object ${obj.bucket}/${obj.path}: ${e.message}`);
    }
  }

  // 3. Clinical visits
  for (const visitId of trackedEntities.visits) {
    try {
      await client.from("visits").delete().eq("id", visitId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting visit ${visitId}: ${e.message}`);
    }
  }

  // 4. Doctor-patient access
  for (const grant of trackedEntities.doctorAccess) {
    if (grant?.doctorId && grant?.patientId) {
      try {
        await client.from("doctor_patient_access").delete()
          .eq("doctor_id", grant.doctorId)
          .eq("patient_id", grant.patientId);
      } catch (e) {
        console.warn(`[CLEANUP WARNING] Failed deleting doctor_patient_access: ${e.message}`);
      }
    }
  }

  // 5. Patients
  for (const patientId of trackedEntities.patients) {
    try {
      await client.from("patients").delete().eq("id", patientId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting patient ${patientId}: ${e.message}`);
    }
  }

  // 6. Staff roles
  for (const userId of trackedEntities.staffRoles) {
    try {
      await client.from("staff_roles").delete().eq("user_id", userId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting staff role for ${userId}: ${e.message}`);
    }
  }

  // 7. Second opinions & appointments
  for (const soId of trackedEntities.secondOpinions) {
    try {
      await client.from("second_opinion_requests").delete().eq("id", soId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting second opinion ${soId}: ${e.message}`);
    }
  }
  for (const aptId of trackedEntities.appointments) {
    try {
      await client.from("appointments").delete().eq("id", aptId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting appointment ${aptId}: ${e.message}`);
    }
  }

  // 8. Synthetic auth users (Removes user identity from auth.users)
  for (const authUserId of trackedEntities.authUsers) {
    try {
      await client.auth.admin.deleteUser(authUserId);
    } catch (e) {
      console.warn(`[CLEANUP WARNING] Failed deleting auth user ${authUserId}: ${e.message}`);
    }
  }

  console.log("✅ Teardown complete. All tracked synthetic records and storage objects purged.");
}

// Execute runner
runLiveSecurityVerification();
