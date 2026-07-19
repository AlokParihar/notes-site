import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { subjects } from "./subjects";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type EntryKind = "notes" | "assignments";

export type EntryMeta = {
  slug: string;
  subjectSlug: string;
  kind: EntryKind;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  status?: string; // e.g. "done", "in-progress" — mainly useful for assignments
};

export type Entry = EntryMeta & { html: string };

function readDirSafe(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

export function getAllEntryMeta(): EntryMeta[] {
  const all: EntryMeta[] = [];

  for (const subject of subjects) {
    for (const kind of ["notes", "assignments"] as EntryKind[]) {
      const dir = path.join(CONTENT_DIR, subject.slug, kind);
      const files = readDirSafe(dir);

      for (const file of files) {
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        all.push({
          slug: file.replace(/\.md$/, ""),
          subjectSlug: subject.slug,
          kind,
          title: data.title ?? file.replace(/\.md$/, ""),
          date: data.date ?? "",
          tags: data.tags ?? [],
          summary: data.summary ?? "",
          status: data.status,
        });
      }
    }
  }

  // newest first
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEntry(
  subjectSlug: string,
  kind: EntryKind,
  slug: string
): Promise<Entry | null> {
  const filePath = path.join(CONTENT_DIR, subjectSlug, kind, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    subjectSlug,
    kind,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    status: data.status,
    html: processed.toString(),
  };
}

export function getEntriesForSubject(subjectSlug: string): EntryMeta[] {
  return getAllEntryMeta().filter((e) => e.subjectSlug === subjectSlug);
}
