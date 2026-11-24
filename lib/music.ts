// Your music settings. This is the ONLY place that decides what the disc plays.
//
// There are two ways to give the disc music. If both are filled in, YouTube wins.
//
// A) YouTube playlist (no files to download)
//    Paste the playlist link between the quotes below. The playlist must be set to
//    "Public" or "Unlisted" on YouTube. Some videos don't allow embedding; the disc
//    skips those automatically.
//
// B) Your own MP3 files
//    1. Put the file in the folder  public/music/
//    2. Add one line to TRACKS. `file` is "/music/" + the exact file name
//       (NOT a path from your computer like D:\...).
//    Only use music you have the right to use.
//
// While both are empty, the disc does not appear on the site at all.

export const YOUTUBE_PLAYLIST = "https://youtube.com/playlist?list=RDSR57_CPR-lU&playnext=1&si=Y4SBemNf4HjDZTAF";
export type Track = {
  title: string;
  artist?: string;
  file: string;
};
export const TRACKS: Track[] = [
  { title: "Kaha Tak", artist: "Kr$na", file: "/music/KahaTak.m4a" },
];

// Accepts a full playlist link or just the id after "list=". Returns "" if neither works.
export function getPlaylistId(value: string): string {
  const v = value.trim();
  if (!v) return "";
  try {
    return new URL(v).searchParams.get("list") ?? "";
  } catch {
    return /^[\w-]{10,}$/.test(v) ? v : "";
  }
}
