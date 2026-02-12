"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
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

interface Props {
  epilepsyEvents: EpilepsyEvent[];
  activityLogs: ActivityLog[];
  healthLogs: HealthLog[];
  activities: Activity[];
  userId: string;
}

export default function LogsListView({
  epilepsyEvents,
  activityLogs,
  healthLogs,
  activities,
  userId,
}: Props) {
  const router = useRouter();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteEpilepsyEvent = async (id: string) => {
    try {
      await deleteEpilepsyEvent(id);
      toast({ title: "Epilepsy event deleted successfully" });
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to delete event", variant: "destructive" });
    }
  };

  const handleDeleteActivityLog = async (id: string) => {
    try {
      await deleteActivityLog(id);
      toast({ title: "Activity log deleted successfully" });
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to delete log", variant: "destructive" });
    }
  };

  const handleDeleteHealthLog = async (id: string) => {
    try {
      await deleteDailyHealthLog(id);
      toast({ title: "Health log deleted successfully" });
      router.refresh();
    } catch (error) {
      toast({ title: "Failed to delete log", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Epilepsy Events */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-red-500">
          Epilepsy Events ({epilepsyEvents.length})
        </h2>
        <div className="space-y-3">
          {epilepsyEvents.length === 0 ? (
            <Card className="bg-white">
              <CardContent className="py-8 text-center text-gray-500">
                No epilepsy events logged yet
              </CardContent>
            </Card>
          ) : (
            epilepsyEvents.map((event) => (
              <Card key={event.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg capitalize">
                        {event.event_type}
                        {event.seizure_type && ` - ${event.seizure_type}`}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(event.event_date)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEpilepsyEvent(event.id)}
                    >
                      <MdDelete className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {event.severity && (
                    <p>
                      <span className="font-medium">Severity:</span>{" "}
                      {event.severity}/5
                    </p>
                  )}
                  {event.duration_minutes && (
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {event.duration_minutes} minutes
                    </p>
                  )}
                  {event.triggers && event.triggers.length > 0 && (
                    <p>
                      <span className="font-medium">Triggers:</span>{" "}
                      {event.triggers.join(", ")}
                    </p>
                  )}
                  {event.notes && (
                    <p>
                      <span className="font-medium">Notes:</span> {event.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Activity Logs */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-green-500">
          Activity Logs ({activityLogs.length})
        </h2>
        <div className="space-y-3">
          {activityLogs.length === 0 ? (
            <Card className="bg-white">
              <CardContent className="py-8 text-center text-gray-500">
                No activity logs yet
              </CardContent>
            </Card>
          ) : (
            activityLogs.map((log) => {
              const activity = activities.find((a) => a.id === log.activity_id);
              return (
                <Card key={log.id} className="bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {activity?.name || "Unknown Activity"}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {formatDateTime(log.activity_date)}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteActivityLog(log.id)}
                      >
                        <MdDelete className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {log.duration_minutes} minutes
                    </p>
                    {log.intensity && (
                      <p>
                        <span className="font-medium">Intensity:</span>{" "}
                        <span className="capitalize">{log.intensity}</span>
                      </p>
                    )}
                    {log.notes && (
                      <p>
                        <span className="font-medium">Notes:</span> {log.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Health Logs */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-blue-500">
          Health Logs ({healthLogs.length})
        </h2>
        <div className="space-y-3">
          {healthLogs.length === 0 ? (
            <Card className="bg-white">
              <CardContent className="py-8 text-center text-gray-500">
                No health logs yet
              </CardContent>
            </Card>
          ) : (
            healthLogs.map((log) => (
              <Card key={log.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Daily Health</CardTitle>
                      <p className="text-sm text-gray-600">
                        {formatDate(log.log_date)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteHealthLog(log.id)}
                    >
                      <MdDelete className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {log.sleep_hours && (
                    <p>
                      <span className="font-medium">Sleep:</span>{" "}
                      {log.sleep_hours} hours
                    </p>
                  )}
                  {log.sleep_quality && (
                    <p>
                      <span className="font-medium">Sleep Quality:</span>{" "}
                      {log.sleep_quality}/5
                    </p>
                  )}
                  {log.stress_level && (
                    <p>
                      <span className="font-medium">Stress Level:</span>{" "}
                      {log.stress_level}/5
                    </p>
                  )}
                  {log.mood && (
                    <p>
                      <span className="font-medium">Mood:</span> {log.mood}/5
                    </p>
                  )}
                  {log.notes && (
                    <p>
                      <span className="font-medium">Notes:</span> {log.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
