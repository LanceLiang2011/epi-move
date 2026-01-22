"use client";

import React, { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdAdd } from "react-icons/md";
import EpilepsyEventForm from "./EpilepsyEventForm";
import ActivityLogForm from "./ActivityLogForm";
import HealthLogForm from "./HealthLogForm";
import EventDetailsDialog from "./EventDetailsDialog";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  description?: string;
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
  epilepsyEvents: EpilepsyEvent[];
  activityLogs: ActivityLog[];
  healthLogs: HealthLog[];
  activities: Activity[];
  userId: string;
}

export default function CalendarView({
  epilepsyEvents,
  activityLogs,
  healthLogs,
  activities,
  userId,
}: Props) {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isEpilepsyDialogOpen, setIsEpilepsyDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isHealthDialogOpen, setIsHealthDialogOpen] = useState(false);

  // Convert events to calendar format
  const events: CalendarEvent[] = useMemo(() => {
    const epilepsyCalendarEvents: CalendarEvent[] = epilepsyEvents.map(
      (event) => {
        const eventDate = new Date(event.event_date);
        return {
          id: event.id,
          title: `🔴 ${event.event_type === "seizure" ? "Seizure" : event.event_type}${event.seizure_type ? ` (${event.seizure_type})` : ""}`,
          start: eventDate,
          end: eventDate,
          type: "epilepsy" as const,
          data: event,
        };
      },
    );

    const activityCalendarEvents: CalendarEvent[] = activityLogs.map((log) => {
      const logDate = new Date(log.activity_date);
      const activity = activities.find((a) => a.id === log.activity_id);
      return {
        id: log.id,
        title: `🏃 ${activity?.name || "Activity"} (${log.duration_minutes}min)`,
        start: logDate,
        end: logDate,
        type: "activity" as const,
        data: log,
      };
    });

    const healthCalendarEvents: CalendarEvent[] = healthLogs.map((log) => {
      const logDate = new Date(log.log_date);
      return {
        id: log.id,
        title: `💚 Health Log`,
        start: logDate,
        end: logDate,
        type: "health" as const,
        data: log,
      };
    });

    return [
      ...epilepsyCalendarEvents,
      ...activityCalendarEvents,
      ...healthCalendarEvents,
    ];
  }, [epilepsyEvents, activityLogs, healthLogs, activities]);

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#9561cc";
    if (event.type === "epilepsy") backgroundColor = "#ef4444";
    if (event.type === "activity") backgroundColor = "#10b981";
    if (event.type === "health") backgroundColor = "#3b82f6";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  return (
    <div className="w-full space-y-4">
      {/* Action Buttons */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Dialog
            open={isEpilepsyDialogOpen}
            onOpenChange={setIsEpilepsyDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                <MdAdd className="mr-2 h-4 w-4" />
                Log Epilepsy Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle>Log Epilepsy Event</DialogTitle>
              </DialogHeader>
              <EpilepsyEventForm
                onSuccess={() => setIsEpilepsyDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isActivityDialogOpen}
            onOpenChange={setIsActivityDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <MdAdd className="mr-2 h-4 w-4" />
                Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle>Log Physical Activity</DialogTitle>
              </DialogHeader>
              <ActivityLogForm
                activities={activities}
                onSuccess={() => setIsActivityDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isHealthDialogOpen}
            onOpenChange={setIsHealthDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <MdAdd className="mr-2 h-4 w-4" />
                Log Daily Health
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle>Log Daily Health</DialogTitle>
              </DialogHeader>
              <HealthLogForm onSuccess={() => setIsHealthDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-red-500"></div>
            <span>Epilepsy Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-500"></div>
            <span>Activities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-500"></div>
            <span>Health Logs</span>
          </div>
        </div>
      </Card>

      {/* Calendar */}
      <Card className="p-4">
        <div style={{ height: "600px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            popup
          />
        </div>
      </Card>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          isOpen={isEventDetailsOpen}
          onClose={() => {
            setIsEventDetailsOpen(false);
            setSelectedEvent(null);
          }}
          activities={activities}
        />
      )}
    </div>
  );
}
