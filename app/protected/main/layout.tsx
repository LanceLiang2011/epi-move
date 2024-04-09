import BottomTabs from "@/components/navigations/BottomTabs";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className=" relative h-full page-grid">
      <div className=" bg-white">{children}</div>
      <BottomTabs />
    </div>
  );
}
