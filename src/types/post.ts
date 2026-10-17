/**
 * Post model — matches the assignment schema.
 * scheduledAt is always stored as a UTC ISO string.
 */
export type Platform = "facebook" | "instagram" | "x" | "tiktok";

export type PostStatus = "scheduled" | "published" | "failed";

export interface Post {
  id: string;
  content: string;
  platforms: Platform[];
  mediaUrl?: string;
  scheduledAt: string; // UTC ISO, e.g. "2026-10-18T09:30:00.000Z"
  status: PostStatus;
  errorMessage?: string;
}

/** Payload used when creating a new post from the composer */
export interface CreatePostInput {
  content: string;
  platforms: Platform[];
  mediaUrl?: string;
  scheduledAt: string; // UTC ISO
}
