# What I built — module by module

My build notes. Each step is small so I can remember what changed and why.

---

## M01 — Project scaffold

**What**
- Next.js App Router + TypeScript + Tailwind (`src/` layout).
- Cleared the default starter page.

**Why Next.js**
- Common production stack, easy Vercel deploy.
- `useSearchParams` supports URL filters (assignment requirement).

**Why this first**
- Used create-next-app so setup time went into domain logic, not bundler config.

---

## M02 — Types & platform constants

**Files**
- `src/types/post.ts` — `Post`, `Platform`, `PostStatus`, `CreatePostInput`
- `src/lib/platforms.ts` — labels, character limits, `isWithinLimits`

**Why**
- One place for limits (X 280, IG/TikTok 2200, FB 5000).
- TypeScript blocks invalid status/platform strings.

---

## M03 — Mock seed data (local JSON)

**File:** `src/data/posts.json` (32 posts)

**Why**
- Assignment asks for a local JSON file, json-server, or MSW.
- Schema matches the PDF: id, content, platforms, mediaUrl, scheduledAt (UTC), status, errorMessage.

---

## M04 — Date helpers

**File:** `src/lib/dates.ts`

**What**
- Store UTC ISO strings.
- Display local time.
- Day keys + Today/Tomorrow labels.
- `datetime-local` ↔ UTC conversion.
- `isInFuture` guard.

---

## M05 — MSW mock API

**Files**
- `src/mocks/handlers.ts` — GET/POST `/api/posts`, POST `/api/posts/:id/retry`
- `src/mocks/browser.ts` — browser worker
- `src/components/MswProvider.tsx` — starts MSW before loading data
- `src/lib/api.ts` — real `fetch` calls (intercepted by MSW)

**What**
- Seeded from `posts.json`.
- List delay ~400ms, create ~500ms.
- Retry: **1s delay**, **20% failure**, error body on fail.

---

## M06 — Filter logic (pure functions)

**File:** `src/lib/filters.ts`

**What**
- `filterPosts`, `filtersFromSearchParams`, `filtersToQueryString`.
- Defaults omitted from URL so links stay clean.

---

## M07 — Group by day

**File:** `src/lib/groupPosts.ts`

**What**
- Groups by local calendar day, sorts by time inside each day.

---

## M08 — URL filter hook

**File:** `src/hooks/usePostFilters.ts`

**What**
- Reads/writes `?platform=&status=&q=` via `router.replace`.
- Refresh keeps the same filters.

---

## M09 — Posts context

**File:** `src/context/PostsContext.tsx`

**What**
- Loads posts on mount.
- `create` appends after mock API.
- `retry` is **optimistic**: UI → scheduled → API → rollback on error.

---

## M10 — Small presentational pieces

**Files**
- `PlatformIcons.tsx` — letter badges (fb / ig / x / tt)
- `StatusBadge.tsx` — scheduled / published / failed colors

---

## M11 — Post card + retry button

**File:** `src/components/PostCard.tsx`

**What**
- Preview, platforms, local time, status.
- Retry only when `failed`; shows API error if retry fails again.

---

## M12 — Queue + loading / empty / error

**File:** `src/components/PostQueue.tsx`

**What**
- Applies filters → groups by day → renders cards.
- Handles loading, error (with retry load), empty filter results.

---

## M13 — Filter bar UI

**File:** `src/components/FilterBar.tsx`

**What**
- Search input, platform select, status select, clear.

---

## M14 — Character counters

**File:** `src/components/CharacterCounters.tsx`

**What**
- Live `used/limit` per selected platform; red when over.

---

## M15 — Composer

**File:** `src/components/PostComposer.tsx`

**What**
- Content, multi-select platforms, image URL, datetime-local.
- Blocks submit if over limit, no platform, or time not in the future.
- Converts local picker value → UTC before `create`.

---

## M16 — Dashboard shell

**File:** `src/components/Dashboard.tsx`

**What**
- Layout: queue + filters on the left, composer sticky on the right (desktop).
- Composer first on mobile.
- `Suspense` around URL-driven filters (App Router requirement).

---

## M17 — Polish + docs

**What**
- Teal/slate styling, IBM Plex fonts, soft background.
- `README.md` + this `MODULES.md`.

---

## Quick demo checklist

1. Open app → see Today / Tomorrow groups.
2. Filter `status=failed` → URL updates → refresh → still filtered.
3. Open a failed post → Retry → watch optimistic flip; sometimes fails again (~20%).
4. Compose with X selected → type past 280 → counter goes red → Schedule disabled.
5. Pick a past time → error / disabled.
6. Valid future post → appears in the correct day group.
