"use client";

import { usePostFilters } from "@/hooks/usePostFilters";
import { ALL_PLATFORMS, PLATFORM_LABELS } from "@/lib/platforms";
import type { PostStatus } from "@/types/post";

const STATUSES: Array<PostStatus | "all"> = [
  "all",
  "scheduled",
  "published",
  "failed",
];

export function FilterBar() {
  const { filters, setPlatform, setStatus, setQuery, clear, isDefault } =
    usePostFilters();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-medium text-slate-600">
        Search
        <input
          type="search"
          value={filters.q}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search content…"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
      </label>

      <label className="flex min-w-[130px] flex-col gap-1 text-xs font-medium text-slate-600">
        Platform
        <select
          value={filters.platform}
          onChange={(e) =>
            setPlatform(e.target.value as typeof filters.platform)
          }
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          <option value="all">All platforms</option>
          {ALL_PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABELS[p]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-[130px] flex-col gap-1 text-xs font-medium text-slate-600">
        Status
        <select
          value={filters.status}
          onChange={(e) => setStatus(e.target.value as typeof filters.status)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s}
            </option>
          ))}
        </select>
      </label>

      {!isDefault ? (
        <button
          type="button"
          onClick={clear}
          className="rounded-md px-3 py-2 text-sm text-slate-600 underline hover:text-slate-900"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
