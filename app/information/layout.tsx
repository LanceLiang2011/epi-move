import TopNav from "@/components/navigations/TopNav";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Information",
  description: "General safety tips and best practices.",
};

export default function InformationLayout({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <TopNav />
      <div className="main-wrapper relative flex flex-col">
        <div className="h-full overflow-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
