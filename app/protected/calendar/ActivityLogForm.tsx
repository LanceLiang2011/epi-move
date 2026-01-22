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
import { createActivityLog } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  name: string;
  description?: string;
}

interface Props {
  activities: Activity[];
  onSuccess?: () => void;
}

export default function ActivityLogForm({ activities, onSuccess }: Props) {
  const router = useRouter();
  const [activityDate, setActivityDate] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [activityId, setActivityId] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("moderate");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        activity_date: new Date(activityDate).toISOString(),
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
        <Select value={activityId} onValueChange={setActivityId}>
          <SelectTrigger className="bg-white text-gray-900">
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
