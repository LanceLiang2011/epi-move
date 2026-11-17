import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/auth/profile";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      try {
        await ensureUserProfile(supabase, data.user);
        return NextResponse.redirect(new URL("/protected/profile", url.origin));
      } catch {
        return NextResponse.redirect(new URL("/login?message=Unable to prepare your profile. Please log in again.", url.origin));
      }
    }
  }
  return NextResponse.redirect(new URL("/login?message=The confirmation link is invalid or expired. Please try logging in again.", url.origin));
}
