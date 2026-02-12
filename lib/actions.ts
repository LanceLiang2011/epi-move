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
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/protected/profile");
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
        "/login?message=Something went wrong while creating your account",
      );
    }
  }

  return redirect("/login?message=Account created. Please log in to continue");
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

  revalidatePath("/protected/profile");
}

export async function deleteNote(data: FormData) {
  const noteId = data.get("note_id");
  const supabase = createClient();
  await supabase.from("notes").delete().eq("id", noteId);
  revalidatePath("/protected/profile");
}

export async function createActivity(data: ActivityFormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("activities").insert([
    {
      created_by: user.id,
      name: data.name,
      description: data.description,
    },
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
  revalidatePath("/protected/calendar");
}

export async function updateActivity(
  activityId: string,
  data: ActivityFormData,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("activities")
    .update({
      name: data.name,
      description: data.description,
    })
    .eq("id", activityId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
}

export async function deleteActivity(activityId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
}

export async function updateNote(noteId: string, noteText: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("notes")
    .update({
      note: noteText,
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
}

// ===== CALENDAR EVENT ACTIONS =====

// Epilepsy Events
export async function createEpilepsyEvent(data: {
  event_date: string;
  event_type: string;
  seizure_type?: string;
  duration_minutes?: number;
  severity?: number;
  triggers?: string[];
  medications_taken?: string[];
  recovery_time_minutes?: number;
  notes?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("epilepsy_events").insert({
    user_id: user.id,
    ...data,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function updateEpilepsyEvent(
  eventId: string,
  data: {
    event_date?: string;
    event_type?: string;
    seizure_type?: string;
    duration_minutes?: number;
    severity?: number;
    triggers?: string[];
    medications_taken?: string[];
    recovery_time_minutes?: number;
    notes?: string;
  },
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("epilepsy_events")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", eventId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteEpilepsyEvent(eventId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("epilepsy_events")
    .delete()
    .eq("id", eventId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

// Activity Logs
export async function createActivityLog(data: {
  activity_id: string;
  activity_date: string;
  duration_minutes: number;
  intensity?: string;
  notes?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("activity_logs").insert({
    user_id: user.id,
    ...data,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function updateActivityLog(
  logId: string,
  data: {
    activity_id?: string;
    activity_date?: string;
    duration_minutes?: number;
    intensity?: string;
    notes?: string;
  },
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("activity_logs")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", logId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteActivityLog(logId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("activity_logs")
    .delete()
    .eq("id", logId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

// Daily Health Logs
export async function createDailyHealthLog(data: {
  log_date: string;
  sleep_hours?: number;
  sleep_quality?: number;
  stress_level?: number;
  mood?: number;
  medications_taken?: string[];
  notes?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("daily_health_logs").insert({
    user_id: user.id,
    ...data,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function updateDailyHealthLog(
  logId: string,
  data: {
    log_date?: string;
    sleep_hours?: number;
    sleep_quality?: number;
    stress_level?: number;
    mood?: number;
    medications_taken?: string[];
    notes?: string;
  },
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("daily_health_logs")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", logId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteDailyHealthLog(logId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("daily_health_logs")
    .delete()
    .eq("id", logId);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}
