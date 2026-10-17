import type { PostStatus } from "@/types/post";

const STYLES: Record<PostStatus, string> = {
  scheduled: "bg-sky-100 text-sky-800",
  published: "bg-emerald-100 text-emerald-800",
  failed: "bg-rose-100 text-rose-800",
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-xs font-medium capitalize ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
