-- Correct existing hosted schema; this is not a fresh-database baseline.
begin;

alter table public.daily_health_logs drop constraint daily_health_logs_log_date_key;
alter table public.daily_health_logs add constraint daily_health_logs_user_date_key unique (user_id, log_date);

-- Profiles contain email addresses and must never be anonymously readable.
drop policy "Enable read access for all users" on public.users;
drop policy "Enable insert for authenticated users only" on public.users;
drop policy "Enable update for users based on email" on public.users;
create policy "Users can read own profile" on public.users for select to authenticated using ((select auth.uid()) = id);
create policy "Users can insert own profile" on public.users for insert to authenticated with check ((select auth.uid()) = id);
create policy "Users can update own profile" on public.users for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy "Enable insert for authenticated users only" on public.activities;
create policy "Users can insert own activities" on public.activities for insert to authenticated with check ((select auth.uid()) = created_by);
alter policy "Users can update own activities" on public.activities using ((select auth.uid()) = created_by) with check ((select auth.uid()) = created_by);

drop policy "Enable insert for authenticated users only" on public.notes;
create policy "Users can insert own notes" on public.notes for insert to authenticated with check (
  (select auth.uid()) = user_id and exists (
    select 1 from public.activities a where a.id = activity_id and (a.created_by = (select auth.uid()) or a.created_by is null)
  )
);
alter policy "Users can update own notes" on public.notes using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and exists (
    select 1 from public.activities a where a.id = activity_id and (a.created_by = (select auth.uid()) or a.created_by is null)
  )
);

alter policy "Users can update their own epilepsy events" on public.epilepsy_events with check ((select auth.uid()) = user_id);
alter policy "Users can update their own activity logs" on public.activity_logs with check ((select auth.uid()) = user_id);
alter policy "Users can update their own daily health logs" on public.daily_health_logs with check ((select auth.uid()) = user_id);
create index if not exists activities_created_by_idx on public.activities(created_by);
create index if not exists notes_user_id_idx on public.notes(user_id);
create index if not exists notes_activity_id_idx on public.notes(activity_id);
commit;
