"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useLanyard } from "react-use-lanyard";
import Image from "next/image";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";
import { TextScramble } from "../scramble";

const statusMap = {
    online: "Online",
    dnd: "Do Not Disturb",
    idle: "Idle",
    offline: "Offline",
};

const statusColorMap = {
    online: "bg-green-500",
    dnd: "bg-red-500",
    idle: "bg-yellow-500",
    offline: "bg-neutral-400",
};

const getActivityIcon = (activity: Activity) => {
    if (activity.assets?.small_image) {
        return activity.assets.small_image.startsWith("mp:external/")
            ? activity.assets.small_image
                  .replace(
                      "mp:external/",
                      "https://media.discordapp.net/external/",
                  )
                  .replace(/\/https\//, "/https/")
            : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
    }
    if (activity.assets?.large_image) {
        return activity.assets.large_image.startsWith("mp:external/")
            ? activity.assets.large_image
                  .replace(
                      "mp:external/",
                      "https://media.discordapp.net/external/",
                  )
                  .replace(/\/https\//, "/https/")
            : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }
    return null;
};

export function LanyardProfile() {
    const [currentStatus, setCurrentStatus] = useState<any>(null);
    const [triggerScramble, setTriggerScramble] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeActivityIndex, setActiveActivityIndex] = useState(0);

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

    useEffect(() => {
        if (status !== currentStatus) {
            setTriggerScramble(true);
            setCurrentStatus(status);
            setActiveActivityIndex(0);
        }
    }, [status]);

    const handleScrambleComplete = () => {
        setTriggerScramble(false);
    };

    const handleActivityToggle = () => {
        if (hasSpotify && hasActivities) {
            setActiveActivityIndex((prev) => (prev === 0 ? 1 : 0));
            setTriggerScramble(true);
        }
    };

    const renderActivityContent = () => {
        if (hasSpotify && activeActivityIndex === 0) {
            return (
                <div className="flex items-center gap-2">
                    {!(hasSpotify && hasActivities) && (
                        <Image
                            src={status.spotify!.album_art_url}
                            alt="spotify album art"
                            width={16}
                            height={16}
                            className="rounded"
                        />
                    )}
                    <TextScramble
                        duration={0.2}
                        speed={0.04}
                        trigger={triggerScramble}
                        onScrambleComplete={handleScrambleComplete}
                    >
                        {status.spotify?.song.length! < 50
                            ? `listening to ${status.spotify?.song}`
                            : "listening to spotify"}
                    </TextScramble>
                </div>
            );
        }

        if (
            hasActivities &&
            ((hasSpotify && activeActivityIndex === 1) || !hasSpotify)
        ) {
            const activity = activities[0];
            const activityIcon = getActivityIcon(activity);

            return (
                <div className="flex items-center gap-2">
                    {activityIcon && !(hasSpotify && hasActivities) && (
                        <Image
                            src={activityIcon}
                            alt={`${activity.name} icon`}
                            width={16}
                            height={16}
                            className="rounded"
                        />
                    )}
                    <TextScramble
                        duration={0.2}
                        speed={0.04}
                        trigger={triggerScramble}
                        onScrambleComplete={handleScrambleComplete}
                    >
                        {activity.name === "Visual Studio Code"
                            ? (() => {
                                  const details = activity.details;
                                  if (details && details.startsWith("In ")) {
                                      const projectMatch =
                                          details.match(/^In (.+?) -/);
                                      if (projectMatch) {
                                          return `working on ${projectMatch[1]}`;
                                      }
                                  }
                                  return `coding in ${activity.name}`;
                              })()
                            : `playing ${activity.name}`}
                    </TextScramble>
                </div>
            );
        }

        return (
            <TextScramble
                duration={0.2}
                speed={0.04}
                trigger={triggerScramble}
                onScrambleComplete={handleScrambleComplete}
            >
                {`${statusMap[status!.discord_status]} on Discord`}
            </TextScramble>
        );
    };

    if (!mounted) {
        return (
            <div className="space-y-3">
                <h1 className="text-xl font-medium text-foreground">dromzeh</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-neutral-400" />
                    <div>loading...</div>
                </div>
            </div>
        );
    }

    return loading || !status || !status.discord_user ? (
        <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-56" />
        </div>
    ) : (
        <div className="space-y-3">
            <h1 className="font-medium text-foreground">dromzeh</h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div
                    className={`w-2 h-2 rounded-full ${statusColorMap[status.discord_status]} ${
                        status.discord_status === "online"
                            ? "animate-pulse"
                            : ""
                    }`}
                />
                <div className="flex items-center gap-2">
                    {/* Activity icons for toggling */}
                    {hasSpotify && hasActivities && (
                        <div className="flex items-center gap-1 mr-1">
                            <button
                                onClick={handleActivityToggle}
                                className={`w-4 h-4 rounded transition-opacity ${
                                    activeActivityIndex === 0
                                        ? "opacity-100"
                                        : "opacity-50 hover:opacity-75"
                                }`}
                                title="Spotify"
                            >
                                <Image
                                    src={status.spotify!.album_art_url}
                                    alt="spotify"
                                    width={16}
                                    height={16}
                                    className="rounded"
                                />
                            </button>
                            <button
                                onClick={handleActivityToggle}
                                className={`w-4 h-4 rounded transition-opacity ${
                                    activeActivityIndex === 1
                                        ? "opacity-100"
                                        : "opacity-50 hover:opacity-75"
                                }`}
                                title={activities[0]?.name}
                            >
                                {getActivityIcon(activities[0]) && (
                                    <Image
                                        src={getActivityIcon(activities[0])!}
                                        alt={activities[0]?.name}
                                        width={16}
                                        height={16}
                                        className="rounded"
                                    />
                                )}
                            </button>
                        </div>
                    )}

                    {/* Activity content */}
                    <div>{renderActivityContent()}</div>
                </div>
            </div>
        </div>
    );
}
