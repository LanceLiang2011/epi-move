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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  noteId: string;
  activity: string;
  note: string;
}

export default function NoteCard({ noteId, activity, note }: Props) {
  return (
    <Card className="transparent-card flex-1">
      <CardHeader className="px-0">
        <CardTitle className="mb-2 text-xl">{activity}</CardTitle>
        <div className=" flex flex-col items-stretch gap-2">
          <Dialog>
            <div className="w-full">
              <DialogTrigger className="rounded-md bg-primary px-3 py-2">
                Details
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{activity}</DialogTitle>
              </DialogHeader>
              <div>
                <p>{note}</p>
              </div>
            </DialogContent>
          </Dialog>
          <form className=" w-full" action={deleteNote}>
            <input type="hidden" name="note_id" value={noteId} />
            <Button className=" bg-red-800">Delete</Button>
          </form>
        </div>
      </CardHeader>
    </Card>
  );
}
