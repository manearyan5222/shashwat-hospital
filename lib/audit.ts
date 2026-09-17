/**
 * SHASHWAT HOSPITAL — CLINICAL AUDIT LOGGING SERVICE
 * 
 * Records every read/write access to treatment notes, medical reports,
 * and patient records for compliance and safety.
 */

import { getServiceSupabase } from "@/lib/supabase/service";
import { secureLog } from "@/lib/security";

export interface AuditEventParams {
  actorId?: string | null;
  action:
    | "read_treatment_notes"
    | "create_treatment_note"
    | "create_treatment_amendment"
    | "read_patient_reports"
    | "upload_patient_report"
    | "view_patient_history"
    | "triage_appointment_to_patient"
    | "assign_doctor_access"
    | "revoke_doctor_access";
  targetTable: "treatment_notes" | "patient_reports" | "patients" | "visits" | "doctor_patient_access";
  targetId?: string | null;
}

// In-memory audit log storage for dev/preview fallback
export const memoryAuditLogs: Array<{
  id: string;
  actor_id?: string | null;
  action: string;
  target_table: string;
  target_id?: string | null;
  created_at: string;
}> = [];

/**
 * Log an immutable audit record to Supabase (or memory fallback).
 */
export async function logAuditEvent({
  actorId,
  action,
  targetTable,
  targetId,
}: AuditEventParams): Promise<void> {
  const timestamp = new Date().toISOString();

  try {
    const supabase = getServiceSupabase();
    if (supabase) {
      await supabase.from("audit_log").insert([
        {
          actor_id: actorId || null,
          action,
          target_table: targetTable,
          target_id: targetId || null,
          created_at: timestamp,
        },
      ]);
    } else {
      memoryAuditLogs.unshift({
        id: `aud-${Date.now().toString().slice(-6)}`,
        actor_id: actorId || null,
        action,
        target_table: targetTable,
        target_id: targetId || null,
        created_at: timestamp,
      });
    }

    secureLog("info", `[AUDIT_LOG] ${action} on ${targetTable} id:${targetId || "n/a"}`);
  } catch (err) {
    secureLog("error", `Failed to record audit log for action: ${action}`, err);
  }
}
