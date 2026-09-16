/**
 * Verification Guard Utility
 * 
 * In strict compliance with the No-Fabrication Policy, any unverified hospital
 * information (strings equal to or containing "VERIFY_WITH_HOSPITAL", empty strings,
 * or 0/sentinel values) must not be presented as fact or render fake interactive links.
 */

export const isVerified = (value?: string | number | null): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed !== "" && trimmed !== "VERIFY_WITH_HOSPITAL" && !trimmed.includes("VERIFY_WITH_HOSPITAL");
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  return false;
};

export const getVerifiedString = (value?: string | null): string | null => {
  return isVerified(value) ? (value as string) : null;
};
