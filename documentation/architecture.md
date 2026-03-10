# Epi-Move Architecture Documentation

## Overview
Epi-Move is a Next.js (App Router) based web application designed to track epilepsy events, physical activities, and daily health metrics. It uses Supabase for backend services including authentication and database.

## Data Structure
The application relies on several key tables in Supabase:
- **users**: Custom user profile data linked to Supabase Auth UID.
- **epilepsy_events**: Logs of epilepsy events (date, type, triggers, severity, etc.).
- **activity_logs**: Logs of completed physical activities (duration, intensity, notes).
- **daily_health_logs**: Daily tracking of sleep, stress, mood, and medications.
- **activities**: User-created custom activity types.
- **notes**: General user notes.

## Styling
- **Tailwind CSS**: Used for all utility-first styling.
- **Radix UI / Shadcn UI**: Used for accessible component primitives (Dialogs, Tabs, Forms, etc.).
- **React Big Calendar**: Used to display events in the calendar view.

## Supabase Connection
Supabase is integrated using `@supabase/ssr` with both server-side clients (`lib/supabase/server.ts`) and client-side components to fetch, insert, update, and delete data securely, heavily utilizing Row Level Security (RLS) based on `user_id`. Server Actions (`lib/actions.ts`) are used for form submissions and data mutation.
