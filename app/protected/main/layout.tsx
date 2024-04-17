import BottomTabs from "@/components/navigations/BottomTabs";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className=" bg-white overflow-auto h-full">{children}</div>
      <BottomTabs />
    </>
  );
}
