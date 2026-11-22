"use client";

import { progressKey } from "@/lib/progress-key";
import { useProgress } from "@/lib/progress-store";

// "12 / 51 questions revised" under a subject on the homepage.
// Shows nothing until the visitor has ticked at least one question.
export default function ProgressLine({
  subjectSlug,
  slug,
  total,
}: {
  subjectSlug: string;
  slug: string;
  total: number;
}) {
  const done = useProgress(progressKey(subjectSlug, slug));
  const count = Math.min(done.length, total);
  if (count === 0 || total === 0) return null;
  return (
    <p className="text-xs font-mono text-[var(--accent)] mt-1">
      revised {count} / {total} important questions
    </p>
  );
}
