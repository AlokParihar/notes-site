"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/music";

// A small spinning vinyl in the corner. It never starts by itself (browsers block
// that anyway): a visitor taps it to play. Because it lives in the page layout,
// the music keeps going while they move between pages.
export default function MusicDisc() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Remembers "should the next track start by itself" (true if music was playing).
  const keepPlaying = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  // When the track changes, carry on playing if music was already on.
  useEffect(() => {
    if (keepPlaying.current) {
      audioRef.current?.play().catch(() => {});
    }
  }, [index]);

  if (TRACKS.length === 0) return null;

  const track = TRACKS[index];
  const many = TRACKS.length > 1;
  const label = track.artist ? `${track.title} · ${track.artist}` : track.title;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      keepPlaying.current = true;
      setFailed(false);
      audio.play().catch(() => setFailed(true));
    } else {
      keepPlaying.current = false;
      audio.pause();
    }
  }

  function next() {
    setFailed(false);
    setIndex((i) => (i + 1) % TRACKS.length);
  }

  return (
    <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2">
      {/* Track name: hidden on small phones to save space */}
      <div
        className="hidden sm:block max-w-[14rem] truncate rounded border border-[var(--rule-bright)] bg-[var(--bg)] px-3 py-1.5 text-xs font-mono text-[var(--ink-dim)]"
        aria-live="polite"
      >
        {failed ? "couldn't load this track" : label}
      </div>

      {many && (
        <button
          type="button"
          onClick={next}
          aria-label="Next track"
          className="rounded-full border border-[var(--rule-bright)] bg-[var(--bg)] px-2.5 py-1.5 text-xs font-mono text-[var(--ink-dim)] hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors"
        >
          ⏭
        </button>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        aria-pressed={playing}
        title={playing ? "Pause music" : "Play music"}
        className="relative h-14 w-14 shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)]"
      >
        {/* The record. Spins while playing; stops for people who prefer less motion. */}
        <span
          className="absolute inset-0 rounded-full border border-[var(--rule-bright)] shadow-lg animate-spin motion-reduce:animate-none"
          style={{
            animationDuration: "3.5s",
            animationPlayState: playing ? "running" : "paused",
            background:
              "radial-gradient(circle at center, transparent 0 15%, rgba(255,255,255,0) 15%), conic-gradient(from 30deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.10)), repeating-radial-gradient(circle at center, #14171c 0 2px, #0b0d10 2px 4px)",
          }}
        >
          {/* Centre label */}
          <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
          {/* Spindle hole */}
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--bg)]" />
        </span>

        {/* Tone arm: lifts off when paused, rests on the record when playing */}
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 h-7 w-1 origin-top rounded bg-[var(--ink-dim)] transition-transform duration-500"
          style={{ transform: playing ? "rotate(28deg)" : "rotate(-12deg)" }}
        />
      </button>

      {/* preload="none": the song is only downloaded when someone presses play */}
      <audio
        ref={audioRef}
        src={track.file}
        preload="none"
        loop={!many}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={next}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
    </div>
  );
}
