"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createActivityLog, createActivity } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { MdAdd } from "react-icons/md";

interface Activity {
  id: string;
  name: string;
  description?: string;
}

interface Props {
  activities: Activity[];
  onSuccess?: () => void;
  onCancel?: () => void;
  onActivitiesUpdate?: () => void;
}

export default function ActivityLogForm({
  activities,
  onSuccess,
  onCancel,
  onActivitiesUpdate,
}: Props) {
  const router = useRouter();
  const [activityDate, setActivityDate] = useState(() => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [activityId, setActivityId] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("moderate");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewActivityDialogOpen, setIsNewActivityDialogOpen] = useState(false);
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activityId) {
      toast({ title: "Please select an activity", variant: "destructive" });
      return;
    }

    if (!duration || parseInt(duration) <= 0) {
      toast({ title: "Please enter a valid duration", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      await createActivityLog({
        activity_id: activityId,
        activity_date: activityDate,
        duration_minutes: parseInt(duration),
        intensity: intensity,
        notes: notes.trim() || undefined,
      });

      toast({ title: "Activity logged successfully" });
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to log activity",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newActivityName.trim()) {
      toast({
        title: "Activity name is required",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingActivity(true);

    try {
      await createActivity({
        name: newActivityName.trim(),
        description: newActivityDescription.trim() || "",
      });

      toast({ title: "Activity created successfully" });
      setNewActivityName("");
      setNewActivityDescription("");
      setIsNewActivityDialogOpen(false);
      router.refresh();
      if (onActivitiesUpdate) onActivitiesUpdate();
    } catch (error) {
      toast({
        title: "Failed to create activity",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsCreatingActivity(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="activityDate" className="text-gray-700">
          Date & Time *
        </Label>
        <Input
          id="activityDate"
          type="datetime-local"
          value={activityDate}
          onChange={(e) => setActivityDate(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="activity" className="text-gray-700">
          Activity *
        </Label>
        <div className="flex gap-2">
          <Select value={activityId} onValueChange={setActivityId}>
            <SelectTrigger className="flex-1 bg-white text-gray-900">
              <SelectValue placeholder="Select an activity" />
            </SelectTrigger>
            <SelectContent className="max-h-60 bg-white">
              {activities.map((activity) => (
                <SelectItem key={activity.id} value={activity.id}>
                  {activity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog
            open={isNewActivityDialogOpen}
            onOpenChange={setIsNewActivityDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="shrink-0 bg-green-500 text-white hover:bg-green-600"
              >
                <MdAdd className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Create New Activity</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateActivity} className="space-y-4">
                <div>
                  <Label htmlFor="newActivityName" className="text-gray-700">
                    Activity Name *
                  </Label>
                  <Input
                    id="newActivityName"
                    value={newActivityName}
                    onChange={(e) => setNewActivityName(e.target.value)}
                    placeholder="e.g., Morning Yoga"
                    required
                    className="bg-white text-gray-900"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="newActivityDescription"
                    className="text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="newActivityDescription"
                    value={newActivityDescription}
                    onChange={(e) => setNewActivityDescription(e.target.value)}
                    placeholder="Brief description..."
                    rows={3}
                    className="bg-white text-gray-900"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    onClick={() => setIsNewActivityDialogOpen(false)}
                    disabled={isCreatingActivity}
                    className="border-0 bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreatingActivity}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    {isCreatingActivity ? "Creating..." : "Create Activity"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <Label htmlFor="duration" className="text-gray-700">
          Duration (minutes) *
        </Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 30"
          required
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="intensity" className="text-gray-700">
          Intensity
        </Label>
        <Select value={intensity} onValueChange={setIntensity}>
          <SelectTrigger className="bg-white text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes" className="text-gray-700">
          Notes
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did you feel? Any observations..."
          rows={3}
          className="bg-white text-gray-900"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-0 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {isSubmitting ? "Logging..." : "Log Activity"}
        </Button>
      </div>
    </form>
  );
}
