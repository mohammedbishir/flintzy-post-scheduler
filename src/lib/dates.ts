/**
 * Date helpers for the scheduler.
 * Rule: store UTC, display local.
 */

/** Local calendar day key like "2026-10-17" (based on user's timezone) */
export function toLocalDayKey(isoUtc: string): string {
  const d = new Date(isoUtc);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getTodayKey(): string {
  return toLocalDayKey(new Date().toISOString());
}

export function getTomorrowKey(): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return toLocalDayKey(t.toISOString());
}

/**
 * Human label for a day group:
 * Today / Tomorrow / "Sat, Oct 18" style for other days
 */
export function getDayLabel(dayKey: string): string {
  if (dayKey === getTodayKey()) return "Today";
  if (dayKey === getTomorrowKey()) return "Tomorrow";

  const [y, m, d] = dayKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Show scheduled time in the user's local timezone */
export function formatLocalTime(isoUtc: string): string {
  return new Date(isoUtc).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatLocalDateTime(isoUtc: string): string {
  return new Date(isoUtc).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Convert a datetime-local input value into a UTC ISO string */
export function localInputToUtcIso(localValue: string): string {
  // datetime-local gives "YYYY-MM-DDTHH:mm" in local time (no Z)
  const date = new Date(localValue);
  return date.toISOString();
}

/** Format a Date for <input type="datetime-local" /> */
export function toDatetimeLocalValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}`;
}

export function isInFuture(isoUtc: string): boolean {
  return new Date(isoUtc).getTime() > Date.now();
}
