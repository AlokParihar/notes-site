"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS, YOUTUBE_PLAYLIST, getPlaylistId } from "@/lib/music";

// ---------- The spinning record (shared by both modes) ----------

function Vinyl({ playing }: { playing: boolean }) {
  return (
    <>
      {/* Spins while playing; stops for people who prefer less motion. */}
      <span
        className="absolute inset-0 rounded-full border border-[var(--rule-bright)] shadow-lg animate-spin motion-reduce:animate-none"
        style={{
          animationDuration: "3.5s",
          animationPlayState: playing ? "running" : "paused",
          background:
            "conic-gradient(from 30deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.10)), repeating-radial-gradient(circle at center, #14171c 0 2px, #0b0d10 2px 4px)",
        }}
      >
        <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--bg)]" />
      </span>
      {/* Tone arm: lifts off when paused, rests on the record when playing */}
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 h-7 w-1 origin-top rounded bg-[var(--ink-dim)] transition-transform duration-500"
        style={{ transform: playing ? "rotate(28deg)" : "rotate(-12deg)" }}
      />
    </>
  );
}

const DISC_BUTTON =
  "relative h-14 w-14 shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)]";
const SMALL_BUTTON =
  "rounded-full border border-[var(--rule-bright)] bg-[var(--bg)] px-2.5 py-1.5 text-xs font-mono text-[var(--ink-dim)] hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors";
const LABEL_BOX =
  "hidden sm:block max-w-[14rem] truncate rounded border border-[var(--rule-bright)] bg-[var(--bg)] px-3 py-1.5 text-xs font-mono text-[var(--ink-dim)]";

// ---------- Mode A: your own files ----------

function LocalDisc() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const keepPlaying = useRef(false); // "should the next track start by itself?"
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (keepPlaying.current) audioRef.current?.play().catch(() => {});
  }, [index]);

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
      <div className={LABEL_BOX} aria-live="polite">
        {failed ? "couldn't load this track" : label}
      </div>
      {many && (
        <button type="button" onClick={next} aria-label="Next track" className={SMALL_BUTTON}>
          ⏭
        </button>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        aria-pressed={playing}
        title={playing ? "Pause music" : "Play music"}
        className={DISC_BUTTON}
      >
        <Vinyl playing={playing} />
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

// ---------- Mode B: YouTube playlist ----------

// The small part of YouTube's player API that we use.
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  getPlayerState(): number;
  getVideoData?(): { title?: string };
};
type YTNamespace = {
  Player: new (el: HTMLElement, options: object) => YTPlayer;
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_PLAYING = 1;

// Downloads YouTube's player script. Only called after someone taps the disc.
function loadYouTubeApi(): Promise<YTNamespace> {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    if (!document.querySelector("script[data-yt-api]")) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.dataset.ytApi = "1";
      s.onerror = () => reject(new Error("YouTube script blocked"));
      document.head.appendChild(s);
    }
  });
}

function YouTubeDisc({ playlistId }: { playlistId: string }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const errorsInARow = useRef(0);
  const [started, setStarted] = useState(false); // player has been created
  const [open, setOpen] = useState(false); // panel visible
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState("");
  const [failed, setFailed] = useState(false);

  async function start() {
    setStarted(true);
    setOpen(true);
    setFailed(false);
    try {
      const YT = await loadYouTubeApi();
      if (!slotRef.current || playerRef.current) return;
      // YouTube replaces this element with its own iframe, so React must not own it.
      const mount = document.createElement("div");
      slotRef.current.appendChild(mount);
      playerRef.current = new YT.Player(mount, {
        width: "100%",
        height: "200",
        // The privacy-enhanced YouTube address: sets nothing until you actually play.
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          listType: "playlist",
          list: playlistId,
          autoplay: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onStateChange: (e: { data: number }) => {
            setPlaying(e.data === YT_PLAYING);
            if (e.data === YT_PLAYING) {
              errorsInARow.current = 0;
              setTitle(playerRef.current?.getVideoData?.().title ?? "");
            }
          },
          onError: (e: { data: number }) => {
            // 100/101/150: this video can't be played in an embed -> skip to the next one.
            errorsInARow.current += 1;
            if ([100, 101, 150].includes(e.data) && errorsInARow.current < 6) {
              playerRef.current?.nextVideo();
            } else {
              setFailed(true);
            }
          },
        },
      });
    } catch {
      setFailed(true);
    }
  }

  function toggle() {
    const player = playerRef.current;
    if (!started || !player) {
      void start();
      return;
    }
    if (player.getPlayerState() === YT_PLAYING) player.pauseVideo();
    else player.playVideo();
  }

  const label = failed
    ? "couldn't load the playlist"
    : title || (started ? "loading…" : "tap the disc for music");

  return (
    <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end gap-2">
      {/* The YouTube player. YouTube requires it to stay visible and at least 200x200. */}
      <div
        className={`w-[min(22rem,calc(100vw-2rem))] rounded border border-[var(--rule-bright)] bg-[var(--bg)] p-2 ${
          started && open ? "" : "hidden"
        }`}
      >
        <div ref={slotRef} className="overflow-hidden rounded [&_iframe]:block" />
        <p className="mt-2 text-[10px] font-mono text-[var(--label)]">
          Music from YouTube. Pressing play loads YouTube&apos;s player.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className={LABEL_BOX} aria-live="polite">
          {label}
        </div>
        {started && (
          <>
            <button
              type="button"
              onClick={() => playerRef.current?.nextVideo()}
              aria-label="Next song"
              className={SMALL_BUTTON}
            >
              ⏭
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Hide the video panel" : "Show the video panel"}
              aria-expanded={open}
              className={SMALL_BUTTON}
            >
              {open ? "▾" : "▴"}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
          title={playing ? "Pause music" : "Play music"}
          className={DISC_BUTTON}
        >
          <Vinyl playing={playing} />
        </button>
      </div>
    </div>
  );
}

// ---------- Picks the mode from lib/music.ts ----------

export default function MusicDisc() {
  const playlistId = getPlaylistId(YOUTUBE_PLAYLIST);
  if (playlistId) return <YouTubeDisc playlistId={playlistId} />;
  if (TRACKS.length > 0) return <LocalDisc />;
  return null;
}
