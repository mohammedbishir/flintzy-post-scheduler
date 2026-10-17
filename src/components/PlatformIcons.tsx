import { PLATFORM_LABELS } from "@/lib/platforms";
import type { Platform } from "@/types/post";

const COLORS: Record<Platform, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  x: "#111111",
  tiktok: "#010101",
};

/** Tiny letter badges — clear without needing SVG icon packs */
export function PlatformIcons({ platforms }: { platforms: Platform[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Platforms">
      {platforms.map((platform) => (
        <li
          key={platform}
          title={PLATFORM_LABELS[platform]}
          className="inline-flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-[10px] font-semibold uppercase tracking-wide text-white"
          style={{ backgroundColor: COLORS[platform] }}
        >
          {platform === "facebook"
            ? "fb"
            : platform === "instagram"
              ? "ig"
              : platform === "tiktok"
                ? "tt"
                : "x"}
        </li>
      ))}
    </ul>
  );
}
