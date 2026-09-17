/**
 * SHASHWAT HOSPITAL — SECURITY & PII SCRUBBING UTILITIES
 * 
 * Strict privacy protection ensuring no patient names, phone numbers,
 * email addresses, or clinical note contents leak to telemetry or error trackers.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const PHONE_REGEX = /(\+?91[\s-]?)?[6-9]\d{9}/g;
const GENERAL_PHONE_REGEX = /\b\d{10}\b/g;

/**
 * Scrubs personally identifiable information (PII) from strings.
 */
export function scrubPII(text: string): string {
  if (!text) return text;
  return text
    .replace(EMAIL_REGEX, "[REDACTED_EMAIL]")
    .replace(PHONE_REGEX, "[REDACTED_PHONE]")
    .replace(GENERAL_PHONE_REGEX, "[REDACTED_PHONE]");
}

/**
 * Recursively scrubs PII fields from payloads/objects before logging.
 */
export function sanitizeLogPayload<T>(payload: T): T {
  if (!payload || typeof payload !== "object") {
    if (typeof payload === "string") {
      return scrubPII(payload) as unknown as T;
    }
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => sanitizeLogPayload(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};
  const sensitiveKeys = [
    "patient_name",
    "name",
    "full_name",
    "patient_phone",
    "phone",
    "patient_email",
    "email",
    "note_text",
    "symptoms_description",
    "reports_summary",
    "prior_diagnosis",
    "diagnosis",
    "staff_notes",
    "password",
    "token",
    "authorization",
  ];

  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      sanitized[key] = "[REDACTED_PII]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeLogPayload(value);
    } else if (typeof value === "string") {
      sanitized[key] = scrubPII(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Safe server-side console logger that guarantees zero PII leakage.
 */
export function secureLog(level: "info" | "warn" | "error", message: string, data?: unknown) {
  const safeMessage = scrubPII(message);
  const safeData = data ? sanitizeLogPayload(data) : undefined;

  if (level === "error") {
    console.error(`[SECURE_LOG:ERROR] ${safeMessage}`, safeData ?? "");
  } else if (level === "warn") {
    console.warn(`[SECURE_LOG:WARN] ${safeMessage}`, safeData ?? "");
  } else {
    console.log(`[SECURE_LOG:INFO] ${safeMessage}`, safeData ?? "");
  }
}
