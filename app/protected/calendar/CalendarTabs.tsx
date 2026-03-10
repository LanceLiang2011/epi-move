"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import CalendarView from "./CalendarView";
import LogsListView from "./LogsListView";
import ActivitiesView from "./ActivitiesView";
import EpilepsyEventForm from "./EpilepsyEventForm";
import ActivityLogForm from "./ActivityLogForm";
import HealthLogForm from "./HealthLogForm";

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
  created_by?: string;
}

interface Props {
  epilepsyEvents: EpilepsyEvent[];
  activityLogs: ActivityLog[];
  healthLogs: HealthLog[];
  activities: Activity[];
  userId: string;
}

export default function CalendarTabs({
  epilepsyEvents,
  activityLogs,
  healthLogs,
  activities,
  userId,
}: Props) {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isEpilepsyDialogOpen, setIsEpilepsyDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isHealthDialogOpen, setIsHealthDialogOpen] = useState(false);

  return (
    <Tabs
      defaultValue="calendar"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-3 bg-white/10">
        <TabsTrigger
          value="calendar"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Calendar
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          List
        </TabsTrigger>
        <TabsTrigger
          value="activities"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Activities
        </TabsTrigger>
      </TabsList>

      {/* Log Buttons - Show on Calendar and List tabs only */}
      {activeTab !== "activities" && (
        <Card className="mt-4 p-4">
          <div className="flex flex-wrap gap-2">
            <Dialog
              open={isEpilepsyDialogOpen}
              onOpenChange={setIsEpilepsyDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
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
                  onCancel={() => setIsEpilepsyDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isActivityDialogOpen}
              onOpenChange={setIsActivityDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
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
                  onCancel={() => setIsActivityDialogOpen(false)}
                  onActivitiesUpdate={() => {
                    // Activities will be refreshed by router.refresh() in the form
                  }}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isHealthDialogOpen}
              onOpenChange={setIsHealthDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                  <MdAdd className="mr-2 h-4 w-4" />
                  Log Daily Health
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle>Log Daily Health</DialogTitle>
                </DialogHeader>
                <HealthLogForm
                  healthLogs={healthLogs}
                  onSuccess={() => setIsHealthDialogOpen(false)}
                  onCancel={() => setIsHealthDialogOpen(false)}
                />
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
      )}

      <TabsContent value="calendar" className="mt-4">
        <CalendarView
          epilepsyEvents={epilepsyEvents}
          activityLogs={activityLogs}
          healthLogs={healthLogs}
          activities={activities}
          userId={userId}
        />
      </TabsContent>

      <TabsContent value="list" className="mt-4">
        <LogsListView
          epilepsyEvents={epilepsyEvents}
          activityLogs={activityLogs}
          healthLogs={healthLogs}
          activities={activities}
          userId={userId}
        />
      </TabsContent>

      <TabsContent value="activities" className="mt-4">
        <ActivitiesView activities={activities} userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
