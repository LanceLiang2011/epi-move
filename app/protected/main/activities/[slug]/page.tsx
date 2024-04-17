import Image from "next/image";
import React from "react";
import { activities, activitiesWithSlugs } from "@/data/activities";

export default function Page({ params }: { params: { slug: string } }) {
  const activity = activities[params.slug];
  return (
    <div className=" w-full">
      <div className=" w-full">
        <Image
          className=" object-fit"
          height={200}
          width={600}
          alt={activity.slug}
          src={activity.url}
        />
      </div>
      <h1 className=" capitalize text-3xl text-background text-center py-6">
        {activity.name}
      </h1>
      <div
        className=" text-teal-950 px-4"
        dangerouslySetInnerHTML={{ __html: activity.content }}
      />
      {activity.videos && (
        <div className="py-6 flex flex-col gap-4 items-center">
          {activity.videos.map((v, i) => (
            <div dangerouslySetInnerHTML={{ __html: v }} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return activitiesWithSlugs.map((act) => ({
    slug: act.slug,
  }));
}
