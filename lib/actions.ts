"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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
      return redirect(
        "/?message=Something went wrong while creating your account",
      );
    }
  }

  return redirect("/?message=Account created. Please log in to continue");
};

export type NoteFormData = {
  activity: string;
  note: string;
};

export type ActivityFormData = {
  name: string;
  description: string;
};

export type DeleteNoteFormData = {
  note_id: string;
};

export async function createNote(data: NoteFormData, userid: string) {
  const supabase = createClient();

  const { data: responseData, error } = await supabase.from("notes").insert([
    {
      user_id: userid,
      activity_id: data.activity,
      note: data.note,
    },
  ]);

  if (error) throw new Error(error.message);

  revalidatePath("/protected/main");
}

export async function deleteNote(data: FormData) {
  const noteId = data.get("note_id");
  const supabase = createClient();
  await supabase.from("notes").delete().eq("id", noteId);
  revalidatePath("/protected/main");
}

export async function createActivity(data: ActivityFormData, userid: string) {
  const supabase = createClient();
  const { error } = await supabase.from("activities").insert([
    {
      created_by: userid,
      name: data.name,
    },
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/main");
}
