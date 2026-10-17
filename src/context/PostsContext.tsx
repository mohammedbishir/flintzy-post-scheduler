"use client";

import { createPost, fetchPosts, retryPost } from "@/lib/api";
import type { CreatePostInput, Post } from "@/types/post";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  create: (input: CreatePostInput) => Promise<void>;
  retry: (id: string) => Promise<void>;
  reload: () => Promise<void>;
}

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      setError("Could not load posts. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = useCallback(async (input: CreatePostInput) => {
    const post = await createPost(input);
    setPosts((prev) =>
      [...prev, post].sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      ),
    );
  }, []);

  /**
   * Optimistic retry:
   * 1) Flip UI to "scheduled" immediately
   * 2) Call mock API (1s, 20% fail)
   * 3) On failure, roll back to failed + error message
   */
  const retry = useCallback(async (id: string) => {
    let snapshot: Post | undefined;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        snapshot = p;
        return { ...p, status: "scheduled", errorMessage: undefined };
      }),
    );

    try {
      const updated = await retryPost(id);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Retry failed. Try again.";
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          return {
            ...(snapshot ?? p),
            status: "failed",
            errorMessage: message,
          };
        }),
      );
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({ posts, loading, error, refreshing, create, retry, reload }),
    [posts, loading, error, refreshing, create, retry, reload],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) {
    throw new Error("usePosts must be used inside PostsProvider");
  }
  return ctx;
}
