"use client";

import { useLanyard } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Activity } from "react-use-lanyard";

const statusMap = {
    online: "Online",
    dnd: "Do Not Disturb",
    idle: "Idle",
    offline: "Offline",
};

const statusColorMap = {
    online: "bg-green-500/10 text-green-400 border border-green-400/50",
    dnd: "bg-red-500/10 text-red-400 border border-red-400/50",
    idle: "bg-yellow-500/10 text-yellow-400 border border-yellow-400/50",
    offline: "bg-neutral-400/10 text-neutral-400 border border-neutral-400/50",
};

const linkClassName =
    "text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50";

export function LanyardProfile() {
    const [mounted, setMounted] = useState(false);
    const { loading, status } = useLanyard({
        userId: "492731761680187403",
        socket: true,
    });

    const activities =
        status?.activities?.filter(
            (activity) => activity.type !== 4 && activity.type !== 2,
        ) || [];
    const hasSpotify = status?.listening_to_spotify;
    const hasActivities = activities.length > 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    const getActivityText = (activity: Activity) => {
        if (activity.name === "Visual Studio Code") {
            const details = activity.details;
            if (details?.startsWith("In ")) {
                const projectMatch = details.match(/^In (.+?) -/);
                if (projectMatch) {
                    return `working on ${projectMatch[1]}`;
                }
            }
            return `working on ${activity.name}`;
        }
        return `playing ${activity.name}`;
    };

    const renderSpotifyContent = () => {
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
    };

    if (!mounted || loading || !status || !status.discord_user) {
        return (
            <span className="text-sm text-muted-foreground">
                Fetching Discord Presence...
            </span>
        );
    }

    let tailContent;
    if (hasActivities && hasSpotify) {
        tailContent = (
            <>
                , {getActivityText(activities[0])} and {renderSpotifyContent()}.
            </>
        );
    } else if (hasActivities && !hasSpotify) {
        tailContent = <>, {getActivityText(activities[0])}.</>;
    } else if (!hasActivities && hasSpotify) {
        tailContent = <>, {renderSpotifyContent()}.</>;
    } else {
        tailContent = ".";
    }

    return (
        <p className="text-sm text-muted-foreground leading-relaxed  ">
            Currently
            <span
                className={`${statusColorMap[status.discord_status]} inline-flex items-center align-middle leading-none rounded-md translate-y-[-0.6px] px-1.5 mx-1 py-[1px] text-xs`}
            >
                {statusMap[status.discord_status]}
            </span>
            on Discord
            {tailContent}
        </p>
    );
}
