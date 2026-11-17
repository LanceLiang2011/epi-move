# EpiMove

A mobile-first web app for epilepsy information, physical activity guidance, and personal health tracking. Built with Next.js App Router, Supabase Auth/Postgres, Tailwind CSS, and Radix UI; deployed on Vercel from GitHub `main`.

## Development

```sh
npm ci
cp .env.example .env.local
# Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Browser tests run against a local mock backend and do not create production accounts or health records.

## Project guidance

- [Agent guide](AGENTS.md): route map, workflows, implementation invariants, deployment.
- [Architecture and database contracts](documentation/architecture.md).
- [UI skill](.agents/skills/epi-move-ui/SKILL.md): use `$epi-move-ui` for UI changes.
- [Review results and remaining limitations](documentation/review-notes.md).

`supabase/migrations` contains incremental changes to the existing database, not a complete fresh-install schema. Deploying the web app does not apply database migrations automatically.
