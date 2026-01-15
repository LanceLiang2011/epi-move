import BottomTabs from "@/components/navigations/BottomTabs";
import TopNav from "@/components/navigations/TopNav";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <TopNav />
      <div className="main-wrapper relative flex flex-col">
        <div className=" h-full overflow-auto bg-white">{children}</div>
        <BottomTabs />
      </div>
    </div>
  );
}
