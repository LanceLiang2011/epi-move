import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    return redirect("/login");
  }

  const { data: userdata } = await supabase
    .from("users")
    .select("username, favorite_activities")
    .eq("id", user?.id);

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start gap-6 p-6 pt-20 text-background">
      <div>
        <h1 className=" text-2xl font-bold">Hi {userdata![0].username},</h1>
        <h2 className="text-xl font-semibold">Welcome to your profile!</h2>
      </div>

      <Card className="w-full max-w-2xl bg-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-300">Username</p>
            <p className="text-lg font-medium">{userdata![0].username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
