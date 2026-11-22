// Where a page's ticks are saved in the browser. Kept in its own tiny file so
// both server pages and browser components can import it.
export function progressKey(subjectSlug: string, slug: string): string {
  return `progress:${subjectSlug}/${slug}`;
}
