"use client";

import { useLanyard } from "react-use-lanyard";
import { useEffect, useState } from "react";
import type { Activity, LanyardData } from "react-use-lanyard";
import { MusicStatus } from "./music-status";

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
    const hasAppleMusic = status?.activities?.some(
        (activity: Activity) =>
            activity.type === 2 && activity.name === "Apple Music",
    );
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

    if (!mounted || loading || !status || !status.discord_user) {
        return (
            <span className="text-sm text-muted-foreground">
                Fetching Discord Presence...
            </span>
        );
    }

    const renderTailContent = () => {
        const activityText = hasActivities
            ? getActivityText(activities[0])
            : null;
        const musicStatus =
            hasSpotify || hasAppleMusic ? (
                <MusicStatus status={status} />
            ) : null;

        if (!activityText && !musicStatus) return ".";

        if (activityText && musicStatus) {
            return (
                <>
                    , {activityText} and {musicStatus}.
                </>
            );
        }

        if (activityText) {
            return <>, {activityText}.</>;
        }

        return <>, {musicStatus}.</>;
    };

    return (
        <p className="text-sm text-muted-foreground leading-relaxed  ">
            Currently
            <span
                className={`${statusColorMap[status.discord_status]} inline-flex items-center align-middle leading-none rounded-md translate-y-[-0.6px] px-1.5 mx-1 py-[1px] text-xs`}
            >
                {statusMap[status.discord_status]}
            </span>
            on Discord
            {renderTailContent()}
        </p>
    );
}
