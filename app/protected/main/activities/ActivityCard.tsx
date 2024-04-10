"use client";
import { motion } from "framer-motion";
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
      <motion.div
        className=" h-28 w-28 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
      >
        <Image
          className=" w-full h-full object-cover rounded-lg"
          src={url}
          alt={name}
          height={200}
          width={200}
        />
      </motion.div>
      <caption className=" text-background">{name}</caption>
    </Link>
  );
}
