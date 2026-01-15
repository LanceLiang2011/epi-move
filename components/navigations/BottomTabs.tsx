"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";

export default function BottomTabs() {
  const pathname = usePathname();
  const currentRoute = pathname.split("/").at(-1);
  return (
    <div className="flex w-full items-center justify-around bg-background py-4">
      <Link className=" flex flex-col items-center gap-1" href={`/profile`}>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
          <CgProfile
            color={currentRoute === "profile" ? "#9561cc" : "white"}
            size={36}
          />
        </motion.div>
        <div className=" text-xs font-light">Profile</div>
      </Link>
    </div>
  );
}
