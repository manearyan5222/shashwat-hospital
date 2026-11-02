/**
 * SHASHWAT HOSPITAL — SECURITY & AUTHORIZATION AUDIT SUITE
 * 
 * Verifies:
 * 1. All 5 admin API endpoints return 401 when unauthenticated.
 * 2. Clinical patient & doctor routes return 401 without valid session.
 * 3. Authenticated admin responses (/api/admin/doctors, /api/admin/triage) contain
 *    ZERO devPassword or sensitive credential fields in their JSON payload.
 */

const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

function deepSearchKey(obj, targetKey) {
  if (!obj || typeof obj !== "object") return false;
  if (Array.isArray(obj)) {
    return obj.some((item) => deepSearchKey(item, targetKey));
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === targetKey) return true;
    if (typeof value === "object" && deepSearchKey(value, targetKey)) {
      return true;
    }
  }
  return false;
}

async function runTests() {
  console.log("=================================================");
  console.log("SHASHWAT HOSPITAL API SECURITY & SANITIZATION AUDIT");
  console.log("Target:", baseUrl);
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  async function assertStatus(name, url, options, expectedStatus) {
    try {
      const res = await fetch(`${baseUrl}${url}`, options);
      if (res.status === expectedStatus) {
        console.log(`✅ [PASS] ${name} -> ${res.status} (Expected ${expectedStatus})`);
        passed++;
        return await res.json().catch(() => null);
      } else {
        console.error(`❌ [FAIL] ${name} -> Got ${res.status} (Expected ${expectedStatus})`);
        failed++;
        return null;
      }
    } catch (err) {
      console.error(`❌ [FAIL] ${name} -> Network error: ${err.message}`);
      failed++;
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // 1. Unauthenticated Admin Route Tests (All must return 401)
  // -------------------------------------------------------------------------
  console.log("--- 1. UNAUTHENTICATED ADMIN API ENDPOINTS (MUST RETURN 401) ---");

  await assertStatus(
    "GET /api/admin/appointments (no session)",
    "/api/admin/appointments",
    { method: "GET" },
    401
  );

  await assertStatus(
    "GET /api/admin/second-opinions (no session)",
    "/api/admin/second-opinions",
    { method: "GET" },
    401
  );

  await assertStatus(
    "GET /api/admin/stats (no session)",
    "/api/admin/stats",
    { method: "GET" },
    401
  );

  await assertStatus(
    "GET /api/admin/doctors (no session)",
    "/api/admin/doctors",
    { method: "GET" },
    401
  );

  await assertStatus(
    "POST /api/admin/triage (no session)",
    "/api/admin/triage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: "apt-101" }),
    },
    401
  );

  // -------------------------------------------------------------------------
  // 2. Unauthenticated Clinical Endpoints (Must return 401)
  // -------------------------------------------------------------------------
  console.log("\n--- 2. UNAUTHENTICATED CLINICAL ENDPOINTS (MUST RETURN 401) ---");

  await assertStatus(
    "GET /api/patient/portal (no session)",
    "/api/patient/portal?patientId=pat-1001",
    { method: "GET" },
    401
  );

  await assertStatus(
    "GET /api/doctor/patients (no session)",
    "/api/doctor/patients",
    { method: "GET" },
    401
  );

  await assertStatus(
    "GET /api/doctor/patients/pat-1001 (no session)",
    "/api/doctor/patients/pat-1001",
    { method: "GET" },
    401
  );

  await assertStatus(
    "POST /api/doctor/notes (no session)",
    "/api/doctor/notes",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitId: "vis-101",
        noteText: "Unauthorized test note attempt",
      }),
    },
    401
  );

  // -------------------------------------------------------------------------
  // 3. Public Appointment Intake & Validation Tests (Synthetic Only)
  // -------------------------------------------------------------------------
  console.log("\n--- 3. PUBLIC APPOINTMENT INTAKE VALIDATION & PERSISTENCE ---");

  // Invalid phone test (< 10 digits)
  await assertStatus(
    "POST /api/appointments with invalid phone (< 10 digits)",
    "/api/appointments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: "Synthetic Test Patient",
        patientPhone: "12345",
        departmentId: "orthopaedics",
      }),
    },
    400
  );

  // Missing name test
  await assertStatus(
    "POST /api/appointments with missing patient name",
    "/api/appointments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: "",
        patientPhone: "9820000000",
        departmentId: "orthopaedics",
      }),
    },
    400
  );

  // Valid synthetic appointment submission test
  const validSyntheticAppointment = await assertStatus(
    "POST /api/appointments with valid synthetic payload",
    "/api/appointments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: "Test Verification Patient",
        patientPhone: "9820099999",
        departmentId: "orthopaedics",
        preferredDate: "2026-11-01",
        preferredTime: "Morning OPD (10:00 AM – 1:00 PM)",
        symptomsDescription: "Automated test verification intake",
      }),
    },
    200
  );

  if (validSyntheticAppointment && validSyntheticAppointment.success && validSyntheticAppointment.referenceId) {
    console.log(`✅ [PASS] Appointment persisted with Reference ID: ${validSyntheticAppointment.referenceId}`);
    passed++;
  } else {
    console.error("❌ [FAIL] Appointment creation did not return verified referenceId!");
    failed++;
  }

  // -------------------------------------------------------------------------
  // 4. Authenticated Admin Credential Sanitization Verification
  // -------------------------------------------------------------------------
  console.log("\n--- 4. AUTHENTICATED ADMIN PAYLOAD CREDENTIAL SANITIZATION ---");

  const adminHeaders = {
    "Content-Type": "application/json",
    Cookie: `shashwat_staff_session=authenticated; shashwat_staff_user=${encodeURIComponent(
      JSON.stringify({ email: "admin@shashwathospital.com", role: "admin" })
    )}`,
  };

  // Test GET /api/admin/doctors with Admin session
  const doctorsData = await assertStatus(
    "GET /api/admin/doctors (as authenticated admin)",
    "/api/admin/doctors",
    { method: "GET", headers: adminHeaders },
    200
  );

  if (doctorsData) {
    const hasPassword = deepSearchKey(doctorsData, "devPassword") || JSON.stringify(doctorsData).includes("PatientPass2026!");
    if (!hasPassword) {
      console.log("✅ [PASS] /api/admin/doctors contains NO devPassword or credentials in payload");
      passed++;
    } else {
      console.error("❌ [FAIL] /api/admin/doctors LEAKED devPassword in payload!");
      failed++;
    }
  }

  // Test POST /api/admin/triage with Admin session
  const triageData = await assertStatus(
    "POST /api/admin/triage (as authenticated admin)",
    "/api/admin/triage",
    {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({ appointmentId: "apt-101", doctorId: "doc-joint-1" }),
    },
    200
  );

  if (triageData) {
    const hasPassword = deepSearchKey(triageData, "devPassword") || JSON.stringify(triageData).includes("PatientPass2026!");
    if (!hasPassword) {
      console.log("✅ [PASS] /api/admin/triage contains NO devPassword or credentials in payload");
      passed++;
    } else {
      console.error("❌ [FAIL] /api/admin/triage LEAKED devPassword in payload!");
      failed++;
    }
  }

  // -------------------------------------------------------------------------
  // 5. Doctor Clinical Authorization & Note Access Control (Finding 2 Remediation)
  // -------------------------------------------------------------------------
  console.log("\n--- 5. DOCTOR CLINICAL NOTE AUTHORIZATION & TAMPERING PROTECTION ---");

  const doctorJointHeaders = {
    "Content-Type": "application/json",
    Cookie: `shashwat_doctor_session=authenticated; shashwat_doctor_user=${encodeURIComponent(
      JSON.stringify({ id: "doc-joint-1", name: "Dr. Senior Joint Specialist", email: "dr.joint@shashwathospital.com" })
    )}`,
  };

  // Test 5A: Doctor attempting to append note to unauthorized patient visit (vis-3002 belongs to pat-1002/doc-sports-1)
  await assertStatus(
    "POST /api/doctor/notes for unauthorized patient visit (doc-joint-1 on vis-3002)",
    "/api/doctor/notes",
    {
      method: "POST",
      headers: doctorJointHeaders,
      body: JSON.stringify({
        visitId: "vis-3002",
        noteText: "Malicious cross-doctor tampering attempt",
      }),
    },
    403
  );

  // Test 5B: Doctor appending note to non-existent visit
  await assertStatus(
    "POST /api/doctor/notes for non-existent visit (vis-9999)",
    "/api/doctor/notes",
    {
      method: "POST",
      headers: doctorJointHeaders,
      body: JSON.stringify({
        visitId: "vis-9999",
        noteText: "Attempt on missing visit",
      }),
    },
    404
  );

  // Test 5C: Authorized doctor appending note to their own assigned patient visit (vis-3001)
  await assertStatus(
    "POST /api/doctor/notes for authorized assigned patient visit (doc-joint-1 on vis-3001)",
    "/api/doctor/notes",
    {
      method: "POST",
      headers: doctorJointHeaders,
      body: JSON.stringify({
        visitId: "vis-3001",
        noteText: "Verified post-consultation management follow-up.",
      }),
    },
    200
  );

  // -------------------------------------------------------------------------
  // 6. Patient Portal Cross-Patient Isolation / IDOR Protection
  // -------------------------------------------------------------------------
  console.log("\n--- 6. PATIENT PORTAL CROSS-PATIENT RECORD ISOLATION (IDOR) ---");

  const patientAHeaders = {
    "Content-Type": "application/json",
    Cookie: `shashwat_patient_session=authenticated; shashwat_patient_user=${encodeURIComponent(
      JSON.stringify({ patientId: "pat-1001", phone: "9820123456" })
    )}`,
  };

  // Patient A requests portal while tampering with query param to request Patient B (pat-1002)
  const patientPortalData = await assertStatus(
    "GET /api/patient/portal (Patient A requesting with ?patientId=pat-1002 parameter tamper)",
    "/api/patient/portal?patientId=pat-1002",
    { method: "GET", headers: patientAHeaders },
    200
  );

  if (patientPortalData && patientPortalData.patient) {
    if (patientPortalData.patient.id === "pat-1001") {
      console.log("✅ [PASS] Patient portal strictly returned authenticated Patient A (pat-1001); ignored query param spoofing");
      passed++;
    } else {
      console.error(`❌ [FAIL] IDOR vulnerability! Portal returned patient ${patientPortalData.patient.id}`);
      failed++;
    }
  }

  // -------------------------------------------------------------------------
  // 7. Client Bundle Credential Leakage Audit (Static Check)
  // -------------------------------------------------------------------------
  console.log("\n--- 7. CLIENT BUNDLE CREDENTIAL & SECRET SANITIZATION AUDIT ---");
  const fs = await import("fs");
  const path = await import("path");

  let bundleLeaked = false;
  const staticDir = path.join(process.cwd(), ".next", "static");
  const forbiddenPatterns = [
    "HospitalStaff2026!",
    "HospitalReception2026!",
    "DoctorPass2026!",
    "DoctorSports2026!",
    "DoctorSpine2026!",
  ];

  if (fs.existsSync(staticDir)) {
    function searchDir(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          searchDir(fullPath);
        } else if (file.endsWith(".js")) {
          const content = fs.readFileSync(fullPath, "utf8");
          for (const pattern of forbiddenPatterns) {
            if (content.includes(pattern)) {
              console.error(`❌ [FAIL] Client bundle chunk ${file} LEAKED credential: ${pattern}`);
              bundleLeaked = true;
            }
          }
        }
      }
    }
    searchDir(staticDir);
    if (!bundleLeaked) {
      console.log("✅ [PASS] Zero hardcoded passwords found in compiled .next/static client bundles");
      passed++;
    } else {
      failed++;
    }
  } else {
    console.log("ℹ️ [INFO] .next/static not yet generated. Run 'npm run build' to verify client bundle sanitization.");
  }

  // -------------------------------------------------------------------------
  // 8. Second Opinion Untrusted URL Sanitization (Fix 4 Remediation)
  // -------------------------------------------------------------------------
  console.log("\n--- 8. SECOND OPINION UNTRUSTED URL REJECTION IN JSON ---");
  const soRes = await assertStatus(
    "POST /api/second-opinion with JSON payload containing untrusted reportFileUrl",
    "/api/second-opinion",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: "Security Test Patient",
        patientPhone: "9820011111",
        conditionCategory: "Knee Surgery",
        reportFileUrl: "https://evil.example.com/malicious_exploit.pdf",
      }),
    },
    200
  );

  if (soRes && soRes.id) {
    const adminSOData = await assertStatus(
      "GET /api/admin/second-opinions (verify untrusted URL was rejected)",
      "/api/admin/second-opinions",
      { method: "GET", headers: adminHeaders },
      200
    );
    if (adminSOData && adminSOData.data) {
      const createdRecord = adminSOData.data.find((r) => r.id === soRes.id);
      if (createdRecord && createdRecord.report_file_url === null) {
        console.log("✅ [PASS] Untrusted reportFileUrl was nullified in database persistence");
        passed++;
      } else {
        console.error(`❌ [FAIL] Untrusted reportFileUrl was accepted: ${createdRecord?.report_file_url}`);
        failed++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 9. Live Database Dependency Status (Strict Transparency)
  // -------------------------------------------------------------------------
  console.log("\n--- 9. LIVE DATABASE INTEGRATION AUDIT STATUS ---");
  const hasLiveSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!hasLiveSupabase) {
    console.log("⚠️ [BLOCKED] Live PostgreSQL RLS penetration testing: BLOCKED (No live Supabase project connected)");
    console.log("⚠️ [BLOCKED] Live Storage REST penetration testing: BLOCKED (No live Supabase storage connected)");
  } else {
    console.log("✅ [INFO] Live Supabase test project detected.");
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log("\n=================================================");
  console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
