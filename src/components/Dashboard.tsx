"use client";

import { FilterBar } from "@/components/FilterBar";
import { MswProvider } from "@/components/MswProvider";
import { PostComposer } from "@/components/PostComposer";
import { PostQueue } from "@/components/PostQueue";
import { PostsProvider } from "@/context/PostsContext";
import { Suspense } from "react";

/**
 * Suspense is needed because useSearchParams() in FilterBar / PostQueue
 * can suspend during static rendering in the App Router.
 */
export function Dashboard() {
  return (
    <MswProvider>
      <PostsProvider>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <header className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Flintzy assignment
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Post scheduler
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Compose, schedule, and manage posts for Facebook, Instagram, X,
              and TikTok. Data comes from a local JSON file via MSW.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="space-y-4 order-2 lg:order-1">
              <Suspense
                fallback={
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500">
                    Loading filters…
                  </div>
                }
              >
                <FilterBar />
                <PostQueue />
              </Suspense>
            </div>
            <aside className="order-1 lg:order-2 lg:sticky lg:top-6">
              <PostComposer />
            </aside>
          </div>
        </div>
      </PostsProvider>
    </MswProvider>
  );
}
