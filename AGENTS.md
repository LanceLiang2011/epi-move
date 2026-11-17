# EpiMove project guide

## Purpose and product boundaries

EpiMove is a mobile-first epilepsy information and personal tracking web app. Visitors can read activity guidance and resources without signing in. Authenticated users manage custom activities, notes, epilepsy events, physical activity logs, and daily health logs. Educational content is not individualized medical advice: preserve the existing disclaimer and citations. Product flows should use plain, supportive language.

For UI work, read `.agents/skills/epi-move-ui/SKILL.md`. For table contracts and backend caveats, read `documentation/architecture.md`. Update this guide and that document when changing their contracts.

## Runtime and commands

- Node.js **26.x**, declared in `package.json` and `.nvmrc`. Vercel uses the package engine requirement over the dashboard setting; do not restore the retired Node.js 20 setting.

- Next.js **15.5.29**, App Router, TypeScript strict mode; React **18.2** dependency (Next App Router uses its bundled React runtime). Request APIs, server Supabase clients, route params, and search params are asynchronous.
- Tailwind **3**, Radix/shadcn-style components, Geist Sans, react-icons/lucide, framer-motion, react-big-calendar with date-fns 4.
- Supabase SSR **0.12.7**, supabase-js **2.119.0**. Keep these and Next pinned; commit `package-lock.json`.
- `npm ci`, `npm run dev`, `npm run build`, `npm start`, `npm run typecheck`.
- `npx playwright install chromium` once, then `npm run test:e2e`. Tests start a **local mock backend**, not the production database, and a separate Next dev server on port 3100. Mock backend: port 54329. `.next-test`, traces, reports are ignored. Do not run two copies concurrently.
- `.env.local`/`.env` needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; use `.env.example`. These are public client settings. Never expose a service-role key or commit local env files.
- `NEXT_DIST_DIR` can override `.next` for isolated tests. No project ESLint config exists; build/typecheck are the current static checks.

## Route and module map

| Location                                             | Responsibility                                                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`, `app/globals.css`                  | Geist font, metadata, centered max-width 672px shell, global theme, one app-wide Toaster                                          |
| `/`                                                  | Redirect to `/main`                                                                                                               |
| `/main`                                              | Public two-page introduction                                                                                                      |
| `/main/information` and children                     | Questions, solo/group activity guidance                                                                                           |
| `/main/activities`, `ActivitiesGrid.tsx`             | Searchable static catalog                                                                                                         |
| `/main/activities/[slug]`                            | Static activity articles/videos; unknown slug returns 404                                                                         |
| `/main/resources` and `(details)`                    | Resource list and five article routes; route group adds back navigation without changing URLs                                     |
| `/main/references`, `/main/disclaimer`               | Citation list and medical disclaimer                                                                                              |
| `/login`, `/signup/email`                            | Server-action email/password authentication                                                                                       |
| `/signup/phone`, `/signup/others`                    | Informational fallback to email signup; these providers are not implemented                                                       |
| `/auth/callback`                                     | PKCE code exchange, profile preparation, success/error redirect                                                                   |
| `/protected/layout.tsx`                              | Server-side `getUser()` guard and top navigation                                                                                  |
| `/protected`                                         | Older authenticated introduction; `visited` toggles on first visit                                                                |
| `/protected/profile`                                 | Profile name/email; handles absent profile without crashing                                                                       |
| `/protected/activities`                              | `ActivityManager` edits/deletes activities and notes                                                                              |
| `/protected/calendar`                                | Server loads owned logs/custom activities; `CalendarTabs` switches Calendar/List/Activities                                       |
| Calendar forms                                       | `EpilepsyEventForm`, `ActivityLogForm`, `HealthLogForm` create records through server actions                                     |
| Calendar views                                       | `CalendarView` normalizes records to calendar entries; `LogsListView`, `EventDetailsDialog`, `ActivitiesView` display/manage them |
| `lib/actions.ts`                                     | Auth and CRUD server actions; authenticated identity and ownership filters; path revalidation                                     |
| `lib/auth/profile.ts`                                | Idempotent profile creation from verified auth user, preserving existing rows                                                     |
| `lib/supabase/{client,server,middleware}.ts`         | Browser client, async cookie-backed server client, refresh middleware                                                             |
| `components/navigations`                             | TopNav, hamburger sheet, server/client bottom tabs, catalog Heading/search                                                        |
| `components/ui`                                      | Shared Radix primitives and form/toast hooks; use `cn()` to merge Tailwind overrides                                              |
| `components/{ActivitiesForm,NoteForm}.tsx`           | Older React Hook Form/Zod creation forms; currently not linked from profile                                                       |
| `app/protected/profile/{AddDataDialog,NoteCard}.tsx` | Older reusable note/profile widgets                                                                                               |
| `data/activities.ts`                                 | 17 static slugs, names, images, article HTML, video HTML, alt text, solo/group categories                                         |
| `data/resources.ts`, `public/images`                 | Resource metadata and bundled illustration assets                                                                                 |
| `supabase/migrations`                                | Incremental fixes against the existing hosted schema; **not** a fresh schema baseline                                             |
| `tests/support/supabase-mock.mjs`                    | Narrow auth/REST fixture for browser regressions; not a Supabase emulator or RLS test                                             |

## Authentication invariants

1. `await createClient()` from `lib/supabase/server.ts` in server code; use the browser module only in client components. The middleware updates **all** refreshed cookies on both request and response. Preserve the response carrying those cookies.
2. Verify identity with `auth.getUser()` before protected data access/mutation. Never use client-supplied user IDs or editable metadata to authorize access.
3. Signup passes `username` as display metadata. When Supabase returns a session, ensure the profile then redirect directly to `/protected/profile`. No second login is needed. The hosted project currently auto-confirms emails.
4. If email confirmation is enabled later, signup may return a user with no session. Show confirmation instructions and defer profile creation until `/auth/callback` exchanges the code. Configure the callback URL in the Supabase redirect allowlist.
5. `ensureUserProfile` uses insert-on-conflict-ignore. Existing usernames and profile fields must survive repeated login/callback requests. Metadata is only display data.
6. `redirect()` throws internally: keep redirect calls outside broad error handlers that would swallow navigation.

## Data and mutation invariants

- RLS is required even when server actions apply ownership filters. All six public tables have RLS. Profile emails are private to their owner.
- `activities.created_by` and all log/note `user_id` values come from the verified user. Never spread unchecked input after the ownership field.
- Static activity IDs are **slugs**; custom activities have **UUIDs**. `activity_logs.activity_id` is text and supports both. `notes.activity_id` is a UUID FK to the database `activities` table; static slugs cannot be inserted into legacy notes. Do not conflate these contracts.
- Epilepsy/activity timestamps are `timestamptz`: convert browser `datetime-local` input with `new Date(value).toISOString()` before saving; parse returned ISO timestamps directly. Never strip a trailing `Z`.
- Daily health `log_date` is a date-only `YYYY-MM-DD`. Display with local midnight (`new Date(date + 'T00:00:00')`), not UTC date parsing. Its unique key is `(user_id, log_date)`.
- Revalidate `/protected/calendar` for changes that affect activity names/catalog as well as log changes. Revalidate `/protected/activities` for note changes.
- Handle errors before presenting success. Do not log health payloads/passwords/session tokens. New form validation must also run on the server if it protects a data invariant.

## UI conventions and verification

- The app intentionally combines a deep plum shell and white content surfaces. `background` means plum; `foreground` means white. `text-background` is an established dark-text convention on white pages. Cards/dialogs/inputs use paired card colors.
- CSS HSL variables use space-separated channels, including `%` on lightness. `hsl(var(--primary) / 0.9)` must remain valid. Primary is purple with white text and readable hover/selected states.
- Test trigger buttons unselected, selected, hovered, keyboard-focused, and deselected. Keep `type="button"` and `aria-pressed` on trigger toggles.
- Dialogs must fit small viewports and scroll internally. Avoid nested submit bubbling from a portal-rendered form into a parent React form.
- Preserve bottom navigation while scrolling content. Test at 320–390px and at desktop shell width; prevent horizontal overflow from grids, toolbars, videos, and long names.
- Run build/typecheck plus relevant browser regressions before pushing. Browser auth tests use fixtures; live RLS tests must be separate and roll back disposable records.

## Deployment and review

GitHub origin is `LanceLiang2011/epi-move`; Vercel builds from `main`. The user authorized pushing this review's changes to `main`. Future tasks should use their own deployment authorization. A successful git push is not proof of a successful Vercel deployment: check build status/logs when available. Database migrations deploy separately from Vercel.

The 2026-11-17 review applied `fix_health_log_uniqueness_and_ownership` to the hosted EpiMove project and recorded the SQL locally. It fixes cross-user daily-date collisions, public profile access, permissive insert ownership, update ownership checks, and missing FK indexes. Do not reapply that migration blindly.

## Known limits / follow-up work

- Supabase advisors still flag disabled leaked-password protection and an outdated hosted Postgres patch release. Those platform settings/upgrades are separate from application code and may require account-plan access or downtime planning.
- The dependency review removed the critical Next.js advisory; remaining transitive/build-tool and Zod advisories need a separately tested dependency migration. See `documentation/review-notes.md` for the latest check results and scope.
- Schema history starts with a corrective migration; reconstruct/verify a complete baseline before promising one-command local Supabase provisioning.
- Legacy note creation supports database activities only; the newer calendar logs support both catalogs. Favorites are a stored legacy UUID array and are not exposed by the current profile UI.
- Password reset is not implemented; the old login text has no action. Phone/social signup fall back to email. Do not describe these as functioning auth providers.
- Clinical copy and citations have not been medically revalidated by this engineering review. Repository HTML is trusted static content; never render user notes through `dangerouslySetInnerHTML`.
