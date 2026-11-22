import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getEntriesForSubject } from "./content";

// Only questions under "Unit …" / "Module …" headings get a checkbox.
// The browser-side tracker uses the same rule, so the two counts agree.
export const TRACKED_SECTION = /^(Unit|Module)\s/;

// Counts top-level bullet lines under tracked headings in a markdown file.
export function countTrackable(subjectSlug: string, kind: string, slug: string): number {
  const file = path.join(process.cwd(), "content", subjectSlug, kind, `${slug}.md`);
  const { content } = matter(fs.readFileSync(file, "utf-8"));
  let inSection = false;
  let count = 0;
  for (const line of content.split("\n")) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      inSection = TRACKED_SECTION.test(h[1].trim());
      continue;
    }
    if (inSection && /^[-*]\s/.test(line)) count++;
  }
  return count;
}

export function isTrackablePage(kind: string, slug: string): boolean {
  return kind === "qb" && slug.endsWith("important-questions");
}

// The Important Questions page of a subject, if it has one (used on the homepage).
export function getTrackerInfo(subjectSlug: string) {
  const entry = getEntriesForSubject(subjectSlug).find((e) =>
    isTrackablePage(e.kind, e.slug)
  );
  if (!entry) return null;
  return {
    slug: entry.slug,
    total: countTrackable(subjectSlug, entry.kind, entry.slug),
  };
}
