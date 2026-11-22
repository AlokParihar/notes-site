"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  hashText,
  parseIds,
  readRaw,
  saveIds,
  useProgress,
} from "@/lib/progress-store";

// Same rule as lib/progress.ts (kept here because that file reads from disk).
const TRACKED_SECTION = /^(Unit|Module)\s/;

// The question lines: top-level bullets sitting under a "Unit …" / "Module …" heading.
function getQuestionItems(root: HTMLElement): HTMLLIElement[] {
  const items: HTMLLIElement[] = [];
  let inSection = false;
  for (const el of Array.from(root.children)) {
    if (el.tagName === "H2") {
      inSection = TRACKED_SECTION.test((el.textContent ?? "").trim());
    } else if (inSection && el.tagName === "UL") {
      for (const li of Array.from(el.children)) {
        if (li.tagName === "LI") items.push(li as HTMLLIElement);
      }
    }
  }
  return items;
}

export default function QuestionTracker({
  html,
  storageKey,
  total,
}: {
  html: string;
  storageKey: string;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useProgress(storageKey);
  // Same object every render. If React sees a "new" object it re-applies the HTML
  // and wipes the checkboxes we added.
  const inner = useMemo(() => ({ __html: html }), [html]);

  // 1) Once, after the page appears: put a checkbox in front of every question.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const seen = new Map<string, number>();
    for (const li of getQuestionItems(root)) {
      if (li.querySelector(".q-check")) continue; // already added (dev double-run)
      const box = document.createElement("input");
      box.type = "checkbox";
      box.className = "q-check";
      // The same question can appear twice on a page; number repeats so each has its own tick.
      const base = hashText(li.textContent ?? "");
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      box.dataset.qid = n === 0 ? base : `${base}-${n}`;
      box.setAttribute("aria-label", "Mark this question as revised");
      li.classList.add("q-item");
      li.prepend(box);
    }

    // One listener for all boxes. Reads storage directly so it is never stale.
    function onChange(e: Event) {
      const box = e.target as HTMLInputElement;
      if (!box.classList?.contains("q-check")) return;
      const present = new Set(getQuestionItems(root!).map((li) => li.querySelector<HTMLInputElement>(".q-check")?.dataset.qid));
      // Keep only ids that still exist on the page, so deleted questions don't linger.
      const next = new Set(parseIds(readRaw(storageKey)).filter((id) => present.has(id)));
      const id = box.dataset.qid!;
      if (box.checked) next.add(id);
      else next.delete(id);
      saveIds(storageKey, [...next]);
    }
    root.addEventListener("change", onChange);
    return () => root.removeEventListener("change", onChange);
  }, [storageKey]);

  // 2) Whenever progress changes (or loads): show the saved ticks.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ticked = new Set(done);
    for (const li of getQuestionItems(root)) {
      const box = li.querySelector<HTMLInputElement>(".q-check");
      if (!box) continue;
      const isDone = ticked.has(box.dataset.qid ?? "");
      box.checked = isDone;
      li.classList.toggle("q-done", isDone);
    }
  }, [done]);

  const count = Math.min(done.length, total);
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  function reset() {
    if (window.confirm("Clear all ticks on this page?")) saveIds(storageKey, []);
  }

  return (
    <>
      <div className="sticky top-0 z-10 -mx-2 px-2 py-3 mb-4 bg-[var(--bg)] border-b border-[var(--rule)]">
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[var(--ink-dim)]">
            revised <span className="text-[var(--amber)]">{count}</span> / {total} questions
            <span className="text-[var(--label)]"> · saved on this device</span>
          </span>
          {count > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-[var(--label)] hover:text-[var(--amber)] transition-colors shrink-0"
            >
              reset
            </button>
          )}
        </div>
        <div
          className="mt-2 h-1 rounded bg-[var(--rule)] overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={count}
          aria-label="Revision progress"
        >
          <div
            className="h-full bg-[var(--accent)] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div ref={ref} className="prose-note" dangerouslySetInnerHTML={inner} />
    </>
  );
}
