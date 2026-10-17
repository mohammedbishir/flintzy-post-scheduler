"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Shared so React Strict Mode / HMR does not call worker.start() twice */
let workerStart: Promise<void> | null = null;

function ensureMockWorker() {
  if (!workerStart) {
    workerStart = (async () => {
      const { worker } = await import("@/mocks/browser");
      try {
        await worker.start({
          onUnhandledRequest: "bypass",
          quiet: true,
        });
      } catch {
        // Worker already enabled (Strict Mode remount or fast refresh)
      }
    })();
  }
  return workerStart;
}

/**
 * Starts MSW in the browser before the rest of the app loads posts.
 * Network calls to /api/* are intercepted and served from posts.json.
 */
export function MswProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void ensureMockWorker().then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Starting mock API…
      </div>
    );
  }

  return children;
}
