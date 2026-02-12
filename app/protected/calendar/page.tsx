import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { activitiesWithSlugs } from "@/data/activities";
import type { ActivityInfo } from "@/data/activities";
import CalendarTabs from "./CalendarTabs";

export default async function CalendarPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch epilepsy events
  const { data: epilepsyEvents } = await supabase
    .from("epilepsy_events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: false });

  // Fetch activity logs with activity details
  const { data: activityLogs } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("activity_date", { ascending: false });

  // Fetch daily health logs
  const { data: healthLogs } = await supabase
    .from("daily_health_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("log_date", { ascending: false });

  // Fetch user's custom activities
  const { data: customActivities } = await supabase
    .from("activities")
    .select("*")
    .eq("created_by", user.id);

  // Combine pre-defined activities with custom activities
  const preDefinedActivities: ActivityInfo[] = activitiesWithSlugs.map(
    (activity) => ({
      id: activity.slug,
      name: activity.name,
      created: new Date().toISOString(),
      created_by: undefined,
    }),
  );

  const allActivities = [
    ...((customActivities as ActivityInfo[]) || []),
    ...preDefinedActivities,
  ];

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start gap-4 p-4 pb-24 pt-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-background">Health Calendar</h1>
        <p className="mt-2 text-lg text-background">
          Track your epilepsy events, physical activities, and daily health
        </p>
      </div>

      <CalendarTabs
        epilepsyEvents={epilepsyEvents || []}
        activityLogs={activityLogs || []}
        healthLogs={healthLogs || []}
        activities={allActivities}
        userId={user.id}
      />
    </div>
  );
}
