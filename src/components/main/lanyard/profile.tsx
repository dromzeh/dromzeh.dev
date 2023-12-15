"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useLanyard } from "react-use-lanyard";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";

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
    const { loading, status } = useLanyard({
        userId: "492731761680187403",
        socket: true,
    });

    if (loading || !status) {
        return <Skeleton className="h-[56px] w-[200px] rounded-md" />;
    }

    return (
        <div className="flex flex-row space-x-2 items-center">
            <Image
                src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}`}
                alt="discord avatar"
                width={64}
                height={64}
                className="rounded-md mr-1"
            />
            <div className="flex flex-col space-y-1">
                <p className="text-neutral-100">
                    {status.discord_user.username}
                </p>

                <Badge variant={"outline"} className="font-normal">
                    <div className="flex flex-row space-x-1 items-center">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                    statusColorMap[status.discord_status]
                                }`}
                            ></span>
                            <span
                                className={`relative inline-flex rounded-full h-2 w-2 ${
                                    statusColorMap[status.discord_status]
                                }`}
                            ></span>
                        </span>
                        {status.activities[0] ? (
                            <p className="text-neutral-400 text-sm">
                                {status.activities[0].type === 2 ? (
                                    <span>
                                        Listening to
                                        {status.spotify?.song.length! +
                                            status.spotify?.artist.length! <
                                        30 ? (
                                            <span>
                                                {" "}
                                                {status.spotify?.song} by{" "}
                                                {status.spotify?.artist}
                                            </span>
                                        ) : (
                                            <span> Spotify</span>
                                        )}
                                    </span>
                                ) : (
                                    <span>
                                        Playing {status.activities[0].name}
                                    </span>
                                )}
                            </p>
                        ) : (
                            <p className="text-neutral-400 text-sm">
                                {statusMap[status.discord_status]} on Discord
                            </p>
                        )}
                    </div>
                </Badge>
            </div>
        </div>
    );
}