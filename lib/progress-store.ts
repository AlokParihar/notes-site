import { useMemo, useSyncExternalStore } from "react";

// Progress is saved in the visitor's own browser (localStorage). Nothing is sent
// to any server, so it works without login, but it stays on that one device.

const CHANGE_EVENT = "progress-change";

export function readRaw(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return ""; // storage blocked (private mode etc.) -> behave as "nothing ticked"
  }
}

export function parseIds(raw: string): string[] {
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveIds(key: string, ids: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // storage blocked: ticks just won't persist
  }
  // Tells every component on this page to re-read (the "storage" event only
  // fires in *other* tabs).
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

// Returns the list of ticked question ids. Empty on the server and during the
// first render, so server and browser HTML match.
export function useProgress(key: string): string[] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => ""
  );
  return useMemo(() => parseIds(raw), [raw]);
}

// Short stable id for a question, made from its text. Editing a question's text
// gives it a new id (its tick is lost), but adding/reordering questions is safe.
export function hashText(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}
