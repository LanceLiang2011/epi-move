import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { ActivityInfo } from "@/data/activities";
import { activitiesWithSlugs } from "@/data/activities";
import ActivityManager from "./ActivityManager";

export default async function ActivitiesManagementPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    return redirect("/login");
  }

  // Fetch user's custom activities
  const { data: customActivities, error: activitiesError } = await supabase
    .from("activities")
    .select("*")
    .eq("created_by", user.id);

  if (activitiesError) {
    console.error("Error fetching activities:", activitiesError);
  }

  // Combine pre-defined activities with custom activities
  const preDefinedActivities: ActivityInfo[] = activitiesWithSlugs.map(
    (activity) => ({
      id: activity.slug,
      name: activity.name,
      created: new Date().toISOString(),
      created_by: undefined, // Pre-defined activities have no creator
    }),
  );

  const allActivities = [
    ...((customActivities as ActivityInfo[]) || []),
    ...preDefinedActivities,
  ];

  // Fetch all notes for all activities
  const activityIds = allActivities.map((a) => a.id);
  const { data: allNotes, error: allNotesError } = await supabase
    .from("notes")
    .select("*, activities (name)")
    .eq("user_id", user.id);

  if (allNotesError) {
    console.error("Error fetching notes:", allNotesError);
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start gap-6 p-6 pt-20 text-background">
      <div>
        <h1 className="text-2xl font-bold">My Activities</h1>
        <p className="mt-2 text-lg">Manage your activities and notes</p>
      </div>

      <ActivityManager
        activities={allActivities}
        notes={allNotes || []}
        userId={user.id}
      />
    </div>
  );
}
