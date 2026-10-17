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
- Mock data: local JSON (`src/data/posts.json`, 32 posts) + **MSW** intercepting `/api/posts`

## Folder map

```
src/
  app/              # Next.js routes + layout
  components/       # UI pieces (composer, queue, filters, cards)
  context/          # PostsProvider — app state
  data/posts.json   # Local mock data (32 posts)
  mocks/            # MSW handlers + browser worker
  hooks/            # usePostFilters (URL sync)
  lib/              # api (fetch), dates, filters, platforms, grouping
  types/            # Post model
```

## Technical decisions (short)

1. **Local JSON + MSW** — matches the assignment brief. `posts.json` is the source of truth; MSW handlers fake GET/POST/retry with delays and a 20% retry failure rate.
2. **URL query params for filters** — shareable and survives refresh without localStorage.
3. **Optimistic retry** — UI flips to `scheduled` immediately; on failure it rolls back and shows the error.
4. **Relative seed dates** — posts are offset from “now”, so Today/Tomorrow always demo correctly.

## Interview notes

See [MODULES.md](./MODULES.md) for a module-by-module breakdown of what was built and why.

## Contact / submission

Assignment contact: bhanu@flintzy.com
