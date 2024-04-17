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
    return redirect("/");
  }

  return (
    <div className="h-full w-full flex flex-col">
      <TopNav />
      <div className="relative main-wrapper flex flex-col">{children}</div>
    </div>
  );
}
