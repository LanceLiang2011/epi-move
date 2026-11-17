# EpiMove architecture

Reviewed against application source and the hosted EpiMove schema on 2026-11-17. See `AGENTS.md` for coding guidance and the complete route map.

## Application flow

The Next.js App Router renders public educational pages under `/main`. Their layout provides TopNav, a white scrollable content region, and BottomTabs. Protected pages use a server layout that verifies Supabase identity; profile, activities, and calendar add their own white content and bottom navigation. The centered shell remains 672px wide on larger screens.

Server components fetch owned records through the cookie-backed SSR Supabase client. Client components manage form fields, dialogs, tabs, and calendar interaction. Mutations call `lib/actions.ts`, which verifies the authenticated user, applies ownership filters, handles database errors, and revalidates affected paths. Supabase RLS provides the backend authorization boundary. The browser client is reserved for client-side auth/profile introduction behavior.

The public activity catalog is bundled TypeScript/HTML, not fetched from Supabase. Static article pages use `generateStaticParams`. Resource articles and references are TSX. Images live in `public/images`; videos are remote iframe embeds. Medical content remains editorial content, separate from personal logs.

## Authentication

`middleware.ts` calls `lib/supabase/middleware.ts` for session verification/refresh. It passes all refreshed cookies into the server request and browser response. The server client awaits Next's cookie store; cookie writes in a read-only Server Component are handled by middleware.

Email signup/login use server actions. Signup stores username in display metadata and, when a session is returned, creates the custom profile idempotently and opens `/protected/profile`. The hosted project had email auto-confirmation enabled when inspected. With email confirmation enabled, the user sees confirmation instructions; `/auth/callback` exchanges the PKCE code and prepares the profile before opening it. Login also repairs a missing profile. Profile preparation preserves existing rows.

Phone/social providers and password reset are not implemented. Signup routes for unavailable methods direct the user to email. No privileged Supabase key is needed by the app.

## Verified database contracts

All six public tables have RLS. IDs are UUIDs unless otherwise stated. Nullability below follows the hosted schema rather than optimistic frontend interfaces.

| Table               | Columns and relationships                                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`             | `id` PK, nullable `username`, unique nullable `email`, nullable UUID[] `favorite_activities`, nullable boolean `visited` default false. This custom profile table's ID matches Auth by application convention; the inspected schema has no FK to `auth.users`.                                                              |
| `activities`        | UUID `id` default generated; nullable `name`, `description`, `created_by` FK to `public.users.id`. A null creator denotes a shared database activity. **No `created` or `updated_at` column.**                                                                                                                              |
| `notes`             | UUID `id`; nullable `user_id` FK to `public.users.id`, nullable UUID `activity_id` FK to `activities.id`, nullable `note`; nullable `created_at`/`updated_at` timestamptz defaults.                                                                                                                                         |
| `epilepsy_events`   | UUID `id`; required `user_id` FK to Auth (cascade deletion), `event_date` timestamptz, `event_type` text; nullable `seizure_type`, integer `duration_minutes`, integer `severity` checked 1–5, text[] `triggers`/`medications_taken`, integer `recovery_time_minutes`, text `notes`, timestamps.                            |
| `activity_logs`     | UUID `id`; required `user_id` FK to Auth (cascade), **text** `activity_id`, timestamptz `activity_date`, integer `duration_minutes`; nullable `intensity` checked low/moderate/high, text `notes`, timestamps. The activity reference intentionally accepts either a static slug or a custom UUID; it is not a database FK. |
| `daily_health_logs` | UUID `id`; required `user_id` FK to Auth (cascade), date `log_date`; nullable numeric `sleep_hours`, integer `sleep_quality`/`stress_level`/`mood` checked 1–5, text[] `medications_taken`, text `notes`, timestamps. Unique `(user_id, log_date)`.                                                                         |

After the review migration, profiles can only be selected/inserted/updated by their own ID. Activities insert/update ownership is tied to `created_by`; notes insert/update requires the user's own `user_id` and an accessible database activity. Event/log writes are scoped to `user_id`, with explicit ownership checks on updates. Existing duplicate delete policies remain harmless but should be consolidated in a future policy cleanup. There are indexes on the legacy activity/note FKs; the health uniqueness index also starts with `user_id`.

The corrective migration lives in `supabase/migrations/20261117204732_fix_health_log_uniqueness_and_ownership.sql` and was applied to hosted project `byxnrvadxlgoovcykfkh`. Earlier schema history is not present in the repo. Inspect migration history and schema before applying changes; Vercel does not run these files.

## Catalog and identity pitfalls

`activitiesWithSlugs` contains 17 summaries used for grids and calendar dropdowns. `activities` maps the same slugs to article HTML/videos; `altText`, `soloSlugs`, and `groupSlugs` support cards and category pages. Keep these in sync when adding an activity.

Calendar/management pages synthesize `ActivityInfo` entries with `id = slug`, no `created_by`, and a presentation-only `created` timestamp. Custom entries come from Supabase with UUID IDs. Do not persist synthesized fields to the database. Legacy notes cannot reference static slug IDs because their FK is UUID-based; calendar logs can.

`resources` contains five resource descriptors; TSX articles are under `app/main/resources/(details)`. The `(details)` folder is a layout group, not a URL segment. `dowload-button.tsx` retains its original misspelled filename for compatibility.

## Time handling

Epilepsy/activity forms initialize local `datetime-local` values, then serialize them to UTC ISO timestamps on submit. Calendar and list views parse returned offset-aware timestamps directly. Historical timestamps previously submitted without offsets may already encode the wrong instant; this review does not rewrite historical health records.

Daily health uses a calendar date, independent of timezone. Keep it as `YYYY-MM-DD` in transport/storage and construct local midnight only for display. The calendar shows these as all-day entries. Client duplicate detection improves feedback, while the composite database uniqueness constraint enforces correctness across clients.

## UI and feedback

CSS theme values use space-separated HSL channels. Plum `background`/white `foreground` describe the shell; white `card`/dark `card-foreground` describe content. Primary purple is dark enough for normal-size white text. Shared outline buttons, dialogs, and inputs use card surface colors explicitly, preventing inherited white-on-white or dark-on-dark content.

A single root Toaster serves all flows. Logging dialogs dismiss only after successful saves. Trigger chips expose `aria-pressed`; custom-activity nested submission stops React event propagation. Dialogs have viewport-bounded widths/heights. Content regions flex and scroll while the bottom navigation remains available. Global reduced-motion CSS suppresses CSS animation/transition; future framer-motion work should also respect reduced-motion preferences.

## Validation and operational limits

`npm run build` includes compilation and type checks. `npm run typecheck` is a separate strict TypeScript check. Playwright exercises browser/server-action behavior with a local HTTP auth/REST fixture, including signup with/without confirmation, readable trigger states, timezone round trips, daily dates, nested activity creation, and search/404s. It does not prove production Auth delivery, Postgres RLS, network reliability, or all browser behavior.

The review separately ran rolled-back database tests with two disposable identities to check same-date multi-user health logs, same-user duplicates, ownership isolation, rejected cross-user inserts, and anonymous profile privacy. No fixture health data was retained.

Production builds come from GitHub main on Vercel. Environment variables and Supabase redirect allowlists must match deployment domains. Backend migrations and platform maintenance are independent of a source-code deployment. See `review-notes.md` for residual advisories and validation results.
