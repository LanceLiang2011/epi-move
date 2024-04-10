import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  url: string;
  name: string;
  href: string;
}

export default function ActivityCard({ url, name, href }: Props) {
  return (
    <Link
      href={`/protected/main/activities/${href}`}
      className="flex flex-col items-center"
    >
      <div className=" h-32 w-32 ">
        <Image
          className=" w-full h-full object-cover rounded-lg"
          src={url}
          alt={name}
          height={200}
          width={200}
        />
      </div>
      <caption className=" text-background">{name}</caption>
    </Link>
  );
}
