"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createDailyHealthLog } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function HealthLogForm({ onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [logDate, setLogDate] = useState(new Date().toISOString().slice(0, 10));
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState("3");
  const [stressLevel, setStressLevel] = useState("3");
  const [mood, setMood] = useState("3");
  const [medications, setMedications] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createDailyHealthLog({
        log_date: logDate,
        sleep_hours: sleepHours ? parseFloat(sleepHours) : undefined,
        sleep_quality: parseInt(sleepQuality),
        stress_level: parseInt(stressLevel),
        mood: parseInt(mood),
        medications_taken:
          medications.trim().length > 0
            ? medications.split(",").map((m) => m.trim())
            : undefined,
        notes: notes.trim() || undefined,
      });

      toast({ title: "Health log saved successfully" });
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to save health log",
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
        <Label htmlFor="logDate" className="text-gray-700">
          Date *
        </Label>
        <Input
          id="logDate"
          type="date"
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          required
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="sleepHours" className="text-gray-700">
          Sleep Hours
        </Label>
        <Input
          id="sleepHours"
          type="number"
          step="0.5"
          min="0"
          max="24"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          placeholder="e.g., 7.5"
          className="bg-white text-gray-900"
        />
      </div>

      <div>
        <Label htmlFor="sleepQuality" className="text-gray-700">
          Sleep Quality (1-5)
        </Label>
        <Input
          id="sleepQuality"
          type="range"
          min="1"
          max="5"
          value={sleepQuality}
          onChange={(e) => setSleepQuality(e.target.value)}
          className="bg-white"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Poor (1)</span>
          <span className="font-bold">{sleepQuality}</span>
          <span>Excellent (5)</span>
        </div>
      </div>

      <div>
        <Label htmlFor="stressLevel" className="text-gray-700">
          Stress Level (1-5)
        </Label>
        <Input
          id="stressLevel"
          type="range"
          min="1"
          max="5"
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
          className="bg-white"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Low (1)</span>
          <span className="font-bold">{stressLevel}</span>
          <span>High (5)</span>
        </div>
      </div>

      <div>
        <Label htmlFor="mood" className="text-gray-700">
          Mood (1-5)
        </Label>
        <Input
          id="mood"
          type="range"
          min="1"
          max="5"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="bg-white"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Poor (1)</span>
          <span className="font-bold">{mood}</span>
          <span>Great (5)</span>
        </div>
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
        <Label htmlFor="notes" className="text-gray-700">
          Notes
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional observations..."
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
          {isSubmitting ? "Saving..." : "Save Health Log"}
        </Button>
      </div>
    </form>
  );
}
