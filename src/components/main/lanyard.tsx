"use client";

import { useLanyard } from "react-use-lanyard";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || loading || !status || !status.discord_user) {
        return (
            <span className="text-sm text-muted-foreground">
                Fetching Discord Presence...
            </span>
        );
    }

    return (
        <p className="text-sm text-muted-foreground leading-relaxed">
            Currently
            <span
                className={`${statusColorMap[status.discord_status]} inline-flex items-center align-middle leading-none rounded-md translate-y-[-0.6px] px-1.5 mx-1 py-[1px] text-xs`}
            >
                {statusMap[status.discord_status]}
            </span>
            on Discord.
        </p>
    );
}
