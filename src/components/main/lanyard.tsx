"use client";

import { useLanyard } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Activity } from "react-use-lanyard";

const statusMap = {
    online: "online",
    dnd: "on do not disturb",
    idle: "idle",
    offline: "offline",
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
                by{" "}
                <Link
                    href={`https://open.spotify.com/search/${status.spotify.artist}`}
                    target="_blank"
                    className={linkClassName}
                >
                    {status.spotify.artist}
                </Link>{" "}
                on Spotify
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

    return (
        <p className="text-sm text-muted-foreground">
            According to Discord, I am currently{" "}
            {statusMap[status.discord_status]}
            {hasActivities && hasSpotify && (
                <>
                    {" "}
                    {getActivityText(activities[0])} and{" "}
                    {renderSpotifyContent()}
                </>
            )}
            {hasActivities && !hasSpotify && (
                <> {getActivityText(activities[0])}</>
            )}
            {!hasActivities && hasSpotify && <> {renderSpotifyContent()}</>}.
        </p>
    );
}
