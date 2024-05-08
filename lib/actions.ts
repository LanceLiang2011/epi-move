"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signIn = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  return redirect("/protected");
};

export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  // Check if the user object is returned and has an id
  if (user && user.id) {
    // Create a new record in the custom users table
    const { data, error: createUserError } = await supabase
      .from("users")
      .insert([
        {
          id: user.id, // Use the UID from the Auth system
          username: username,
          email: email, // Optional: Store email also in your users table if needed
        },
      ]);

    if (createUserError) {
      console.error("Failed to create user profile:", createUserError.message);
      // Optionally handle the failure case, perhaps cleaning up the created auth user
      return redirect("/?message=Failed to create user profile");
    }
  }

  return redirect("/?message=Check email to continue sign in process");
};
