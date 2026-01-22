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
import { createEpilepsyEvent } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

const EVENT_TYPES = ["seizure", "aura", "other"];
const SEIZURE_TYPES = [
  "tonic-clonic",
  "absence",
  "focal",
  "myoclonic",
  "atonic",
  "other",
];
const COMMON_TRIGGERS = [
  "Stress",
  "Lack of sleep",
  "Missed medication",
  "Flashing lights",
  "Illness",
  "Alcohol",
  "Menstruation",
  "Exercise",
  "Heat/Dehydration",
];

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EpilepsyEventForm({ onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [eventType, setEventType] = useState("seizure");
  const [seizureType, setSeizureType] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("3");
  const [triggers, setTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState("");
  const [medications, setMedications] = useState("");
  const [recoveryTime, setRecoveryTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTriggerToggle = (trigger: string) => {
    setTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const allTriggers = [...triggers];
      if (customTrigger.trim()) {
        allTriggers.push(customTrigger.trim());
      }

      await createEpilepsyEvent({
        event_date: new Date(eventDate).toISOString(),
        event_type: eventType,
        seizure_type: seizureType || undefined,
        duration_minutes: duration ? parseInt(duration) : undefined,
        severity: parseInt(severity),
        triggers: allTriggers.length > 0 ? allTriggers : undefined,
        medications_taken:
          medications.trim().length > 0
            ? medications.split(",").map((m) => m.trim())
            : undefined,
        recovery_time_minutes: recoveryTime
          ? parseInt(recoveryTime)
          : undefined,
        notes: notes.trim() || undefined,
      });

      toast({ title: "Epilepsy event logged successfully" });
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to log event",
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
        <Label htmlFor="eventDate" className="text-gray-700">
          Date & Time *
        </Label>
        <Input
          id="eventDate"
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="eventType" className="text-gray-700">
          Event Type *
        </Label>
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="bg-white text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {EVENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {eventType === "seizure" && (
        <div>
          <Label htmlFor="seizureType" className="text-gray-700">
            Seizure Type
          </Label>
          <Select value={seizureType} onValueChange={setSeizureType}>
            <SelectTrigger className="bg-white text-gray-900">
              <SelectValue placeholder="Select seizure type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {SEIZURE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="duration" className="text-gray-700">
          Duration (minutes)
        </Label>
        <Input
          id="duration"
          type="number"
          min="0"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 5"
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="severity" className="text-gray-700">
          Severity (1-5) *
        </Label>
        <Input
          id="severity"
          type="range"
          min="1"
          max="5"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="bg-white"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Mild (1)</span>
          <span className="font-bold">{severity}</span>
          <span>Severe (5)</span>
        </div>
      </div>

      <div>
        <Label className="text-gray-700">Possible Triggers</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COMMON_TRIGGERS.map((trigger) => (
            <Button
              key={trigger}
              type="button"
              variant={triggers.includes(trigger) ? "default" : "outline"}
              size="sm"
              onClick={() => handleTriggerToggle(trigger)}
            >
              {trigger}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Add custom trigger"
          value={customTrigger}
          onChange={(e) => setCustomTrigger(e.target.value)}
          className="mt-2 bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="medications" className="text-gray-700">
          Medications Taken (comma-separated)
        </Label>
        <Input
          id="medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder="e.g., Keppra 500mg, Lamictal 100mg"
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="recoveryTime" className="text-gray-700">
          Recovery Time (minutes)
        </Label>
        <Input
          id="recoveryTime"
          type="number"
          min="0"
          value={recoveryTime}
          onChange={(e) => setRecoveryTime(e.target.value)}
          placeholder="e.g., 30"
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="notes" className="text-gray-700">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional details..."
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
          {isSubmitting ? "Logging..." : "Log Event"}
        </Button>
      </div>
    </form>
  );
}
