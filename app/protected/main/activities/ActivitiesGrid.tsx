import React from "react";
import ActivityCard from "./ActivityCard";
import { activitiesWithSlugs, type Slugs } from "@/data/activities";

export default function ActivitiesGrid({
  keyword,
}: {
  keyword: string | undefined;
}) {
  const filteredActivities = keyword
    ? activitiesWithSlugs.filter((activity) =>
        activity.name.toLowerCase().includes(keyword),
      )
    : activitiesWithSlugs;

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-8 overflow-auto p-6 pt-20">
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
