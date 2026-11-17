import type { SupabaseClient, User } from "@supabase/supabase-js";

// Run only with a verified user and a session. Confirmation-required signups
// create the profile after the callback exchanges the code for a session.
export async function ensureUserProfile(supabase: SupabaseClient, user: User) {
  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      username:
        user.user_metadata?.username || user.email?.split("@")[0] || "User",
      email: user.email,
    },
    { onConflict: "id", ignoreDuplicates: true },
  );
  if (error)
    throw new Error(
      "Unable to prepare your profile. Please try logging in again.",
    );
}
