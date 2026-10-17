import type { Platform } from "@/types/post";

export const PLATFORM_LIMITS: Record<Platform, number> = {
  x: 280,
  instagram: 2200,
  tiktok: 2200,
  facebook: 5000,
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  tiktok: "TikTok",
};

export const ALL_PLATFORMS: Platform[] = [
  "facebook",
  "instagram",
  "x",
  "tiktok",
];

/** Returns true if content fits every selected platform's limit */
export function isWithinLimits(
  content: string,
  platforms: Platform[],
): boolean {
  if (platforms.length === 0) return false;
  return platforms.every(
    (platform) => content.length <= PLATFORM_LIMITS[platform],
  );
}

/** Platforms whose limit is currently exceeded */
export function getExceededPlatforms(
  content: string,
  platforms: Platform[],
): Platform[] {
  return platforms.filter(
    (platform) => content.length > PLATFORM_LIMITS[platform],
  );
}
