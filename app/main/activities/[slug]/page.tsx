import Image from "next/image";
import React from "react";
import { activities, activitiesWithSlugs } from "@/data/activities";

export default function Page({ params }: { params: { slug: string } }) {
  const activity = activities[params.slug];
  return (
    <div className=" w-full">
      <div className=" sticky top-0 z-0 w-full">
        <Image
          className=" object-fit w-full"
          height={1280}
          width={1920}
          alt={activity.slug}
          src={activity.url}
        />
      </div>
      <div className=" relative -top-6 z-10 rounded-3xl bg-white px-6 pt-8">
        <h1 className=" py-6 text-3xl capitalize  text-background">
          {activity.name}
        </h1>
        <p className=" mb-4 italic text-gray-500">
          Talk to your doctor first before participating in any physical
          activities. You can show them the information here and add notes about
          their recommendations.
        </p>
        <div
          className=" article prose text-teal-950 lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />
        <div>
          {activity.videos && (
            <div className="flex flex-col items-center gap-4 py-6">
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
