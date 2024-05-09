import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/lib/actions";

interface Props {
  noteId: string;
  activity: string;
  note: string;
}

export default function NoteCard({ noteId, activity, note }: Props) {
  return (
    <Card className="transparent-card">
      <CardHeader className="px-0">
        <CardTitle className="mb-2 text-xl">{activity}</CardTitle>
        <CardContent className="text-gray-200">{note}</CardContent>
        <CardFooter>
          <form action={deleteNote}>
            <input type="hidden" name="note_id" value={noteId} />
            <Button>Delete</Button>
          </form>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
