import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

export type ArchiveCategory = "leetcode-75" | "guides";

export const ARCHIVE_LABELS: Record<ArchiveCategory, string> = {
  "leetcode-75": "75 LeetCode Questions",
  guides: "Guides",
};

export const ARCHIVE_ORDER: ArchiveCategory[] = ["leetcode-75", "guides"];

export type ArchiveMeta = {
  slug: string;
  category: ArchiveCategory;
  title: string;
  date: string;
  tags: string[];
  summary: string;
};

export type ArchiveEntry = ArchiveMeta & { html: string };

function readDirSafe(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

export function getAllArchiveMeta(): ArchiveMeta[] {
  const all: ArchiveMeta[] = [];

  for (const category of ARCHIVE_ORDER) {
    const dir = path.join(ARCHIVE_DIR, category);
    const files = readDirSafe(dir);

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      all.push({
        slug: file.replace(/\.md$/, ""),
        category,
        title: data.title ?? file.replace(/\.md$/, ""),
        date: data.date ?? "",
        tags: data.tags ?? [],
        summary: data.summary ?? "",
      });
    }
  }

  return all;
}

export async function getArchiveEntry(
  category: ArchiveCategory,
  slug: string
): Promise<ArchiveEntry | null> {
  const filePath = path.join(ARCHIVE_DIR, category, `${slug}.md`);
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
    category,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    html: processed.toString(),
  };
}

export function getArchiveByCategory(category: ArchiveCategory): ArchiveMeta[] {
  return getAllArchiveMeta().filter((e) => e.category === category);
}
