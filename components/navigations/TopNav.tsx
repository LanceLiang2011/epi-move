import React from "react";
import AuthButton from "@/components/auth/AuthButton";
import Hamburger from "./Hamburger";

export default function TopNav() {
  return (
    <nav className="w-full flex justify-center px-6 top-nav">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <AuthButton />
      </div>
      <Hamburger />
    </nav>
  );
}
