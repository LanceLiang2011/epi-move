import TopNav from "@/components/navigations/TopNav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex h-full w-full flex-col">
      <TopNav />
      <div className="main-wrapper relative flex flex-col">{children}</div>
    </div>
  );
}
