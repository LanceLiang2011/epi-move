"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { FiCalendar } from "react-icons/fi";

interface Props {
  username: string;
}

export default function BottomTabsClient({ username }: Props) {
  const pathname = usePathname();
  const currentRoute = pathname.split("/").at(-1);

  return (
    <div className="flex w-full items-center justify-around bg-background py-4">
      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/profile`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <CgProfile
            color={currentRoute === "profile" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">{username}</div>
      </Link>

      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/calendar`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <FiCalendar
            color={currentRoute === "calendar" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">Calendar</div>
      </Link>
    </div>
  );
}
