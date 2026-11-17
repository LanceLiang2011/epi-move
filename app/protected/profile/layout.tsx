import BottomTabs from "@/components/navigations/BottomTabs";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className=" min-h-0 flex-1 overflow-auto bg-white text-card-foreground">{children}</div>
      <BottomTabs />
    </>
  );
}
