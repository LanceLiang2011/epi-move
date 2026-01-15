import React from "react";
import AuthButton from "@/components/auth/AuthButton";
import Hamburger from "./Hamburger";

export default function TopNav() {
  return (
    <nav className="top-nav flex w-full items-center justify-between px-6">
      <div className="flex items-center p-3 text-sm">
        <AuthButton />
      </div>
      <div className="flex items-center p-3">
        <Hamburger />
      </div>
    </nav>
  );
}
