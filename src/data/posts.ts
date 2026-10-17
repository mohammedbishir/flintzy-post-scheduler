import type { Post } from "@/types/post";

/**
 * Build a UTC ISO string from a local-calendar offset.
 * Example: days=0, hours=14 → today 2:00 PM local, stored as UTC.
 */
function utcFromNow(days: number, hours = 10, minutes = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

/**
 * 32 seed posts — built lazily so `new Date()` is not called during prerender.
 * Failed posts include errorMessage as required by the assignment.
 */
function buildSeedPosts(): Post[] {
  return [
  {
    id: "p1",
    content: "Morning coffee thoughts ☕ What's everyone working on today?",
    platforms: ["x", "instagram"],
    scheduledAt: utcFromNow(0, 8, 30),
    status: "scheduled",
  },
  {
    id: "p2",
    content: "Launch day checklist is live. Shipping the scheduler UI tonight.",
    platforms: ["facebook", "x"],
    mediaUrl: "https://picsum.photos/seed/launch/800/450",
    scheduledAt: utcFromNow(0, 14, 0),
    status: "scheduled",
  },
  {
    id: "p3",
    content: "Behind the scenes: how we mock APIs for frontend assignments.",
    platforms: ["tiktok", "instagram"],
    scheduledAt: utcFromNow(0, 18, 15),
    status: "failed",
    errorMessage: "TikTok media upload timed out.",
  },
  {
    id: "p4",
    content: "Quick tip: store schedule times in UTC, show them in local time.",
    platforms: ["x"],
    scheduledAt: utcFromNow(0, 11, 0),
    status: "published",
  },
  {
    id: "p5",
    content: "Weekend product dump — dark mode sketches and a new queue layout.",
    platforms: ["instagram", "facebook"],
    mediaUrl: "https://picsum.photos/seed/weekend/800/450",
    scheduledAt: utcFromNow(1, 9, 0),
    status: "scheduled",
  },
  {
    id: "p6",
    content:
      "Character limits matter. X is 280 — don't get surprised at publish time.",
    platforms: ["x", "facebook"],
    scheduledAt: utcFromNow(1, 12, 30),
    status: "scheduled",
  },
  {
    id: "p7",
    content: "Failed once already — retrying this TikTok clip about timezone bugs.",
    platforms: ["tiktok"],
    mediaUrl: "https://picsum.photos/seed/tiktok1/800/450",
    scheduledAt: utcFromNow(1, 16, 0),
    status: "failed",
    errorMessage: "Platform rate limit exceeded.",
  },
  {
    id: "p8",
    content: "Team standup notes turned into a public thread.",
    platforms: ["x"],
    scheduledAt: utcFromNow(1, 7, 45),
    status: "scheduled",
  },
  {
    id: "p9",
    content: "New carousel: 5 UX mistakes in scheduling tools.",
    platforms: ["instagram", "facebook"],
    mediaUrl: "https://picsum.photos/seed/carousel/800/450",
    scheduledAt: utcFromNow(2, 10, 0),
    status: "scheduled",
  },
  {
    id: "p10",
    content: "Shipped optimistic UI for retries. Feels snappy even with fake APIs.",
    platforms: ["x", "facebook"],
    scheduledAt: utcFromNow(2, 15, 20),
    status: "scheduled",
  },
  {
    id: "p11",
    content: "Friday wrap-up: what we learned building a post queue.",
    platforms: ["facebook"],
    scheduledAt: utcFromNow(2, 17, 0),
    status: "scheduled",
  },
  {
    id: "p12",
    content:
      "Short clip — filtering by URL query params so refresh keeps your filters.",
    platforms: ["tiktok", "x"],
    scheduledAt: utcFromNow(3, 11, 10),
    status: "scheduled",
  },
  {
    id: "p13",
    content: "Design note: empty states should tell you what to do next.",
    platforms: ["instagram"],
    scheduledAt: utcFromNow(3, 13, 0),
    status: "published",
  },
  {
    id: "p14",
    content: "This one failed because the media URL was blocked.",
    platforms: ["facebook", "instagram"],
    mediaUrl: "https://picsum.photos/seed/blocked/800/450",
    scheduledAt: utcFromNow(3, 19, 0),
    status: "failed",
    errorMessage: "Could not fetch media from URL.",
  },
  {
    id: "p15",
    content: "AMA reminder: ask me anything about frontend interviews.",
    platforms: ["x", "facebook"],
    scheduledAt: utcFromNow(4, 9, 30),
    status: "scheduled",
  },
  {
    id: "p16",
    content: "Reel idea: composing once, posting to four platforms.",
    platforms: ["instagram", "tiktok"],
    scheduledAt: utcFromNow(4, 14, 0),
    status: "scheduled",
  },
  {
    id: "p17",
    content: "Published earlier today — engagement looks decent so far.",
    platforms: ["x"],
    scheduledAt: utcFromNow(0, 6, 0),
    status: "published",
  },
  {
    id: "p18",
    content:
      "Case study draft: why I avoided a real social API for this assignment.",
    platforms: ["facebook"],
    scheduledAt: utcFromNow(5, 10, 0),
    status: "scheduled",
  },
  {
    id: "p19",
    content: "Poll: do you group your queue by day or by platform?",
    platforms: ["x", "instagram"],
    scheduledAt: utcFromNow(5, 16, 45),
    status: "scheduled",
  },
  {
    id: "p20",
    content: "Retry demo post — intentionally marked failed.",
    platforms: ["x", "tiktok"],
    scheduledAt: utcFromNow(0, 20, 0),
    status: "failed",
    errorMessage: "Transient network error.",
  },
  {
    id: "p21",
    content: "Photo dump from the whiteboard session.",
    platforms: ["instagram"],
    mediaUrl: "https://picsum.photos/seed/board/800/450",
    scheduledAt: utcFromNow(6, 12, 0),
    status: "scheduled",
  },
  {
    id: "p22",
    content:
      "Thread starter: URL state > localStorage for shareable filter views.",
    platforms: ["x"],
    scheduledAt: utcFromNow(6, 8, 0),
    status: "scheduled",
  },
  {
    id: "p23",
    content: "Facebook page update — office hours next week.",
    platforms: ["facebook"],
    scheduledAt: utcFromNow(7, 11, 0),
    status: "scheduled",
  },
  {
    id: "p24",
    content: "TikTok draft caption for the timezone explainer video.",
    platforms: ["tiktok"],
    scheduledAt: utcFromNow(-1, 15, 0),
    status: "published",
  },
  {
    id: "p25",
    content: "Yesterday's post that never went out.",
    platforms: ["instagram", "facebook"],
    scheduledAt: utcFromNow(-1, 10, 0),
    status: "failed",
    errorMessage: "Authentication token expired.",
  },
  {
    id: "p26",
    content: "Soft launch announcement for beta testers.",
    platforms: ["x", "facebook", "instagram"],
    scheduledAt: utcFromNow(2, 8, 0),
    status: "scheduled",
  },
  {
    id: "p27",
    content: "Microcopy pass on status badges — scheduled / published / failed.",
    platforms: ["x"],
    scheduledAt: utcFromNow(8, 9, 15),
    status: "scheduled",
  },
  {
    id: "p28",
    content:
      "Longer Facebook update covering roadmap, hiring, and community notes for Q4.",
    platforms: ["facebook"],
    scheduledAt: utcFromNow(8, 14, 0),
    status: "scheduled",
  },
  {
    id: "p29",
    content: "Instagram story frame — link in bio reminder.",
    platforms: ["instagram"],
    mediaUrl: "https://picsum.photos/seed/story/800/450",
    scheduledAt: utcFromNow(1, 21, 0),
    status: "scheduled",
  },
  {
    id: "p30",
    content: "All-platform blast for the demo day invite.",
    platforms: ["facebook", "instagram", "x", "tiktok"],
    mediaUrl: "https://picsum.photos/seed/demo/800/450",
    scheduledAt: utcFromNow(3, 8, 30),
    status: "scheduled",
  },
  {
    id: "p31",
    content: "Old published post kept for history in the queue.",
    platforms: ["x", "facebook"],
    scheduledAt: utcFromNow(-2, 12, 0),
    status: "published",
  },
  {
    id: "p32",
    content: "Another failed TikTok — good for testing the retry button.",
    platforms: ["tiktok", "instagram"],
    scheduledAt: utcFromNow(4, 18, 0),
    status: "failed",
    errorMessage: "Video processing failed on platform.",
  },
  ];
}

let seedCache: Post[] | null = null;

/** Call only from client effects / event handlers — not during prerender */
export function getSeedPosts(): Post[] {
  if (!seedCache) {
    seedCache = buildSeedPosts();
  }
  return seedCache;
}
