"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { updateActivity, deleteActivity } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  name: string;
  description?: string;
  created_by?: string;
}

interface Props {
  activities: Activity[];
  userId: string;
}

export default function ActivitiesView({ activities, userId }: Props) {
  const router = useRouter();
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const customActivities = activities.filter((a) => a.created_by === userId);
  const defaultActivities = activities.filter((a) => !a.created_by);

  const handleUpdateActivity = async (
    activityId: string,
    name: string,
    description: string,
  ) => {
    try {
      await updateActivity(activityId, { name, description });
      toast({ title: "Activity updated successfully" });
      setEditingActivity(null);
      setIsEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to update activity", variant: "destructive" });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;

    try {
      await deleteActivity(activityId);
      toast({ title: "Activity deleted successfully" });
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to delete activity", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Activities */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-purple-500">
          My Custom Activities ({customActivities.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customActivities.length === 0 ? (
            <Card className="col-span-full bg-white">
              <CardContent className="py-8 text-center text-gray-500">
                No custom activities yet. Add one from the Activity Log form!
              </CardContent>
            </Card>
          ) : (
            customActivities.map((activity) => (
              <Card key={activity.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{activity.name}</CardTitle>
                    <div className="flex gap-1">
                      <Dialog
                        open={
                          isEditDialogOpen &&
                          editingActivity?.id === activity.id
                        }
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (!open) setEditingActivity(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingActivity(activity)}
                          >
                            <MdEdit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Edit Activity</DialogTitle>
                          </DialogHeader>
                          <EditActivityForm
                            activity={editingActivity || activity}
                            onSave={handleUpdateActivity}
                            onCancel={() => {
                              setIsEditDialogOpen(false);
                              setEditingActivity(null);
                            }}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteActivity(activity.id)}
                      >
                        <MdDelete className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {activity.description && (
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Default Activities */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-700">
          Pre-defined Activities ({defaultActivities.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {defaultActivities.map((activity) => (
            <Card key={activity.id} className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{activity.name}</CardTitle>
              </CardHeader>
              {activity.description && (
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditActivityForm({
  activity,
  onSave,
  onCancel,
}: {
  activity: Activity;
  onSave: (id: string, name: string, description: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description || "");

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-gray-700">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Activity name"
          className="mt-1 bg-white text-gray-900"
        />
      </div>
      <div>
        <Label className="text-gray-700">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Activity description"
          rows={3}
          className="mt-1 bg-white text-gray-900"
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          onClick={onCancel}
          className="border-0 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSave(activity.id, name, description);
          }}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
