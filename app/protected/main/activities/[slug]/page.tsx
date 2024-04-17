import Image from "next/image";
import React from "react";
import { activities } from "@/data/activities";

export default function Page({ params }: { params: { slug: string } }) {
  const activity = activities[params.slug];
  return (
    <div className=" w-full">
      <Image height={300} width={600} alt={activity.slug} src={activity.url} />
      <h1 className=" capitalize text-3xl text-background text-center py-6">
        {activity.name}
      </h1>
      <div
        className=" text-teal-950 px-6"
        dangerouslySetInnerHTML={{ __html: activity.content }}
      />
      {activity.videos && (
        <div className="py-6 flex flex-row gap-4 justify-center">
          {activity.videos.map((v, i) => (
            <div dangerouslySetInnerHTML={{ __html: v }} />
          ))}
        </div>
      )}
    </div>
  );
}
