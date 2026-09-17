import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getPatientByAuthUserId, memoryPatients } from "@/lib/supabase/service";
import { secureLog } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Please enter your registered phone number/email and password." },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).trim();
    const isPhone = /^[0-9+ ]{10,15}$/.test(cleanIdentifier);
    const cleanedDigits = cleanIdentifier.replace(/[^0-9]/g, "");

    const supabase = createServerSupabaseClient();

    if (supabase) {
      // 1. Authenticate via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: isPhone ? `${cleanedDigits}@patient.shashwathospital.com` : cleanIdentifier,
        password,
      });

      if (authError || !authData.user) {
        return NextResponse.json(
          { message: "Invalid credentials. Please verify your registered login details." },
          { status: 401 }
        );
      }

      // 2. Verify linked patient record exists
      const patient = await getPatientByAuthUserId(authData.user.id);
      if (!patient) {
        await supabase.auth.signOut();
        return NextResponse.json(
          {
            message:
              "No registered patient record linked to this account. Please contact Shashwat Hospital reception to register your portal access.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json({
        success: true,
        patient: {
          id: patient.id,
          name: patient.full_name,
        },
      });
    }

    // Dev / offline mode: Strict password comparison against pre-registered hospital patient records
    const matched = memoryPatients.find(
      (p) => (isPhone && p.phone === cleanedDigits) || p.email?.toLowerCase() === cleanIdentifier.toLowerCase()
    );

    if (!matched || !matched.devPassword || password !== matched.devPassword) {
      return NextResponse.json(
        {
          message: "Invalid credentials. Please verify your registered login details.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      patient: {
        id: matched.id,
        name: matched.full_name,
      },
    });

    // Set cookie tied strictly to this matched patient
    response.cookies.set({
      name: "shashwat_patient_session",
      value: "authenticated",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
    });

    response.cookies.set({
      name: "shashwat_patient_user",
      value: encodeURIComponent(JSON.stringify({ patientId: matched.id, phone: matched.phone })),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    secureLog("error", "Patient login error", error);
    return NextResponse.json({ message: "An unexpected error occurred during login." }, { status: 500 });
  }
}
