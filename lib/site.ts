/**
 * Site domain and URL configuration.
 * Uses NEXT_PUBLIC_SITE_URL environment variable if provided,
 * otherwise falls back to placeholder domain without claiming unverified ownership.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shashwat-hospital-placeholder.local";
