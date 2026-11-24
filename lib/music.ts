// Your music list. This is the ONLY place that decides what the disc plays.
//
// How to add a song:
//   1. Put the MP3 file in the folder  public/music/   (create it if it doesn't exist)
//   2. Add one line below, like the example. `file` is "/music/" + the exact file name.
//
// Keep each file small (about 2-4 MB) and only use music you have the right to use.
// While this list is empty, the disc does not appear on the site at all.

export type Track = {
  title: string;
  artist?: string; // shown next to the title; put the credit the license asks for
  file: string;
};

export const TRACKS: Track[] = [
   { title: "Kaha Tak", artist: "Kr$na", file: "D:\Downloads\notes-site\notes-site\public\music\KahaTak.m4a" },
];
