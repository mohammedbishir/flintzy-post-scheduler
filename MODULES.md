# What I built — module by module

Personal notes for the interview. Each module is a small step so I can explain exactly what changed.

---

## M01 — Project scaffold

**What**
- Next.js App Router + TypeScript + Tailwind (`src/` layout).
- Cleared the default starter page.

**Why Next.js**
- Common production stack, easy Vercel deploy.
- `useSearchParams` supports URL filters (assignment requirement).

**Say in interview**
> I used create-next-app so setup time went into domain logic, not bundler config.

---

## M02 — Types & platform constants

**Files**
- `src/types/post.ts` — `Post`, `Platform`, `PostStatus`, `CreatePostInput`
- `src/lib/platforms.ts` — labels, character limits, `isWithinLimits`

**Why**
- One place for limits (X 280, IG/TikTok 2200, FB 5000).
- TypeScript blocks invalid status/platform strings.

---

## M03 — Mock seed data

**File:** `src/data/posts.ts` (32 posts via `getSeedPosts()`)

**Why**
- Frontend-only → no backend.
- Dates are relative to “now” so Today/Tomorrow keep working.
- Includes scheduled / published / failed (with `errorMessage`).
- Built **lazily** (not at import time) because Next.js 16 blocks `new Date()` during prerender.

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

## M05 — Mock API

**File:** `src/lib/api.ts`

**What**
- In-memory array cloned from seed.
- `fetchPosts` (~400ms), `createPost` (~500ms).
- `retryPost`: **1s delay**, **20% failure**, throws on fail.

**Why not MSW**
- Same behavior, less ceremony. Swap later if a real API appears.

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

## Quick demo script (for interview)

1. Open app → see Today / Tomorrow groups.
2. Filter `status=failed` → URL updates → refresh → still filtered.
3. Open a failed post → Retry → watch optimistic flip; sometimes fails again (~20%).
4. Compose with X selected → type past 280 → counter goes red → Schedule disabled.
5. Pick a past time → error / disabled.
6. Valid future post → appears in the correct day group.
