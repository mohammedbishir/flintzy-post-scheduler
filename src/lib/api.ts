import type { CreatePostInput, Post } from "@/types/post";

/**
 * Real fetch calls — MSW intercepts these in the browser
 * and responds from the local JSON seed + in-memory store.
 */

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }
  return res.json() as Promise<Post[]>;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json() as Promise<Post>;
}

export async function retryPost(id: string): Promise<Post> {
  const res = await fetch(`/api/posts/${id}/retry`, { method: "POST" });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(data?.message ?? "Retry failed. Try again.");
  }
  return res.json() as Promise<Post>;
}
