import React from "react";
import ActivityCard from "./ActivityCard";
const DATA = [
  { name: "Swimming", url: "/images/swimming.jpeg", href: "swimming" },
  { name: "Biking", url: "/images/biking.jpeg", href: "biking" },
  { name: "Football", url: "/images/football.jpeg", href: "football" },
  { name: "Soccer", url: "/images/soccer.jpeg", href: "soccer" },
  { name: "BasketBall", url: "/images/basketball.jpeg", href: "basketball" },
  { name: "Baseball", url: "/images/baseball.jpeg", href: "baseball" },
];

export default function ActivitiesGrid() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-8 p-6 pt-20 overflow-auto">
      {DATA.map(({ name, url, href }) => (
        <ActivityCard key={url} name={name} url={url} href={href} />
      ))}
    </div>
  );
}
