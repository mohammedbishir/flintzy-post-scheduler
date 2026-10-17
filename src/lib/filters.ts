import type { Platform, Post, PostStatus } from "@/types/post";

export interface PostFilters {
  platform: Platform | "all";
  status: PostStatus | "all";
  q: string;
}

export const DEFAULT_FILTERS: PostFilters = {
  platform: "all",
  status: "all",
  q: "",
};

/** Pure filter — easy to unit test / explain in interview */
export function filterPosts(posts: Post[], filters: PostFilters): Post[] {
  const query = filters.q.trim().toLowerCase();

  return posts.filter((post) => {
    if (
      filters.platform !== "all" &&
      !post.platforms.includes(filters.platform)
    ) {
      return false;
    }
    if (filters.status !== "all" && post.status !== filters.status) {
      return false;
    }
    if (query && !post.content.toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });
}

/** Read filters from URLSearchParams */
export function filtersFromSearchParams(
  params: URLSearchParams,
): PostFilters {
  const platform = params.get("platform");
  const status = params.get("status");
  const q = params.get("q") ?? "";

  const validPlatforms = ["facebook", "instagram", "x", "tiktok"] as const;
  const validStatuses = ["scheduled", "published", "failed"] as const;

  return {
    platform:
      platform && (validPlatforms as readonly string[]).includes(platform)
        ? (platform as Platform)
        : "all",
    status:
      status && (validStatuses as readonly string[]).includes(status)
        ? (status as PostStatus)
        : "all",
    q,
  };
}

/** Write filters into a query string (omit defaults to keep URL clean) */
export function filtersToQueryString(filters: PostFilters): string {
  const params = new URLSearchParams();
  if (filters.platform !== "all") params.set("platform", filters.platform);
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.q.trim()) params.set("q", filters.q.trim());
  return params.toString();
}
