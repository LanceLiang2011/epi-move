import Image from "next/image";
import React from "react";
import { activities, activitiesWithSlugs } from "@/data/activities";

export default function Page({ params }: { params: { slug: string } }) {
  const activity = activities[params.slug];
  return (
    <div className=" w-full">
      <div className=" w-full z-0">
        <Image
          className=" object-fit w-full"
          height={200}
          width={600}
          alt={activity.slug}
          src={activity.url}
        />
      </div>
      <div className=" rounded-3xl relative px-6 pt-8 -top-6 bg-white z-10">
        <h1 className=" capitalize text-3xl text-background  py-6">
          {activity.name}
        </h1>
        <div
          className=" text-teal-950"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />
        <div>
          {activity.videos && (
            <div className="py-6 flex flex-col gap-4 items-center">
              {activity.videos.map((v, i) => (
                <div dangerouslySetInnerHTML={{ __html: v }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return activitiesWithSlugs.map((act) => ({
    slug: act.slug,
  }));
}
