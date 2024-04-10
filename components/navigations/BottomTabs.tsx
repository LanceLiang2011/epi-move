"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdHome } from "react-icons/io";
import { FiTarget } from "react-icons/fi";
import { IoBookSharp } from "react-icons/io5";

export default function BottomTabs() {
  const pathname = usePathname();
  const currentRoute = pathname.split("/").at(-1);
  return (
    <div className="w-full h-24 bg-background flex justify-around items-center">
      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main`}
      >
        <IoMdHome
          color={currentRoute === "main" ? "#9561cc" : "white"}
          size={36}
        />
        <div className=" text-xs font-light">Home</div>
      </Link>

      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main/activities`}
      >
        <FiTarget
          color={currentRoute === "activities" ? "#9561cc" : "white"}
          size={36}
        />
        <div className=" text-xs font-light">Activities</div>
      </Link>

      <Link
        className=" flex flex-col items-center gap-1"
        href={`/protected/main/resources`}
      >
        <IoBookSharp
          color={currentRoute === "resources" ? "#9561cc" : "white"}
          size={36}
        />
        <div className=" text-xs font-light">Resources</div>
      </Link>
    </div>
  );
}
