import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-slate-500">
          Loading scheduler…
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
