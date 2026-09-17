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
    "GET /api/doctor/patients/pat-1001 (no session)",
    "/api/doctor/patients/pat-1001",
    { method: "GET" },
    401
  );

  // -------------------------------------------------------------------------
  // 3. Authenticated Admin Credential Sanitization Verification
  // -------------------------------------------------------------------------
  console.log("\n--- 3. AUTHENTICATED ADMIN PAYLOAD CREDENTIAL SANITIZATION ---");

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
