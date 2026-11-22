import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { subjects } from "./subjects";
import { getAllEntryMeta, KIND_LABELS } from "./content";
import { getAllArchiveMeta, ARCHIVE_LABELS } from "./archive";

// One searchable page. Kept small so the whole index can be downloaded once.
export type SearchRecord = {
  title: string;
  url: string;
  section: string; // e.g. "Data Structure · Question Bank"
  headings: string; // all headings joined, searched with extra weight
  text: string; // plain text of the page body
};

// Turns markdown into plain text: drops symbols, keeps the words.
function toPlainText(md: string): { headings: string; text: string } {
  const headings: string[] = [];
  const lines = md.split("\n").map((line) => {
    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (h) headings.push(h[1].replace(/[*_`]/g, "").trim());
    return line;
  });

  const text = lines
    .join("\n")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*/g, " ")) // keep code words, drop fences
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> link text
    .replace(/^#{1,6}\s+/gm, "") // heading marks
    .replace(/[*_`>|~]/g, " ") // emphasis, quotes, table pipes
    .replace(/^\s*[-:]{3,}\s*$/gm, " ") // table rules / hr
    .replace(/\s+/g, " ")
    .trim();

  return { headings: headings.join(" · "), text };
}

export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];
  const contentDir = path.join(process.cwd(), "content");

  // Subject pages (so "data structure" finds the subject itself)
  for (const s of subjects) {
    records.push({
      title: s.name,
      url: `/${s.slug}`,
      section: `Subject${s.code ? " · " + s.code : ""}`,
      headings: "",
      text: s.description,
    });
  }

  // Subject entries: syllabus, notes, question bank, PYQs, books
  for (const e of getAllEntryMeta()) {
    const file = path.join(contentDir, e.subjectSlug, e.kind, `${e.slug}.md`);
    const { content } = matter(fs.readFileSync(file, "utf-8"));
    const { headings, text } = toPlainText(content);
    const subjectName =
      subjects.find((s) => s.slug === e.subjectSlug)?.name ?? e.subjectSlug;
    records.push({
      title: e.title,
      url: `/${e.subjectSlug}/${e.kind}/${e.slug}`,
      section: `${subjectName} · ${KIND_LABELS[e.kind]}`,
      headings,
      text: `${e.summary} ${text}`.trim(),
    });
  }

  // Archive: LeetCode 75 + guides
  for (const a of getAllArchiveMeta()) {
    const file = path.join(contentDir, "archive", a.category, `${a.slug}.md`);
    const { content } = matter(fs.readFileSync(file, "utf-8"));
    const { headings, text } = toPlainText(content);
    records.push({
      title: a.title,
      url: `/archive/${a.category}/${a.slug}`,
      section: `Archive · ${ARCHIVE_LABELS[a.category]}`,
      headings,
      text: `${a.summary} ${text}`.trim(),
    });
  }

  return records;
}
