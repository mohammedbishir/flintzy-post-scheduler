# Flintzy — Social Media Post Scheduler

Frontend assignment: compose, schedule, and manage posts for **Facebook**, **Instagram**, **X**, and **TikTok**.

No real social APIs or auth — everything is mocked on the client.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Live demo

<!-- Add Vercel/Netlify URL after deploy -->
_Deploy link coming soon._

## What this app does

- **Queue** — posts grouped by day (Today / Tomorrow / date)
- **Filters + search** — platform, status, content; stored in the **URL** so refresh keeps them
- **Composer** — content, multi-platform select, optional image URL, datetime
- **Live character counters** — X 280 · IG/TikTok 2200 · Facebook 5000; blocks submit if over limit
- **Time** — stored as UTC ISO, shown in local timezone; must be in the future
- **Retry** — failed posts can be retried (optimistic UI, 1s delay, ~20% fail again)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- In-memory mock API (`src/lib/api.ts`) seeded with 32 posts (`src/data/posts.ts`)

## Folder map

```
src/
  app/              # Next.js routes + layout
  components/       # UI pieces (composer, queue, filters, cards)
  context/          # PostsProvider — app state
  data/             # Seed posts
  hooks/            # usePostFilters (URL sync)
  lib/              # api, dates, filters, platforms, grouping
  types/            # Post model
```

## Technical decisions (short)

1. **Mock API in a module, not MSW** — easier to read and enough for a frontend-only task. Delays + random retry failure live in one file.
2. **URL query params for filters** — shareable and survives refresh without localStorage.
3. **Optimistic retry** — UI flips to `scheduled` immediately; on failure it rolls back and shows the error.
4. **Relative seed dates** — posts are offset from “now”, so Today/Tomorrow always demo correctly.

## Interview notes

See [MODULES.md](./MODULES.md) for a module-by-module breakdown of what was built and why.

## Contact / submission

Assignment contact: bhanu@flintzy.com
