import React from "react";
import ActivityCard from "@/components/ActivityCard";
import { activitiesWithSlugs, type Slugs } from "@/data/activities";

export default function ActivitiesGrid({
  keyword,
}: {
  keyword: string | undefined;
}) {
  const filteredActivities = keyword
    ? activitiesWithSlugs.filter((activity) =>
        activity.name.toLowerCase().includes(keyword.trim().toLowerCase()),
      )
    : activitiesWithSlugs;

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 overflow-auto p-6 pt-20">
      {filteredActivities.map(
        ({ name, url, slug }: { name: string; url: string; slug: Slugs }) => (
          <ActivityCard
            key={url}
            name={name}
            slug={slug}
            url={url}
            href={slug}
          />
        ),
      )}
    </div>
  );
}
