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

  const username = userdata![0].username;

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start gap-6 p-6 pt-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hello, {username}!</h1>
        <h2 className="mt-2 text-lg font-light text-gray-700">
          Welcome back to EpiMove. Here's your profile information.
        </h2>
      </div>

      <Card className="w-full max-w-2xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Username</p>
            <p className="text-lg font-medium text-gray-900">
              {userdata![0].username}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
