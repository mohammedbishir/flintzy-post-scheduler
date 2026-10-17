import { getSeedPosts } from "@/data/posts";
import type { CreatePostInput, Post } from "@/types/post";

/** In-memory store — simulates a tiny backend for this frontend-only assignment */
let posts: Post[] | null = null;

function store(): Post[] {
  if (!posts) {
    posts = structuredClone(getSeedPosts());
  }
  return posts;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextId(): string {
  return `p${Date.now()}`;
}

/** Fetch all posts (fake network latency) */
export async function fetchPosts(): Promise<Post[]> {
  await delay(400);
  const list = store();
  return [...list].sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );
}

/** Create a scheduled post */
export async function createPost(input: CreatePostInput): Promise<Post> {
  await delay(500);
  const post: Post = {
    id: nextId(),
    content: input.content,
    platforms: input.platforms,
    mediaUrl: input.mediaUrl || undefined,
    scheduledAt: input.scheduledAt,
    status: "scheduled",
  };
  const list = store();
  posts = [post, ...list];
  return post;
}

/**
 * Retry a failed post.
 * - 1 second delay (assignment)
 * - 20% chance of failing again
 * Returns the updated post on success, throws on failure.
 */
export async function retryPost(id: string): Promise<Post> {
  await delay(1000);

  const list = store();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Post not found");
  }

  const failedAgain = Math.random() < 0.2;
  if (failedAgain) {
    const message = "Retry failed — platform rejected the post again.";
    list[index] = {
      ...list[index],
      status: "failed",
      errorMessage: message,
    };
    throw new Error(message);
  }

  list[index] = {
    ...list[index],
    status: "scheduled",
    errorMessage: undefined,
  };
  return list[index];
}

/** Test helper — reset store back to seed (not used in UI) */
export function resetPosts() {
  posts = structuredClone(getSeedPosts());
}
