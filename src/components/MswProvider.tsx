"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Starts MSW in the browser before the rest of the app loads posts.
 * Network calls to /api/* are intercepted and served from posts.json.
 */
export function MswProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      const { worker } = await import("@/mocks/browser");
      await worker.start({
        onUnhandledRequest: "bypass",
        quiet: true,
      });
      if (!cancelled) setReady(true);
    }

    void start();
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
