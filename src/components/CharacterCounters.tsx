import {
  getExceededPlatforms,
  PLATFORM_LABELS,
  PLATFORM_LIMITS,
} from "@/lib/platforms";
import type { Platform } from "@/types/post";

export function CharacterCounters({
  content,
  platforms,
}: {
  content: string;
  platforms: Platform[];
}) {
  if (platforms.length === 0) {
    return (
      <p className="text-xs text-slate-400">
        Select a platform to see character limits.
      </p>
    );
  }

  const exceeded = new Set(getExceededPlatforms(content, platforms));
  const len = content.length;

  return (
    <ul className="flex flex-wrap gap-2">
      {platforms.map((platform) => {
        const limit = PLATFORM_LIMITS[platform];
        const over = exceeded.has(platform);
        return (
          <li
            key={platform}
            className={`rounded-md px-2 py-1 text-xs tabular-nums ${
              over
                ? "bg-rose-100 text-rose-800"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {PLATFORM_LABELS[platform]}: {len}/{limit}
            {over ? " — over limit" : ""}
          </li>
        );
      })}
    </ul>
  );
}
