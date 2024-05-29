import Heading from "@/components/navigations/Heading";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GiOpenBook } from "react-icons/gi";
import { resources } from "@/data/resources";

const TEMP_RESOURCES = [
  "Setting goals",
  "Nearby sports centres",
  "Success stories",
  "Online groups",
];

export default function Page() {
  return (
    <div>
      <Heading
        title="resources"
        placeholder="Search for resources"
        Icon={<GiOpenBook size={60} />}
      />
      <div className="flex flex-col items-stretch gap-6 px-12 py-8 text-center">
        {resources.map((resource) => (
          <Link
            className=" flex items-center gap-4 rounded-md bg-gray-300 px-8 py-4 text-background"
            key={resource.slug}
            href={`/protected/main/resources/${resource.slug}`}
          >
            {typeof resource.Icon !== "string" ? (
              <resource.Icon size={128} />
            ) : (
              <Image alt="logo" src={resource.Icon} height={128} width={128} />
            )}
            <div>
              <h2 className="text-lg font-semibold">{resource.name}</h2>
              <p>{resource.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
