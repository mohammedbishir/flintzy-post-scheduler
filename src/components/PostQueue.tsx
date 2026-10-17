"use client";

import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/context/PostsContext";
import { usePostFilters } from "@/hooks/usePostFilters";
import { filterPosts } from "@/lib/filters";
import { groupPostsByDay } from "@/lib/groupPosts";
import { useMemo } from "react";

export function PostQueue() {
  const { posts, loading, error, reload } = usePosts();
  const { filters } = usePostFilters();

  const groups = useMemo(() => {
    const filtered = filterPosts(posts, filters);
    return groupPostsByDay(filtered);
  }, [posts, filters]);

  if (loading) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        Loading posts…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="text-sm text-rose-700">{error}</p>
        <button
          type="button"
          onClick={() => void reload()}
          className="mt-3 text-sm font-medium text-rose-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No posts match</p>
        <p className="mt-1 text-sm text-slate-500">
          Try clearing filters or compose a new post.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.dayKey} className="rounded-lg border border-slate-200 bg-white">
          <header className="border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">
              {group.label}
            </h2>
            <p className="text-xs text-slate-400">
              {group.posts.length} post{group.posts.length === 1 ? "" : "s"}
            </p>
          </header>
          <div className="px-4">
            {group.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
