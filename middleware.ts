import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    supabaseUrl.startsWith("http");

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // -------------------------------------------------------------------------
  // 1. ADMIN SURFACE & API PROTECTION (/admin/*, /api/admin/*)
  // -------------------------------------------------------------------------
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) &&
    !pathname.startsWith("/admin/login")
  ) {
    let isStaffAuthenticated = false;

    if (isConfigured) {
      const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: "", ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Query staff role
        const { data: roleData } = await supabase
          .from("staff_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (roleData && (roleData.role === "admin" || roleData.role === "receptionist")) {
          isStaffAuthenticated = true;
        }
      }
    } else {
      const staffCookie = request.cookies.get("shashwat_staff_session");
      if (staffCookie?.value === "authenticated") {
        isStaffAuthenticated = true;
      }
    }

    if (!isStaffAuthenticated) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ message: "Authentication required." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // -------------------------------------------------------------------------
  // 2. DOCTOR PWA SURFACE & API PROTECTION (/doctor/*, /api/doctor/*)
  // -------------------------------------------------------------------------
  if (
    (pathname.startsWith("/doctor") || pathname.startsWith("/api/doctor")) &&
    !pathname.startsWith("/doctor/login")
  ) {
    let isDoctorAuthenticated = false;

    if (isConfigured) {
      const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: "", ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roleData } = await supabase
          .from("staff_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (roleData && roleData.role === "doctor") {
          isDoctorAuthenticated = true;
        }
      }
    } else {
      const doctorCookie = request.cookies.get("shashwat_doctor_session");
      if (doctorCookie?.value === "authenticated") {
        isDoctorAuthenticated = true;
      }
    }

    if (!isDoctorAuthenticated) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ message: "Authentication required." }, { status: 401 });
      }
      const loginUrl = new URL("/doctor/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // -------------------------------------------------------------------------
  // 3. PATIENT SELF-PORTAL & API PROTECTION (/patient/*, /api/patient/*)
  // -------------------------------------------------------------------------
  if (
    (pathname.startsWith("/patient") || pathname.startsWith("/api/patient")) &&
    !pathname.startsWith("/patient/login") &&
    !pathname.startsWith("/api/patient/auth")
  ) {
    let isPatientAuthenticated = false;

    if (isConfigured) {
      const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: "", ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        isPatientAuthenticated = true;
      }
    } else {
      const patientCookie = request.cookies.get("shashwat_patient_session");
      if (patientCookie?.value === "authenticated") {
        isPatientAuthenticated = true;
      }
    }

    if (!isPatientAuthenticated) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ message: "Authentication required." }, { status: 401 });
      }
      const loginUrl = new URL("/patient/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/patient/:path*",
    "/api/admin/:path*",
    "/api/doctor/:path*",
    "/api/patient/:path*",
  ],
};
