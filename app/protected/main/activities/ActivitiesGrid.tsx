import React from "react";
import ActivityCard from "./ActivityCard";
import { activitiesWithSlugs } from "@/data/activities";
// const DATA = [
//   { name: "Swimming", url: "/images/swimming.jpeg", slug: "swimming" },
//   { name: "Biking", url: "/images/biking.jpeg", slug: "biking" },
//   { name: "Football", url: "/images/football.jpeg", slug: "football" },
//   { name: "Soccer", url: "/images/soccer.jpeg", slug: "soccer" },
//   { name: "BasketBall", url: "/images/basketball.jpeg", slug: "basketball" },
//   { name: "Baseball", url: "/images/baseball.jpeg", slug: "baseball" },
// ];

export default function ActivitiesGrid() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-8 p-6 pt-20 overflow-auto">
      {activitiesWithSlugs.map(({ name, url, slug }) => (
        <ActivityCard key={url} name={name} url={url} href={slug} />
      ))}
    </div>
  );
}
