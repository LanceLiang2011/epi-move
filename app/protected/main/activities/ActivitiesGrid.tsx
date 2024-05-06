import React from "react";
import ActivityCard from "./ActivityCard";
import { activitiesWithSlugs, type Slugs } from "@/data/activities";

export default function ActivitiesGrid() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-8 p-6 pt-20 overflow-auto">
      {activitiesWithSlugs.map(
        ({ name, url, slug }: { name: string; url: string; slug: Slugs }) => (
          <ActivityCard
            key={url}
            name={name}
            slug={slug}
            url={url}
            href={slug}
          />
        )
      )}
    </div>
  );
}
