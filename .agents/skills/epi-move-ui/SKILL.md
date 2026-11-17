---
name: epi-move-ui
description: Update EpiMove's Next.js mobile UI, including navigation, forms, calendar, activity cards, dialogs, and visual states. Use for UI changes in the epi-move repository while preserving its plum shell, light content surfaces, accessibility, and health logging workflows.
---

# EpiMove UI

Read the repo's `AGENTS.md` for the route map and `documentation/architecture.md` when a UI change touches data or auth. Inspect the existing component and shared primitive before choosing an implementation.

## Preserve the visual system

- The app is mobile-first inside `app/layout.tsx`'s centered 672px shell. Use two-column activity cards on narrow phones and three columns when space permits. Check 320px and 390px widths, plus the desktop shell.
- Plum `bg-background` pairs with white `text-foreground`; white `bg-card` pairs with dark `text-card-foreground`. Existing `text-background` on white article pages means dark plum text. Never assume `foreground` means dark text.
- Theme channels in `app/globals.css` must remain valid space-separated HSL, with lightness percentages. Tailwind opacity modifiers depend on this. Purple primary pairs with `text-primary-foreground` and must keep readable selected/hover states.
- Prefer `components/ui` primitives and `cn()` in `lib/utils.ts`. When overriding a surface color, explicitly inspect its text, placeholder, focus ring, border, and hover colors. Outline buttons use the card surface; primary buttons use the purple surface.
- Keep medical article HTML and citations intact unless the task requests editorial changes. Never pass user-entered health notes to `dangerouslySetInnerHTML`.

## Workflows that must survive changes

- The white page body scrolls while TopNav/BottomTabs remain usable. Flex children need `min-h-0`; the bottom tabs should not shrink. Check content behind the mobile keyboard and long dialog forms.
- Dialogs are portaled and inherit neither their trigger's color nor its DOM position. Use the shared light card defaults, bounded width and height, internal scrolling, accessible title, and explicit close/cancel actions.
- A portal-rendered nested form can still bubble submit events through its React parent. `ActivityLogForm` stops propagation on custom-activity creation. Verify creation does not also submit the outer log.
- Trigger chips in `EpilepsyEventForm` are buttons with `type="button"` and `aria-pressed`. Selection must remain readable before/after hovering and after deselection; preserve visible focus and expose selection beyond color alone.
- Root `app/layout.tsx` mounts one Toaster. Use its success/error feedback and pending states rather than introducing extra Toasters in dialogs. Disable submissions while pending; retain entered data when a save fails.
- Pair labels with actual control IDs; give icon-only controls meaningful accessible names. Radix selects need an accessible label on their trigger. Use `Button asChild` for a link styled as a button instead of nesting interactive elements.
- Respect reduced motion. Global CSS handles CSS animation; use framer-motion reduced-motion support when changing animated components. Avoid flashing effects in this epilepsy-focused product.

## Data-sensitive UI decisions

- Signup should arrive at the profile with a session. Confirmation-required signup must explain email verification and let the callback establish the session. Do not add a second login requirement.
- Convert `datetime-local` inputs to ISO timestamps at submission; display returned timestamps with their offsets. Date-only health logs stay as local calendar dates. Test Toronto or another negative UTC offset to expose previous-day regressions.
- Static activities use slug IDs; custom database activities use UUIDs. Calendar logs support both, legacy notes only database UUIDs. Keep ownership-based edit/delete controls limited to custom entries.
- `CalendarTabs` owns log dialog state. Use success callbacks to close, refresh after changes, and show useful failure feedback. Preserve Calendar/List/Activities navigation.

## Validate the changed experience

Run relevant Playwright tests (`npm run test:e2e`) and the production build. Tests use a local mock backend; don't substitute production account creation for normal browser regression tests. Add behavior coverage when changing auth, date serialization, or save flows. For purely visual tweaks, inspect the changed states at phone and desktop widths.

For button/color changes, check computed foreground/background contrast in normal, hovered, selected, focused, and disabled states. Target at least 4.5:1 for normal text, and use practical touch targets around 44px when changing controls. Check dialog scroll/close behavior, screen-reader labels, long text, empty states, loading/errors, and horizontal overflow only where affected by the change.
