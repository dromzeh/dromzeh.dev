/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { useState } from "react";
import { Card } from "~/components/ui/card";
import Image from "next/image";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

type ResponseType = {
    id: string;
    user: {
        id: string;
        username: string;
        discriminator: string;
        isPomelo: boolean;
        globalName: string | null;
        accentColor: string;
    };
    avatar: {
        id: string;
        url: string;
        animated: boolean;
    };
    banner: {
        id: string | null;
        url: string | null;
        color: string;
    };
    flags: Array<string>;
};

export const DISCORD_EPOCH = 1420070400000;

export function convertSnowflakeToDate(
    snowflake: number,
    epoch = DISCORD_EPOCH,
) {
    const milliseconds = BigInt(snowflake) >> 22n;
    return new Date(Number(milliseconds) + epoch);
}

export function validateSnowflake(snowflake: number, epoch: number) {
    if (snowflake < 4194304) {
        throw new Error(
            "That doesn't look like a snowflake. Snowflakes are much larger numbers.",
        );
    }

    const timestamp = convertSnowflakeToDate(snowflake, epoch);

    if (Number.isNaN(timestamp.getTime())) {
        throw new Error(
            "That doesn't look like a snowflake. Snowflakes have fewer digits.",
        );
    }

    return timestamp;
}

export function LookupClient() {
    const [discordUser, setDiscordUser] = useState({} as ResponseType);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");

    function GetDiscordUser(id: string) {
        setLoading(true);
        fetch(`https://discord-lookup.dromzeh.dev/user/${id}`)
            .then((res) => {
                if (res.status === 500) {
                    throw new Error("Internal Server Error");
                }
                return res.json();
            })
            .then((data) => {
                setDiscordUser(data);
                setLoading(false);
            })
            .catch((e) => {
                // TODO(dromzeh): improve error handling at a later date, this logic is useless for now because it'll always return the same 'internal server error' message
                toast.error(
                    e.message === "Internal Server Error"
                        ? "Internal Server Error"
                        : "Failed to get user data",
                );
                setLoading(false);
            });
    }

    async function CopyActualImageToClipboard(url: string) {
        try {
            const img = await fetch(url + "?size=2048").then((res) =>
                res.blob(),
            );

            if (typeof ClipboardItem !== "undefined") {
                navigator.clipboard.write([
                    new ClipboardItem({
                        [img.type]: img,
                    }),
                ]);
                toast.success("Copied image to clipboard");
            } else {
                toast.info(
                    "Your browser doesn't support the Clipboard API, copying the URL instead",
                );
                navigator.clipboard.writeText(url);
            }
        } catch (e) {
            toast.error("Failed to copy image to clipboard");
        }
    }

    function DownloadImage(url: string) {
        fetch(url + "?size=2048")
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${discordUser!.id}.png`;
                a.click();
            })
            .catch(() => {
                toast.error("Failed to download image");
            })
            .finally(() => {
                window.URL.revokeObjectURL(url);
                toast.success("Downloaded image");
            });
    }

    return (
        <section className="flex flex-col space-y-4 mt-8">
            <div className="flex flex-row space-x-2">
                <Input
                    placeholder="1081004946872352958"
                    onChange={(e) => setUser(e.target.value)}
                />
                <Button onClick={() => GetDiscordUser(user)}>Lookup</Button>
            </div>
            <div>
                {discordUser.id ? (
                    <div className="flex flex-col space-y-4 items-center">
                        <Card className="w-full">
                            <div className="flex flex-row space-x-4 items-center p-2">
                                <Image
                                    src={discordUser.avatar.url}
                                    alt={`${discordUser.user.username}'s avatar`}
                                    width={128}
                                    height={128}
                                    className="w-24 h-24 rounded-sm"
                                />
                                <div>
                                    <h1 className="text-white text-lg font-semibold flex gap-2 items-center">
                                        {discordUser.user.globalName ||
                                            discordUser.user.username}
                                        <span className="text-neutral-300 text-xs">
                                            {discordUser.user.globalName &&
                                                `${discordUser.user.username}`}
                                        </span>
                                    </h1>
                                    <p className="text-neutral-300 text-xs">
                                        {discordUser.user.id}
                                    </p>
                                    <p className="text-neutral-300 text-xs">
                                        Account created{" "}
                                        {validateSnowflake(
                                            parseInt(discordUser.user.id),
                                            DISCORD_EPOCH,
                                        ).toUTCString()}
                                    </p>
                                    <div className="flex flex-row space-x-2 mt-2">
                                        <Button
                                            className="text-xs"
                                            variant={"secondary"}
                                            onClick={() =>
                                                CopyActualImageToClipboard(
                                                    discordUser.avatar.url,
                                                )
                                            }
                                        >
                                            <Copy
                                                size={16}
                                                className="mr-2 inline"
                                            />{" "}
                                            Copy PFP
                                        </Button>
                                        <Button
                                            className="text-xs"
                                            variant={"secondary"}
                                            onClick={() =>
                                                DownloadImage(
                                                    discordUser.avatar.url,
                                                )
                                            }
                                        >
                                            <Download
                                                size={16}
                                                className="mr-2 inline"
                                            />{" "}
                                            Download PFP
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {discordUser.banner.url && (
                            <Card className="w-full relative">
                                <div className="absolute z-50 bottom-0 left-0 flex flex-row space-x-2 items-center p-3">
                                    <Button
                                        variant={"secondary"}
                                        onClick={() =>
                                            CopyActualImageToClipboard(
                                                discordUser.banner.url!,
                                            )
                                        }
                                    >
                                        <Copy
                                            size={16}
                                            className="inline mr-2"
                                        />{" "}
                                        Copy Banner
                                    </Button>
                                    <Button
                                        variant={"secondary"}
                                        onClick={() =>
                                            DownloadImage(
                                                discordUser.banner.url!,
                                            )
                                        }
                                    >
                                        <Download
                                            size={16}
                                            className="inline mr-2"
                                        />{" "}
                                        Download Banner
                                    </Button>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={`${discordUser.banner.url}?size=1024`}
                                        alt={`${discordUser.user.username}'s banner`}
                                        className="w-full rounded-sm"
                                    />
                                </div>
                            </Card>
                        )}
                    </div>
                ) : (
                    <Skeleton />
                )}
            </div>
        </section>
    );
}
