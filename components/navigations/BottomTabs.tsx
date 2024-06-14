"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { FiTarget } from "react-icons/fi";
import { IoBookSharp } from "react-icons/io5";

export default function BottomTabs() {
  const pathname = usePathname();
  const currentRoute = pathname.split("/").at(-1);
  return (
    <div className="flex w-full items-center justify-around bg-background py-4">
      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <CgProfile
            color={currentRoute === "main" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">Profile</div>
      </Link>

      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main/activities`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <FiTarget
            color={currentRoute === "activities" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">Activities</div>
      </Link>

      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main/resources`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <IoBookSharp
            color={currentRoute === "resources" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">Resources</div>
      </Link>
    </div>
  );
}
