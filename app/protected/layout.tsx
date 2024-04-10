import AuthButton from "@/components/auth/AuthButton";
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
    <div className="w-full h-screen flex flex-col">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {children}
    </div>
  );
}
