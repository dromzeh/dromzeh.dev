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

export function LanyardProfile() {
    const [activity, setActivity] = useState<Activity | undefined>(undefined);
    const [currentStatus, setCurrentStatus] = useState<any>(null);
    const [triggerScramble, setTriggerScramble] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { loading, status } = useLanyard({
        userId: "492731761680187403",
        socket: true,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (status && status.activities) {
            setActivity(
                status.activities.find((activity) => activity.type !== 4),
            );
        }
    }, [status]);

    useEffect(() => {
        if (status !== currentStatus) {
            setTriggerScramble(true);
            setCurrentStatus(status);
        }
    }, [status]);

    const handleScrambleComplete = () => {
        setTriggerScramble(false);
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
                <div>
                    {status.listening_to_spotify ? (
                        <div className="flex items-center gap-2">
                            <Image
                                src={`${status.spotify!.album_art_url}`}
                                alt="spotify album art"
                                width={16}
                                height={16}
                                className="rounded"
                            />
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
                    ) : (
                        <TextScramble
                            duration={0.2}
                            speed={0.04}
                            trigger={triggerScramble}
                            onScrambleComplete={handleScrambleComplete}
                        >
                            {`not playing anything on spotify`}
                        </TextScramble>
                    )}
                </div>
            </div>
        </div>
    );
}
