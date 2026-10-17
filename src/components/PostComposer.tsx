"use client";

import { CharacterCounters } from "@/components/CharacterCounters";
import { usePosts } from "@/context/PostsContext";
import {
  isInFuture,
  localInputToUtcIso,
  toDatetimeLocalValue,
} from "@/lib/dates";
import {
  ALL_PLATFORMS,
  getExceededPlatforms,
  isWithinLimits,
  PLATFORM_LABELS,
} from "@/lib/platforms";
import type { Platform } from "@/types/post";
import { useEffect, useMemo, useState, type FormEvent } from "react";

function defaultScheduleValue() {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return toDatetimeLocalValue(d);
}

export function PostComposer() {
  const { create } = usePosts();
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["x"]);
  const [mediaUrl, setMediaUrl] = useState("");
  // Empty until mount — Next.js 16 blocks `new Date()` during prerender
  const [scheduledLocal, setScheduledLocal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setScheduledLocal(defaultScheduleValue());
  }, []);

  const canSubmit = useMemo(() => {
    if (!scheduledLocal) return false;
    if (!content.trim()) return false;
    if (platforms.length === 0) return false;
    if (!isWithinLimits(content, platforms)) return false;
    const utc = localInputToUtcIso(scheduledLocal);
    if (!isInFuture(utc)) return false;
    return true;
  }, [content, platforms, scheduledLocal]);

  function togglePlatform(platform: Platform) {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    const utc = localInputToUtcIso(scheduledLocal);

    if (!content.trim()) {
      setFormError("Write some content before scheduling.");
      return;
    }
    if (platforms.length === 0) {
      setFormError("Pick at least one platform.");
      return;
    }
    if (!isWithinLimits(content, platforms)) {
      const over = getExceededPlatforms(content, platforms)
        .map((p) => PLATFORM_LABELS[p])
        .join(", ");
      setFormError(`Content exceeds the limit for: ${over}`);
      return;
    }
    if (!isInFuture(utc)) {
      setFormError("Scheduled time must be in the future.");
      return;
    }

    setSubmitting(true);
    try {
      await create({
        content: content.trim(),
        platforms,
        mediaUrl: mediaUrl.trim() || undefined,
        scheduledAt: utc,
      });
      setContent("");
      setMediaUrl("");
      setScheduledLocal(defaultScheduleValue());
      setSuccessMsg("Post scheduled.");
    } catch {
      setFormError("Could not schedule the post. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-4"
    >
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Compose post</h2>
        <p className="text-xs text-slate-500">
          Schedule for Facebook, Instagram, X, or TikTok.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="What do you want to post?"
          className="resize-y rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
      </label>

      <fieldset>
        <legend className="text-xs font-medium text-slate-600">Platforms</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_PLATFORMS.map((platform) => {
            const selected = platforms.includes(platform);
            return (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                  selected
                    ? "border-teal-700 bg-teal-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {PLATFORM_LABELS[platform]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <CharacterCounters content={content} platforms={platforms} />

      <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
        Image URL (optional)
        <input
          type="url"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="https://…"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
        Schedule (local time)
        <input
          type="datetime-local"
          value={scheduledLocal}
          onChange={(e) => setScheduledLocal(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        />
      </label>

      {formError ? (
        <p className="text-sm text-rose-600" role="alert">
          {formError}
        </p>
      ) : null}
      {successMsg ? (
        <p className="text-sm text-emerald-700">{successMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="w-full rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Scheduling…" : "Schedule post"}
      </button>
    </form>
  );
}
