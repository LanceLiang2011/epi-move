import BottomTabs from "@/components/navigations/BottomTabs";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className=" h-full overflow-auto bg-white">{children}</div>
      <BottomTabs />
    </>
  );
}
