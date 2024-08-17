"use client";

import Link from "next/link";
import { Song } from "~/types/music";
import Image from "next/image";

export function SongItem({ title, artist, url, coverArtUrl }: Song) {
    return (
        <Link href={url} target="_blank">
            <div className="relative flex flex-row rounded-lg text-primary p-2 group overflow-hidden shadow-md">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${coverArtUrl})`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-150 backdrop-blur-md"></div>
                <div className="relative flex flex-row items-center gap-2 z-10">
                    <Image
                        src={coverArtUrl}
                        alt={title}
                        width={48}
                        height={48}
                        className="rounded-lg"
                    />
                    <div className="flex flex-col text-white">
                        <p className="text-sm font-medium line-clamp-1">
                            {title}
                        </p>
                        <p className="text-xs line-clamp-1">{artist}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
