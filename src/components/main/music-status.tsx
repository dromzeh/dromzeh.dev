"use client";

import { motion, MotionConfig, Transition } from "framer-motion";
import React from "react";
import Image from "next/image";
import { useLanyard } from "react-use-lanyard";

const Context = React.createContext<{
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

interface CDProps {
    albumArt: string;
    albumName: string;
    isPlaying?: boolean;
    href?: string;
}

function CD({ albumArt, albumName, isPlaying = true, href }: CDProps) {
    const content = (
        <>
            <Image
                src={albumArt}
                alt={albumName}
                width={60}
                height={60}
                className="pointer-events-none select-none object-cover"
            />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="size-[18px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/20 backdrop-blur-sm" />
                <div className="size-[17px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-dotted border-muted-foreground/10" />
                <div className="size-[15px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-border bg-muted" />
                <div className="size-[10px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/30" />
                <div className="size-[8px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/30" />
                <div className="size-[7px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/20" />
                <div className="size-[6px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-[#181818] shadow-inner" />
            </div>
        </>
    );

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ rotate: 0 }}
            animate={
                isPlaying
                    ? {
                          rotate: 360,
                          transition: {
                              ease: "linear",
                              duration: 5,
                              repeat: Infinity,
                          },
                      }
                    : {}
            }
            whileHover={{
                scale: 1.03,
            }}
            className="size-[60px] flex-shrink-0 rounded-full z-10 flex origin-center select-none items-center justify-center overflow-hidden border border-border shadow-lg relative cursor-pointer"
        >
            {content}
        </motion.a>
    );
}

interface LastFmTrack {
    track: {
        "@attr"?: { nowplaying: string };
        name: string;
        artist: { "#text": string };
        album: { "#text": string };
        image: Array<{ "#text": string; size: string }>;
    };
}

export const MusicStatus = React.memo(function MusicStatus() {
    const [componentStatus, setComponentStatus] = React.useState("idle");
    const [currentTime, setCurrentTime] = React.useState(0);
    const [mounted, setMounted] = React.useState(false);
    const [lastFmTrack, setLastFmTrack] = React.useState<LastFmTrack | null>(
        null,
    );
    const isNotIdle = componentStatus !== "idle";

    const { loading, status } = useLanyard({
        userId: "492731761680187403",
        socket: true,
    });

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (!status?.listening_to_spotify) {
            fetch(
                "https://lastfm-last-played.biancarosa.com.br/idves/latest-song",
            )
                .then((res) => res.json())
                .then((data) => setLastFmTrack(data))
                .catch(() => setLastFmTrack(null));
        }
    }, [status?.listening_to_spotify]);

    React.useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setComponentStatus("idle");
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    React.useEffect(() => {
        if (!status?.spotify?.timestamps?.start) return;

        const updateTime = () => {
            setCurrentTime(
                Date.now() - (status.spotify?.timestamps?.start || 0),
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 100);

        return () => clearInterval(interval);
    }, [status?.spotify?.timestamps?.start]);

    const Skeleton = () => (
        <div className="w-[300px] h-[76px] relative overflow-hidden rounded-[24px] border border-border bg-muted/50 shadow-sm flex items-center gap-4 px-4 py-2 animate-pulse">
            <div className="size-[60px] rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
            </div>
        </div>
    );

    if (!mounted || loading) {
        return <Skeleton />;
    }

    const isSpotify = status?.listening_to_spotify && status?.spotify;
    const song = isSpotify ? status.spotify.song : lastFmTrack?.track.name;
    const artist = isSpotify
        ? status.spotify.artist
        : lastFmTrack?.track.artist["#text"];
    const album = isSpotify
        ? status.spotify.album
        : lastFmTrack?.track.album["#text"];
    const album_art_url = isSpotify
        ? status.spotify.album_art_url
        : lastFmTrack?.track.image.find((img) => img.size === "extralarge")?.[
              "#text"
          ];
    const timestamps = isSpotify ? status.spotify.timestamps : undefined;

    const spotifyLink = isSpotify
        ? `https://open.spotify.com/track/${status.spotify.track_id}`
        : `https://open.spotify.com/search/${encodeURIComponent(`${song} ${artist}`)}`;

    // todo(@dromzeh): visual error handling
    if (!song || !artist) {
        return <Skeleton />;
    }

    const duration =
        timestamps?.end && timestamps?.start
            ? timestamps.end - timestamps.start
            : 0;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Context.Provider
            value={{ status: componentStatus, setStatus: setComponentStatus }}
        >
            <MotionConfig transition={transition}>
                <div className="flex items-center justify-center">
                    <div className="w-[300px] relative overflow-hidden rounded-[24px] border border-border bg-muted/50 font-medium tracking-tight shadow-sm flex items-center gap-4 px-4 py-2">
                        <CD
                            albumArt={album_art_url || ""}
                            albumName={album || ""}
                            isPlaying={!!isSpotify}
                            href={spotifyLink}
                        />
                        <motion.div
                            animate={
                                isNotIdle
                                    ? { scale: 0.95, filter: "blur(4px)" }
                                    : {}
                            }
                            className="flex-1 flex flex-col justify-center gap-2 min-w-0"
                        >
                            <div className="flex flex-col gap-1 text-xs min-w-0">
                                <p className="text-muted-foreground truncate">
                                    {artist}
                                </p>
                                <p className="text-foreground truncate font-medium">
                                    {song}
                                </p>
                            </div>

                            <div
                                className={`flex items-center gap-2 ${!isSpotify ? "-mt-1" : ""}`}
                            >
                                <div className="flex-1 flex items-center gap-2">
                                    {isSpotify ? (
                                        <>
                                            <div className="relative h-[2px] flex-1 bg-muted">
                                                <motion.div
                                                    initial={{
                                                        width: `${progress}%`,
                                                    }}
                                                    animate={{
                                                        width: `${Math.min(progress, 100)}%`,
                                                    }}
                                                    className="absolute left-0 top-0 h-full bg-muted-foreground"
                                                />
                                            </div>
                                            <p className="text-foreground text-[10px] tabular-nums">
                                                <span className="text-foreground">
                                                    {formatTime(currentTime)}
                                                </span>
                                                <span className="px-[0.4ch] text-muted-foreground">
                                                    /
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {formatTime(duration)}
                                                </span>
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-muted-foreground text-[10px] ml-auto">
                                            Last played
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MotionConfig>
        </Context.Provider>
    );
});
