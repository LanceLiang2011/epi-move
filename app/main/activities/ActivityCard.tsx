"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { altText, type Slugs } from "@/data/activities";

interface Props {
  url: string;
  name: string;
  href: string;
  slug: Slugs;
}

export default function ActivityCard({ url, name, href, slug }: Props) {
  return (
    <Link
      href={`/main/activities/${href}`}
      className="flex flex-col items-center"
    >
      <motion.div
        className=" h-28 w-28 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
      >
        <Image
          className=" h-full w-full rounded-lg object-cover"
          src={url}
          alt={altText[slug]}
          height={200}
          width={200}
          priority={false}
        />
      </motion.div>
      <span className=" text-bold mt-4 text-center text-xl text-background">
        {name}
      </span>
    </Link>
  );
}
