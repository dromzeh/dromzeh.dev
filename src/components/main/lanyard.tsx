"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useLanyard } from "react-use-lanyard";
import Image from "next/image";
import type { Activity } from "react-use-lanyard";
import { useEffect, useState } from "react";
import Link from "next/link";

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

    const { loading, status } = useLanyard({
        userId: "492731761680187403",
        socket: true,
    });

    useEffect(() => {
        if (status && status.activities) {
            setActivity(
                status.activities.find((activity) => activity.type !== 4),
            );
        }
    }, [status]);

    // if (loading || !status || !status.discord_user) {
    //     return null;
    // }

    return loading || !status || !status.discord_user ? (
        <div className="flex flex-row space-x-2 items-center">
            <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 translate-y-1 w-56" />
            </div>
        </div>
    ) : (
        <div className="flex flex-row space-x-2 items-center">
            {/* <div className="relative mr-2">
                <Image
                    src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`}
                    alt="discord avatar"
                    width={64}
                    height={64}
                    className="rounded-lg"
                />
                <span className="absolute bottom-0 right-0 translate-y-2 translate-x-2">
                    <span
                        className={`animate-ping absolute inline-flex size-4 rounded-full ${statusColorMap[status.discord_status]} opacity-75`}
                    />
                    <span
                        className={`relative inline-flex rounded-full ${statusColorMap[status.discord_status]} size-4`}
                    />
                </span>
            </div> */}
            <div className="flex flex-col space-y-2">
                <p className="text-foreground">
                    Marcel Alexander Elias<span className="caret">_</span>
                </p>

                <div className="flex flex-row space-x-2 items-center group">
                    <div>
                        <span
                            className={`relative inline-flex animate-pulse rounded-full ${statusColorMap[status.discord_status]} size-2 translate-y-[-1]`}
                        />
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {status.listening_to_spotify ? (
                            <div className="flex flex-row space-x-1 items-center">
                                <Image
                                    src={`${status.spotify!.album_art_url}`}
                                    alt="spotify album art"
                                    width={48}
                                    height={48}
                                    className="size-5 rounded-md mr-1"
                                />
                                <p className="line-clamp-1 overflow-ellipsis">
                                    Listening to{" "}
                                    {status.spotify?.song.length! < 50 ? (
                                        <Link
                                            href={`https://open.spotify.com/track/${status.spotify?.track_id}`}
                                            target="_blank"
                                            className="text-foreground hover:cursor-pointer hover:text-muted-foreground/50 transition-all duration-150"
                                        >
                                            {status.spotify?.song}
                                        </Link>
                                    ) : (
                                        <span> Spotify</span>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <p>{statusMap[status.discord_status]} on Discord</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
