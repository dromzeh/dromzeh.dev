import type { LanyardSpotify } from "~/composables/useLanyard";
import { MUSIC } from "~/data/site";

export interface TrackData {
  title: string;
  artist: string;
  albumArt: string;
  url: string;
  isLive: boolean;
}

export function fromLanyard(spotify: LanyardSpotify): TrackData {
  return {
    title: spotify.song,
    artist: spotify.artist?.split(";")[0]?.trim() ?? "",
    albumArt: spotify.album_art_url,
    url: spotify.track_id ? `https://open.spotify.com/track/${spotify.track_id}` : "",
    isLive: true,
  };
}

interface LastFmTrack {
  name?: string;
  url?: string;
  image?: Array<{ "#text": string }>;
  artist?: { "#text": string };
  "@attr"?: { nowplaying?: string };
}

const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";
function realArt(url: string): string {
  return url.includes(LASTFM_PLACEHOLDER) ? "" : url;
}

export async function fetchLastPlayed(): Promise<TrackData | null> {
  try {
    const res = await fetch(`https://lastfm-last-played.biancarosa.com.br/${MUSIC.lastFmUsername}/latest-song`);
    if (!res.ok) return null;
    const data = (await res.json()) as { track?: LastFmTrack };
    const t = data?.track;
    if (!t) return null;
    return {
      title: t.name ?? "",
      artist: t.artist?.["#text"] ?? "",
      albumArt: realArt(t.image?.[3]?.["#text"] ?? t.image?.[2]?.["#text"] ?? ""),
      url: t.url ?? "",
      isLive: t["@attr"]?.nowplaying === "true",
    };
  } catch {
    return null;
  }
}
