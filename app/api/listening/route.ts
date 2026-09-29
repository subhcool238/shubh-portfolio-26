import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

// Receives Web Scrobbler webhook events from YouTube Music and serves the
// latest tracks (with YouTube Music's own artwork) to the About page.

export const dynamic = "force-dynamic";

const STORE_KEY = "listening:recent";
const MAX_TRACKS = 10;

export interface ListeningTrack {
  name: string;
  artist: string;
  album: string;
  art: string;
  playing: boolean;
  time: number;
}

// ─── Storage (Upstash Redis REST API, with an in-memory fallback for local dev) ───

function findEnv(suffix: string, exclude?: string): string | undefined {
  const key = Object.keys(process.env).find(
    (k) => k.endsWith(suffix) && (!exclude || !k.includes(exclude)) && process.env[k]
  );
  return key ? process.env[key] : undefined;
}

// Vercel's Upstash integration names these KV_REST_API_URL / KV_REST_API_TOKEN,
// optionally with a custom prefix (e.g. STORAGE_KV_REST_API_URL).
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || findEnv("KV_REST_API_URL");
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || findEnv("KV_REST_API_TOKEN", "READ_ONLY");

let memoryStore: ListeningTrack[] = [];

async function redis(command: string[]): Promise<unknown> {
  const r = await fetch(REDIS_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Redis ${r.status}`);
  return (await r.json()).result;
}

async function readTracks(): Promise<ListeningTrack[]> {
  if (!REDIS_URL || !REDIS_TOKEN) return memoryStore;
  const raw = await redis(["GET", STORE_KEY]);
  return typeof raw === "string" ? JSON.parse(raw) : [];
}

async function writeTracks(tracks: ListeningTrack[]): Promise<void> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    memoryStore = tracks;
    return;
  }
  await redis(["SET", STORE_KEY, JSON.stringify(tracks)]);
}

// ─── Webhook parsing ───

type SongData = { track?: string | null; artist?: string | null; album?: string | null };
type WebhookSong = {
  parsed?: SongData & { trackArt?: string | null };
  processed?: SongData;
  metadata?: { trackArtUrl?: string };
  connector?: { id?: string };
};

const clean = (s: unknown) => (typeof s === "string" ? s.trim().slice(0, 200) : "");

function toTrack(song: WebhookSong | undefined, playing: boolean, time: number): ListeningTrack | null {
  // Only YouTube Music plays are shown, so regular YouTube videos never appear on the site
  if (!song || song.connector?.id !== "youtube-music") return null;

  // "processed" holds Web Scrobbler's cleaned-up / user-corrected values
  const name = clean(song.processed?.track || song.parsed?.track);
  const artist = clean(song.processed?.artist || song.parsed?.artist);
  if (!name || !artist) return null;

  let art = clean(song.parsed?.trackArt || song.metadata?.trackArtUrl);
  if (!art.startsWith("https://") || art.includes("cover_track_default")) art = "";

  return {
    name,
    artist,
    album: clean(song.processed?.album || song.parsed?.album),
    art,
    playing,
    time,
  };
}

const sameTrack = (a: ListeningTrack, b: ListeningTrack) =>
  a.name.toLowerCase() === b.name.toLowerCase() && a.artist.toLowerCase() === b.artist.toLowerCase();

function isAuthorized(req: Request): boolean {
  const secret = process.env.NOW_PLAYING_SECRET;
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!secret || token.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(secret));
}

// ─── Handlers ───

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { eventName?: string; time?: number; data?: { song?: WebhookSong; songs?: WebhookSong[] } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.eventName;
  const time = typeof body.time === "number" ? body.time : Date.now();
  const song = toTrack(body.data?.song, event === "nowplaying" || event === "resumedplaying", time);

  // Web Scrobbler treats any non-200 response as a failure, so ignored events still return 200
  if (!song) return NextResponse.json({ ok: true, ignored: true });

  let tracks = await readTracks();
  const existing = tracks.find((t) => sameTrack(t, song));

  switch (event) {
    case "nowplaying":
    case "resumedplaying":
      // Move to the top as the currently playing track; nothing else is playing now
      tracks = [song, ...tracks.filter((t) => !sameTrack(t, song)).map((t) => ({ ...t, playing: false }))];
      break;
    case "paused":
      if (existing) existing.playing = false;
      break;
    case "scrobble":
      // Keep its position if already listed (e.g. from "nowplaying"), otherwise add to the top
      if (existing) {
        if (!existing.art && song.art) existing.art = song.art;
      } else {
        tracks = [{ ...song, playing: false }, ...tracks];
      }
      break;
    default:
      return NextResponse.json({ ok: true, ignored: true });
  }

  await writeTracks(tracks.slice(0, MAX_TRACKS));
  return NextResponse.json({ ok: true });
}

export async function GET() {
  try {
    const tracks = await readTracks();
    return NextResponse.json(
      { tracks },
      { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" } }
    );
  } catch {
    return NextResponse.json({ tracks: [] }, { status: 503 });
  }
}
