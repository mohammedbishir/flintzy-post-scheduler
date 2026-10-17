"use client";

import {
  DEFAULT_FILTERS,
  filtersFromSearchParams,
  filtersToQueryString,
  type PostFilters,
} from "@/lib/filters";
import type { Platform, PostStatus } from "@/types/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Filters live in the URL so a refresh (or shared link) keeps the same view.
 * Example: /?platform=x&status=failed&q=retry
 */
export function usePostFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: PostFilters = useMemo(
    () => filtersFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<PostFilters>) => {
      const next = { ...filters, ...patch };
      const qs = filtersToQueryString(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [filters, pathname, router],
  );

  const setPlatform = (platform: Platform | "all") => update({ platform });
  const setStatus = (status: PostStatus | "all") => update({ status });
  const setQuery = (q: string) => update({ q });
  const clear = () => router.replace(pathname);

  return {
    filters,
    setPlatform,
    setStatus,
    setQuery,
    clear,
    isDefault:
      filters.platform === DEFAULT_FILTERS.platform &&
      filters.status === DEFAULT_FILTERS.status &&
      filters.q === DEFAULT_FILTERS.q,
  };
}
