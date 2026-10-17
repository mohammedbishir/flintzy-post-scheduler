import { getDayLabel, toLocalDayKey } from "@/lib/dates";
import type { Post } from "@/types/post";

export interface DayGroup {
  dayKey: string;
  label: string;
  posts: Post[];
}

/** Group posts by local calendar day, sorted ascending by day then time */
export function groupPostsByDay(posts: Post[]): DayGroup[] {
  const map = new Map<string, Post[]>();

  for (const post of posts) {
    const key = toLocalDayKey(post.scheduledAt);
    const list = map.get(key) ?? [];
    list.push(post);
    map.set(key, list);
  }

  const keys = [...map.keys()].sort();

  return keys.map((dayKey) => {
    const dayPosts = (map.get(dayKey) ?? []).sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
    return {
      dayKey,
      label: getDayLabel(dayKey),
      posts: dayPosts,
    };
  });
}
