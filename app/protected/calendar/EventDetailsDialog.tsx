"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import {
  deleteEpilepsyEvent,
  deleteActivityLog,
  deleteDailyHealthLog,
} from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

interface EpilepsyEvent {
  id: string;
  event_date: string;
  event_type: string;
  seizure_type?: string;
  duration_minutes?: number;
  severity?: number;
  triggers?: string[];
  medications_taken?: string[];
  recovery_time_minutes?: number;
  notes?: string;
}

interface ActivityLog {
  id: string;
  activity_id: string;
  activity_date: string;
  duration_minutes: number;
  intensity?: string;
  notes?: string;
}

interface HealthLog {
  id: string;
  log_date: string;
  sleep_hours?: number;
  sleep_quality?: number;
  stress_level?: number;
  mood?: number;
  medications_taken?: string[];
  notes?: string;
}

interface Activity {
  id: string;
  name: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "epilepsy" | "activity" | "health";
  data: EpilepsyEvent | ActivityLog | HealthLog;
}

interface Props {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
}

export default function EventDetailsDialog({
  event,
  isOpen,
  onClose,
  activities,
}: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (event.type === "epilepsy") {
        await deleteEpilepsyEvent(event.id);
      } else if (event.type === "activity") {
        await deleteActivityLog(event.id);
      } else if (event.type === "health") {
        await deleteDailyHealthLog(event.id);
      }

      toast({ title: "Event deleted successfully" });
      onClose();
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to delete event",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-gray-900 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-medium">{formatDateTime(event.start)}</p>
          </div>

          {event.type === "epilepsy" && (
            <EpilepsyEventDetails data={event.data as EpilepsyEvent} />
          )}

          {event.type === "activity" && (
            <ActivityLogDetails
              data={event.data as ActivityLog}
              activities={activities}
            />
          )}

          {event.type === "health" && (
            <HealthLogDetails data={event.data as HealthLog} />
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <MdDelete className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EpilepsyEventDetails({ data }: { data: EpilepsyEvent }) {
  return (
    <>
      <div>
        <p className="text-sm text-gray-600">Event Type</p>
        <p className="font-medium capitalize">{data.event_type}</p>
      </div>

      {data.seizure_type && (
        <div>
          <p className="text-sm text-gray-600">Seizure Type</p>
          <p className="font-medium capitalize">
            {data.seizure_type.replace("-", " ")}
          </p>
        </div>
      )}

      {data.duration_minutes && (
        <div>
          <p className="text-sm text-gray-600">Duration</p>
          <p className="font-medium">{data.duration_minutes} minutes</p>
        </div>
      )}

      {data.severity && (
        <div>
          <p className="text-sm text-gray-600">Severity</p>
          <p className="font-medium">{data.severity} / 5</p>
        </div>
      )}

      {data.triggers && data.triggers.length > 0 && (
        <div>
          <p className="text-sm text-gray-600">Triggers</p>
          <p className="font-medium">{data.triggers.join(", ")}</p>
        </div>
      )}

      {data.medications_taken && data.medications_taken.length > 0 && (
        <div>
          <p className="text-sm text-gray-600">Medications Taken</p>
          <p className="font-medium">{data.medications_taken.join(", ")}</p>
        </div>
      )}

      {data.recovery_time_minutes && (
        <div>
          <p className="text-sm text-gray-600">Recovery Time</p>
          <p className="font-medium">{data.recovery_time_minutes} minutes</p>
        </div>
      )}

      {data.notes && (
        <div>
          <p className="text-sm text-gray-600">Notes</p>
          <p className="font-medium">{data.notes}</p>
        </div>
      )}
    </>
  );
}

function ActivityLogDetails({
  data,
  activities,
}: {
  data: ActivityLog;
  activities: Activity[];
}) {
  const activity = activities.find((a) => a.id === data.activity_id);

  return (
    <>
      <div>
        <p className="text-sm text-gray-600">Activity</p>
        <p className="font-medium">{activity?.name || "Unknown Activity"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-600">Duration</p>
        <p className="font-medium">{data.duration_minutes} minutes</p>
      </div>

      {data.intensity && (
        <div>
          <p className="text-sm text-gray-600">Intensity</p>
          <p className="font-medium capitalize">{data.intensity}</p>
        </div>
      )}

      {data.notes && (
        <div>
          <p className="text-sm text-gray-600">Notes</p>
          <p className="font-medium">{data.notes}</p>
        </div>
      )}
    </>
  );
}

function HealthLogDetails({ data }: { data: HealthLog }) {
  return (
    <>
      {data.sleep_hours && (
        <div>
          <p className="text-sm text-gray-600">Sleep</p>
          <p className="font-medium">{data.sleep_hours} hours</p>
        </div>
      )}

      {data.sleep_quality && (
        <div>
          <p className="text-sm text-gray-600">Sleep Quality</p>
          <p className="font-medium">{data.sleep_quality} / 5</p>
        </div>
      )}

      {data.stress_level && (
        <div>
          <p className="text-sm text-gray-600">Stress Level</p>
          <p className="font-medium">{data.stress_level} / 5</p>
        </div>
      )}

      {data.mood && (
        <div>
          <p className="text-sm text-gray-600">Mood</p>
          <p className="font-medium">{data.mood} / 5</p>
        </div>
      )}

      {data.medications_taken && data.medications_taken.length > 0 && (
        <div>
          <p className="text-sm text-gray-600">Medications</p>
          <p className="font-medium">{data.medications_taken.join(", ")}</p>
        </div>
      )}

      {data.notes && (
        <div>
          <p className="text-sm text-gray-600">Notes</p>
          <p className="font-medium">{data.notes}</p>
        </div>
      )}
    </>
  );
}
