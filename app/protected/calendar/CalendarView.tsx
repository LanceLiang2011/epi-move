"use client";

import React, { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card } from "@/components/ui/card";
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
