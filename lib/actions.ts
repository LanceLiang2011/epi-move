"use server";

import { ensureUserProfile } from "@/lib/auth/profile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const signIn = async (formData: FormData) => {
  "use server";

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  if (user) {
    try {
      await ensureUserProfile(supabase, user);
    } catch {
      return redirect(
        "/login?message=Unable to prepare your profile. Please try again.",
      );
    }
  }
  revalidatePath("/", "layout");
  return redirect("/protected/profile");
};

export const signUp = async (formData: FormData) => {
  "use server";

  const origin = (await headers()).get("origin");
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const username = String(formData.get("username") || "").trim();
  if (!username || username.length > 100 || !email || password.length < 6) {
    return redirect(
      "/signup/email?message=Enter your name, email, and a password of at least 6 characters.",
    );
  }
  const supabase = await createClient();

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { username: username.trim() },
    },
  });

  if (error) {
    return redirect(
      "/signup/email?message=Unable to create your account. Please check your details and try again.",
    );
  }

  if (user && session) {
    try {
      await ensureUserProfile(supabase, user);
    } catch {
      return redirect(
        "/login?message=Your account was created. Please log in to finish preparing your profile.",
      );
    }
    revalidatePath("/", "layout");
    return redirect("/protected/profile");
  }

  return redirect(
    "/login?message=Check your email to confirm your account. The confirmation link will sign you in.",
  );
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

export async function createNote(data: NoteFormData, _userid?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("notes").insert([
    {
      user_id: user.id,
      activity_id: data.activity,
      note: data.note,
    },
  ]);

  if (error) throw new Error(error.message);

  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
}

export async function deleteNote(data: FormData) {
  const noteId = data.get("note_id");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/protected/activities");
  revalidatePath("/protected/profile");
}

export async function createActivity(data: ActivityFormData) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("activities")
    .update({
      name: data.name,
      description: data.description,
    })
    .eq("id", activityId)
    .eq("created_by", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
  revalidatePath("/protected/calendar");
}

export async function deleteActivity(activityId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId)
    .eq("created_by", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/profile");
  revalidatePath("/protected/activities");
  revalidatePath("/protected/calendar");
}

export async function updateNote(noteId: string, noteText: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("notes")
    .update({
      note: noteText,
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .eq("user_id", user.id);

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("epilepsy_events").insert({
    ...data,
    user_id: user.id,
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("epilepsy_events")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", eventId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteEpilepsyEvent(eventId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("epilepsy_events")
    .delete()
    .eq("id", eventId)
    .eq("user_id", user.id);

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("activity_logs").insert({
    ...data,
    user_id: user.id,
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("activity_logs")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", logId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteActivityLog(logId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("activity_logs")
    .delete()
    .eq("id", logId)
    .eq("user_id", user.id);

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("daily_health_logs").insert({
    ...data,
    user_id: user.id,
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("daily_health_logs")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", logId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}

export async function deleteDailyHealthLog(logId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("daily_health_logs")
    .delete()
    .eq("id", logId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/protected/calendar");
}
