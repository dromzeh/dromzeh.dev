"use client";

import Link from "next/link";
import type { Activity, LanyardData } from "react-use-lanyard";

const linkClassName =
    "text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50";

type AppleMusicActivity = Activity & {
    details_url?: string;
    state_url?: string;
};

const getAppleMusicActivity = (
    activities: Activity[],
): AppleMusicActivity | undefined => {
    return activities.find(
        (activity) => activity.type === 2 && activity.name === "Apple Music",
    ) as AppleMusicActivity;
};

const hasMusicService = (status: LanyardData) => {
    const hasSpotify = status?.listening_to_spotify;
    const hasAppleMusic = status?.activities?.some(
        (activity: Activity) =>
            activity.type === 2 && activity.name === "Apple Music",
    );
    const appleMusicActivity = hasAppleMusic
        ? getAppleMusicActivity(status.activities)
        : undefined;

    return { hasSpotify, hasAppleMusic, appleMusicActivity };
};

const renderMusicServiceStatus = (
    service: "spotify" | "appleMusic",
    status: LanyardData,
    activity?: AppleMusicActivity,
) => {
    if (service === "spotify") {
        if (!status?.spotify?.song || !status?.spotify?.artist) {
            return "listening to spotify";
        }

        const rawArtists = status.spotify.artist;
        const artists = rawArtists
            .split(";")
            .map((a) => a.trim())
            .filter(Boolean);

        const artistNodes = artists.map((artist, idx) => (
            <span key={`${artist}-${idx}`}>
                {idx > 0 ? (idx === artists.length - 1 ? "; " : ", ") : null}
                <Link
                    href={`https://open.spotify.com/search/${encodeURIComponent(artist)}`}
                    target="_blank"
                    className={linkClassName}
                >
                    {artist}
                </Link>
            </span>
        ));

        return (
            <>
                listening to{" "}
                <Link
                    href={`https://open.spotify.com/track/${status.spotify.track_id}`}
                    target="_blank"
                    className={linkClassName}
                >
                    {status.spotify.song}
                </Link>{" "}
                by {artistNodes}
            </>
        );
    }

    if (service === "appleMusic" && activity) {
        const song = activity.details;
        const rawArtists = activity.state;
        const albumUrl = activity.details_url;

        const artists =
            rawArtists
                ?.split(" & ")
                .map((a) => a.trim())
                .filter(Boolean) || [];

        const artistNodes = artists.map((artist, idx) => (
            <span key={`${artist}-${idx}`}>
                {idx > 0 ? (idx === artists.length - 1 ? " & " : ", ") : null}
                <Link
                    href={`https://music.apple.com/search?term=${encodeURIComponent(artist)}`}
                    target="_blank"
                    className={linkClassName}
                >
                    {artist}
                </Link>
            </span>
        ));

        return (
            <>
                listening to{" "}
                {albumUrl ? (
                    <Link
                        href={albumUrl}
                        target="_blank"
                        className={linkClassName}
                    >
                        {song}
                    </Link>
                ) : (
                    song
                )}{" "}
                by {artistNodes}
            </>
        );
    }

    return null;
};

interface MusicStatusProps {
    status: LanyardData;
}

export function MusicStatus({ status }: MusicStatusProps) {
    const { hasSpotify, hasAppleMusic, appleMusicActivity } =
        hasMusicService(status);

    if (hasAppleMusic && appleMusicActivity) {
        return renderMusicServiceStatus(
            "appleMusic",
            status,
            appleMusicActivity,
        );
    }

    if (hasSpotify) {
        return renderMusicServiceStatus("spotify", status);
    }

    return null;
}
