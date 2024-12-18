import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDataDialog from "./AddDataDialog";
import NoteForm from "@/components/NoteForm";
import ActivitiesForm from "@/components/ActivitiesForm";
import type { ActivityInfo } from "@/data/activities";
import NoteCard from "./NoteCard";
import { MdOutlineEditNote, MdOutlineSportsGymnastics } from "react-icons/md";

export default async function MainPage() {
  const supabase = createClient(); // Only okay in SSR as this function won't rerun.
  async function fetchActivities(userId: string) {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .or(`created_by.eq.${userId},created_by.is.null`);

    if (error) {
      console.error("Error fetching activities:", error);
      return null;
    }

    return data;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userdata } = await supabase
    .from("users")
    .select("username, favorite_activities")
    .eq("id", user?.id);

  const activities = (await fetchActivities(user!.id)) as ActivityInfo[];
  const { data: notes } = await supabase
    .from("notes")
    .select("*, activities (name)")
    .eq("user_id", user?.id);

  // TODO : waterfall async issue. Should improve later.

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start justify-center gap-6 p-6 text-background">
      <div>
        <h1 className=" text-2xl font-bold">Hi {userdata![0].username},</h1>
        <h2 className="text-xl font-semibold">welcome to your profile page!</h2>
        <div className="mt-4 max-w-[32rem]">
          <p>
            Here you can add notes to each of the activity or mark those you
            like as your favourite.
          </p>
        </div>
        {/* <p className=" text-lg text-gray-200">
          You have {notes?.length ?? 0}{" "}
          {notes?.length && notes.length > 1 ? "notes" : "note"}
        </p> */}
      </div>
      <div className=" flex w-full items-center">
        <div>
          <h2 className=" text-2xl font-semibold">Add your notes</h2>
          <p>
            Click on the boxes below to select an activity and add your personal
            notes.
          </p>
        </div>
        <div className=" ml-auto rounded-full bg-primary p-2">
          <MdOutlineEditNote />
        </div>
      </div>
      <div className="flex gap-4">
        <AddDataDialog
          title="New Activity"
          description="Crate Your own activity here"
        >
          <ActivitiesForm userid={user?.id ?? ""} />
        </AddDataDialog>
        <AddDataDialog
          title="New Note"
          description="Add your note for activity"
        >
          <NoteForm activities={activities} userid={user?.id ?? ""} />
        </AddDataDialog>
      </div>
      <div className=" flex w-full items-center">
        <div>
          <h2 className=" text-2xl font-semibold">Saved personal notes</h2>
          <p>
            Below you can find the notes you created for each activity you
            selected.
          </p>
        </div>
        <div className=" ml-auto rounded-full bg-primary p-2">
          <MdOutlineSportsGymnastics />
        </div>
      </div>
      <div className="grid grid-cols-2 place-content-stretch place-items-stretch gap-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note.note}
              noteId={note.id}
              activity={note.activities.name}
            />
          ))
        ) : (
          <PlaceHolder />
        )}
      </div>
    </div>
  );
}

function PlaceHolder() {
  return (
    <Card className="col-span-2 w-full place-items-center place-self-center border-none bg-white/10 text-center text-white shadow-lg">
      <CardHeader className="px-0">
        <CardTitle className="mb-2 text-xl text-background">
          {" "}
          No Current Notes
        </CardTitle>
        <CardContent className="text-background">
          Please create your first Note
        </CardContent>
      </CardHeader>
    </Card>
  );
}
