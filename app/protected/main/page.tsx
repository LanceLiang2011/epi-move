import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDataDialog from "./AddDataDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function MainPage() {
  const supabase = createClient(); // Only okay in SSR as this function won't rerun.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userdata } = await supabase
    .from("users")
    .select("username, favorite_activities")
    .eq("id", user?.id);

  return (
    <div className="flex w-full flex-1 flex-col items-start justify-center gap-6 bg-gradient-to-b from-fuchsia-950 to-background p-6">
      <div>
        <h1 className=" text-3xl font-bold">Hi {userdata![0].username}</h1>
        <p className=" text-lg">x notes</p>
      </div>
      <h2 className=" text-2xl font-semibold">My Notes</h2>
      <div className="flex gap-4">
        <AddDataDialog
          title="New Activiy"
          description="Crate Your own activity here"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Basketball"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="A ball game"
                className="col-span-3"
              />
            </div>
          </div>
        </AddDataDialog>
        <AddDataDialog
          title="New Note"
          description="Add your note for activity"
        >
          <></>
        </AddDataDialog>
      </div>
      <h2 className=" text-2xl font-semibold">My Activities</h2>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((num) => (
          <Card key={num} className="transparent-card">
            <CardHeader className="px-0">
              <CardTitle className="mb-2 text-xl"> Activity Name</CardTitle>
              <CardContent className="text-gray-200">
                Note Details will be shown here
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
