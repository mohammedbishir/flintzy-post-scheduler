"use client";

import { PlatformIcons } from "@/components/PlatformIcons";
import { StatusBadge } from "@/components/StatusBadge";
import { usePosts } from "@/context/PostsContext";
import { formatLocalTime } from "@/lib/dates";
import type { Post } from "@/types/post";
import { useState } from "react";

export function PostCard({ post }: { post: Post }) {
  const { retry } = usePosts();
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  async function handleRetry() {
    setRetrying(true);
    setRetryError(null);
    try {
      await retry(post.id);
    } catch (err) {
      setRetryError(
        err instanceof Error ? err.message : "Retry failed. Try again.",
      );
    } finally {
      setRetrying(false);
    }
  }

  return (
    <article className="border-b border-slate-200 py-4 last:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm leading-relaxed text-slate-800 line-clamp-3">
            {post.content}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <PlatformIcons platforms={post.platforms} />
            <StatusBadge status={post.status} />
            <time
              className="text-xs text-slate-500"
              dateTime={post.scheduledAt}
              title={new Date(post.scheduledAt).toISOString()}
            >
              {formatLocalTime(post.scheduledAt)}
            </time>
          </div>
          {post.mediaUrl ? (
            <p className="truncate text-xs text-slate-400">
              Media: {post.mediaUrl}
            </p>
          ) : null}
          {post.status === "failed" && post.errorMessage ? (
            <p className="text-xs text-rose-600">{post.errorMessage}</p>
          ) : null}
          {retryError ? (
            <p className="text-xs text-rose-600">{retryError}</p>
          ) : null}
        </div>

        {post.status === "failed" ? (
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="shrink-0 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {retrying ? "Retrying…" : "Retry"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
