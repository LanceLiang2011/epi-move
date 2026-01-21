"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ActivityInfo } from "@/data/activities";
import {
  updateActivity,
  deleteActivity,
  updateNote,
  deleteNote,
} from "@/lib/actions";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "@/components/ui/use-toast";

interface Note {
  id: string;
  note: string;
  activity_id: string;
  created_at: string;
  updated_at?: string;
  activities: {
    name: string;
  };
}

interface Props {
  activities: ActivityInfo[];
  notes: Note[];
  userId: string;
}

export default function ActivityManager({ activities, notes, userId }: Props) {
  const router = useRouter();
  const [editingActivity, setEditingActivity] = useState<ActivityInfo | null>(
    null,
  );
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  const handleUpdateActivity = async (
    activityId: string,
    name: string,
    description: string,
  ) => {
    try {
      await updateActivity(activityId, { name, description });
      toast({ title: "Activity updated successfully" });
      setEditingActivity(null);
      setIsActivityDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to update activity", variant: "destructive" });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      toast({ title: "Activity deleted successfully" });
    } catch (error) {
      toast({ title: "Failed to delete activity", variant: "destructive" });
    }
  };

  const handleUpdateNote = async (noteId: string, noteText: string) => {
    try {
      await updateNote(noteId, noteText);
      toast({ title: "Note updated successfully" });
      setIsNoteDialogOpen(false);
      setEditingNote(null);
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to update note", variant: "destructive" });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const formData = new FormData();
      formData.append("note_id", noteId);
      await deleteNote(formData);
      toast({ title: "Note deleted successfully" });
    } catch (error) {
      toast({ title: "Failed to delete note", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (activities.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            You haven't created any custom activities yet. Go to your profile to
            create one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      {activities.map((activity) => {
        const activityNotes = notes.filter(
          (note) => note.activity_id === activity.id,
        );

        return (
          <Card key={activity.id} className="w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-background">
                    {activity.name}
                  </CardTitle>
                  {activity.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  )}
                  {!activity.created_by && (
                    <p className="mt-1 text-xs text-purple-600">
                      Pre-defined activity
                    </p>
                  )}
                </div>
                {activity.created_by === userId && (
                  <div className="flex gap-2">
                    <Dialog
                      open={isActivityDialogOpen}
                      onOpenChange={setIsActivityDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white"
                          onClick={() => setEditingActivity(activity)}
                        >
                          <MdEdit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Edit Activity</DialogTitle>
                          <DialogDescription>
                            Update the name and description of your activity
                          </DialogDescription>
                        </DialogHeader>
                        <EditActivityForm
                          activity={editingActivity || activity}
                          onSave={handleUpdateActivity}
                          onCancel={() => setEditingActivity(null)}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <MdDelete className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Delete Activity</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this activity? This
                            will also delete all notes associated with it.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="notes">
                  <AccordionTrigger>
                    <span className="text-background">
                      Notes ({activityNotes.length})
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {activityNotes.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        No notes for this activity yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {activityNotes.map((note) => (
                          <Card key={note.id} className="bg-gray-50">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className="text-sm text-background">
                                    {note.note}
                                  </p>
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    <p>
                                      Created: {formatDate(note.created_at)}
                                    </p>
                                    {note.updated_at &&
                                      note.updated_at !== note.created_at && (
                                        <p>
                                          Edited: {formatDate(note.updated_at)}
                                        </p>
                                      )}
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Dialog
                                    open={isNoteDialogOpen}
                                    onOpenChange={setIsNoteDialogOpen}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingNote(note)}
                                      >
                                        <MdEdit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Note</DialogTitle>
                                      </DialogHeader>
                                      <EditNoteForm
                                        note={editingNote || note}
                                        onSave={handleUpdateNote}
                                        onCancel={() => setEditingNote(null)}
                                      />
                                    </DialogContent>
                                  </Dialog>

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MdDelete className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                      <DialogHeader>
                                        <DialogTitle>Delete Note</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to delete this
                                          note?
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                          <Button variant="outline">
                                            Cancel
                                          </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                          <Button
                                            variant="destructive"
                                            onClick={() =>
                                              handleDeleteNote(note.id)
                                            }
                                          >
                                            Delete
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function EditActivityForm({
  activity,
  onSave,
  onCancel,
}: {
  activity: ActivityInfo;
  onSave: (id: string, name: string, description: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description || "");

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Activity name"
          className="mt-1 bg-white text-gray-900"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Activity description"
          rows={3}
          className="mt-1 bg-white text-gray-900"
        />
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={() => {
            onSave(activity.id, name, description);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function EditNoteForm({
  note,
  onSave,
  onCancel,
}: {
  note: Note;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(note.note);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Note</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your note"
          rows={5}
          className="mt-1 bg-white text-gray-900"
        />
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={() => {
            onSave(note.id, text);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
