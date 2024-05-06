import React from "react";
import ActivityCard from "./ActivityCard";
import { activitiesWithSlugs } from "@/data/activities";

export default function ActivitiesGrid() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-8 p-6 pt-20 overflow-auto">
      {activitiesWithSlugs.map(({ name, url, slug }) => (
        <ActivityCard key={url} name={name} url={url} href={slug} />
      ))}
    </div>
  );
}
