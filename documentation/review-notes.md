# Engineering review — 2026-11-17

## Delivered

- Replaced the starter README; added root `AGENTS.md`, expanded architecture/data documentation, and created the discoverable `$epi-move-ui` skill under `.agents/skills`.
- Signup now keeps Supabase's returned session and opens the profile. Username is stored in display metadata; profile creation is idempotent, and confirmation-required signup defers it until a valid callback. Login repairs missing profiles. Invalid callbacks and signup errors show feedback; pending auth buttons are disabled.
- Repaired malformed HSL variables and explicit surface/text pairings. Trigger chips expose selection accessibly and remain readable selected/hovered. Dialogs, outline buttons, and inputs have consistent light surfaces. Primary purple now supports readable white normal-size text.
- Added one root Toaster, fixed nested activity form submit propagation, corrected shared edit-dialog state, and ensured activity mutations invalidate the calendar.
- Fixed local datetime serialization and removed UTC suffix stripping. Date-only health logs display on the selected date, including in negative UTC offsets.
- Fixed mobile activity grid/header overflow, constrained iframe/dialog sizes, preserved bottom navigation while content scrolls, and added CSS reduced-motion support.
- Fixed case-sensitive activity search, resource search routing/filtering, invalid activity slug errors, a placeholder article link, and low-contrast article links. Unsupported signup routes now explain email signup.
- Upgraded/pinned Next.js 15.5.29 and the Supabase SDKs, migrated async Next request APIs and SSR cookie handling, and updated compatible dependencies. The original critical Next.js advisory is no longer reported.

## Hosted database changes

Applied `fix_health_log_uniqueness_and_ownership` to EpiMove (`byxnrvadxlgoovcykfkh`) and committed the SQL. No health records were rewritten.

- Replaced global daily-date uniqueness with `(user_id, log_date)`.
- Removed anonymous profile/email reads; profile access is owner-only.
- Restricted profile/activity/note insertion to the verified owner. Notes also require an accessible database activity.
- Added explicit update ownership checks and indexes for legacy activity/note foreign keys.

## Validation

- Production build: passed on Next.js 15.5.29, including type validation and all 47 generated routes/assets.
- Strict TypeScript check: passed.
- Playwright: **9 passing tests**, using a local mock auth/REST backend. Covers signup/session persistence, confirmation-required signup, auth error feedback, selected/hovered trigger contrast (at least 4.5:1), Toronto timestamp round trip, custom activity submission isolation, daily-date display/duplicates, activity search/404, resource search, and 320/390/672px layout checks. A selected-trigger screenshot was visually inspected.
- Hosted Postgres: rolled-back fixture transaction passed same-date multi-user inserts, same-user uniqueness, profile/health row isolation, cross-user insert rejection, and anonymous profile privacy. Fixture users and records were rolled back.
- New UI skill: bundled skill validator passed.

## Remaining limitations and maintenance

The review is engineering validation, not an exhaustive proof that every feature or clinical statement is correct. Browser regressions use a mock; production signup/email delivery has not been exercised with a real new account. Historical timestamps saved without offsets were not migrated.

The final `npm audit --omit=dev` reported **13 affected packages: 9 high, 4 moderate, 0 critical**. Remaining advisories involve Zod 3, CSS/build tooling and their dependency chains (including Next's bundled PostCSS). Compatible fixes were applied. Resolving the remainder needs a tested dependency migration/override strategy; do not blindly use `npm audit fix --force`, which proposes unrelated major upgrades. The full dependency audit also includes typography-related development dependencies.

Supabase security advisors still report [leaked-password protection disabled](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection) and an [outdated Postgres patch release](https://supabase.com/docs/guides/platform/upgrading). These require platform maintenance; the database engine was not upgraded during this review. Some existing policies still have performance warnings for repeated auth checks/duplicate delete policies. All six public tables have RLS enabled.

Legacy note creation accepts database activity UUIDs, not static activity slugs. Its UI is currently disconnected from the simplified profile. Favorites, password reset, and phone/social auth are not complete product flows. There is no complete database baseline in version control. These are documented for future work rather than represented as working functionality.

Vercel deployment monitoring initially returned a team-scope authorization error. GitHub main remains the authorized deployment mechanism; confirm Vercel's build outcome separately if team access is unavailable.
